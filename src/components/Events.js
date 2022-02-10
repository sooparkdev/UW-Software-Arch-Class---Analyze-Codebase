import React, { useState, useEffect } from 'react';
import { GrLocation } from 'react-icons/gr';
import { BsCalendarDate } from 'react-icons/bs';
import { CgMusicNote } from 'react-icons/cg';
import { Link } from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";

// Creates event card 
export function EventPage(props){

  // Event state
  const [eventsState, setEvents] = useState({})

  // get the events
  useEffect(() => {
    const db = getDatabase();
    const eventCardRef = ref(db, "events");
    const stopListener = onValue(eventCardRef, (snapshot) => {
        if (snapshot.val() !== null) {
            setEvents(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
    return function cleanup() { 
      setEvents({})
      stopListener();
      console.log("component has been removed!")
    }
  }, []);

  const currEvents = eventsState;
  const currEventKeys = Object.keys(currEvents);
  const currEventArray = currEventKeys.map((key) => {
    const singleEventCopy = {...currEvents[key]}
    singleEventCopy.key = key; 
    return singleEventCopy;
  });

  // Filter hook
  const [filters, setFilters] = useState({
    neighborhood: "",
    date: "",
    genre: "",
  });

  // Filter setter
  const handleFilterChange = (key,value) => {
    setFilters(filters => ({
      ...filters,
      [key]: value
    }))
  }

  let filterElem = <FilterBar filters={filters} onChange={handleFilterChange} />; 

  let bigEventElem = currEventArray.filter(card => {
    const { neighborhood, date, genre } = filters
  
    const genreShouldShow = (genre.length === 0 || genre === card.genre)
    const neighborhoodShouldShow = (neighborhood.length === 0 || neighborhood === card.location)
    const dateShouldShow = (date.length === 0 || date === card.date)

    return genreShouldShow && neighborhoodShouldShow && dateShouldShow
    
    }).map(currCard => {
      return <EventCard card={currCard} key={currCard.id} />
      
  });

  return (
    <main>
      <div className='filter'>
        {filterElem}
      </div>
      <div className='create-card-container'>
        <div className='create-card'>
          <Link to="../newevent"><input type="button" value="New Event" /></Link>
        </div>
      </div>
      <div className='event-container'>
        <section>
          {/*White space section*/}
        </section>
        <section>    
          {bigEventElem}
        </section>
        <section>
          {/*White space section*/}
        </section>
      </div>
    </main>
  );
}

export function FilterBar(props) {
  const {filters} = props

  const onChange = (key, value) => {
    props.onChange(key,value);
  }

  return (
    <form className="event-filter">
      <h2>Event Filter</h2>
        <div className="filter-items">
            <div className="input-items">
              <label htmlFor="neighborhood-input">Location</label>
              <select id="neighborhood-input" name="neighborhood_input" value={filters.neighborhood} onChange={(event) => onChange('neighborhood', event.target.value)}>
                <option value="">Select Location</option>
                <option value="Central District">Central District</option>
                <option value="Udistrict">Udistrict</option>
                <option value="Ballard">Ballard</option>
                <option value="Downtown">Downtown</option>
                <option value="Queen Anne">Queen Anne</option>
                <option value="Cap Hill">Cap Hill</option>
                <option value="Green Lake">Green Lake</option>     
                <option value="SoDo">SoDo</option>
              </select>
            </div> 
            <div className="input-items">
                <label htmlFor="date-input">Date</label>
                <input type="date" id="date-input" name="event_date" min="2021-01-01" max="2023-12-31" value={filters.date} onChange={(event) => onChange('date', event.target.value)}/>
            </div>
            <div className="input-items">
              <label htmlFor="genre-input">Genre</label>
              <select id="genre-input" name="genre_input" value={filters.genre} onChange={(event) => onChange('genre', event.target.value)}>
              <option value="">Select Genre</option>
                <option value="Alternative">Alternative</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Indie">Indie</option>
                <option value="Jazz">Jazz</option>
                <option value="Pop">Pop</option>
                <option value="R&B">R&B</option>
                <option value="Rock">Rock</option>
              </select>
            </div>
        </div>
    </form>
  )
}

export function EventCard(props) {
    const card = props.card;
    const img = card.img;
    const name = card.band;
    const alt = card.alt;
    const location = card.location;
    const date = card.date;
    const genre = card.genre;
    const desc = card.eventContent;

    return (
      <div className='big-card'>
        <img src={img} alt={alt} />
        <div className='text-content'>
          <p>{name}</p>
          <i>
            <p>
              <GrLocation title="Location Pin Icon"/>
              {location}
            </p>
          </i>
          <i>
            <p>
              < BsCalendarDate title="Calendar Icon"/>
              {date}
            </p>
          </i>
          <i>
            <p>
              < CgMusicNote title="Music Note Icon"/>
              {genre}
            </p>
          </i>
          <p>{desc}</p>
        </div>
      </div>
    )
}
