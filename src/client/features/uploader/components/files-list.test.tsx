import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { type FileListItem, FilesList } from './files-list';
import '@testing-library/jest-dom/vitest';

describe('FileList Component', () => {
    it('displays all the file names', () => {
        const files = [
            { name: 'file1.txt', size: 1024 },
            { name: 'file2.txt', size: 2048 },
        ] as FileListItem[];
        render(<FilesList files={files} />);
        const filesList = screen.getByRole('list');
        for (const file of files) {
            expect(within(filesList).getByText(file.name, { exact: false })).toBeInTheDocument();
        }
    });

    it('displays a custom message when there are no files', () => {
        render(<FilesList files={[]} emptyListText="No uploaded files found!" />);
        expect(screen.getByText('No uploaded files found!')).toBeInTheDocument();
    });

    it('renders the default title', () => {
        render(<FilesList files={[]} />);
        expect(screen.getByText('Uploaded files')).toBeInTheDocument();
    });

    it('renders a custom title', () => {
        render(<FilesList files={[]} title="My Files" />);
        expect(screen.getByText('My Files')).toBeInTheDocument();
    });

    it('renders custom file items', () => {
        const files = [
            { name: 'file1.txt', size: 1024 },
            { name: 'file2.txt', size: 2048 },
        ] as FileListItem[];
        const renderFileItem = (file: FileListItem) => <li key={file.name}>{`${file.name} (${file.size} bytes)`}</li>;
        render(<FilesList files={files} renderFileItem={renderFileItem} />);
        const filesList = screen.getByRole('list');
        for (const file of files) {
            expect(within(filesList).getByText(`${file.name} (${file.size} bytes)`)).toBeInTheDocument();
        }
    });
});
