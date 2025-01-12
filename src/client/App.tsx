import { type ReactElement } from 'react';

import { FileList } from './components/file-list';
import { FileUploader } from './components/file-uploader';
import { ProgressBar } from './components/progress-bar';
import { FileListComponent } from './features/custom-files-list/components/file-list-component';
import { useFilesAPI } from './features/custom-files-list/hooks/useFiles';
import { type CustomFileItem } from './features/custom-files-list/types/custom-file-item';

export const App = (): ReactElement => {
    const uploadType: 'chunk' | 'single' = 'chunk';
    const { files, uploadFile } = useFilesAPI(uploadType);

    return (
        <main className="relative isolate h-dvh">
            <div className="flex justify-start">
                <div data-testid="uploader" className="max-w-[500px] min-w-[300px] flex flex-col">
                    <FileUploader
                        onUpload={uploadFile}
                        accept="image/*,video/*"
                        maxSize={(uploadType as 'chunk' | 'single') === 'chunk' ? 100 * 1024 * 1024 : 5 * 1024 * 1024}
                        renderProgress={(progress) => <ProgressBar progress={progress} />}
                    />
                    <FileList<CustomFileItem> files={files} fileListComponent={FileListComponent} />
                </div>
            </div>
        </main>
    );
};
