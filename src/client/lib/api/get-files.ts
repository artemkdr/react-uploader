import callApi from './api';

interface GetFilesResponse {
    files: { name: string; size: number }[];
}

interface FileItem {
    name: string;
    size: number;
}

/**
 * Gets list of files and returns the list of T objects,
 * where T extends { name: string; size: number }
 *
 * @template T - The expected type of the list element.
 * @param mapper - map the { name: string, size: number} object to T object adding additional properties f.e.
 * @returns list of T objects
 */
export const getFiles = async <T extends FileItem, U = T>(mapper?: (file: FileItem) => U): Promise<U[]> => {
    const response = await callApi<GetFilesResponse>('/api/files');
    if (response.error !== undefined) {
        throw new Error(response.error);
    }
    const files = response?.data?.files ?? [];
    return files.map(mapper ?? ((file) => file as unknown as U));
};
