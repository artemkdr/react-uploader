import { type ReactElement, useState } from 'react';

interface FileUploaderProps {
    onUpload: (file: File) => void;
    title?: string;
    accept?: string;
    maxSize?: number;
    buttonLabel?: string;
}

export const FileUploader = ({
    title = 'Please select a file to upload',
    buttonLabel = 'Upload',
    accept = 'image/*,video/*',
    maxSize = 50 * 1024 * 1024,
    onUpload,
}: FileUploaderProps): ReactElement<FileUploaderProps> => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        // Check if the file format is accepted
        const acceptedFormats = accept.split(',').map((format) => format.trim());
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const fileType = file.type;

        const isAcceptedFormat = acceptedFormats.some((format) => {
            if (format.startsWith('.')) {
                return fileExtension === format.slice(1).toLowerCase();
            } else if (format.includes('/*')) {
                return fileType.startsWith(format.split('/')[0]);
            } else {
                return fileType === format;
            }
        });

        if (!isAcceptedFormat) {
            setError('File format not accepted');
            return;
        }

        // check if the file size is within the limit
        if (file.size > maxSize) {
            setError(`File size exceeds the limit of ${maxSize / (1024 * 1024)} MB`);
            return;
        }
        setFile(file);
    };

    const fileUploadHandler = () => {
        if (file !== null) {
            onUpload(file);
        }
    };

    return (
        <div className="p-2 flex flex-col items-start space-y-4">
            <h2 className="font-bold" id="file-uploader-heading">
                {title}
            </h2>
            <input
                type="file"
                accept={accept}
                onChange={fileChangeHandler}
                aria-labelledby="file-uploader-heading"
                data-testid="file-input"
            />
            {error !== null && (
                <div className="text-red-500" data-testid="error-message">
                    {error}
                </div>
            )}
            <button
                className="border-black border pl-4 pr-4 pt-1 pb-1"
                onClick={fileUploadHandler}
                disabled={!file}
                aria-disabled={!file}
                data-testid="upload-button"
            >
                {buttonLabel}
            </button>
        </div>
    );
};
