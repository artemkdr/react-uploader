import callApi from './api';

interface GetFilesResponse {
    files: { name: string; size: number }[];
}
export const getFiles = async <T extends { name: string; size: number }, U = T>(
    mapper?: (file: { name: string; size: number }) => U
): Promise<U[]> => {
    const response = await callApi<GetFilesResponse>('/api/files');
    if (response.error !== undefined) {
        throw new Error(response.error);
    }
    const files = response?.data?.files ?? [];
    return files.map(mapper ?? ((file) => file as unknown as U));
};
