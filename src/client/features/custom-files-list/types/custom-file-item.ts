import { type FileListItem } from '../../uploader/components/files-list';

export interface CustomFileItem extends FileListItem {
    status: 'uploaded' | 'uploading' | 'failed';
}
