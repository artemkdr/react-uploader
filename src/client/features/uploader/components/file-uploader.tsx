import { type ReactElement, useState } from 'react';

interface FileUploaderProps {
    onUpload: (file: File) => void;
    title?: string;
    buttonLabel?: string;
}

export const FileUploader = ({
    title = 'Please select a file to upload',
    buttonLabel = 'Upload',
    onUpload,
}: FileUploaderProps): ReactElement<FileUploaderProps> => {
    const [file, setFile] = useState<File | null>(null);
    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
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
                onChange={fileChangeHandler}
                aria-labelledby="file-uploader-heading"
                data-testid="file-input"
            />
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
