
import React, { useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { QROptions } from '../types';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
  options: QROptions;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ options }) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const getShapeClasses = () => {
    switch (options.shape) {
      case 'circle':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-3xl';
      case 'square':
      default:
        return 'rounded-none';
    }
  };

  const download = useCallback((format: 'svg' | 'png') => {
    const svgElement = qrContainerRef.current?.querySelector('svg');
    if (!svgElement) {
        alert("Could not find QR code to download.");
        return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const filename = `qrcode-${options.url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;

    if (format === 'svg') {
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'png') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width * 2; // for better resolution
        canvas.height = img.height * 2;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${filename}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  }, [options.url]);


  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-6">
      <div
        ref={qrContainerRef}
        className={`p-4 md:p-6 transition-all duration-300 ${getShapeClasses()}`}
        style={{ backgroundColor: options.bgColor }}
      >
        {options.url ? (
            <QRCodeSVG
            value={options.url}
            size={options.size}
            fgColor={options.fgColor}
            bgColor={'#00000000'} // Handled by the container
            level={options.level}
            includeMargin={true}
            />
        ) : (
            <div className={`flex items-center justify-center text-center text-content-300 bg-base-300`} style={{width: options.size, height: options.size}}>
                Enter a URL to generate a QR code.
            </div>
        )}
      </div>
      <div className="flex gap-4 w-full">
        <button
          onClick={() => download('png')}
          disabled={!options.url}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-secondary/90 hover:bg-brand-secondary text-base-100 font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-5 w-5" />
          Download PNG
        </button>
        <button
          onClick={() => download('svg')}
          disabled={!options.url}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-base-300 hover:bg-content-300/50 text-content-100 font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-5 w-5" />
          Download SVG
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
