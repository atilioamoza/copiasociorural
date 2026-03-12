
import React, { useState } from 'react';
import { Project, Producer } from '../types';
import MatchModal from './MatchModal';

interface ProducerDashboardProps {
  projects: Project[];
  onBack: () => void;
  onViewProfile: (producer: Producer) => void;
  onCloseProject?: (projectId: string) => void;
  currentUserName: string;
}

const ProducerDashboard: React.FC<ProducerDashboardProps> = ({ projects, onBack, onViewProfile, onCloseProject, currentUserName }) => {
  const [selectedProjectForDossier, setSelectedProjectForDossier] = useState<Project | null>(null);
  
  // Filtrar los proyectos del usuario autenticado (incluyendo cerrados para gestión)
  const myProjects = projects.filter(p => p.producer.name === currentUserName);
  const currentProducer = myProjects.length > 0 ? myProjects[0].producer : projects[0].producer;
  const isPremium = currentProducer.plan === 'premium';

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-[#2d3312] mb-2 tracking-tight">Mis Rondas Activas</h2>
          <p className="text-gray-500">Gestiona tus socios y el progreso de financiamiento.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onViewProfile(currentProducer)}
            className="px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-[#4B5320] hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Mi perfil
          </button>
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-[#4B5320] font-black uppercase tracking-widest text-[10px] hover:text-[#8B4513] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            Volver atrás
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {myProjects.length > 0 ? myProjects.map(project => {
          const progress = (project.amountRaised / project.amount) * 100;
          const isClosed = project.status === 'closed';
          
          return (
            <div key={project.id} className={`bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden transition-all ${isClosed ? 'opacity-60 grayscale' : ''}`}>
              <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                      {project.title} {isClosed && <span className="text-sm font-black text-gray-400 uppercase tracking-widest ml-2">(ARCHIVADO)</span>}
                    </h3>
                    {isPremium && !isClosed && (
                      <span className="text-[#4B5320]" title="Ronda Verificada PRO">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta: USD {project.amount.toLocaleString()}</span>
                    <span className="text-[10px] font-black text-[#4B5320] uppercase tracking-widest">Recaudado: {Math.round(progress)}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {!isClosed && (
                    <button 
                      onClick={() => onCloseProject?.(project.id)}
                      className="px-6 py-2.5 bg-white border border-red-200 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm"
                    >
                      Archivar Ronda
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedProjectForDossier(project)}
                    className="px-6 py-2.5 bg-white border-2 border-[#4B5320]/20 text-[#4B5320] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#4B5320] hover:text-white transition-all shadow-sm"
                  >
                    Ver Dossier / Ficha
                  </button>
                  <span className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${isClosed ? 'bg-gray-200 text-gray-500' : progress >= 100 ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                    {isClosed ? 'Finalizado' : progress >= 100 ? 'Ronda Completa' : 'En Progreso'}
                  </span>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Lista de Inversores */}
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Inversores Interesados (Multi-Socios)</h4>
                  <div className="space-y-4">
                    {project.investors.length > 0 ? project.investors.map(inv => {
                      const share = (inv.amount / project.amount) * 100;
                      return (
                        <div key={inv.id} className="flex items-center justify-between p-6 rounded-3xl border border-gray-100 hover:bg-gray-50/50 transition-all bg-white">
                          <div>
                            <p className="font-bold text-gray-800 text-lg">{inv.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{inv.date}</p>
                          </div>
                          <div className="text-right flex flex-col items-end">
                            <p className="font-black text-[#4B5320] text-lg leading-none mb-1">USD {inv.amount.toLocaleString()}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cuota Parte: {share.toFixed(1)}%</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {!isClosed && inv.status === 'pending' ? (
                              <>
                                <button className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-sm">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </button>
                                <button className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                              </>
                            ) : (
                              <span className="text-[9px] font-black uppercase tracking-widest text-[#4B5320] bg-[#4B5320]/10 px-4 py-2 rounded-full">
                                {isClosed ? 'Histórico' : 'Aceptado'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="p-12 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                        <p className="text-gray-400 text-sm italic">Aún no hay inversores interesados en esta ronda.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dashboard Resumen para el Productor */}
                <div className="bg-[#4B5320]/5 p-8 rounded-[2.5rem] border border-[#4B5320]/10 flex flex-col justify-between shadow-sm">
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-black text-[#4B5320]/40 uppercase tracking-widest mb-2.5">Capacidad Disponible</p>
                      <p className="text-4xl font-black text-[#4B5320] tracking-tight">USD {(project.amount - project.amountRaised).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#4B5320]/40 uppercase tracking-widest mb-2.5">Socios Aceptados</p>
                      <p className="text-3xl font-bold text-gray-700 tracking-tight">
                        {project.investors.filter(i => i.status === 'accepted').length} de {project.investors.length || 0}
                      </p>
                    </div>
                  </div>
                  
                  {isClosed ? (
                    <div className="mt-8 p-8 bg-gray-100 text-gray-500 rounded-3xl border border-gray-200">
                       <p className="text-[11px] font-black uppercase tracking-widest mb-2">Proyecto Archivada</p>
                       <p className="text-xs italic leading-relaxed">Esta ronda ya no es visible para inversores. La gestión de socios permanece disponible para tu historial.</p>
                    </div>
                  ) : progress >= 100 ? (
                    <div className="mt-8 p-8 bg-[#4B5320] text-white rounded-3xl animate-in slide-in-from-bottom-2 duration-500 shadow-xl">
                      <p className="text-[11px] font-black uppercase tracking-widest mb-4 opacity-80">¡Ronda Completa!</p>
                      <p className="text-sm font-light mb-6">Todos los cupos han sido reservados. Es momento de formalizar el contrato.</p>
                      <button 
                        onClick={() => onCloseProject?.(project.id)}
                        className="w-full bg-white text-[#4B5320] py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-100 transition-all transform active:scale-95"
                      >
                        Cerrar y Notificar a Socios
                      </button>
                    </div>
                  ) : (
                    <div className="mt-8 p-8 bg-white/50 rounded-3xl border border-[#4B5320]/5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">CONSEJO RURAL</p>
                      <p className="text-sm text-gray-600 italic leading-relaxed">
                        "Mantén tu perfil actualizado y responde rápido a los mensajes para generar confianza en tus futuros socios."
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400">Aún no has publicado ninguna ronda.</p>
          </div>
        )}
      </div>

      <MatchModal 
        project={selectedProjectForDossier} 
        isLoggedIn={true}
        isOwnProject={true}
        onClose={() => setSelectedProjectForDossier(null)}
        onContactProducer={() => {}} 
        onViewProducerProfile={() => onViewProfile(currentProducer)}
        onLoginRequired={() => {}} 
      />
    </div>
  );
};

export default ProducerDashboard;
