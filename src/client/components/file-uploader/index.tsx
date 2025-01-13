import { forwardRef, type ReactElement, useState } from 'react';

interface FileUploaderProps {
    onUpload: (file: File, onProgress?: (progress: number) => void) => Promise<void>;
    title?: string;
    accept?: string;
    maxSize?: number;
    buttonLabel?: string;
    renderProgress?: (progress: number) => ReactElement;
    className?: string;
    headerClassName?: string;
    buttonClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
}

/**
 * FileUploader component that handles file uploads.
 *
 * @component
 * @param {object} props - The props for the FileUploader component.
 * @param {(file: File, onProgress?: (progress: number) => void) => Promise<void>} props.onUpload - Handler for file upload.
 * @param {string} [props.title="Please select a file to upload"] - Title for the file uploader section.
 * @param {string} [props.accept="image/*,video/*"] - Accepted file types for upload: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept.
 * @param {number} [props.maxSize=100 * 1024 * 1024] - Maximum file size allowed for upload.
 * @param {string} [props.buttonLabel="Upload"] - Label for the upload button.
 * @param {(progress: number) => ReactElement} [props.renderProgress] - Function to render upload progress.
 * @param {string} [props.className=""] - Additional classes for the FileUploader component container.
 * @param {string} [props.headerClassName=""] - Additional classes for the title.
 * @param {string} [props.buttonClassName=""] - Additional classes for the upload button.
 * @param {string} [props.inputClassName=""] - Additional classes for the file input.
 * @param {string} [props.errorClassName=""] - Additional classes for the error message.
 */
export const FileUploader = forwardRef<HTMLDivElement | null, FileUploaderProps>(
    (
        {
            title = 'Please select a file to upload',
            buttonLabel = 'Upload',
            accept = 'image/*,video/*',
            maxSize = 100 * 1024 * 1024,
            onUpload,
            renderProgress,
            className = '',
            headerClassName = '',
            buttonClassName = '',
            inputClassName = '',
            errorClassName = '',
        }: FileUploaderProps,
        ref
    ) => {
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
            <div ref={ref} className={className}>
                <h2 className={headerClassName} id="file-uploader-heading">
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
                    className={`${inputClassName}`}
                />
                {error !== null && (
                    <div className={errorClassName} data-testid="error-message">
                        {error}
                    </div>
                )}
                <button
                    className={buttonClassName}
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
    }
);
FileUploader.displayName = 'FileUploader';
