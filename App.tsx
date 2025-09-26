import React, { useState } from 'react';
import { studentData } from './constants';
import type { Student, PredictionResult } from './types';
import Header from './components/Header';
import DataTable from './components/DataTable';
import DataVisualization from './components/DataVisualization';
import PredictionForm from './components/PredictionForm';
import { getPrediction } from './services/geminiService';

const App: React.FC = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (hours: number, attendance: number) => {
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);
    try {
      const result = await getPrediction(hours, attendance);
      setPredictionResult(result);
    } catch (err) {
      setError('No se pudo obtener la predicción del modelo. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DataTable data={studentData} />
            <DataVisualization data={studentData} />
          </div>
          <div className="lg:col-span-1">
            <PredictionForm 
              onPredict={handlePredict} 
              isLoading={isLoading} 
              result={predictionResult} 
              error={error} 
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm mt-8">
        <p>&copy; 2024 Predictor de Rendimiento Estudiantil. Decisiones impulsadas por IA.</p>
      </footer>
    </div>
  );
};

export default App;