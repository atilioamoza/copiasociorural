
import React, { useState, useMemo } from 'react';
import { Producer, Project } from '../types';
import MatchModal from './MatchModal';
import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

interface ProducerProfileViewProps {
  producer: Producer;
  projects: Project[];
  onBack: () => void;
  onMessage?: () => void;
  isOwnProfile?: boolean;
  onEdit?: () => void;
  onViewProjects?: () => void;
  onCreateProject?: () => void;
  onLoginRequired: () => void;
  onSelectProject: (project: Project) => void;
}

const ProducerProfileView: React.FC<ProducerProfileViewProps> = ({ 
  producer, 
  projects,
  onBack, 
  onMessage, 
  isOwnProfile = false,
  onEdit,
  onViewProjects,
  onSelectProject,
  onCreateProject,
  onLoginRequired
}) => {
  const isPremium = producer.plan === 'premium';

  // Filtrar los proyectos de este productor específico
  const producerProjects = useMemo(() => {
    return projects.filter(p => p.producer.name === producer.name);
  }, [projects, producer.name]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://i.ibb.co/3Y0FRXyr/campo.jpg';
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Botón de volver */}
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-[#4B5320] font-bold hover:text-[#8B4513] transition-colors group">
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Volver
      </button>

      {/* Header del Perfil */}
      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100 mb-8">
        <div className="h-48 bg-gradient-to-r from-[#4B5320] to-[#2d3312] relative">
          {producer.coverImage && <img src={producer.coverImage} className="w-full h-full object-cover opacity-30" alt="Cover" />}
          <div className="absolute -bottom-12 left-12">
            <div className="w-32 h-32 bg-[#4B5320] rounded-[2.5rem] border-8 border-white flex items-center justify-center text-white text-4xl font-black shadow-lg overflow-hidden">
              {producer.profileImage ? (
                <img src={producer.profileImage} className="w-full h-full object-cover" alt={producer.name} />
              ) : (
                producer.name.charAt(0)
              )}
            </div>
          </div>
          {isOwnProfile && (
            <button onClick={onEdit} className="absolute bottom-4 right-8 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all">
              Editar Perfil
            </button>
          )}
        </div>
        <div className="pt-16 pb-10 px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-gray-800 tracking-tight">{producer.name}</h1>
                {isPremium && (
                  <span className="bg-[#4B5320] text-white p-1 rounded-full" title="Productor Verificado PRO">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  </span>
                )}
              </div>
              <p className="text-lg font-bold text-[#8B4513] mb-4">{producer.headline}</p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                  📍 {producer.locationDetails}
                </span>
              </div>
            </div>
            {!isOwnProfile && (
              <button onClick={onMessage} className="bg-[#4B5320] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transform active:scale-95 transition-all">
                Enviar Mensaje
              </button>
            )}
            {isOwnProfile && (
              <div className="flex gap-4">
                <button onClick={onViewProjects} className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-all">
                  Mi Panel
                </button>
                <button onClick={onCreateProject} className="bg-[#4B5320] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">
                  Nueva Ronda
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Bio y Rondas */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Biografía Profesional</h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">"{producer.bio}"</p>
          </section>

          <section>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 ml-4">Rondas Activas ({producerProjects.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {producerProjects.map(project => (
                <div key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                  <img 
                    src={project.image} 
                    className="h-40 w-full object-cover" 
                    alt={project.title} 
                    onError={(e) => {
                      e.currentTarget.src = project.category === 'livestock' 
                        ? 'https://i.ibb.co/7xBKQT3C/vaca.jpg' 
                        : 'https://i.ibb.co/3Y0FRXyr/campo.jpg';
                    }}
                  />
                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">{project.title}</h4>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[10px] font-black uppercase text-[#4B5320] bg-[#4B5320]/10 px-3 py-1 rounded-full">USD {project.amount.toLocaleString()}</span>
                      <button onClick={() => onSelectProject(project)} className="text-xs font-black text-[#8B4513] uppercase">Ver Ficha →</button>
                    </div>
                  </div>
                </div>
              ))}
              {producerProjects.length === 0 && (
                <div className="col-span-2 py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 text-sm italic">Este productor no tiene rondas activas en este momento.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Columna Derecha: Detalles Técnicos */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Trayectoria</h3>
            <div className="space-y-6">
              {producer.experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-gray-100">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#4B5320]"></div>
                  <p className="font-bold text-gray-800 text-sm">{exp.role}</p>
                  <p className="text-xs text-[#8B4513]">{exp.establishment}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{exp.period}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Aptitudes</h3>
            <div className="flex flex-wrap gap-2">
              {producer.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {producer.socialLinks && (Object.values(producer.socialLinks).some(link => link)) && (
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Redes Sociales</h3>
              <div className="flex gap-4">
                {producer.socialLinks.facebook && (
                  <a href={producer.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-2xl text-[#4B5320] hover:bg-[#4B5320] hover:text-white transition-all shadow-sm">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {producer.socialLinks.linkedin && (
                  <a href={producer.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-2xl text-[#4B5320] hover:bg-[#4B5320] hover:text-white transition-all shadow-sm">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {producer.socialLinks.instagram && (
                  <a href={producer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-2xl text-[#4B5320] hover:bg-[#4B5320] hover:text-white transition-all shadow-sm">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {producer.socialLinks.x && (
                  <a href={producer.socialLinks.x} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-2xl text-[#4B5320] hover:bg-[#4B5320] hover:text-white transition-all shadow-sm">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProducerProfileView;
