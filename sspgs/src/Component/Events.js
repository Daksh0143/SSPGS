import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Image, Container, Row, Col } from 'react-bootstrap';

import "./Events.css";

function Events(slot) {
  const location = useLocation();
  const dateStartString=location.state.slot.startdate.toLocaleString();
  const dateStart=new Date(dateStartString)
  const localizedString=dateStart.toLocaleString();
  console.log(localizedString)

  const dateEndString=location.state.slot.enddate.toLocaleString();
  const dateEnd=new Date(dateEndString);
  const localString=dateEnd.toLocaleString();
  console.log(localString)

  
  return (
    <Card className="event-card">
      <Row noGutters>
        <Col md={4}>
          <Image src={location.state.slot.image} alt={location.state.slot.image} fluid className="event-image" />
        </Col>
        <Col md={8}>
          <Card.Body className="event-info">
            <Card.Title>{location.state.slot.title}</Card.Title>
            <Card.Text className="event-description">{location.state.slot.description}</Card.Text>
            <div className="event-dates">
              <p>Start: {localizedString}</p>
              <p>End: {localString}</p>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default Events