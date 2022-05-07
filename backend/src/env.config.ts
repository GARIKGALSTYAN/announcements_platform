const db_host = process.env.DATABASE_URL;

const database = {
  host: db_host || "localhost",
  username: "postgres",
  password: "postgres",
  database_name: "announcements",
  port: 8432,
  connection_name: 'announcements_db',
  connection_limit: 100,
}

const server = {
  port: 6012,
}

export const app_environment_variables = {
  database,
  server,
}

console.log("app_environment_variables", app_environment_variables);
