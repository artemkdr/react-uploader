import { type ReactElement } from 'react';

import { FileUploader } from './components/file-uploader';
import { FilesList } from './components/files-list';
import { type FileItem } from './types/file-item';

interface UploaderProps {
    files?: FileItem[];
    onUpload: (file: File) => void;
}

export const Uploader = (props: UploaderProps): ReactElement<UploaderProps> => {
    return (
        <div data-testid="uploader">
            <FileUploader onUpload={props.onUpload} />
            <FilesList files={props.files} />
        </div>
    );
};
