import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';
import type { Student } from '../types';

interface DataVisualizationProps {
  data: Student[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ data }) => {
  const approvedData = data.filter(d => d.approves === 1);
  const notApprovedData = data.filter(d => d.approves === 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-96">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">Visualización de Datos</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="studyHours" name="Horas de Estudio" unit="h" />
          <YAxis type="number" dataKey="attendance" name="Asistencia" unit="%" />
          {/* Fix: The 'range' prop for ZAxis expects an array of two numbers. The value has been changed to [100, 100] to define a valid range for a fixed point size. */}
          <ZAxis type="number" range={[100, 100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Aprobado" data={approvedData} fill="#22c55e" shape="circle" />
          <Scatter name="No Aprobado" data={notApprovedData} fill="#ef4444" shape="cross" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataVisualization;