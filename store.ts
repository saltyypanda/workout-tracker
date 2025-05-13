import { create } from 'zustand';

type WorkoutStore = {
  programId: number | null;
  weekNumber: number | null;
  dayNumber: number | null;
  dayId: number | null;

  routine: {
    id: number;
    exerciseId: number;
    name: string;
    sets: {
      id: number;
      setNumber: number;
      type: 'rep' | 'time';
      target: string;
    }[];
  }[];

  activeRoutineIndex: number | null;
  activeSetIndex: number | null;

  setProgram: (programId: number) => void;
  setWeek: (weekNumber: number) => void;
  setDay: (dayNumber: number, dayId: number) => void;

  setRoutine: (routine: WorkoutStore['routine']) => void;
  setActive: (routineIndex: number, setIndex: number) => void;

  resetWorkout: () => void;
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  programId: null,
  weekNumber: null,
  dayNumber: null,
  dayId: null,

  routine: [],
  activeRoutineIndex: null,
  activeSetIndex: null,

  setProgram: (programId) => set({ programId }),
  setWeek: (weekNumber) => set({ weekNumber }),
  setDay: (dayNumber, dayId) => set({ dayNumber, dayId }),

  setRoutine: (routine) => set({ routine }),
  setActive: (activeRoutineIndex, activeSetIndex) =>
    set({ activeRoutineIndex, activeSetIndex }),

  resetWorkout: () =>
    set({
      programId: null,
      weekNumber: null,
      dayNumber: null,
      dayId: null,
      routine: [],
      activeRoutineIndex: null,
      activeSetIndex: null,
    }),
}));
