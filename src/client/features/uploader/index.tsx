import { type ReactElement } from 'react';

import { FileUploader } from './components/file-uploader';
import { type FileListItem, FilesList } from './components/files-list';

/**
 * Props for the Uploader component.
 *
 * @interface UploaderProps
 * @template T - Type of the file list item that extends FileListItem.
 * @property {(file: File, onProgress?: (progress: number) => void) => Promise<void>} onUpload - Handler for file upload.
 * @property {string} [uploadTitle] - Title for the file uploader section.
 * @property {string} [uploadButtonLabel] - Label for the upload button.
 * @property {number} [maxSize] - Maximum file size allowed for upload.
 * @property {string} [accept] - Accepted file types for upload: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept.
 * @property {(progress: number) => ReactElement} [renderProgress] - Function to render upload progress.
 * @property {T[]} [files] - List of files to be displayed.
 * @property {string} [listTitle] - Title for the files list section.
 * @property {string} [emptyListText] - Text to display when the files list is empty.
 * @property {(file: T) => ReactElement} [renderFileItem] - Function to render a file item.
 */
export interface UploaderProps<T extends FileListItem = FileListItem> {
    // file uploader props
    onUpload: (file: File, onProgress?: (progress: number) => void) => Promise<void>;
    uploadTitle?: string;
    uploadButtonLabel?: string;
    maxSize?: number;
    accept?: string;
    renderProgress?: (progress: number) => ReactElement;

    // files list props
    files?: T[];
    listTitle?: string;
    emptyListText?: string;
    renderFileItem?: (file: T) => ReactElement;
}

/**
 * Uploader component that handles file uploads and displays a list of uploaded files.
 *
 * @component
 * @param {UploaderProps} props - The props for the Uploader component.
 * @returns {ReactElement<UploaderProps>} The Uploader component.
 */
export const Uploader = <T extends FileListItem = FileListItem>(props: UploaderProps): ReactElement<UploaderProps> => {
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
            <FilesList<T>
                files={props.files as T[] | undefined}
                title={props.listTitle}
                emptyListText={props.emptyListText}
                renderFileItem={props.renderFileItem}
            />
        </div>
    );
};
