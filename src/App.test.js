import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './components/App.js' // Import App component
import { Filter } from './components/Events.js' // Import Filter from the Events module

describe('The App', () => {
    test('Renders the App Without Error', () => {
        render(<App/>);
        //screen.debug(); 
        expect(screen.getByText("Bringing a community of artists and musicians together")).toBeInTheDocument();
    })
})