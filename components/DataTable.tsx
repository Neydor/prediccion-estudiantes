import React from 'react';
import type { Student } from '../types';

interface DataTableProps {
  data: Student[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">Conjunto de Datos de Estudiantes</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-slate-200 text-slate-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">ID Estudiante</th>
              <th className="py-3 px-6">Horas de Estudio</th>
              <th className="py-3 px-6">Asistencia (%)</th>
              <th className="py-3 px-6">Aprueba</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 text-sm font-light">
            {data.map((student, index) => (
              <tr key={student.id} className="border-b border-slate-200 hover:bg-slate-100">
                <td className="py-3 px-6">{student.id}</td>
                <td className="py-3 px-6">{student.studyHours}</td>
                <td className="py-3 px-6">{student.attendance}</td>
                <td className="py-3 px-6">
                  {student.approves === 1 ? (
                    <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs font-semibold">Sí (1)</span>
                  ) : (
                    <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs font-semibold">No (0)</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;