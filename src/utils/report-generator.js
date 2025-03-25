const fs = require('fs').promises;
const path = require('path');

class ReportGenerator {
  static async generateReport(url, changes, oldContent, newContent, oldScreenshot, newScreenshot) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportName = `changes-${timestamp}.html`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Mudanças - ${url}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 50;
            padding: 2rem;
            overflow: auto;
        }
        .modal.active {
            display: flex;
            justify-content: center;
            align-items: start;
        }
        .modal img {
            max-width: 90%;
            max-height: 90vh;
            object-fit: contain;
        }
        .thumbnail {
            cursor: zoom-in;
            transition: transform 0.2s;
        }
        .thumbnail:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body class="bg-gray-100 p-6">
    <div class="container mx-auto">
        <header class="bg-white p-6 rounded-t shadow-md">
            <h1 class="text-2xl font-bold">Relatório de Mudanças</h1>
            <div class="mt-4 text-gray-600">
                <p>URL: ${url}</p>
                <p>Data: ${new Date().toLocaleString()}</p>
            </div>
            ${(oldScreenshot && newScreenshot) ? `
            <div class="mt-6 grid grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold mb-2 text-sm text-gray-600">Screenshot Anterior</h4>
                    <img src="data:image/png;base64,${oldScreenshot}" 
                         class="thumbnail border rounded shadow-md w-full h-48 object-cover" 
                         alt="Screenshot anterior"
                         onclick="openModal('modal-old')">
                </div>
                <div>
                    <h4 class="font-semibold mb-2 text-sm text-gray-600">Screenshot Atual</h4>
                    <img src="data:image/png;base64,${newScreenshot}" 
                         class="thumbnail border rounded shadow-md w-full h-48 object-cover" 
                         alt="Screenshot atual"
                         onclick="openModal('modal-new')">
                </div>
            </div>
            ` : ''}
        </header>

        <div class="bg-white p-6 shadow-md mt-6 rounded">
            <h2 class="text-xl font-semibold mb-4">Mudanças Detectadas</h2>
            <div class="space-y-4">
                ${changes.map(change => `
                    <div class="border rounded p-4 ${change.type === 'removed' ? 'bg-red-50' : 'bg-green-50'}">
                        <div class="flex items-center">
                            <span class="font-mono text-lg mr-2 ${change.type === 'removed' ? 'text-red-600' : 'text-green-600'}">
                                ${change.type === 'removed' ? '-' : '+'}
                            </span>
                            <pre class="whitespace-pre-wrap text-sm ${change.type === 'removed' ? 'text-red-800' : 'text-green-800'}">${change.content}</pre>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="bg-white p-6 shadow-md mt-6 rounded space-y-6">
            <div>
                <h3 class="font-semibold mb-2 text-lg flex items-center">
                    <span class="font-mono text-red-600 mr-2">-</span>
                    Conteúdo Anterior
                </h3>
                <div class="border rounded p-4 bg-red-50">
                    <pre class="whitespace-pre-wrap text-sm text-red-800">${oldContent}</pre>
                </div>
            </div>
            
            <div>
                <h3 class="font-semibold mb-2 text-lg flex items-center">
                    <span class="font-mono text-green-600 mr-2">+</span>
                    Conteúdo Atual
                </h3>
                <div class="border rounded p-4 bg-green-50">
                    <pre class="whitespace-pre-wrap text-sm text-green-800">${newContent}</pre>
                </div>
            </div>
        </div>
    </div>

    <!-- Modais para zoom nas imagens -->
    ${oldScreenshot ? `
    <div id="modal-old" class="modal" onclick="closeModal('modal-old')">
        <img src="data:image/png;base64,${oldScreenshot}" alt="Screenshot anterior em tamanho grande">
    </div>
    ` : ''}
    
    ${newScreenshot ? `
    <div id="modal-new" class="modal" onclick="closeModal('modal-new')">
        <img src="data:image/png;base64,${newScreenshot}" alt="Screenshot atual em tamanho grande">
    </div>
    ` : ''}

    <script>
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Fechar modal com tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = 'auto';
            }
        });
    </script>
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