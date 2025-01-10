import { useState, useCallback, useEffect } from 'react';

import { type FileListItem } from '../../features/uploader/components/files-list';
import { getFiles } from '../api/get-files';
import { uploadChunk } from '../api/upload-chunk';
import { uploadSingleFile } from '../api/upload-single-file';

/**
 * Custom hook to manage and sort files as a list of FileListItem objects.
 *
 * @returns {object} An object containing:
 * - `files`: The list of FileListItem objects.
 * - `setFiles`: sets the list of files.
 * - `sortFiles`: sorts the files by name.
 * - `loadFiles`: loads files from the server API, sorts them and sets files.
 */
export const useFilesAPI = (uploadType?: 'single' | 'chunk') => {
    const [files, setFiles] = useState<FileListItem[]>([]);

    const sortFiles = useCallback(<B extends { name: string }>(files: B[]): B[] => {
        return files.sort((a, b) => (a.name?.toLowerCase() <= b.name?.toLowerCase() ? -1 : 1));
    }, []);

    const loadFiles = useCallback(() => {
        getFiles<FileListItem>((file) => ({ ...file, status: 'uploaded' }))
            .then((files) => {
                setFiles(sortFiles(files));
            })
            .catch(() => {
                console.error('Failed to fetch files');
            });
    }, [sortFiles]);

    useEffect(() => {
        loadFiles();
    }, [loadFiles]);

    // handle file upload:
    // - instatly add file to the list for optimistic update
    // - upload file
    // - reload files list on success
    const uploadFile = async (file: File, onProgress?: (progress: number) => void) => {
        const newFileItem = {
            name: file.name,
            size: file.size,
            status: 'uploading',
        } as FileListItem;
        setFiles((prevFiles) => {
            const tempFiles = [...prevFiles];
            const existingFileIndex = tempFiles.findIndex((f) => f.name === newFileItem.name);
            if (existingFileIndex >= 0) {
                tempFiles[existingFileIndex] = newFileItem;
            } else {
                tempFiles.push(newFileItem);
                sortFiles(tempFiles);
            }
            return tempFiles;
        });

        let uploaded = false;
        try {
            if (uploadType === 'single') {
                await uploadSingleFile(file);
            } else {
                await uploadChunk(file, onProgress);
            }
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

    return { files, uploadFile };
};