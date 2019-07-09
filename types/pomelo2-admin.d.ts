
import { EventEmitter } from 'events';

export interface Module {
    type: string;
    interval: number;
    delay: number;

    masterHandler(agent: object, msg: any, cb: Function): void;
    monitorHandler(agent: object, msg: any, cb: Function): void;
    clientHandler(agent: object, msg: any, cb: Function): void;
}

export interface Agent extends EventEmitter {
    connect(port: string | number, host: string, cb: Function): void;
    close(): void;

    set(moduleId: string, value: object): void;
    get(moduleId: string): Module;

    notify(moduleId: string, msg: object): void;
    /// request for monitor 
    request(moduleId: string, msg: object, cb: Function): void;
    /// request for master
    request(serverId: string, moduleId: string, msg: object, cb: Function): void;
}

/**
 * ConsoleService Constructor
 *
 * @class ConsoleService
 * @constructor
 * @param {Object} opts construct parameter
 *                 opts.type 	{String} server type, 'master', 'connector', etc.
 *                 opts.id 		{String} server id
 *                 opts.host 	{String} (monitor only) master server host
 *                 opts.port 	{String | Number} listen port for master or master port for monitor
 *                 opts.master  {Boolean} current service is master or monitor
 *                 opts.info 	{Object} more server info for current server, {id, serverType, host, port}
 * @api public
 */
export interface ConsoleService extends EventEmitter {
    agent: Agent;
    /**
     * start master or monitor
     *
     * @param {Function} cb callback function
     * @api public
     */
    start(cb: Function): void;

    /**
     * stop console modules and stop master server
     *
     * @api public
     */
    stop(cb: Function): void;

    /**
     * register a new adminConsole module
     *
     * @param {String} moduleId adminConsole id/name
     * @param {Object} module module object
     * @api public
     */
    register(module: Module): void;
}

export function createMasterConsole(opts: any): ConsoleService;

export function createMonitorConsole(opts: any): ConsoleService;

export class adminClient extends EventEmitter {
    connect(id: string, host: string, port: string | number, cb: Function): void;
    request(moduleId: string, msg: object, cb: Function): void;
    notify(moduleId: string, msg: object): void;
    command(command: string, moduleId: string, msg: object, cb: Function): void;
}