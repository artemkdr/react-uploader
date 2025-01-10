import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { type FileItem } from '../types/file-item';

import { FilesList } from './files-list';
import '@testing-library/jest-dom/vitest';

describe('FileList Component', () => {
    it('displays all the file names', () => {
        const files = [
            { name: 'file1.txt', size: 1024, status: 'uploaded' },
            { name: 'file2.txt', size: 2048, status: 'uploaded' },
        ] as FileItem[];
        render(<FilesList files={files} />);
        const filesList = screen.getByRole('list');
        for (const file of files) {
            expect(within(filesList).getByText(file.name)).toBeInTheDocument();
        }
    });

    it('displays uploading file with custom status text', () => {
        const files = [{ name: 'file3.txt', size: 0, status: 'uploading' }] as FileItem[];
        render(<FilesList files={files} statusUploadingText='uploading...' />);
        const filesList = screen.getByRole('list');        
        expect(within(filesList).getByText('uploading...')).toBeInTheDocument();
    });

    it('displays failed error with custom status text', () => {
        const files = [
            { name: 'file1.txt', size: 1024, status: 'uploaded' },
            { name: 'file2.txt', size: 2048, status: 'uploaded' },
            { name: 'file3.txt', size: 0, status: 'failed' },
        ] as FileItem[];
        render(<FilesList files={files} statusFailedText='Error' />);
        const filesList = screen.getByRole('list');
        expect(within(filesList).getByText('Error')).toBeInTheDocument();
    });

    it('displays a custom message when there are no files', () => {
        render(<FilesList files={[]} emptyListText='No uploaded files found!' />);
        expect(screen.getByText('No uploaded files found!')).toBeInTheDocument();
    });
});
