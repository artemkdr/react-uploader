import { useEffect, useState, type ReactElement } from 'react';

import { ProgressBar } from './features/progress-bar';
import { Uploader } from './features/uploader';
import { type FileItem } from './features/uploader/types/file-item';
import { getFilesList } from './lib/api/get-files';
import { uploadChunk } from './lib/api/upload-chunk';

export const App = (): ReactElement => {
    const [files, setFiles] = useState<FileItem[]>([]);

    const fetchFiles = async () => {
        try {
            const files = await getFilesList();
            const fileItems: FileItem[] =
                files?.map(
                    (file) =>
                        ({
                            name: file.name,
                            size: file.size,
                            status: 'uploaded',
                        }) as FileItem
                ) ?? ([] as FileItem[]);
            setFiles(fileItems);
        } catch {
            setFiles([] as FileItem[]);
        }
    };

    useEffect(() => {
        // using promise.catch to avoid eslint typescript error for @typescript-eslint/no-floating-promises
        fetchFiles().catch(() => {});
    }, []);

    const onUpload = async (file: File, onProgress?: (progress: number) => void) => {
        // build optimistic files list with a newly uploaded file
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
            tempFiles.sort((a, b) => (a.name?.toLowerCase() <= b.name?.toLowerCase() ? -1 : 1));
        }
        setFiles(tempFiles);

        let uploaded = false;
        try {
            // await uploadSingleFile(file);
            await uploadChunk(file, onProgress);
            uploaded = true;
        } catch {
            setFiles((prevFiles) =>
                prevFiles.map((fileItem) =>
                    fileItem.name === newFileItem.name ? { ...fileItem, status: 'failed' } : fileItem
                )
            );
        }
        // fetch files only on successful upload
        if (uploaded) {
            await fetchFiles();
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
