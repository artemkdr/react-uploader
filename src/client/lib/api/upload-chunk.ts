import callApi from './api';

interface UploadChunksResponse {
    message: string;
}

/**
 * Uploads a file in chunks to the server.
 *
 * @param file - The file to be uploaded.
 * @param onProgress - Optional callback function to track the upload progress. It receives a number between 0 and 100 representing the percentage of the upload completed.
 * @returns A promise that resolves to a message string from the server upon successful upload.
 * @throws An error if the upload fails.
 */
export const uploadChunk = async (file: File, onProgress?: (progress: number) => void) => {
    const CHUNK_SIZE = 1024 * 1024;
    const fileSize = file.size;
    const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
    let offset = 0;
    let chunkIndex = 0;
    let message: string | undefined = undefined;

    while (offset < fileSize) {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);
        const formData = new FormData();
        formData.append('file', chunk, file.name);
        formData.append('currentChunkIndex', chunkIndex.toString());
        formData.append('totalChunks', totalChunks.toString());
        const response = await callApi<UploadChunksResponse>('/api/upload-chunk', { method: 'POST', body: formData });
        if (response.error !== undefined) {
            throw new Error(response.error);
        }
        message = response?.data?.message;
        offset += CHUNK_SIZE;
        chunkIndex++;
        onProgress?.(Math.max(0, Math.min((offset / fileSize) * 100, 100)));
    }

    return message;
};
