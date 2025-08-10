import React from 'react';
import type { QROptions } from '../types';
import { Link, Palette, ShieldCheck, Square, Circle, Squircle } from 'lucide-react';

interface CustomizationPanelProps {
  options: QROptions;
  setOptions: React.Dispatch<React.SetStateAction<QROptions>>;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ options, setOptions }) => {
  const handleOptionChange = <K extends keyof QROptions,>(key: K, value: QROptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const shapeOptions: { name: QROptions['shape']; icon: React.ReactNode }[] = [
    { name: 'square', icon: <Square className="h-5 w-5" /> },
    { name: 'rounded', icon: <Squircle className="h-5 w-5" /> },
    { name: 'circle', icon: <Circle className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="url" className="flex items-center gap-2 text-sm font-medium text-content-200 mb-2">
          <Link className="h-4 w-4 text-brand-secondary" />
          Website URL
        </label>
        <input
          id="url"
          type="url"
          value={options.url}
          onChange={(e) => handleOptionChange('url', e.target.value)}
          placeholder="https://example.com"
          className="w-full bg-base-100 border border-base-300 rounded-md px-3 py-2 text-content-100 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-content-200 mb-2">
          <Palette className="h-4 w-4 text-brand-secondary" />
          Colors
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="fgColor" className="block text-xs text-content-300 mb-1">Foreground</label>
            <div className="relative">
              <input
                id="fgColor"
                type="color"
                value={options.fgColor}
                onChange={(e) => handleOptionChange('fgColor', e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-10 rounded-md border border-base-300" style={{ backgroundColor: options.fgColor }}></div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="bgColor" className="block text-xs text-content-300 mb-1">Background</label>
             <div className="relative">
              <input
                id="bgColor"
                type="color"
                value={options.bgColor === '#00000000' ? '#000000' : options.bgColor}
                onChange={(e) => handleOptionChange('bgColor', e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-10 rounded-md border border-base-300 bg-cover" style={{ backgroundColor: options.bgColor, backgroundImage: options.bgColor === '#00000000' ? `linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)` : 'none', backgroundSize: '20px 20px' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-content-200 mb-2">
          <Squircle className="h-4 w-4 text-brand-secondary" />
          Container Shape
        </label>
        <div className="grid grid-cols-3 gap-2 bg-base-100 p-1 rounded-md border border-base-300">
          {shapeOptions.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => handleOptionChange('shape', name)}
              className={`flex justify-center items-center p-2 rounded-md transition ${options.shape === name ? 'bg-brand-primary text-base-100' : 'hover:bg-base-300'}`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="level" className="flex items-center gap-2 text-sm font-medium text-content-200 mb-2">
          <ShieldCheck className="h-4 w-4 text-brand-secondary" />
          Error Correction
        </label>
        <select
          id="level"
          value={options.level}
          onChange={(e) => handleOptionChange('level', e.target.value as QROptions['level'])}
          className="w-full bg-base-100 border border-base-300 rounded-md px-3 py-2 text-content-100 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition"
        >
          <option value="L">Low (L)</option>
          <option value="M">Medium (M)</option>
          <option value="Q">Quartile (Q)</option>
          <option value="H">High (H)</option>
        </select>
      </div>
    </div>
  );
};

export default CustomizationPanel;