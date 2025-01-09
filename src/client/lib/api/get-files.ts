import callApi from './api';

interface GetFilesResponse {
    files: { name: string; size: number }[];
}

export const getFilesList = async () => {
    const response = await callApi<GetFilesResponse>('/api/files');
    if (response.error !== undefined) {
        throw new Error(response.error);
    }
    return response?.data?.files;
};
