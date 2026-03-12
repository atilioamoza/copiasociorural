
import React from 'react';
import { MarketStatus } from '../types';

interface Props {
  status: MarketStatus;
}

const MarketValidationBadge: React.FC<Props> = ({ status }) => {
  const config = {
    green: { color: 'bg-green-500', text: 'Entrada: Precio Mercado OK' },
    yellow: { color: 'bg-yellow-500', text: 'Precio Optimista' },
    red: { color: 'bg-red-500', text: 'Riesgo de Mercado' }
  };

  const current = config[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full animate-pulse ${current.color}`}></div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-800 leading-none">{current.text}</p>
      </div>
    </div>
  );
};

export default MarketValidationBadge;
