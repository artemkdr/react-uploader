import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ProgressBar } from './index';

import '@testing-library/jest-dom/vitest';

describe('ProgressBar', () => {
    it('renders with default props', () => {
        render(<ProgressBar progress={50} />);
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveStyle('width: 50%');
        expect(progressBar).toHaveTextContent('50%');
    });

    it('renders with custom outer and inner class names', () => {
        render(<ProgressBar progress={50} outerClassName="custom-outer" innerClassName="custom-inner" />);
        const outerContainer = screen.getByRole('progressbar').parentElement;
        expect(outerContainer).toHaveClass('custom-outer');
        const innerBar = screen.getByRole('progressbar');
        expect(innerBar).toHaveClass('custom-inner');
    });

    it('renders with custom uploaded text when progress is 100%', () => {
        render(<ProgressBar progress={100} uploadedText="Complete!" />);
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveTextContent('Complete!');
    });

    it('renders with custom progress format function', () => {
        const customFormat = (progress: number) => `${progress} percent`;
        render(<ProgressBar progress={75} progressFormat={customFormat} />);
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveTextContent('75 percent');
    });

    it('does not go below 0% progress', () => {
        render(<ProgressBar progress={-50} />);
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveStyle('width: 0%');
        expect(progressBar).toHaveTextContent('0%');
    });

    it('is invisible when progress is 0', () => {
        render(<ProgressBar progress={0} />);
        const outerContainer = screen.getByRole('progressbar').parentElement;
        expect(outerContainer).toHaveClass('invisible');
    });

    it('is visible when progress is greater than 0', () => {
        render(<ProgressBar progress={1} />);
        const outerContainer = screen.getByRole('progressbar').parentElement;
        expect(outerContainer).toHaveClass('visible');
    });
});
