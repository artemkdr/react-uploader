import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { FileUploader } from './file-uploader';

import '@testing-library/jest-dom/vitest';

describe('FileUploader', () => {
    it('renders correctly with custom title and disabled upload button by default', () => {
        render(<FileUploader onUpload={vi.fn()} title="Select a file to upload" />);
        expect(screen.getByText('Select a file to upload')).toBeInTheDocument();
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeDisabled();
    });

    it('renders correctly with custom upload button label', () => {
        render(<FileUploader onUpload={vi.fn()} buttonLabel="Upload to the server" />);
        expect(screen.getByRole('button', { name: 'Upload to the server' })).toBeInTheDocument();
    });

    it('enables upload button when file is selected', () => {
        render(<FileUploader onUpload={vi.fn()} />);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        expect(screen.getByTestId('upload-button')).toBeEnabled();
    });

    it('calls onUpload with the selected file when upload button is clicked', async () => {
        const onUpload = vi.fn().mockImplementation(() => Promise.resolve());
        render(<FileUploader onUpload={onUpload} />);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        await act(() => fireEvent.click(screen.getByTestId('upload-button')));
        expect(onUpload).toHaveBeenCalledWith(file, expect.any(Function));
    });

    it('shows an error message when an unsupported file format by extension is selected', () => {
        render(<FileUploader onUpload={vi.fn()} accept=".jpg,.jpeg,.png" />);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(screen.getByTestId('error-message')).toHaveTextContent('File format not accepted');
        expect(screen.getByTestId('upload-button')).toBeDisabled();
    });

    it('shows an error message when an unsupported file format by type is selected', () => {
        render(<FileUploader onUpload={vi.fn()} accept="image/*,video/*" />);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(screen.getByTestId('error-message')).toHaveTextContent('File format not accepted');
        expect(screen.getByTestId('upload-button')).toBeDisabled();
    });

    it('shows an error message when the selected file exceeds the maximum size', () => {
        render(<FileUploader onUpload={vi.fn()} maxSize={1024 * 1024} />);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['a'.repeat(1024 * 1024 + 1)], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(screen.getByTestId('error-message')).toHaveTextContent('File size exceeds the limit of 1 MB');
        expect(screen.getByTestId('upload-button')).toBeDisabled();
    });
});
