const db_host = process.env.DATABASE_URL;
const db_username = process.env.DB_USERNAME;
const password = process.env.PASSWORD;
const database_name = process.env.DATABASE_NAME;
const db_port = process.env.DB_PORT;
const connection_name = process.env.CONNECTION_NAME;
const connection_limit = process.env.CONNECTION_LIMIT;
const app_port = process.env.PORT;

const database = {
  host: db_host || "localhost",
  username: db_username || "postgres",
  password: password || "postgres",
  database_name: database_name || "announcements",
  port: Number(db_port) || 8432,
  connection_name: connection_name || 'announcements_db',
  connection_limit: connection_limit || 100,
}

const server = {
  port: Number(app_port) || 6012,
  access_token_expiration_time_ms: 2 * 60 * 60 * 1000,
}

export const app_environment_variables = {
  database,
  server,
}
