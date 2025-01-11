import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import { type FileListItem } from './components/files-list';

import { Uploader } from '.';

describe('Uploader component', () => {
    it('renders correctly the FilesList and the FileUploader together', () => {
        const files = [
            { name: 'file1.txt', size: 1024 },
            { name: 'file2.txt', size: 2048 },
            { name: 'file3.txt', size: 100 },
        ] as FileListItem[];
        render(<Uploader files={files} onUpload={vi.fn()} />);
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders correctly with empty files and custom message', () => {
        render(<Uploader onUpload={vi.fn()} emptyListText="No files uploaded yet!!!" />);
        expect(screen.getByText('No files uploaded yet!!!')).toBeInTheDocument();
    });
});
