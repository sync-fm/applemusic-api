/**
 * Structured logging utilities for the Apple Music client.
 *
 * @module Utilities/Logger
 */
const isNode =
	typeof process !== "undefined" && process.release?.name === "node";

export interface LogDestination {
	log: (message?: any, ...optionalParams: any[]) => void;
	error: (message?: any, ...optionalParams: any[]) => void;
	debug: (message?: any, ...optionalParams: any[]) => void;
	supportsBrowser?: boolean;
	name: string;
	enabled: boolean;
}

export enum DestinationName {
	Console = "console",
	File = "file",
}

export enum LogLevel {
	Log = "log",
	Error = "error",
	Debug = "debug",
}

const avaibleDestinations: Record<DestinationName, LogDestination> =
	{} as Record<DestinationName, LogDestination>;

// Always available
avaibleDestinations[DestinationName.Console] = {
	log: console.log,
	error: console.error,
	debug: console.debug,
	supportsBrowser: true,
	name: "console",
	enabled: true,
};

// for non-browser environments - ie node, deno - or bun my beloved
if (isNode) {
	const fs = await import("node:fs");
	avaibleDestinations[DestinationName.File] = {
		log: (message?: any, ...optionalParams: any[]) => {
			fs.appendFileSync(
				"app.log",
				`[LOG] ${new Date().toISOString()} - ${message} ${optionalParams.join(" ")}\n`,
			);
		},
		error: (message?: any, ...optionalParams: any[]) => {
			fs.appendFileSync(
				"app.log",
				`[ERROR] ${new Date().toISOString()} - ${message} ${optionalParams.join(" ")}\n`,
			);
		},
		debug: (message?: any, ...optionalParams: any[]) => {
			fs.appendFileSync(
				"app.log",
				`[DEBUG] ${new Date().toISOString()} - ${message} ${optionalParams.join(" ")}\n`,
			);
		},
		supportsBrowser: false,
		name: "file",
		enabled: false,
	};
}

export interface LoggerOptions {
	destinations?: DestinationName[];
	level?: LogLevel;
	customDestinations?: LogDestination[];
}

/**
 * Lightweight multi-destination logger used throughout the client.
 *
 * @category Utilities
 */
export class Logger {
	private selectedDestinations: DestinationName[];
	private customDestinations: LogDestination[] = [];

	private enabledDestinations: LogDestination[] = [];
	private level: LogLevel;

	constructor(options?: LoggerOptions) {
		this.selectedDestinations = options?.destinations || [
			DestinationName.Console,
		];
		this.level = options?.level || LogLevel.Log;
		if (options?.customDestinations) {
			options.customDestinations.forEach((dest) => {
				avaibleDestinations[dest.name] = dest;
				this.customDestinations.push(dest);
				this.enabledDestinations.push(dest);
			});
		}
		if (options?.destinations) {
			this.selectedDestinations.forEach((destName) => {
				const dest = avaibleDestinations[destName];
				if (dest) {
					if (isNode || dest.supportsBrowser) {
						this.enabledDestinations.push(dest);
					} else {
						console.warn(
							`Destination ${destName} is not supported in this environment and will be ignored.`,
						);
					}
				} else {
					console.warn(
						`Destination ${destName} is not recognized and will be ignored.`,
					);
				}
			});
		}
	}

	public log(message?: any, ...optionalParams: any[]) {
		if (this.level === LogLevel.Log) {
			this.enabledDestinations.forEach((dest) => {
				if (dest.enabled) {
					dest.log(message, ...optionalParams);
				}
			});
		}
	}

	public error(message?: any, ...optionalParams: any[]) {
		if (this.level === LogLevel.Log || this.level === LogLevel.Error) {
			this.enabledDestinations.forEach((dest) => {
				if (dest.enabled) {
					dest.error(message, ...optionalParams);
				}
			});
		}
	}

	public debug(message?: any, ...optionalParams: any[]) {
		if (this.level === LogLevel.Debug) {
			this.enabledDestinations.forEach((dest) => {
				if (dest.enabled) {
					dest.debug(message, ...optionalParams);
				}
			});
		}
	}

	public setLevel(level: LogLevel) {
		this.level = level;
	}

	public enableDestination(name: DestinationName) {
		const dest = avaibleDestinations[name];
		if (dest && !this.enabledDestinations.includes(dest)) {
			if (isNode || dest.supportsBrowser) {
				this.enabledDestinations.push(dest);
			} else {
				console.warn(
					`Destination ${name} is not supported in this environment and cannot be enabled.`,
				);
			}
		}
	}

	public disableDestination(name: DestinationName) {
		this.enabledDestinations = this.enabledDestinations.filter(
			(dest) => dest.name !== name,
		);
	}

	public getEnabledDestinations(): string[] {
		return this.enabledDestinations.map((dest) => dest.name);
	}
}
