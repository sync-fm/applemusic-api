import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TokenStorage } from './TokenStorage';

describe('TokenStorage', () => {
    let mockAxios: any;

    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { });
        mockAxios = {
            get: vi.fn(),
            request: vi.fn(),
        };
        // Mock initial fetch to fail to avoid interference
        mockAxios.get.mockRejectedValue(new Error('Mock error for initial'));
        mockAxios.request.mockRejectedValue(new Error('Mock error for initial'));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('constructor', () => {
        it('should initialize with default values', () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);
            expect(tokenStorage.valid).toBe(false);
            expect(tokenStorage.expiresIn).toBe(0);
        });

        it('should initialize with custom values', () => {
            const tokenStorage = new TokenStorage(mockAxios, 7200000, 20000);
            expect(tokenStorage.valid).toBe(false);
            expect(tokenStorage.expiresIn).toBe(0);
        });
    });

    describe('getToken', () => {
        it('should return cached token if valid and not expiring soon', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);
            // Simulate a valid token
            (tokenStorage as any).token = 'test-token';
            (tokenStorage as any).isTokenValid = true;
            (tokenStorage as any).expiresAt = Date.now() + 20000; // Not expiring soon

            mockAxios.get.mockClear();
            mockAxios.request.mockClear();

            const token = await tokenStorage.getToken();
            expect(token).toBe('test-token');
            expect(mockAxios.get).not.toHaveBeenCalled();
        });

        it('should fetch new token if expiring soon', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);
            (tokenStorage as any).token = 'old-token';
            (tokenStorage as any).isTokenValid = true;
            (tokenStorage as any).expiresAt = Date.now() + 5000; // Expiring soon

            // Mock yoinkToken response
            mockAxios.get.mockImplementation((url: string) => {
                if (url === '/') {
                    return Promise.resolve({
                        data: '<html><script crossorigin src="/assets/index.abc123.js"></script></html>',
                    });
                } else if (url === '/assets/index.abc123.js') {
                    return Promise.resolve({
                        data: 'some js code "eyJhbGc.test-token"',
                    });
                }
                return Promise.reject(new Error('Unexpected URL'));
            });

            // Mock validateToken
            mockAxios.request.mockResolvedValue({ status: 200 });

            mockAxios.get.mockClear();
            mockAxios.request.mockClear();

            const token = await tokenStorage.getToken();
            expect(token).toBe('eyJhbGc.test-token');
            expect(mockAxios.get).toHaveBeenCalledTimes(2);
            expect(mockAxios.request).toHaveBeenCalledTimes(1);
        });

        it('should fetch new token if invalid', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);
            (tokenStorage as any).isTokenValid = false;

            // Mock yoinkToken response
            mockAxios.get.mockImplementation((url: string) => {
                if (url === '/') {
                    return Promise.resolve({
                        data: '<html><script crossorigin src="/assets/index.abc123.js"></script></html>',
                    });
                } else if (url === '/assets/index.abc123.js') {
                    return Promise.resolve({
                        data: 'some js code "eyJhbGc.new-token"',
                    });
                }
                return Promise.reject(new Error('Unexpected URL'));
            });

            // Mock validateToken
            mockAxios.request.mockResolvedValue({ status: 200 });

            mockAxios.get.mockClear();
            mockAxios.request.mockClear();

            const token = await tokenStorage.getToken();
            expect(token).toBe('eyJhbGc.new-token');
            expect(mockAxios.get).toHaveBeenCalledTimes(2);
            expect(mockAxios.request).toHaveBeenCalledTimes(1);
        });

        it('should throw error if yoinkToken fails to find script URL', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);

            mockAxios.get.mockResolvedValue({
                data: '<html><script></script></html>', // No crossorigin src
            });

            await expect(tokenStorage.getToken()).rejects.toThrow('Failed to fetch token: Failed to find script asset URL');
        });

        it('should throw error if yoinkToken fails to find token in JS', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);

            mockAxios.get.mockImplementation((url: string) => {
                if (url === '/') {
                    return Promise.resolve({
                        data: '<html><script crossorigin src="/assets/index.abc123.js"></script></html>',
                    });
                } else if (url === '/assets/index.abc123.js') {
                    return Promise.resolve({
                        data: 'some js code without token',
                    });
                }
                return Promise.reject(new Error('Unexpected URL'));
            });

            await expect(tokenStorage.getToken()).rejects.toThrow('Failed to fetch token: Failed to find token in JS');
        });

        it('should throw error if validateToken fails', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);

            // Mock yoinkToken response
            mockAxios.get.mockImplementation((url: string) => {
                if (url === '/') {
                    return Promise.resolve({
                        data: '<html><script crossorigin src="/assets/index.abc123.js"></script></html>',
                    });
                } else if (url === '/assets/index.abc123.js') {
                    return Promise.resolve({
                        data: 'some js code "eyJhbGc.test-token"',
                    });
                }
                return Promise.reject(new Error('Unexpected URL'));
            });

            // Mock validateToken failure
            mockAxios.request.mockResolvedValue({ status: 401 });

            await expect(tokenStorage.getToken()).rejects.toThrow('Fetched token is invalid: undefined');
        });

        it('should handle axios errors in yoinkToken', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);

            mockAxios.get.mockRejectedValue(new Error('Network error'));

            await expect(tokenStorage.getToken()).rejects.toThrow('Network error');
        });

        it('should handle axios errors in validateToken', async () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);

            // Mock yoinkToken response
            mockAxios.get.mockImplementation((url: string) => {
                if (url === '/') {
                    return Promise.resolve({
                        data: '<html><script crossorigin src="/assets/index.abc123.js"></script></html>',
                    });
                } else if (url === '/assets/index.abc123.js') {
                    return Promise.resolve({
                        data: 'some js code "eyJhbGc.test-token"',
                    });
                }
                return Promise.reject(new Error('Unexpected URL'));
            });

            // Mock validateToken error
            mockAxios.request.mockRejectedValue(new Error('Validation network error'));

            await expect(tokenStorage.getToken()).rejects.toThrow('Validation network error');
        });
    });

    describe('valid getter', () => {
        it('should return true when token is valid', () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).isTokenValid = true;
            expect(tokenStorage.valid).toBe(true);
        });

        it('should return false when token is invalid', () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).isTokenValid = false;
            expect(tokenStorage.valid).toBe(false);
        });
    });

    describe('expiresIn getter', () => {
        it('should return remaining time when expiresAt is in future', () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).expiresAt = Date.now() + 10000;
            expect(tokenStorage.expiresIn).toBe(10000);
        });

        it('should return 0 when expiresAt is in past', () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).expiresAt = Date.now() - 1000;
            expect(tokenStorage.expiresIn).toBe(0);
        });

        it('should return 0 when expiresAt is 0', () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).expiresAt = 0;
            expect(tokenStorage.expiresIn).toBe(0);
        });
    });

    describe('isTokenExpiringSoon', () => {
        it('should return true when token is expiring soon', () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);
            (tokenStorage as any).expiresAt = Date.now() + 5000; // Less than refreshThreshold
            expect((tokenStorage as any).isTokenExpiringSoon()).toBe(true);
        });

        it('should return false when token is not expiring soon', () => {
            const tokenStorage = new TokenStorage(mockAxios, 3600000, 10000);
            (tokenStorage as any).expiresAt = Date.now() + 20000; // More than refreshThreshold
            expect((tokenStorage as any).isTokenExpiringSoon()).toBe(false);
        });
    });

    describe('yoinkToken', () => {
        it('should successfully extract token', async () => {
            const tokenStorage = new TokenStorage(mockAxios);

            mockAxios.get.mockImplementation((url: string) => {
                if (url === '/') {
                    return Promise.resolve({
                        data: '<html><script crossorigin src="/assets/index.abc123.js"></script></html>',
                    });
                } else if (url === '/assets/index.abc123.js') {
                    return Promise.resolve({
                        data: 'some js code "eyJhbGc.extracted-token"',
                    });
                }
                return Promise.reject(new Error('Unexpected URL'));
            });

            const result = await (tokenStorage as any).yoinkToken();
            expect(result.success).toBe(true);
            expect(result.token).toBe('eyJhbGc.extracted-token');
        });

        it('should fail if script URL not found', async () => {
            const tokenStorage = new TokenStorage(mockAxios);

            mockAxios.get.mockResolvedValue({
                data: '<html><script></script></html>',
            });

            const result = await (tokenStorage as any).yoinkToken();
            expect(result.success).toBe(false);
            expect(result.errorMessage).toBe('Failed to find script asset URL');
        });

        it('should fail if token not found in JS', async () => {
            const tokenStorage = new TokenStorage(mockAxios);

            mockAxios.get.mockImplementation((url: string) => {
                if (url === '/') {
                    return Promise.resolve({
                        data: '<html><script crossorigin src="/assets/index.abc123.js"></script></html>',
                    });
                } else if (url === '/assets/index.abc123.js') {
                    return Promise.resolve({
                        data: 'some js code without token',
                    });
                }
                return Promise.reject(new Error('Unexpected URL'));
            });

            const result = await (tokenStorage as any).yoinkToken();
            expect(result.success).toBe(false);
            expect(result.errorMessage).toBe('Failed to find token in JS');
        });
    });

    describe('validateToken', () => {
        it('should return valid true on 200 status', async () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).token = 'test-token';

            mockAxios.request.mockResolvedValue({ status: 200 });

            const result = await (tokenStorage as any).validateToken();
            expect(result.valid).toBe(true);
        });

        it('should return valid false on non-200 status', async () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).token = 'test-token';

            mockAxios.request.mockResolvedValue({ status: 401 });

            const result = await (tokenStorage as any).validateToken();
            expect(result.valid).toBe(false);
        });

        it('should return valid false if no token', async () => {
            const tokenStorage = new TokenStorage(mockAxios);
            (tokenStorage as any).token = '';

            const result = await (tokenStorage as any).validateToken();
            expect(result.valid).toBe(false);
            expect(result.errorMessage).toBe('No token');
        });
    });
});