import { type ReactElement } from 'react';

import { type CustomFileItem } from '../types/custom-file-item';

export const FileListComponent = ({ file }: { file: CustomFileItem }): ReactElement => {
    const uploadsUrl = '/uploads';
    const statusFailedText = 'Failed';
    const statusUploadingText = '...';

    const content =
        file.status === 'uploaded' ? (
            <a href={`${uploadsUrl}/${file.name}`} target="_blank" className="underline" rel="noreferrer">
                {file.name}
            </a>
        ) : (
            <span>{file.name}</span>
        );

    const renderFileStatus = (file: CustomFileItem, content: ReactElement): ReactElement => {
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

    return renderFileStatus(file, content);
};
