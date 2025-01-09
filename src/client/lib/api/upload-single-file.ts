import callApi from './api';

interface UploadSingleFileResponse {
    message: string;
}

export const uploadSingleFile = async (data: File) => {
    const formData = new FormData();
    formData.append('file', data);
    const response = await callApi<UploadSingleFileResponse>('/api/upload-single', { method: 'POST', body: formData });
    if (response.error !== undefined) {
        throw new Error(response.error);
    }
    return response?.data?.message;
};
