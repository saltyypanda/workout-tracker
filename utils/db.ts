import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";
import sampleProgram from "../programs/sampleProgram.json";
import { Program } from "./types";

// const db = await SQLite.openDatabaseAsync("workout.db");

const initDB = async (db: SQLiteDatabase) => {
    console.log("Initializing database...");
  // USERS
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          date_of_birth TEXT,
          sex TEXT,
          weight REAL
        );
      `);

  // PROGRAMS
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS programs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT,
          duration_weeks INTEGER
        );
      `);

  // WEEKS
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS weeks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          program_id INTEGER,
          week_number INTEGER,
          FOREIGN KEY (program_id) REFERENCES programs(id)
        );
      `);

  // DAYS
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS days (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          week_id INTEGER,
          day_number INTEGER,
          title TEXT,
          FOREIGN KEY (week_id) REFERENCES weeks(id)
        );
      `);

  // EXERCISES
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS exercises (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT
        );
      `);

  // ROUTINES
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS routines (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          day_id INTEGER,
          exercise_id INTEGER,
          position INTEGER,
          FOREIGN KEY (day_id) REFERENCES days(id),
          FOREIGN KEY (exercise_id) REFERENCES exercises(id)
        );
      `);

  // SETS
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS sets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          routine_id INTEGER,
          set_number INTEGER,
          type TEXT,         -- 'rep' or 'time'
          target TEXT,       -- e.g. '12-15 reps', 'AMRAP', '60s'
          FOREIGN KEY (routine_id) REFERENCES routines(id)
        );
      `);

  // PROGRESS
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS progress (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          day_id INTEGER,
          set_id INTEGER,
          actual_reps INTEGER,
          actual_weight REAL,
          duration_seconds INTEGER,
          timestamp TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (day_id) REFERENCES days(id),
          FOREIGN KEY (set_id) REFERENCES sets(id)
        );
      `);

  // COMPLETIONS
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS completions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          type TEXT,            -- 'day', 'week', 'program'
          reference_id INTEGER, -- ID of the completed day/week/program
          completed BOOLEAN,
          timestamp TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `);

    await clearDb(db);
    await seedDb(db);
  console.log("Database initialized and seeded.");
};

const seedDb = async (db: SQLiteDatabase) => {
  const program = sampleProgram as Program;

  const programPreparedStatement = await db.prepareAsync(`
        INSERT INTO programs (title, description, duration_weeks)
        VALUES ($title, $description, $duration_weeks);
    `);

  try {
    let res = await programPreparedStatement.executeAsync({
      $title: program.title,
      $description: program.description,
      $duration_weeks: program.duration_weeks,
    });

    console.log("Program Inserted:", res.changes);
    const firstRow = await db.getFirstAsync('SELECT * FROM programs') as { id: number; title?: string; description?: number };
    console.log(firstRow.id, firstRow.title, firstRow.description);
  } finally {
    await programPreparedStatement.finalizeAsync();
  }
};

const clearDb = async (db: SQLiteDatabase) => {
    const tables = [
      "completions",
      "progress",
      "sets",
      "routines",
      "exercises",
      "days",
      "weeks",
      "programs",
      "users"
    ];
  
    for (const table of tables) {
      await db.execAsync(`DELETE FROM ${table};`);
    }
    console.log("Database cleared.");
  };  

export { initDB };