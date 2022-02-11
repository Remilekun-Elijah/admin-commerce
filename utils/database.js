const config = require("./config");
const consola = require("consola");
const chalk = require('chalk');
// let mongoose = require("mongoose");
const mongoose = {connect: e=> {}};
const { Pool } = require("pg");

class Database {
    mongodb() {
        let retry = 0;
        const connect = async conString => {
            consola.info('Initiating MongoDB connection...');

            return mongoose.connect(conString || config.mongodb_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }, err => {
                let retry = 0;
                if (err) {
                    if (retry !== 3) {
                        retry++;
                        if (retry > 1) consola.info("Retrying again in 5 seconds...");
                        else consola.info("Retrying in 5 seconds...");
                        setTimeout(() => connect(conString || config.mongodb_uri), 5000);
                    } else {
                        consola.info("Attempting to connect locally...");
                        setTimeout(() => connect(config.local_mongodb_uri), 5000);
                    }
                } else consola.success("Mongodb connected successfully 🚀");
            });
        };
        return { connect };
    }

    postgresql() {
        const checkConnection = async() => {
            const text = `SELECT 1 + 1`;

            console.log(chalk.yellowBright('💻 Initiating Postgresql connection...'))
            await pool().query(text).then(data => {
                console.log(chalk.greenBright('Postgresql connected successfully 🚀'))

            }).catch(err => {
                console.log(chalk.red('❌ Postgresql could not connect:', err.message))
            })

        };

        const pool = (configs) => {
            return new Pool(configs || {
                user: config.database_user,
                host: config.database_host,
                database: config.database,
                password: config.database_password,
                port: config.database_port,
            });
        };
        return { checkConnection, Pool: pool }
    }
}

module.exports = Database;
