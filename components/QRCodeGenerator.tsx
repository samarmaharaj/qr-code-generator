
import React, { useState } from 'react';
import type { QROptions } from '../types';
import CustomizationPanel from './CustomizationPanel';
import QRCodeDisplay from './QRCodeDisplay';

const QRCodeGenerator: React.FC = () => {
  const [options, setOptions] = useState<QROptions>({
    url: 'https://react.dev',
    size: 256,
    fgColor: '#14F195',
    bgColor: '#00000000',
    level: 'Q',
    shape: 'rounded',
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-base-200/50 border border-base-300 rounded-2xl shadow-2xl shadow-black/20 p-6 md:p-8 backdrop-blur-sm">
      <div className="lg:col-span-2">
        <CustomizationPanel options={options} setOptions={setOptions} />
      </div>
      <div className="lg:col-span-3 flex items-center justify-center">
        <QRCodeDisplay options={options} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
