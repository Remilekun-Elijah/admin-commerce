const config = require("./utils/config");
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      user: config.database_user,
      host: config.database_host,
      port: config.database_port,
      database: config.database,
      password: config.database_password,
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      user: config.database_user,
      host: config.database_host,
      port: config.database_port,
      database: config.database,
      password: config.database_password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      user: config.database_user,
      host: config.database_host,
      port: config.database_port,
      database: config.database,
      password: config.database_password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
