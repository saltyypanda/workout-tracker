import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";
import sampleProgram from "../programs/sampleProgram.json";
import { Program } from "./types";

const initDB = async (db: SQLite.SQLiteDatabase) => {
  await resetDatabase(db);
  await buildDatabase(db);
  await seedDatabase(db);
};

const resetDatabase = async (db: SQLite.SQLiteDatabase) => {
  const tables = [
    "completions",
    "progress",
    "sets",
    "routines",
    "exercises",
    "days",
    "weeks",
    "programs",
    "users",
  ];

  for (const table of tables) {
    await db.execAsync(`DROP TABLE IF EXISTS ${table};`);
  }

  console.log("All tables dropped.");
};

const buildDatabase = async (db: SQLiteDatabase) => {
  console.log("Building database...");
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
          duration_weeks INTEGER,
          cover_uri TEXT
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
};

const seedDatabase = async (db: SQLiteDatabase) => {
  console.log("Seeding database...");
  const program = sampleProgram as Program;

  const programPreparedStatement = await db.prepareAsync(`
        INSERT INTO programs (title, description, duration_weeks, cover_uri)
        VALUES ($title, $description, $duration_weeks, $cover_uri);
    `);

  try {
    await programPreparedStatement.executeAsync({
      $title: program.title,
      $description: program.description,
      $duration_weeks: program.duration_weeks,
      $cover_uri: program.cover_uri,
    });
  } finally {
    await programPreparedStatement.finalizeAsync();
  }
};

const clearDatabase = async (db: SQLiteDatabase) => {
  const tables = [
    "completions",
    "progress",
    "sets",
    "routines",
    "exercises",
    "days",
    "weeks",
    "programs",
    "users",
  ];

  for (const table of tables) {
    await db.execAsync(`DELETE FROM ${table};`);
  }
  console.log("Database cleared.");
};

export { initDB };
