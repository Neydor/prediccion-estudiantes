import { GoogleGenAI, Type } from "@google/genai";
import type { PredictionResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const trainingData = [
  { "studyHours": 1, "attendance": 50, "approved": 0 },
  { "studyHours": 2, "attendance": 60, "approved": 0 },
  { "studyHours": 3, "attendance": 70, "approved": 0 },
  { "studyHours": 4, "attendance": 80, "approved": 1 },
  { "studyHours": 5, "attendance": 85, "approved": 1 },
  { "studyHours": 6, "attendance": 90, "approved": 1 },
  { "studyHours": 7, "attendance": 95, "approved": 1 },
  { "studyHours": 8, "attendance": 100, "approved": 1 },
  { "studyHours": 2, "attendance": 75, "approved": 0 },
  { "studyHours": 5, "attendance": 65, "approved": 1 }
];

const schema = {
  type: Type.OBJECT,
  properties: {
    prediction: {
      type: Type.INTEGER,
      description: 'El resultado de la predicción. 1 para aprobado, 0 para no aprobado.'
    },
    explanation: {
      type: Type.STRING,
      description: 'Una breve explicación de la predicción basada en la lógica de un árbol de decisión.'
    }
  },
  required: ['prediction', 'explanation']
};

export const getPrediction = async (studyHours: number, attendance: number): Promise<PredictionResult> => {
  
  const prompt = `
    Eres un científico de datos experto actuando como un clasificador de Árbol de Decisión. Has sido entrenado con el siguiente conjunto de datos sobre el rendimiento de los estudiantes:
    ${JSON.stringify(trainingData, null, 2)}

    Tu tarea es predecir si un nuevo estudiante será aprobado (1 para Sí, 0 para No).

    Basándote en los patrones de los datos, predice el resultado para un estudiante con ${studyHours} horas de estudio por semana y un ${attendance}% de asistencia.

    Proporciona tu respuesta en el formato JSON especificado.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.1, // Lower temperature for more deterministic, classification-like behavior
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (result.prediction === 0 || result.prediction === 1) {
        return result as PredictionResult;
    } else {
        throw new Error("Se recibió un valor de predicción no válido de la API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No se pudo obtener una predicción válida del modelo de IA.");
  }
};