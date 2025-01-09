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
