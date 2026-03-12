
import React from 'react';
import { Project, Producer } from '../types';
import MarketValidationBadge from './MarketValidationBadge';
import { validateProjectReasonableness } from '../utils/financial';

interface ProjectCardProps {
  project: Project;
  isLoggedIn: boolean;
  onMatch: (project: Project) => void;
  onViewProfile: (producer: Producer, project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isLoggedIn, onMatch, onViewProfile }) => {
  const daysLeft = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const reasonableness = validateProjectReasonableness(project);

  // Masking for guests
  const displayTitle = project.title;
  const displayProducerName = isLoggedIn ? project.producer.name : `Productor SR #${project.producer.dicose.slice(-3)}`;

  // Hacienda Investment (Cálculo aproximado para la tarjeta)
  const haciendaInvestment = project.livestockData 
    ? project.livestockData.headCount * project.livestockData.entryWeight * project.livestockData.purchasePriceKg
    : project.amount;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = project.category === 'livestock' 
      ? 'https://i.ibb.co/7xBKQT3C/vaca.jpg' 
      : 'https://i.ibb.co/3Y0FRXyr/campo.jpg';
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group flex flex-col h-full relative">
      {/* Reasonableness Warning Overlay */}
      {(!reasonableness.isReasonable || reasonableness.warning) && (
        <div className={`absolute top-0 left-0 w-full z-20 px-4 py-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${!reasonableness.isReasonable ? 'bg-red-500 text-white' : 'bg-amber-400 text-amber-900'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>{reasonableness.msg || reasonableness.warning}</span>
        </div>
      )}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img 
          src={project.image} 
          alt={project.title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[70%]">
          <span className="bg-[#4B5320] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
            {project.department}
          </span>
          <span className="bg-[#2d3312] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
            {project.category === 'livestock' ? 'GANADERÍA' : 'AGRICULTURA'}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 shadow-sm">
          <p className="text-[9px] font-black text-[#4B5320]">⏳ {daysLeft} días</p>
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl border border-gray-100 shadow-xl">
          <MarketValidationBadge status={project.projections.marketStatus} />
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-tight tracking-tight min-h-[3rem]">
          {displayTitle}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#4B5320]/5 p-4 rounded-2xl border border-[#4B5320]/10">
            <p className="text-[9px] text-[#4B5320] font-black uppercase tracking-widest opacity-60 mb-1">Inversión Hacienda</p>
            <p className="text-xl font-black text-[#4B5320] tracking-tighter">USD {Math.round(haciendaInvestment).toLocaleString()}</p>
          </div>
          <div className="bg-[#8B4513]/5 p-4 rounded-2xl border border-[#8B4513]/10">
            <p className="text-[9px] text-[#8B4513] font-black uppercase tracking-widest opacity-60 mb-1">Plazo Ciclo</p>
            <p className="text-xl font-black text-[#8B4513] tracking-tighter">{project.term}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4B5320] rounded-full flex items-center justify-center font-bold text-white text-sm shadow-inner shrink-0">
              {displayProducerName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-800 leading-none mb-1 truncate">{displayProducerName}</p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-gray-400 font-medium">{isLoggedIn ? 'Productor Verificado' : 'Identidad Protegida'}</p>
                {isLoggedIn && (
                  <button 
                    onClick={() => onViewProfile(project.producer, project)}
                    className="text-[10px] font-black text-[#4B5320] uppercase hover:underline decoration-2 underline-offset-4"
                  >
                    • Ver Perfil
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button 
            onClick={() => onMatch(project)}
            className="w-full bg-[#4B5320] text-white py-4 rounded-2xl font-bold hover:bg-[#3a4119] transition-all flex items-center justify-center gap-3 group shadow-xl hover:shadow-none transform hover:translate-y-0.5"
          >
            Ficha Técnica
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
