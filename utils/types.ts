export type Set = {
    type: "rep" | "time";
    target: string;
  };
  
  export type Exercise = {
    name: string;
    description: string;
  };
  
  export type RoutineItem = {
    exercise: Exercise;
    sets: Set[];
  };
  
  export type Day = {
    day_number: number;
    title: string;
    routine: RoutineItem[];
  };
  
  export type Week = {
    week_number: number;
    days: Day[];
  };
  
  export type Program = {
    id: number;
    title: string;
    description: string;
    duration_weeks: number;
    weeks: Week[];
  };
  