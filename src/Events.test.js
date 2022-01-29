import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';

import App from './components/App.js' // Import App component
import { Events, Filter } from './components/Events.js' // Import Filter from the Events module


// Just making sure that the barebones home page actually renders correctly

// INCLUDE A TEST THAT CHECKS IF NON-URL VALUES ARE ACCEPTED IN DATA FOR EVENTS
describe('Events component', () => {
    test('Events renders correctly using database data', () => {
        render(<Events/>, {wrapper: MemoryRouter});
        expect(screen.getByText("Haha look at us go")).toBeInTheDocument();
        expect(screen.getByAltText("person playing music"));
    })
    // TESTS NEED TO BE ACTUAL CASES WHERE IT COULD GO WRONG
    //test('Pressing the New Event button results in a different page rendered', () => {
        
    //})
})

describe('Filter component', () => {
    test('Filter renders correctly with no input, correctly set to default options', () => {
        let filters = {  
            neighborhood: "",
            date: "",
            genre: ""
        };
        const handleFilterChange = () => {};

        render(<Filter filters={filters} onChange={handleFilterChange} />);
        //screen.debug()
        expect(screen.getByText("Event Filter")).toBeInTheDocument();
        expect(screen.getByLabelText("Location")).toBeInTheDocument();
        expect(screen.getByLabelText("Date")).toBeInTheDocument();
        expect(screen.getByLabelText("Genre")).toBeInTheDocument();
    })

    test('Filter handles user input', () => {
        let filters = {
            neighborhood: "",
            date: "",
            genre: "",
        };
        const handleFilterChange = () => {};
        render(<Filter filters={filters} onChange={handleFilterChange}/>);
        userEvent.selectOptions(screen.getByLabelText('Location'), 'Central District');
        userEvent.selectOptions(screen.getByLabelText('Genre'), 'Country');
        expect(screen.getByText("Central District")).toBeInTheDocument();
        expect(screen.getByText("Country")).toBeInTheDocument();
    })
})