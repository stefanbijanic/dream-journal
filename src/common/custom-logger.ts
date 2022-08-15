import { Logger, QueryRunner } from "typeorm";
import {createLogger, Logger as WinstonLogger, transports, format} from "winston";

export class CustomLogger implements Logger {
    private readonly queryLogger: WinstonLogger;
    private readonly schemaLogger: WinstonLogger;
    private readonly customFormat: any;

    constructor(){
        this.customFormat = format.printf(({message, level, label, timestamp}) => `${timestamp} [${label}] ${level} ${message}`);
        const options = (filename: string) => ({
            transports: new transports.File({filename, level: "debug"}),
            format: this.customFormat
        });
        this.queryLogger = createLogger(options("./logs/query.log"));
        this.schemaLogger = createLogger(options("./logs/Schema.log"));
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        // throw new Error("Method not implemented.");
        this.queryLogger.log({
            level: "debug",
            message: `${query} - ${parameters ? JSON.stringify(parameters) : ""}`,
            timestamp: Date.now(),
            label: "query",
        })
    }

    logQueryError(error: string|Error, query: string, parameters?: any[],queryRunner?: QueryRunner) {
        this.queryLogger.log({
            level: "debug",
            message: `${error} - ${query} - ${parameters ? JSON.stringify(parameters) : ""}`,
            timestamp: Date.now(),
            label: "error",
        })
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.queryLogger.log({
            level: "debug",
            message: `Duration: ${time} - ${query} - ${parameters ? JSON.stringify(parameters) : ""}`,
            timestamp: Date.now(),
            label: "slow",
        })
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        this.schemaLogger.log({
            level: "debug",
            message,
            timestamp: Date.now(),
            label: "schema",
        })
    }

    logMigration(message: string,queryRunner?: QueryRunner) {
        this.schemaLogger.log({
            level: "debug",
            message,
            timestamp: Date.now(),
            label: "migration",
        })
    }

    log(level: "warn"|"info"|"log", message: any, queryRunner?: QueryRunner) {
        this.queryLogger.log({
            level,
            message,
        })
    }
    
}