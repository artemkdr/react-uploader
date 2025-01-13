import { forwardRef } from 'react';

interface ProgressBarProps {
    progress: number;
    outerClassName?: string;
    innerClassName?: string;
    uploadedText?: string;
    progressFormat?: (progress: number) => string;
}

/**
 * ProgressBar component displays a progress bar with a given progress percentage.
 *
 * @param {number} progress - The current progress percentage (0-100).
 * @param {string} [outerClassName] - Optional additional class names for the outer container.
 * @param {string} [innerClassName] - Optional additional class names for the inner progress bar.
 * @param {string} [uploadedText] - Optional text to display when progress reaches 100%. Default is 'Uploaded!'.
 * @param {(progress: number) => string} [progressFormat] - Optional function to format the progress text. Default is `${Math.floor(progress)}%`.
 */
export const ProgressBar = forwardRef<HTMLDivElement | null, ProgressBarProps>(
    (
        {
            progress,
            outerClassName = '',
            innerClassName = '',
            uploadedText = 'Uploaded!',
            progressFormat = (progress: number) => `${Math.floor(progress)}%`,
        }: ProgressBarProps,
        ref
    ) => {
        progress = Math.max(0, Math.min(progress, 100));
        return (
            <div ref={ref} className={`${progress > 0 ? 'visible' : 'invisible'} ${outerClassName}`}>
                <div
                    role="progressbar"
                    aria-busy={progress > 0 && progress < 100}
                    className={innerClassName}
                    style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
                >
                    {progress >= 100 ? uploadedText : `${progressFormat?.(progress)}`}
                </div>
            </div>
        );
    }
);
ProgressBar.displayName = 'ProgressBar';
