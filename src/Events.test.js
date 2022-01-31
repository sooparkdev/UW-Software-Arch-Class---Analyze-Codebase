import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { Events, Filter, NewEvent, BigCard } from './components/Events.js'
import GENRES from './data/genres.json'
import LOCATIONS from './data/locations.json'

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

describe ('NewEvent component', () => {

    test('Renders the Form Without Error', () => {
        render(<NewEvent genres={GENRES} locations={LOCATIONS} />);
        //screen.debug(); //view rendered DOM/HTML in console (for debugging)
        expect(screen.getByText("Create an Event Below!")).toBeInTheDocument();
    })

    test('Form Data Submitted to the Database', () => {
        render(<NewEvent genres={GENRES} locations={LOCATIONS} />);
        screen.debug()
        userEvent.type(screen.getByLabelText('Band Name'), 'Mock Band Name');
        userEvent.type(screen.getByLabelText('Band Image URL'), '"https://2dopeboyz.com/wp-content/uploads/2018/10/tom-misch-de-la-soul-it-runs-through-me-video1.jpg');
        userEvent.type(screen.getByLabelText('Image Description'), 'Mock alt description for image');
        userEvent.type(screen.getByLabelText('Date'), '2022-01-28');
        userEvent.selectOptions(screen.getByTestId('location'),  'Central District');
        userEvent.selectOptions(screen.getByTestId('genre'), 'Jazz');
        userEvent.type(screen.getByLabelText('Band Description'), 'Mock description');

        // userEvent.click(screen.getByRole('button'));
        
        // expect(screen.queryByDisplayValue("Cannot make post! User is not logged in.")).not.toBeInTheDocument();
    })
    
    // test('Should Display the Error Message Given the User Is Logged Out', () => {
    //     expect(screen.queryByDisplayValue("Cannot make post! User is not logged in.")).toBeInTheDocument();
    // })

});


describe ('Big Card component', () => {
    test('Event cards rendered correctly', () => {
        let card = {  
            img: "",
            band: "mock name",
            alt: "mock alt",
            location: "Downtown",
            date: "2022-01-30",
            genre: "Jazz",
            eventContent: "mosck description"
        };

        let cardId = "";
        
        render(<BigCard card={card} key={cardId}/>);
        expect(screen.getByText("mock name")).toBeInTheDocument();
        expect(screen.getByAltText("mock alt"));
        expect(screen.getByText("2022-01-30"));
    })
})
