import { useState, useCallback } from 'react';

import { getFiles } from '../api/get-files';

interface FileItem {
    name: string;
    size: number;
}

/**
 * Custom hook to manage and sort files.
 *
 * @template T - The type of the file item.
 * @param {function} mapper - A function to map a file object { name: string, size: number } to the desired type T.
 *
 *
 * @returns {object} An object containing:
 * - `files`: The list of files of type T.
 * - `setFiles`: sets the list of files.
 * - `sortFiles`: sorts the files by name.
 * - `loadFiles`: loads files from the server API, sorts them and sets files.
 */
export const useFiles = <T extends FileItem>(mapper: (file: FileItem) => T) => {
    const [files, setFiles] = useState<T[]>([]);

    const sortFiles = useCallback(<B extends { name: string }>(files: B[]): B[] => {
        return files.sort((a, b) => (a.name?.toLowerCase() <= b.name?.toLowerCase() ? -1 : 1));
    }, []);

    const loadFiles = useCallback(() => {
        getFiles<T>(mapper)
            .then((files) => {
                setFiles(sortFiles(files));
            })
            .catch(() => {
                console.error('Failed to fetch files');
            });
    }, [mapper, sortFiles]);

    return { files, setFiles, sortFiles, loadFiles };
};
