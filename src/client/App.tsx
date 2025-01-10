import { type ReactElement } from 'react';

import { ProgressBar } from './features/progress-bar';
import { Uploader } from './features/uploader';
import { type FileItem } from './features/uploader/types/file-item';
import { getFiles } from './lib/api/get-files';
import { uploadChunk } from './lib/api/upload-chunk';
import { useFiles } from './lib/hooks/useFiles';

export const App = (): ReactElement => {
    const mapper = (file: { name: string; size: number }) => ({ ...file, status: 'uploaded' }) as FileItem;
    const { files, setFiles, sortFiles } = useFiles<FileItem>(getFiles, mapper);

    const onUpload = async (file: File, onProgress?: (progress: number) => void) => {
        const newFileItem = {
            name: file.name,
            size: file.size,
            status: 'uploading',
        } as FileItem;
        const tempFiles = [...files];
        const existingFileIndex = tempFiles.findIndex((file) => file.name === newFileItem.name);
        if (existingFileIndex >= 0) {
            tempFiles[existingFileIndex] = newFileItem;
        } else {
            tempFiles.push(newFileItem);
            sortFiles(tempFiles);
        }
        setFiles(tempFiles);

        let uploaded = false;
        try {
            await uploadChunk(file, onProgress);
            uploaded = true;
        } catch {
            setFiles((prevFiles) =>
                prevFiles?.map((fileItem) =>
                    fileItem.name === newFileItem.name ? { ...fileItem, status: 'failed' } : fileItem
                )
            );
        }
        if (uploaded) {
            try {
                const files = await getFiles<FileItem>(mapper);
                setFiles(sortFiles(files));
            } catch {
                console.error('Failed to fetch files');
            }
        }
    };

    return (
        <main className="relative isolate h-dvh">
            <div className="flex justify-start">
                <Uploader
                    files={files}
                    onUpload={onUpload}
                    renderProgress={(progress) => <ProgressBar progress={progress} />}
                />
            </div>
        </main>
    );
};
