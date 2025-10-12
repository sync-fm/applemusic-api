/**
 * Shared error messages and magic strings.
 *
 * @module Utilities/Constants
 * @category Utilities
 */
export const ERROR: Record<string, string> = {
	CLIENT_NOT_INITIALIZED:
		"Apple Music client not initialized. Call init() first.",
} as const;
