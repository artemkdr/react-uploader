import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import { App } from './App';

global.fetch = vi.fn();

describe('App', () => {
    it('should render the component', async () => {
        // use act because of fetch inside the App
        await act(() => render(<App />));
        expect(screen.getByTestId('uploader')).toBeInTheDocument();
    });
});
