import React from 'react';
import { Card } from 'react-bootstrap';
import './GeneralInformation.css';
const GeneralInformation = ({totalProducts,totalNutrition}) => {
 

  return (
    <Card className="p-4 rounded general-information">
      <Card.Body>
        <Card.Title className="text-warning">General information</Card.Title>
        <Card.Text>
          <strong>No. Of Found Products:</strong> {totalProducts}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-warning">Nutritional properties of found products</Card.Subtitle>
        <Card.Text>
          <div><strong>Total calories</strong> {totalNutrition.calories}</div>
          <div><strong>Total fats</strong> {totalNutrition.fats}</div>
          <div><strong>Total sugar</strong> {totalNutrition.sugar}</div>
          <div><strong>Total carbohydrates</strong> {totalNutrition.carbohydrates}</div>
          <div><strong>Total proteins</strong> {totalNutrition.proteins}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GeneralInformation;