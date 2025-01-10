import { type ReactElement } from 'react';

import { ProgressBar } from './features/progress-bar';
import { Uploader } from './features/uploader';
import { useFilesAPI } from './lib/hooks/useFiles';

export const App = (): ReactElement => {
    const uploadType: 'chunk' | 'single' = 'chunk';
    const { files, uploadFile } = useFilesAPI(uploadType);

    return (
        <main className="relative isolate h-dvh">
            <div className="flex justify-start">
                <Uploader
                    files={files}
                    onUpload={uploadFile}
                    maxSize={(uploadType as 'chunk' | 'single') === 'chunk' ? 100 * 1024 * 1024 : 5 * 1024 * 1024}
                    renderProgress={(progress) => <ProgressBar progress={progress} />}
                />
            </div>
        </main>
    );
};
