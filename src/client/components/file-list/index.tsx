import { type ForwardedRef, forwardRef, type ComponentType } from 'react';

export interface FileListItem {
    name: string;
    size: number;
}

interface FileListProps<T extends FileListItem = FileListItem> {
    files?: T[];
    title?: string;
    emptyListText?: string;
    fileItemComponent?: ComponentType<{ file: T }>;
    className?: string;
    headerClassName?: string;
    listClassName?: string;
    emptyListClassName?: string;
}

/**
 * File list component that displays a list of uploaded files.
 *
 * @component
 * @template T - Type of the file list item that extends FileListItem.
 * @param {FileListProps} props - The props for the FileList component.
 * @param {T[]} [props.files] - List of files to be displayed.
 * @param {string} [props.title='Uploaded files'] - Title for the file list.
 * @param {string} [props.emptyListText='No files uploaded yet'] - Text to display when the file list is empty.
 * @param {ComponentType<{ file: T }>} [props.fileListComponent] - Custom component for a file item.
 * @param {string} [props.className=''] - Additional classes for the FileList component container.
 * @param {string} [props.headerClassName=''] - Additional classes for the file list header.
 * @param {string} [props.listClassName=''] - Additional classes for the file list.
 * @param {string} [props.emptyListClassName=''] - Additional classes for the empty list text. *
 */

export const FileList = forwardRef(
    <T extends FileListItem = FileListItem>(
        {
            files,
            title = 'Uploaded files',
            emptyListText = 'No files uploaded yet',
            fileItemComponent: FileItemComponent,
            className = '',
            headerClassName = '',
            listClassName = '',
            emptyListClassName = '',
        }: FileListProps<T>,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const fileList = files?.map((file) => {
            if (FileItemComponent) {
                return <FileItemComponent key={file.name} file={file} />;
            } else {
                return <li key={file.name}>{`${file.name} - ${Math.round(file.size / 1024)}kb`}</li>;
            }
        });

        return (
            <div ref={ref} className={className}>
                <h2 className={headerClassName}>{title}</h2>
                {fileList !== undefined && fileList.length > 0 ? (
                    <ul className={listClassName}>{fileList}</ul>
                ) : (
                    <div className={emptyListClassName}>{emptyListText}</div>
                )}
            </div>
        );
    }
);
FileList.displayName = 'FileList';
