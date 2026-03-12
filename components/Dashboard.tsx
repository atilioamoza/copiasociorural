
import React, { useState } from 'react';
import { Project, ProjectCategory, Producer } from '../types';
import { URUGUAY_DEPARTMENTS } from '../constants';
import ProjectCard from './ProjectCard';
import MatchModal from './MatchModal';

interface DashboardProps {
  projects: Project[];
  isLoggedIn: boolean;
  currentUserName?: string;
  onBack?: () => void;
  showBack?: boolean;
  onContactProducer: (project: Project) => void;
  onViewProducerProfile: (producer: Producer, project: Project) => void;
  onLoginRequired: () => void;
  onSelectProject: (project: Project) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, isLoggedIn, currentUserName, onBack, showBack = false, onContactProducer, onViewProducerProfile, onLoginRequired, onSelectProject }) => {
  const [filterDepartment, setFilterDepartment] = useState<string>('Todos');
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 15;

  const handleMatch = (project: Project) => {
    onSelectProject(project);
  };

  const departments = ['Todos', ...URUGUAY_DEPARTMENTS];

  const filteredProjects = projects.filter(p => {
    const deptMatch = filterDepartment === 'Todos' || p.department === filterDepartment;
    const catMatch = filterCategory === 'all' || p.category === filterCategory;
    return deptMatch && catMatch;
  });

  // Reset to page 1 when filters change
  const handleFilterCategory = (category: ProjectCategory | 'all') => {
    setFilterCategory(category);
    setCurrentPage(1);
  };

  const handleFilterDepartment = (dept: string) => {
    setFilterDepartment(dept);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById('oportunidades')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="oportunidades" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {showBack && onBack && (
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-[#4B5320] font-bold hover:text-[#8B4513] transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Volver al inicio
        </button>
      )}

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div>
          <h2 className="text-4xl font-bold text-[#2d3312] mb-3">Oportunidades Directas</h2>
          <p className="text-gray-500 max-w-lg">Invierte en activos reales. Elige entre proyectos ganaderos tradicionales o ciclos agrícolas intensivos.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm flex">
            <button 
              onClick={() => handleFilterCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterCategory === 'all' ? 'bg-[#4B5320] text-white' : 'text-gray-400'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => handleFilterCategory('livestock')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${filterCategory === 'livestock' ? 'bg-[#4B5320] text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19,4H17.22C16.83,2.83 15.72,2 14.4,2C13.08,2 11.97,2.83 11.58,4H9.78C9.39,2.83 8.28,2 6.96,2C5.64,2 4.53,2.83 4.14,4H2V20H22V4H19M14.4,4A0.6,0.6 0 0,1 15,4.6A0.6,0.6 0 0,1 14.4,5.2A0.6,0.6 0 0,1 13.8,4.6A0.6,0.6 0 0,1 14.4,4M6.96,4A0.6,0.6 0 0,1 7.56,4.6A0.6,0.6 0 0,1 6.96,5.2A0.6,0.6 0 0,1 6.36,4.6A0.6,0.6 0 0,1 6.96,4M4,18V6H6V18H4M10,18V6H12V18H10M16,18V6H18V18H16M20,18H18.5V17.5H15.5V18H13.5V17.5H10.5V18H8.5V17.5H5.5V18H4V6H20V18Z"/></svg>
              Ganadería
            </button>
            <button 
              onClick={() => handleFilterCategory('agriculture')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${filterCategory === 'agriculture' ? 'bg-[#4B5320] text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22,15V17H2V15H22M2,18H22V20H2V18M15.41,10.09L13.17,12.33L11.75,10.91L13.99,8.67L15.41,10.09M18.94,6.56L16.7,8.8L15.28,7.38L17.52,5.14L18.94,6.56M11.88,13.62L9.64,15.86L8.22,14.44L10.46,12.2L11.88,13.62M5.41,10.09L3.17,12.33L1.75,10.91L3.99,8.67L5.41,10.09M10.5,2C12.43,2 14,3.57 14,5.5V7H16.5A2.5,2.5 0 0,1 19,9.5V11.12L21,9.12V7H22V11L17.5,15.5H15L19,11.5V9.5A0.5,0.5 0 0,0 18.5,9H14V11.5L10,15.5H7.5L11,12V9.5C11,7.57 9.43,6 7.5,6H4V2H5V5H7.5A0.5,0.5 0 0,1 8,5.5V12 L4.5,15.5H2V14.12L4,12.12V9.5C4,7.57 5.57,6 7.5,6H8.5V2H10.5Z"/></svg>
              Agricultura
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => handleFilterDepartment(dept)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  filterDepartment === dept 
                  ? 'bg-white text-[#4B5320] border-2 border-[#4B5320]' 
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-[#4B5320]/30'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isLoggedIn={isLoggedIn}
            onMatch={handleMatch} 
            onViewProfile={onViewProducerProfile}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-gray-100 pt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              currentPage === 1 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-[#4B5320] hover:bg-[#4B5320]/5 active:scale-95'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Página</span>
            <span className="w-10 h-10 rounded-lg bg-[#4B5320] text-white flex items-center justify-center font-black text-sm shadow-lg">
              {currentPage}
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">de {totalPages}</span>
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              currentPage === totalPages 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-[#4B5320] hover:bg-[#4B5320]/5 active:scale-95'
            }`}
          >
            Siguiente
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <svg className="w-16 h-16 mx-auto text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-gray-400 font-medium">No encontramos proyectos que coincidan con tus filtros.</p>
          <button 
            onClick={() => { setFilterDepartment('Todos'); setFilterCategory('all'); }}
            className="mt-4 text-[#4B5320] font-bold text-sm underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
