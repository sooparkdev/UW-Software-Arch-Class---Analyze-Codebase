import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Container, Col, Row, Form, Button, FloatingLabel} from 'react-bootstrap';

export function NewEvent(props) {
    let genreElem = props.genres.map((currGenre, index) => {
      return <option value={currGenre.genre} key={index}>{currGenre.genre}</option>
    })
  
    let locationElem = props.locations.map((currLoc, index) => {
      return <option value={currLoc.location} key={index}>{currLoc.location}</option>
    })
    const [currUser, setUser] = useState();
    const [eventError, setEventError] = useState(null);
  
    useEffect(() => {
      const auth = getAuth();
      const stopListener = onAuthStateChanged(auth, (user) => {
          if (user != null) {
            setUser(user);
          }
      });
      return function cleanup() { 
        stopListener();
      }
    }, []);
  
    const handleSubmit = (event) => { 
      event.preventDefault(); 
      const band = event.target.elements.bandName.value;
      const bandImage = event.target.elements.bandImage.value;
      const alt = event.target.elements.alt.value;
      const date = event.target.elements.date.value;
      const location = event.target.elements.location.value;
      const genre = event.target.elements.genre.value;
      const eventContent = event.target.elements.eventContent.value;
      const db = getDatabase();
      if (currUser != null) {  
        push(ref(db, "events"), {
            band: band,
            img: bandImage,
            alt: alt,
            date: date,
            location: location,
            genre: genre,
            eventContent: eventContent
        });   
      } else {
          const errorMessage = "Cannot make post! User is not logged in."
          console.log("something went wrong with user");
          setEventError(errorMessage);
      }
  
    }
  
    return (
      <div className="event-form">
      <Container className="mt-9">
         
        <Row>
        <h2>Create an Event Below!</h2>
        <Col className="text-center mt-10 p-5">
          
      <Form onSubmit={handleSubmit}>
      <Col xs="auto">
      <Form.Group controlId="bandName">
      <FloatingLabel controlId="bandName"
      label="Band Name"
      className="mb-3">
          <Form.Control placeholder="Enter Band Name" name="bandName" />
          </FloatingLabel>
        </Form.Group>
        </Col>
  
        <Col xs="auto">
        <Form.Group controlId="bandImageInput" className="mb-3">
      <FloatingLabel controlId="floatingTextarea"
      label="Band Image URL"
      className="mb-3">
          <Form.Control placeholder="Band Image" name="bandImage"/>
          </FloatingLabel>
        </Form.Group>
        </Col>
      
        <Col>
      <Form.Group controlId="bandImageAltInput" className="mb-3">
      <FloatingLabel controlId="floatingInput"
      label="Image Description"
      className="mb-3">
          <Form.Control placeholder="Image Description" name="alt" />
          </FloatingLabel>
        </Form.Group>
        </Col>
  
        <Col xs="auto">
        <Form.Group controlId="dateInput" className="mb-3">
        <FloatingLabel controlId="floatingInput"
      label="Date"
      className="mb-3">
          <Form.Control name='date' />
          </FloatingLabel>
          </Form.Group>
        </Col>
  
        <Col xs="auto">
        <Form.Group controlId="locationInput" className="mb-3">
        <FloatingLabel controlId="floatingSelect" label="Location">
          <Form.Select data-testid="location" aria-label="Floating label" name="location" id="location">
          <option>Select Neighborhood</option>
            {locationElem}
          </Form.Select>
          </FloatingLabel>
        </Form.Group>
        </Col>
  
        <Col xs="auto">
        <Form.Group controlId="genreInput" className="mb-3">
        <FloatingLabel controlId="floatingSelect" label="Genre">
            <Form.Select data-testid="genre" aria-label="Floating label" name="genre" id="genre">
              {genreElem}
            </Form.Select>
            </FloatingLabel>
        </Form.Group>
        </Col>
  
        <Col xs="auto">
        <Form.Group controlId="contentInput" className="mb-3">
        <FloatingLabel controlId="floatingSelect" label="Band Description">
        <Form.Control
        as="textarea"
        placeholder="Write your description here"
        style={{ height: '100px' }}
        name="eventContent"
        />
        </FloatingLabel>
        </Form.Group>
        </Col>
        <Button variant="primary btn-block" type="submit" className="login-button mt-2">
      Submit Event (Only Click Once!)
    </Button>
  
      </Form>
      </Col>
      </Row>
      </Container>
      <ErrorHandler error={eventError} />
      </div>
    )
  }

  export function ErrorHandler(props) {
    if(props.error === undefined) {
        return null;
    } else {
        return (
            <h2 className="error-alert">{props.error}</h2>
        );
    }
  }