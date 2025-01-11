import { type ReactElement } from 'react';

export interface FileListItem {
    name: string;
    size: number;
}

interface FilesListProps<T extends FileListItem = FileListItem> {
    files?: T[];
    title?: string;
    emptyListText?: string;
    renderFileItem?: (file: T) => ReactElement;
}

export const FilesList = <T extends FileListItem = FileListItem>({
    files,
    title = 'Uploaded files',
    emptyListText = 'No files uploaded yet',
    renderFileItem,
}: FilesListProps<T>): ReactElement => {
    const filesList = files?.map((file) => {
        if (renderFileItem) {
            return renderFileItem(file);
        } else {
            return <li key={file.name}>{`${file.name} - ${Math.round(file.size / 1024)}kb`}</li>;
        }
    });

    return (
        <div className="p-2 flex flex-col space-y-2 w-full">
            <h2 className="font-bold mt-4">{title}</h2>
            {filesList !== undefined && filesList.length > 0 ? (
                <ul className="ml-4">{filesList}</ul>
            ) : (
                <div>{emptyListText}</div>
            )}
        </div>
    );
};
