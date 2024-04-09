/**
 * @jest-environment node
 */

// modal.test.jsx
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import App from '../modal'; 



// Mock gsap to prevent actual animations from running
jest.mock('gsap', () => ({
 timeline: jest.fn().mockImplementation(() => ({
    addLabel: jest.fn(),
    to: jest.fn(),
 })),
}));

describe('App', () => {
 it('renders the modal and opens it on button click', () => {
    const { getByText, queryByText } = render(<App />);

    // Initially, the modal should not be visible
    expect(queryByText('Find out more')).not.toBeInTheDocument();

    // Simulate a click on a partner button to open the modal
    fireEvent.click(getByText('Partner Button')); 

    // The modal should now be visible
    expect(getByText('Find out more')).toBeInTheDocument();
 });

 it('closes the modal on close button click', () => {
    const { getByText, queryByText } = render(<App />);

    // Open the modal
    fireEvent.click(getByText('Partner Button')); // Replace 'Partner Button' with actual text or use another selector

    // The modal should now be visible
    expect(getByText('Find out more')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(getByText('Close'));

    // The modal should now be closed
    expect(queryByText('Find out more')).not.toBeInTheDocument();
 });

 
});
