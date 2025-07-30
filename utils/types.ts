export type Set = {
  id: number;
  type: "rep" | "time";
  target: string;
};

export type Exercise = {
  id: number;
  name: string;
  description: string;
};

export type RoutineItem = {
  id: number;
  exercise: Exercise;
  sets: Set[];
};

export type Day = {
  id: number;
  day_number: number;
  title: string;
  routine: RoutineItem[];
};

export type Week = {
  id: number;
  week_number: number;
  days: Day[];
};

export type Program = {
  id: number;
  title: string;
  description: string;
  cover_uri: string;
  weeks: Week[];
};
