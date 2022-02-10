import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { EventPage, FilterBar, EventCard } from './components/Events.js'
import { NewEvent, ErrorHandler } from './components/NewEvent.js'
import GENRES from './data/genres.json'
import LOCATIONS from './data/locations.json'

describe('Events component', () => {
    test('Events renders correctly using database data', () => {
        render(<EventPage/>, {wrapper: MemoryRouter});
        expect(screen.getByText("Haha look at us go")).toBeInTheDocument();
        expect(screen.getByAltText("person playing music")).toBeInTheDocument();
    })
    test('Events page can navigate users to the New Events page', () => {
        render(<EventPage/>, {wrapper: MemoryRouter});
        expect(screen.getByRole('link')).toHaveAttribute('href', '/newevent');
    })
})

describe('Filter component', () => {
    test('Filter renders correctly with no input, correctly set to default options', () => {
        let filters = {  
            neighborhood: "",
            date: "",
            genre: ""
        };
        const handleFilterChange = () => {};

        render(<FilterBar filters={filters} onChange={handleFilterChange} />);
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
        render(<FilterBar filters={filters} onChange={handleFilterChange}/>);
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
        userEvent.type(screen.getByLabelText('Band Name'), 'Mock Band Name');
        userEvent.type(screen.getByLabelText('Band Image URL'), 'https://2dopeboyz.com/wp-content/uploads/2018/10/tom-misch-de-la-soul-it-runs-through-me-video1.jpg');
        userEvent.type(screen.getByLabelText('Image Description'), 'Mock alt description for image');
        userEvent.type(screen.getByLabelText('Date'), '2022-01-28');
        userEvent.selectOptions(screen.getByTestId('location'),  'Central District');
        userEvent.selectOptions(screen.getByTestId('genre'), 'Jazz');
        userEvent.type(screen.getByLabelText('Band Description'), 'Mock description');

        userEvent.click(screen.getByRole('button'));
        
        expect(screen.queryByDisplayValue("Cannot make post! User is not logged in.")).not.toBeInTheDocument();
        
    })

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
        
        render(<EventCard card={card} key={cardId}/>);
        expect(screen.getByText("mock name")).toBeInTheDocument();
        expect(screen.getByAltText("mock alt"));
        expect(screen.getByText("2022-01-30"));
    })
})

describe ('Error handler function', () => {
    test('User is informed if an error occurred', () => {
        let error = "Oh wowzers that is bad";
        render(<ErrorHandler error={error}/>);
        expect(screen.getByText("Oh wowzers that is bad")).toBeInTheDocument();
    })
})