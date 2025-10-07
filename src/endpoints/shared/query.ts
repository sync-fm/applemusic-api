type ResultFactory<T> = () => T;

type QueryHandler<T> = (value: string, result: T) => void;

export interface ParseQueryOptions<T> {
  handlers: Record<string, QueryHandler<T>>;
  factory: ResultFactory<T>;
}

const ensureQueryString = (query: string): string =>
  query.startsWith("?") ? query : `?${query}`;

/**
 * Runs the provided handlers against parsed query parameters and returns the accumulated result.
 */
export const parseQuery =
  <T>({ handlers, factory }: ParseQueryOptions<T>) =>
  (query: string): T => {
    const params = new URLSearchParams(ensureQueryString(query));
    const result = factory();

    for (const [key, value] of params.entries()) {
      if (!Object.prototype.hasOwnProperty.call(handlers, key)) continue;
      const handler = handlers[key as keyof typeof handlers];
      if (typeof handler === "function") {
        handler(value, result);
      }
    }

    return result;
  };

export const parseDelimitedList = (value: string): string[] =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

export const parseDelimitedEnum = <T extends string>(
  value: string,
  allowed: ReadonlySet<T>
): T[] => {
  const unique = new Set<T>();

  for (const entry of parseDelimitedList(value)) {
    if (allowed.has(entry as T)) {
      unique.add(entry as T);
    }
  }

  return Array.from(unique);
};

export const parseNumber = (value: string): number | undefined => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export interface BuildQueryOptions<T extends object> {
  defaults?: Partial<T>;
  includeDefaults?: boolean;
  encode?: boolean;
}

export const buildQueryString = <T extends object>(
  params: Partial<T> = {},
  { defaults, includeDefaults = true, encode = true }: BuildQueryOptions<T> = {}
): string => {
  const query = new URLSearchParams();

  const base =
    includeDefaults && defaults ? { ...defaults, ...params } : { ...params };

  for (const [key, value] of Object.entries(base)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        query.append(key, value.join(","));
      }
      continue;
    }

    if (typeof value === "number") {
      if (Number.isFinite(value)) {
        query.append(key, String(value));
      }
      continue;
    }

    query.append(key, String(value));
  }

  const rendered = query.toString();
  return encode ? rendered : decodeURIComponent(rendered);
};
