import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { FileUploader } from './file-uploader';
import '@testing-library/jest-dom/vitest';

describe('FileUploader', () => {
    it('renders correctly with disabled upload button by default', () => {
        render(<FileUploader onUpload={vi.fn()} />);
        expect(screen.getByText('Please select a file to upload')).toBeInTheDocument();
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeDisabled();
    });

    it('enables upload button when file is selected', () => {
        render(<FileUploader onUpload={vi.fn()} />);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        expect(screen.getByTestId('upload-button')).toBeEnabled();
    });

    it('calls onUpload with the selected file when upload button is clicked', () => {
        const onUpload = vi.fn();
        render(<FileUploader onUpload={onUpload} />);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        fireEvent.click(screen.getByTestId('upload-button'));

        expect(onUpload).toHaveBeenCalledWith(file);
    });
});
