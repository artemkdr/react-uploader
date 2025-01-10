import { type ReactElement } from 'react';

import { FileUploader } from './components/file-uploader';
import { FilesList } from './components/files-list';
import { type FileItem } from './types/file-item';

interface UploaderProps {
    files?: FileItem[];
    onUpload: (file: File) => void;

    // file uploader props
    uploadTitle?: string;
    uploadButtonLabel?: string;
    maxSize?: number;
    accept?: string;

    // files list props
    listTitle?: string;
    emptyListText?: string;
    statusUploadingText?: string;
    statusFailedText?: string;
}

export const Uploader = (props: UploaderProps): ReactElement<UploaderProps> => {
    return (
        <div data-testid="uploader">
            <FileUploader
                onUpload={props.onUpload}
                title={props.uploadTitle}
                buttonLabel={props.uploadButtonLabel}
                maxSize={props.maxSize}
                accept={props.accept}
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
