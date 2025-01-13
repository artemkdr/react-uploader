import { type ComponentType, type ReactElement } from 'react';

import { FileList, type FileListItem } from './components/file-list';
import { FileUploader } from './components/file-uploader';
import { ProgressBar } from './components/progress-bar';
import { FileItemComponent } from './features/custom-files-list/components/file-item-component';
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
                        className="p-2 flex flex-col items-start space-y-4"
                        errorClassName="text-red-500"
                        buttonClassName="border-black border pl-4 pr-4 pt-1 pb-1 bg-white hover:bg-gray-100"
                        renderProgress={(progress) => (
                            <ProgressBar
                                outerClassName="w-full bg-white border border-green-600"
                                innerClassName="bg-gradient-to-r from-green-600/50 to-green-600 text-xs font-light text-white text-center p-0.5 leading-none"
                                progress={progress}
                            />
                        )}
                    />
                    <FileList
                        files={files}
                        fileItemComponent={FileItemComponent as ComponentType<{ file: FileListItem | CustomFileItem }>}
                        className="p-2 flex flex-col space-y-2 w-full mt-4"
                        listClassName="ml-4"
                    />
                </div>
            </div>
        </main>
    );
};
