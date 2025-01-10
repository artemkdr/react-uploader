import { useState, useCallback, useEffect } from 'react';

export const useFiles = <T extends { name: string; size: number }, U extends { name: string } = T>(
    fetchFiles: (mapper?: (file: { name: string; size: number }) => U) => Promise<U[]>,
    mapper?: (file: { name: string; size: number }) => U
) => {
    const [files, setFiles] = useState<U[]>([]);

    const sortFiles = useCallback(<B extends { name: string }>(files: B[]): B[] => {
        return files.sort((a, b) => (a.name?.toLowerCase() <= b.name?.toLowerCase() ? -1 : 1));
    }, []);

    useEffect(() => {
        fetchFiles(mapper)
            .then((items) => setFiles(sortFiles<U>(items)))
            .catch(() => {
                console.error('Failed to fetch files');
            });
    }, [fetchFiles, sortFiles, mapper]);

    return { files, setFiles, sortFiles };
};
