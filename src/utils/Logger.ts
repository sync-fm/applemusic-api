/**
 * Structured logging utilities for the Apple Music client.
 *
 * @module Utilities/Logger
 */

export interface LogDestination {
	log: (message?: any, ...optionalParams: any[]) => void;
	error: (message?: any, ...optionalParams: any[]) => void;
	debug: (message?: any, ...optionalParams: any[]) => void;
	name: string;
	enabled: boolean;
}

export enum DestinationName {
	Console = "console",
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
	name: "console",
	enabled: true,
};

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
					this.enabledDestinations.push(dest);
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
			this.enabledDestinations.push(dest);
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
