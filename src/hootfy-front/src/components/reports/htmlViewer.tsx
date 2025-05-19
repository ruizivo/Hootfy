import { SquareChevronDown, SquareChevronUp } from "lucide-preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { useTranslation } from 'react-i18next';

type HtmlViewerProps = {
  path: string;
};

export default function HtmlViewer({ path }: HtmlViewerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isVisible && iframeRef.current?.contentWindow) {
      const timer = setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({ lang: i18n.language }, '*');
      }, 100); 

      return () => clearTimeout(timer);
    }
  }, [isVisible]);


  useEffect(() => {
    const onLanguageChanged = (lng: string) => {
      iframeRef.current?.contentWindow?.postMessage({ lang: lng }, '*');
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n]);


  return (
    <div class="border-gray-950 rounded shadow-sm">
      <span
        onClick={() => setIsVisible(!isVisible)}
        class="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 text-left cursor-pointer"
      >
        <span class="font-medium">Changes</span>
        {isVisible ? <SquareChevronUp size={20} /> : <SquareChevronDown size={20} />}
      </span>

      {isVisible && (
        <div class="bg-white text-gray-500">
          <iframe
            ref={iframeRef}
            src={`${path.replace('data/reports/', 'html/')}`}
            width="100%"
            height="600px"
            style={{ border: '1px solid #ccc' }}
          />
        </div>
      )}
    </div>
  );
}
