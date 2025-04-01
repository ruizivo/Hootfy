const fs = require('fs').promises;
const path = require('path');

class ReportGenerator {
  static escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  static async generateReport(url, changes, oldContent, newContent, oldScreenshot, newScreenshot) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportName = `changes-${timestamp}.html`;

    // Criar um array com todas as linhas (antigas e novas) na ordem correta
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    const allChanges = [];
    
    let oldIndex = 0;
    let newIndex = 0;
    let currentLineNumber = 1;

    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      const oldLine = oldIndex < oldLines.length ? oldLines[oldIndex] : null;
      const newLine = newIndex < newLines.length ? newLines[newIndex] : null;
      
      // Procurar se a linha atual foi removida ou adicionada
      const isRemoved = changes.find(c => c.type === 'removed' && c.content === oldLine);
      const isAdded = changes.find(c => c.type === 'added' && c.content === newLine);

      if (isRemoved) {
        allChanges.push({ 
          type: 'removed', 
          content: this.escapeHtml(oldLine),
          lineNumber: currentLineNumber 
        });
        oldIndex++;
      } else if (isAdded) {
        allChanges.push({ 
          type: 'added', 
          content: this.escapeHtml(newLine),
          lineNumber: currentLineNumber 
        });
        newIndex++;
        currentLineNumber++;
      } else if (oldLine === newLine) {
        allChanges.push({ 
          type: 'unchanged', 
          content: this.escapeHtml(newLine),
          lineNumber: currentLineNumber 
        });
        oldIndex++;
        newIndex++;
        currentLineNumber++;
      } else {
        // Se chegamos aqui, pode ser uma linha modificada (remoção seguida de adição)
        const nextOldLine = oldIndex + 1 < oldLines.length ? oldLines[oldIndex + 1] : null;
        const nextNewLine = newIndex + 1 < newLines.length ? newLines[newIndex + 1] : null;
        
        if (nextOldLine === newLine) {
          // A linha atual foi removida
          allChanges.push({ 
            type: 'removed', 
            content: this.escapeHtml(oldLine),
            lineNumber: currentLineNumber 
          });
          oldIndex++;
        } else if (oldLine === nextNewLine) {
          // A linha atual foi adicionada
          allChanges.push({ 
            type: 'added', 
            content: this.escapeHtml(newLine),
            lineNumber: currentLineNumber 
          });
          newIndex++;
          currentLineNumber++;
        } else {
          // Se oldLine é null, significa que já processamos todas as linhas antigas
          // Nesse caso, todas as linhas restantes em newLines são adições
          if (oldLine === null) {
            allChanges.push({ 
              type: 'added', 
              content: this.escapeHtml(newLine),
              lineNumber: currentLineNumber 
            });
            newIndex++;
            currentLineNumber++;
            continue;
          }
          
          // Se newLine é null, significa que já processamos todas as linhas novas
          // Nesse caso, todas as linhas restantes em oldLines são remoções
          if (newLine === null) {
            allChanges.push({ 
              type: 'removed', 
              content: this.escapeHtml(oldLine),
              lineNumber: currentLineNumber 
            });
            oldIndex++;
            continue;
          }

          // Se chegamos aqui, temos uma modificação
          allChanges.push({ 
            type: 'removed', 
            content: this.escapeHtml(oldLine),
            lineNumber: currentLineNumber 
          });
          allChanges.push({ 
            type: 'added', 
            content: this.escapeHtml(newLine),
            lineNumber: currentLineNumber 
          });
          oldIndex++;
          newIndex++;
          currentLineNumber++;
        }
      }
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Mudanças - ${url}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    ${(oldScreenshot && newScreenshot) ? `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/photoswipe@5.3.8/dist/photoswipe.css">
    <script src="https://cdn.jsdelivr.net/npm/photoswipe@5.3.8/dist/umd/photoswipe.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/photoswipe@5.3.8/dist/umd/photoswipe-lightbox.umd.min.js"></script>
    ` : ''}
    <style>
        .line {
            display: flex;
            align-items: start;
            padding: 2px 8px;
            font-family: monospace;
            white-space: pre;
        }
        // .line:hover {
        //     background-color: rgba(0, 0, 0, 0.05);
        // }
        .line-number {
            color: #666;
            padding-right: 1rem;
            user-select: none;
            min-width: 3rem;
            text-align: right;
        }
        .line-content {
            tab-size: 4;
        }
        ${(oldScreenshot && newScreenshot) ? `
        .screenshot-container {
            position: relative;
            width: 100%;
            max-width: 320px;
            height: 180px;
            overflow: hidden;
            border-radius: 0.375rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            cursor: zoom-in;
            margin: 0 auto;
        }
        .screenshot-container:hover {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .screenshot {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: #f9fafb;
        }
        .pswp {
            --pswp-bg: rgba(0, 0, 0, 0.9);
        }
        .pswp__img {
            object-fit: contain;
        }
        .pswp.pswp--open {
            display: block;
        }
        .pswp__img--placeholder {
            display: none !important;
        }
        ` : ''}
    </style>
</head>
<body class="bg-gray-100 p-6">
    <div class="container mx-auto max-w-5xl">
        <header class="bg-white p-6 rounded-t shadow-md">
            <h1 class="text-2xl font-bold">Mudanças Detectadas</h1>
            <div class="mt-4 text-gray-600">
                <p>URL: ${url}</p>
                <p>Data: ${new Date().toLocaleString()}</p>
            </div>
            ${(oldScreenshot && newScreenshot) ? `
            <div class="mt-6 grid grid-cols-2 gap-4">
                <div class="flex flex-col items-center">
                    <h4 class="font-semibold mb-2 text-sm text-gray-600">Screenshot Anterior</h4>
                    <a href="data:image/png;base64,${oldScreenshot}" 
                       class="screenshot-container"
                       data-pswp-width="1920"
                       data-pswp-height="1080"
                       target="_blank">
                        <img src="data:image/png;base64,${oldScreenshot}" 
                             class="screenshot" 
                             alt="Screenshot anterior">
                    </a>
                </div>
                <div class="flex flex-col items-center">
                    <h4 class="font-semibold mb-2 text-sm text-gray-600">Screenshot Atual</h4>
                    <a href="data:image/png;base64,${newScreenshot}" 
                       class="screenshot-container"
                       data-pswp-width="1920"
                       data-pswp-height="1080"
                       target="_blank">
                        <img src="data:image/png;base64,${newScreenshot}" 
                             class="screenshot" 
                             alt="Screenshot atual">
                    </a>
                </div>
            </div>
            ` : ''}
        </header>

        <div class="bg-white p-6 shadow-md mt-6 rounded">
            <div class="border rounded overflow-hidden font-mono text-sm">
                ${allChanges.map(line => {
                    const bgColor = line.type === 'added' ? 'bg-green-50' : 
                                  line.type === 'removed' ? 'bg-red-50' : 
                                  'bg-white';
                    const textColor = line.type === 'added' ? 'text-green-800' : 
                                    line.type === 'removed' ? 'text-red-800' : 
                                    'text-gray-800';
                    const symbol = line.type === 'added' ? '+' : 
                                 line.type === 'removed' ? '-' : 
                                 ' ';
                    return `
                    <div class="line ${bgColor}">
                        <span class="line-number">${line.lineNumber}</span>
                        <span class="mr-2 ${line.type === 'added' ? 'text-green-600' : line.type === 'removed' ? 'text-red-600' : 'text-gray-400'}">${symbol}</span>
                        <span class="line-content ${textColor}">${line.content}</span>
                    </div>`;
                }).join('')}
            </div>
        </div>
    </div>

    ${(oldScreenshot && newScreenshot) ? `
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--share" title="Share"></button>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Inicializar o PhotoSwipe
        const lightbox = new PhotoSwipeLightbox({
            gallery: '.container',
            children: 'a.screenshot-container',
            pswpModule: PhotoSwipe,
            padding: { top: 20, bottom: 20, left: 20, right: 20 },
            bgOpacity: 0.9,
            showHideAnimationType: 'none',
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
            zoom: {
                click: true,
                doubleClick: true,
                mouseWheel: true,
                pinch: true
            },
            initialZoomLevel: 'fit',
            secondaryZoomLevel: 1.5,
            maxZoomLevel: 4,
            imageClickAction: 'zoom',
            tapAction: 'zoom',
            preloaderDelay: 0
        });

        lightbox.on('beforeOpen', () => {
            document.documentElement.classList.remove('pswp-open');
            document.body.classList.remove('pswp-open');
        });

        lightbox.init();
    </script>
    ` : ''}
</body>
</html>`;

    return {
      name: reportName,
      content: htmlContent
    };
  }

  static async saveReport(report, outputDir = 'reports') {
    try {
      await fs.mkdir(outputDir, { recursive: true });
      const filePath = path.join(outputDir, report.name);
      await fs.writeFile(filePath, report.content);
      return filePath;
    } catch (error) {
      console.error('Erro ao salvar relatório:', error);
      throw error;
    }
  }
}

module.exports = ReportGenerator; 