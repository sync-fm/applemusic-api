/**
 * Miscellaneous shared type utilities.
 *
 * @module SharedTypes/General
 * @category Shared Types
 */
/**
 * Options used when constructing generic HTTP requests.
 */
export interface constructRequestOptions {
	url: string;
	method?: "GET" | "POST";
	data?: Record<string, any>;
	headers?: Record<string, string>;
	searchParams?: Record<string, string>;
}
