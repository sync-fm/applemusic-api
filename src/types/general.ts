export interface constructRequestOptions {
    url: string;
    method?: "GET" | "POST";
    data?: Record<string, any>;
    headers?: Record<string, string>;
    searchParams?: Record<string, string>;
}
