import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { type CustomFileItem } from '../../types/custom-file-item';

import { FileItemComponent } from './index';

import '@testing-library/jest-dom/vitest';

describe('FileItemComponent', () => {
    it('renders uploaded file with link', () => {
        const file: CustomFileItem = {
            name: 'example.txt',
            size: 1024,
            status: 'uploaded',
        };

        render(<FileItemComponent file={file} uploadsRoot="/images" />);

        const linkElement = screen.getByRole('link', { name: /example.txt/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/images/example.txt');
    });

    it('renders uploading file with status text', () => {
        const file: CustomFileItem = {
            name: 'example.txt',
            size: 1024,
            status: 'uploading',
        };

        render(<FileItemComponent file={file} uploadingText="...." />);

        const spanElement = screen.getByText(/example.txt/i);
        expect(spanElement).toBeInTheDocument();

        const statusElement = screen.getByText('....');
        expect(statusElement).toBeInTheDocument();
    });

    it('renders failed file with status text', () => {
        const file: CustomFileItem = {
            name: 'example.txt',
            size: 1024,
            status: 'failed',
        };

        render(<FileItemComponent file={file} failedText="Failed!" />);

        const spanElement = screen.getByText(/example.txt/i);
        expect(spanElement).toBeInTheDocument();

        const statusElement = screen.getByText('Failed!');
        expect(statusElement).toBeInTheDocument();
    });

    it('applies correct class for uploading status', () => {
        const file: CustomFileItem = {
            name: 'example.txt',
            size: 1024,
            status: 'uploading',
        };

        render(<FileItemComponent file={file} uploadingClassName="opacity-60 bg-green-400" />);

        const listItemElement = screen.getByRole('listitem');
        expect(listItemElement).toHaveClass('opacity-60 bg-green-400');
    });

    it('applies correct class for failed status', () => {
        const file: CustomFileItem = {
            name: 'example.txt',
            size: 1024,
            status: 'failed',
        };

        render(<FileItemComponent file={file} failedClassName="text-red-100" />);

        const listItemElement = screen.getByRole('listitem');
        expect(listItemElement).toHaveClass('text-red-100');
    });
});
