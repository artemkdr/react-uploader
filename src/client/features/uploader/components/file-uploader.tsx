import { type ReactElement, useState } from 'react';

interface FileUploaderProps {
    onUpload: (file: File, onProgress?: (progress: number) => void) => Promise<void>;
    title?: string;
    accept?: string;
    maxSize?: number;
    buttonLabel?: string;
    renderProgress?: (progress: number) => ReactElement;
}

export const FileUploader = ({
    title = 'Please select a file to upload',
    buttonLabel = 'Upload',
    accept = 'image/*,video/*',
    maxSize = 100 * 1024 * 1024,
    onUpload,
    renderProgress,
}: FileUploaderProps): ReactElement<FileUploaderProps> => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState(false);

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setFile(null);
        setProgress(0);
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
            setIsUploading(true);
            onUpload(file, (progress: number) => {
                setProgress(progress);
            })
                .catch(() => {
                    setError('An error occurred while uploading the file');
                })
                .finally(() => {
                    setIsUploading(false);
                });
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
                disabled={isUploading}
                aria-disabled={isUploading}
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
                disabled={isUploading || !file}
                aria-disabled={isUploading || !file}
                data-testid="upload-button"
            >
                {buttonLabel}
            </button>
            {renderProgress && <>{renderProgress(progress)}</>}
        </div>
    );
};
