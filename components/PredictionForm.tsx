import React, { useState } from 'react';
import type { PredictionResult } from '../types';

interface PredictionFormProps {
  onPredict: (hours: number, attendance: number) => void;
  isLoading: boolean;
  result: PredictionResult | null;
  error: string | null;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, isLoading, result, error }) => {
  const [hours, setHours] = useState<number>(6);
  const [attendance, setAttendance] = useState<number>(80);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(hours, attendance);
  };

  const ResultCard = () => {
    if (!result) return null;

    const isApproved = result.prediction === 1;
    const bgColor = isApproved ? 'bg-green-100' : 'bg-red-100';
    const borderColor = isApproved ? 'border-green-400' : 'border-red-400';
    const textColor = isApproved ? 'text-green-800' : 'text-red-800';
    const title = isApproved ? 'Resultado: Aprobado' : 'Resultado: No Aprobado';

    return (
      <div className={`mt-6 p-4 border-l-4 ${borderColor} ${bgColor} ${textColor} rounded-r-lg shadow`}>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="mt-2 text-sm text-slate-700">{result.explanation}</p>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      {isLoading && <LoadingSpinner />}
      <h2 className="text-xl font-semibold mb-4 text-slate-700">Realizar una Predicción</h2>
      <p className="text-sm text-slate-500 mb-6">
        Introduce los datos de un estudiante para predecir si aprobará el examen. Los valores iniciales corresponden al ejemplo del problema.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-slate-700">
              Horas de Estudio Semanales: <span className="font-bold text-blue-600">{hours}</span>
            </label>
            <input
              id="hours"
              type="range"
              min="0"
              max="15"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="attendance" className="block text-sm font-medium text-slate-700">
              Porcentaje de Asistencia: <span className="font-bold text-blue-600">{attendance}%</span>
            </label>
            <input
              id="attendance"
              type="range"
              min="0"
              max="100"
              step="5"
              value={attendance}
              onChange={(e) => setAttendance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Prediciendo...' : 'Predecir Aprobación'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {result && <ResultCard />}
    </div>
  );
};

export default PredictionForm;