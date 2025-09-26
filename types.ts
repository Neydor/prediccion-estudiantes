export interface Student {
  id: number;
  studyHours: number;
  attendance: number;
  approves: 0 | 1;
}

export interface PredictionResult {
  prediction: 0 | 1;
  explanation: string;
}
