
import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import { QrCode } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-base-100 to-base-200 text-content-100 font-sans flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
                <QrCode className="h-8 w-8 text-brand-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
            QR Code Fusion
            </h1>
        </div>
        <p className="text-lg text-content-200 max-w-2xl">
          Instantly generate and customize QR codes for any URL. Tailor the colors and shape to match your style.
        </p>
      </header>
      <main className="w-full max-w-6xl">
        <QRCodeGenerator />
      </main>
      <footer className="text-center mt-8 text-content-300 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS. Hosted with ❤️.</p>
      </footer>
    </div>
  );
};

export default App;
