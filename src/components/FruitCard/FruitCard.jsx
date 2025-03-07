import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Card, Button, ListGroup, Col, Row } from 'react-bootstrap';
import './FruitCard.css'; 

const FruitCard = ({ fruit }) => {
  const routeBase = "./../../../public/images/";
  const initialImage = `${routeBase}${fruit.name}.webp`;
  const fallbackImages = [
    `${routeBase}${fruit.name}.jpg`,
    `${routeBase}${fruit.name}.png`,
    `${routeBase}${fruit.name}.avif`,
    `${routeBase}not-available.webp`
  ];

  const [imageSrc, setImageSrc] = useState(initialImage);
  const [currentFallbackIndex, setCurrentFallbackIndex] = useState(0);

  useEffect(() => {
    setImageSrc(initialImage);
    setCurrentFallbackIndex(0);
  }, [fruit.name]);

  const handleImageError = () => {
    if (currentFallbackIndex < fallbackImages.length) {
      setImageSrc(fallbackImages[currentFallbackIndex]);
      setCurrentFallbackIndex(currentFallbackIndex + 1);
    }
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100 fruit-card">
        <Button variant="light" className="favorite-button">
          <FaHeart size={15} style={{ color: 'black' }} /> 
        </Button>
        <Card.Img 
          variant="top" 
          src={imageSrc} 
          alt={fruit.name} 
          onError={handleImageError} 
          style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem' }} 
        />
        <Card.Body>
          <Card.Title className="text-warning">{fruit.name}</Card.Title>
          <Card.Text>
            <Row>
              <Col xs={4}><strong>Family:</strong></Col>
              <Col xs={4}><strong>Order:</strong></Col>
              <Col xs={4}><strong>Genus:</strong></Col>
            </Row>
            <Row>
              <Col xs={4}>{fruit.family}</Col>
              <Col xs={4}>{fruit.order}</Col>
              <Col xs={4}>{fruit.genus}</Col>
            </Row>
          </Card.Text>
          <Card.Subtitle className="mb-2 text-warning">Nutritions</Card.Subtitle>
          <ListGroup variant="flush" className="no-border text-start">
            <ListGroup.Item className="no-border p-0"><strong>Calories:</strong> {fruit.nutritions.calories}</ListGroup.Item>
            <ListGroup.Item className="no-border p-0"><strong>Fat:</strong> {fruit.nutritions.fat}</ListGroup.Item>
            <ListGroup.Item className="no-border p-0"><strong>Sugar:</strong> {fruit.nutritions.sugar}</ListGroup.Item>
            <ListGroup.Item className="no-border p-0"><strong>Carbohydrates:</strong> {fruit.nutritions.carbohydrates}</ListGroup.Item>
            <ListGroup.Item className="no-border p-0"><strong>Protein:</strong> {fruit.nutritions.protein}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FruitCard;