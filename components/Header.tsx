import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">Predictor de Rendimiento Estudiantil</h1>
        <p className="text-slate-600 mt-1">Usando IA para predecir los resultados de exámenes según el estudio y la asistencia.</p>
      </div>
    </header>
  );
};

export default Header;