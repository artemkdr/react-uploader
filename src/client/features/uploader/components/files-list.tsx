import { type ReactElement } from 'react';

import { type FileItem } from '../types/file-item';

interface FilesListProps {
    files?: FileItem[];
    uploadsUrl?: string;
}

export const FilesList = (props: FilesListProps): ReactElement<FilesListProps> => {
    const { files, uploadsUrl = '/uploads' } = props; // Set default value here

    const renderFileStatus = (file: FileItem, content: ReactElement) => (
        <li key={file.name}>
            <div className="inline">{content}</div>
            <div className="inline ml-2">
                {file.status === 'uploaded'
                    ? `${Math.round(file.size / 1024)} kb`
                    : file.status === 'uploading'
                      ? '...'
                      : 'Failed'}
            </div>
        </li>
    );

    const filesList = files?.map((file) => {
        switch (file.status) {
            case 'uploaded':
                return renderFileStatus(
                    file,
                    <a href={`${uploadsUrl}/${file.name}`} target="_blank" className="underline" rel="noreferrer">
                        {file.name}
                    </a>
                );
            case 'uploading':
                return renderFileStatus(file, <span className="opacity-50">{file.name}</span>);
            case 'failed':
                return renderFileStatus(file, <span className="text-red-600">{file.name}</span>);
            default:
                return null;
        }
    });

    return (
        <div className="p-2 flex flex-col items-start space-y-2">
            <h2 className="font-bold mt-4">Uploaded files</h2>
            {filesList !== undefined && filesList.length > 0 ? (
                <ul className="ml-4">{filesList}</ul>
            ) : (
                <div>No files uploaded yet</div>
            )}
        </div>
    );
};
