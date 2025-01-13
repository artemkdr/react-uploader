import { forwardRef, type ReactElement } from 'react';

import { type CustomFileItem } from '../../types/custom-file-item';

interface FileItemComponentProps {
    file: CustomFileItem;
    uploadsRoot?: string;
    failedText?: string;
    failedClassName?: string;
    uploadingText?: string;
    uploadingClassName?: string;
}

export const FileItemComponent = forwardRef<HTMLLIElement | null, FileItemComponentProps>(
    (
        {
            file,
            uploadsRoot = '/uploads',
            failedText = 'Failed',
            failedClassName = 'text-red-600',
            uploadingText = '...',
            uploadingClassName = 'opacity-70 bg-green-500',
        }: FileItemComponentProps,
        ref
    ) => {
        const content =
            file.status === 'uploaded' ? (
                <a href={`${uploadsRoot}/${file.name}`} target="_blank" className="underline" rel="noreferrer">
                    {file.name}
                </a>
            ) : (
                <span>{file.name}</span>
            );

        const renderFileStatus = (file: CustomFileItem, content: ReactElement): ReactElement => {
            let statusClassName = '';
            switch (file.status) {
                case 'uploading':
                    statusClassName = uploadingClassName;
                    break;
                case 'failed':
                    statusClassName = failedClassName;
                    break;
            }
            return (
                <li ref={ref} key={file.name} className={`whitespace-nowrap flex justify-between ${statusClassName}`}>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">{content}</div>
                    <div className="text-right ml-2">
                        {file.status === 'uploaded'
                            ? `${Math.round(file.size / 1024)} kb`
                            : file.status === 'uploading'
                              ? uploadingText
                              : failedText}
                    </div>
                </li>
            );
        };

        return renderFileStatus(file, content);
    }
);
FileItemComponent.displayName = 'FileItemComponent';
