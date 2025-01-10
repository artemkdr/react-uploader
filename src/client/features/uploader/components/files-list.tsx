import { type ReactElement } from 'react';

export interface FileListItem {
    name: string;
    size: number;
    status: 'uploaded' | 'uploading' | 'failed';
}

interface FilesListProps {
    files?: FileListItem[];
    uploadsUrl?: string;
    title?: string;
    emptyListText?: string;
    statusUploadingText?: string;
    statusFailedText?: string;
}

export const FilesList = ({
    files,
    uploadsUrl = '/uploads',
    title = 'Uploaded files',
    emptyListText = 'No files uploaded yet',
    statusFailedText = 'Failed',
    statusUploadingText = '...',
}: FilesListProps): ReactElement<FilesListProps> => {
    const renderFileStatus = (file: FileListItem, content: ReactElement) => {
        let statusClassName = '';
        switch (file.status) {
            case 'uploading':
                statusClassName = 'opacity-70 bg-green-500';
                break;
            case 'failed':
                statusClassName = 'text-red-600';
                break;
        }
        return (
            <li key={file.name} className={`whitespace-nowrap flex justify-between ${statusClassName}`}>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">{content}</div>
                <div className="text-right ml-2">
                    {file.status === 'uploaded'
                        ? `${Math.round(file.size / 1024)} kb`
                        : file.status === 'uploading'
                          ? statusUploadingText
                          : statusFailedText}
                </div>
            </li>
        );
    };

    const filesList = files?.map((file) => {
        switch (file.status) {
            case 'uploaded':
                return renderFileStatus(
                    file,
                    <a href={`${uploadsUrl}/${file.name}`} target="_blank" className="underline" rel="noreferrer">
                        {file.name}
                    </a>
                );
            default:
                return renderFileStatus(file, <span>{file.name}</span>);
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
