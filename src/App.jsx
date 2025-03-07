import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import FruitCard from './components/FruitCard/FruitCard';
import { Container, Row, Col, InputGroup, FormControl, FormSelect, Button, Spinner, Alert } from 'react-bootstrap';
import GeneralInformation from './components/generalInformation/GeneralInformation';
import './index.css'; 
import { useGetFruitsQuery } from './api/fruitApi';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [visibleCount, setVisibleCount] = useState(6); // Número inicial de frutas visibles
  const { data: fruits, error, isLoading } = useGetFruitsQuery();

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredFruits = useMemo(() => {
    if (!fruits) {
      return [];
    }
    const filtered = fruits.filter(fruit => {
      if (!selectedFilter) {
        return fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (selectedFilter === 'family') {
        return fruit.family.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (selectedFilter === 'order') {
        return fruit.order.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (selectedFilter === 'genus') {
        return fruit.genus.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [fruits, searchTerm, selectedFilter, sortOrder]);

  const visibleFruits = filteredFruits.slice(0, visibleCount);

  const totalNutrition = useMemo(() => {
    return visibleFruits.reduce((totals, fruit) => {
      totals.calories += fruit.nutritions.calories;
      totals.fats += fruit.nutritions.fat;
      totals.sugar += fruit.nutritions.sugar;
      totals.carbohydrates += fruit.nutritions.carbohydrates;
      totals.proteins += fruit.nutritions.protein;
      return totals;
    }, { calories: 0, fats: 0, sugar: 0, carbohydrates: 0, proteins: 0 });
  }, [visibleFruits]);

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 4); // Incrementa el número de frutas visibles
  };

  return (
    <Container fluid className="p-0">
      <Container className="my-4">
        <h1 className="text-center display-5 fw-bold mb-1">Season fruits</h1>
        <h2 className="text-center text-warning h4">THE MOST WONDERFUL FRUITS</h2>
        <Row>
          <Col md={9} className="mt-4 ">
            <Row className="mb-4 justify-content-end">
              <Col xs={6} sm={2} className="mb-2">
                <FormSelect
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="custom-select"
                  size="sm"
                >
                  <option value="">Filter By:</option>
                  <option value="family">Family</option>
                  <option value="order">Order</option>
                  <option value="genus">Genus</option>
                </FormSelect>
              </Col>
              <Col xs={6} sm={2} className="mb-2">
                <InputGroup size="sm" className="rounded-pill">
                  <FormControl
                    type="text"
                    placeholder="Search fruits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-pill custom-select-arrow"
                  />
                  <InputGroup.Text className="rounded-pill input-search-icon" >
                    <FaSearch size={20} />
                  </InputGroup.Text>
                </InputGroup>
              </Col>
              <Col xs={6} sm={2} className="mb-2">
                <Button 
                  variant="primary" 
                  className="w-100 roundend-pill custom-select button-filter" 
                  size="sm"
                  onClick={toggleSortOrder}
                >
                  Order {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                </Button>
              </Col>
            </Row>
            {isLoading && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && (
              <Alert variant="danger" className="text-center">
                Error loading fruits: {error.message}
              </Alert>
            )}
            <Row>
              {visibleFruits.map(fruit => (
                <FruitCard key={fruit.id} fruit={fruit} />
              ))}
            </Row>
            {visibleCount < filteredFruits.length && (
              <div className="text-center mt-4">
                <Button onClick={handleSeeMore} variant="secondary">See More</Button>
              </div>
            )}
          </Col>
          <Col md={3} className='mt-4'>
            <GeneralInformation totalProducts={visibleFruits.length} totalNutrition={totalNutrition} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;