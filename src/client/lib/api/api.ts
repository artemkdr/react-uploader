/**
 * Makes an API call to the specified endpoint with the given options.
 *
 * @template T - The expected type of the response data.
 * @param {string} endpoint - The API endpoint to call.
 * @param {object} [options={}] - The options to pass to the fetch request.
 * @returns {Promise<{ error: string | undefined; data: T | undefined }>} - A promise that resolves to an object containing either the response data or an error message.
 *
 * @example
 * ```
 * const result = await callApi<MyResponseType>('/api/data', { method: 'GET' });
 * if (result.error) {
 *     console.error('API call failed:', result.error);
 * } else {
 *     console.log('API call succeeded:', result.data);
 * }
 * ```
 */
export const callApi = async <T>(
    endpoint: string,
    options: object = {}
): Promise<{
    error: string | undefined;
    data: T | undefined;
}> => {
    endpoint = `${endpoint}`;

    const data: object = { ...options };
    try {
        const response = await fetch(endpoint, data);
        if (!response.ok) {
            const json = (await response.json()) as { error: string };
            throw new Error(json?.error);
        }
        return {
            error: undefined,
            data: (await response.json()) as T,
        };
    } catch (error: unknown) {
        return {
            error: (error as Error)?.message,
            data: undefined,
        };
    }
};

export default callApi;
