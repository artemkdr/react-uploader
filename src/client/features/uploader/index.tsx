import { type ReactElement } from 'react';

import { FileUploader } from './components/file-uploader';
import { FilesList } from './components/files-list';
import { type FileItem } from './types/file-item';

interface UploaderProps {
    files?: FileItem[];
    onUpload: (file: File, onProgress?: (progress: number) => void) => Promise<void>;

    // file uploader props
    uploadTitle?: string;
    uploadButtonLabel?: string;
    maxSize?: number;
    accept?: string;
    renderProgress?: (progress: number) => ReactElement;

    // files list props
    listTitle?: string;
    emptyListText?: string;
    statusUploadingText?: string;
    statusFailedText?: string;
}

export const Uploader = (props: UploaderProps): ReactElement<UploaderProps> => {
    return (
        <div data-testid="uploader" className="max-w-[500px] min-w-[300px] flex flex-col">
            <FileUploader
                onUpload={props.onUpload}
                title={props.uploadTitle}
                buttonLabel={props.uploadButtonLabel}
                maxSize={props.maxSize}
                accept={props.accept}
                renderProgress={props.renderProgress}
            />
            <FilesList
                files={props.files}
                title={props.listTitle}
                emptyListText={props.emptyListText}
                statusUploadingText={props.statusUploadingText}
                statusFailedText={props.statusFailedText}
            />
        </div>
    );
};
