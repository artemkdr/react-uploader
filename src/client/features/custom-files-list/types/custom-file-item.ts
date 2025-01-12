import { type FileListItem } from '../../../components/file-list';

export interface CustomFileItem extends FileListItem {
    status: 'uploaded' | 'uploading' | 'failed';
}
