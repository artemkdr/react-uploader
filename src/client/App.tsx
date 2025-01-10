import { useCallback, useEffect, type ReactElement } from 'react';

import { ProgressBar } from './features/progress-bar';
import { Uploader } from './features/uploader';
import { type FileListItem } from './features/uploader/components/files-list';
import { uploadChunk } from './lib/api/upload-chunk';
import { useFiles } from './lib/hooks/useFiles';

export const App = (): ReactElement => {
    // useCallback is used to memoize the mapper function
    // otherwise it would be recreated on each render and it would cause the files to be reloaded infinitely
    const mapper = useCallback(
        (file: { name: string; size: number }) => ({ ...file, status: 'uploaded' }) as FileListItem,
        []
    );
    const { files, setFiles, loadFiles, sortFiles } = useFiles<FileListItem>(mapper);

    // load files on App mount
    useEffect(() => {
        loadFiles();
    }, [loadFiles]);

    // handle file upload:
    // - instatly add file to the list for optimistic update
    // - upload file
    // - reload files list on success
    const onUpload = async (file: File, onProgress?: (progress: number) => void) => {
        const newFileItem = {
            name: file.name,
            size: file.size,
            status: 'uploading',
        } as FileListItem;
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
            loadFiles();
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
