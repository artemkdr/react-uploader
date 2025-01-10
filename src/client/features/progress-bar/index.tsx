export const ProgressBar = ({ progress }: { progress: number }) => {
    progress = Math.max(0, Math.min(progress, 100));
    return (
        <div className={`w-full bg-white border border-green-600 ${progress > 0 ? 'visible' : 'invisible'}`}>
            <div
                className="bg-green-600 text-xs font-light text-white text-center p-0.5 leading-none"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
            >
                {progress >= 100 ? 'Uploaded!' : `${Math.floor(progress)}%`}
            </div>
        </div>
    );
};
