import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {CommonQuestionsInChatStatic} from "./CommonQuestionInChat";


describe('CommonQuestionsInChatStatic', () => {
    const mockOnQuestionClick = jest.fn();

    beforeEach(() => {
        render(
            <CommonQuestionsInChatStatic
                isSubmitting={false}
                onQuestionClick={mockOnQuestionClick}
            />
        );
    });

    test('renders the title', () => {
        expect(screen.getByText('Түгээмэл Асуултууд')).toBeInTheDocument();
    });

    test('content is visible by default', () => {
        const content = screen.getByTestId('common-questions-content');
        expect(content).toBeVisible();
    });

    test('collapses and expands when toggle button is clicked', () => {
        const toggleButton = screen.getByTestId('toggle-questions');
        const content = screen.getByTestId('common-questions-content');

        // Initial state - expanded
        expect(content).toBeVisible();
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

        // Click to collapse
        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

        // Click to expand
        fireEvent.click(toggleButton);
        expect(content).toBeVisible();
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
});
