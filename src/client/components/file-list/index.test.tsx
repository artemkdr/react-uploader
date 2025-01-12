import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { type FileListItem, FileList } from '.';
import '@testing-library/jest-dom/vitest';

describe('FileList Component', () => {
    it('displays all the file names', () => {
        const files = [
            { name: 'file1.txt', size: 1024 },
            { name: 'file2.txt', size: 2048 },
        ] as FileListItem[];
        render(<FileList files={files} />);
        const filesList = screen.getByRole('list');
        for (const file of files) {
            expect(within(filesList).getByText(file.name, { exact: false })).toBeInTheDocument();
        }
    });

    it('displays a custom message when there are no files', () => {
        render(<FileList files={[]} emptyListText="No uploaded files found!" />);
        expect(screen.getByText('No uploaded files found!')).toBeInTheDocument();
    });

    it('renders the default title', () => {
        render(<FileList files={[]} />);
        expect(screen.getByText('Uploaded files')).toBeInTheDocument();
    });

    it('renders a custom title', () => {
        render(<FileList files={[]} title="My Files" />);
        expect(screen.getByText('My Files')).toBeInTheDocument();
    });

    it('renders custom file items', () => {
        const files = [
            { name: 'file1.txt', size: 1024 },
            { name: 'file2.txt', size: 2048 },
        ] as FileListItem[];
        const CustomFileItem = ({ file }: { file: FileListItem }) => (
            <li key={file.name}>{`${file.name} (${file.size} bytes)`}</li>
        );
        render(<FileList files={files} fileListComponent={CustomFileItem} />);
        const filesList = screen.getByRole('list');
        for (const file of files) {
            expect(within(filesList).getByText(`${file.name} (${file.size} bytes)`)).toBeInTheDocument();
        }
    });
});
