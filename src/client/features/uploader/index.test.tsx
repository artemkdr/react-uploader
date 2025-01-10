import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import { type FileItem } from './types/file-item';

import { Uploader } from '.';

describe('Uploader component', () => {
    it('renders correctly the FilesList and the FileUploader together', () => {
        const files = [
            { name: 'file1.txt', size: 1024, status: 'uploaded' },
            { name: 'file2.txt', size: 2048, status: 'uploaded' },
            { name: 'file3.txt', size: 100, status: 'uploaded' },
        ] as FileItem[];
        render(<Uploader files={files} onUpload={vi.fn()} />);
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders correctly with custom titles and texts', () => {
        const files = [
            { name: 'file1.txt', size: 1024, status: 'uploaded' },
            { name: 'file2.txt', size: 2048, status: 'uploaded' },
            { name: 'file3.txt', size: 100, status: 'failed' },
            { name: 'file4.txt', size: 100, status: 'uploading' },
        ] as FileItem[];
        render(
            <Uploader
                files={files}
                onUpload={vi.fn()}
                uploadTitle="Upload a file to the server"
                uploadButtonLabel="Do it!"
                listTitle="Uploaded files list:"
                statusFailedText="Failed to upload"
                statusUploadingText="processing..."
            />
        );
        expect(screen.getByRole('button', { name: 'Do it!' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Upload a file to the server' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Uploaded files list:' })).toBeInTheDocument();

        const filesList = screen.getByRole('list');
        expect(within(filesList).getByText('Failed to upload')).toBeInTheDocument();
        expect(within(filesList).getByText('processing...')).toBeInTheDocument();
    });

    it('renders correctly with empty files and custom message', () => {
        render(<Uploader onUpload={vi.fn()} emptyListText="No files uploaded yet!!!" />);
        expect(screen.getByText('No files uploaded yet!!!')).toBeInTheDocument();
    });
});
