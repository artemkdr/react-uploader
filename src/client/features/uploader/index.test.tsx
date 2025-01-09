import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import { type FileItem } from './types/file-item';

import { Uploader } from '.';

describe('Uploader component', () => {
    it('renders correctly the FilesList and the FileUploader together', () => {
        const files = [
            { name: 'file1.txt', size: 1024, status: 'uploaded' },
            { name: 'file2.txt', size: 2048, status: 'uploaded' },
            { name: 'file3.txt', size: 0, status: 'uploaded' },
        ] as FileItem[];
        render(<Uploader files={files} onUpload={vi.fn()} />);
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
    });
});
