import { type ReactElement } from 'react';

import { renderFileItem } from './features/custom-files-list/components/render-file-item';
import { useFilesAPI } from './features/custom-files-list/hooks/useFiles';
import { type CustomFileItem } from './features/custom-files-list/types/custom-file-item';
import { ProgressBar } from './features/progress-bar';
import { Uploader } from './features/uploader';
import { type FileListItem } from './features/uploader/components/files-list';

export const App = (): ReactElement => {
    const uploadType: 'chunk' | 'single' = 'chunk';
    const { files, uploadFile } = useFilesAPI(uploadType);

    return (
        <main className="relative isolate h-dvh">
            <div className="flex justify-start">
                <Uploader<CustomFileItem>
                    files={files}
                    onUpload={uploadFile}
                    maxSize={(uploadType as 'chunk' | 'single') === 'chunk' ? 100 * 1024 * 1024 : 5 * 1024 * 1024}
                    renderProgress={(progress) => <ProgressBar progress={progress} />}
                    renderFileItem={renderFileItem as (file: FileListItem) => ReactElement}
                />
            </div>
        </main>
    );
};
