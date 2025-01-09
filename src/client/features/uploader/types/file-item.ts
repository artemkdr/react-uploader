export interface FileItem {
    name: string;
    size: number;
    status: 'uploaded' | 'uploading' | 'failed';
}
