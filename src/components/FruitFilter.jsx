import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { FilterOption } from '../types/fruit';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';

const FruitFilter = ({
  onSearch, 
  onFilterChange, 
  onSortChange, 
  filterOptions, 
  currentFilter,
  sortDirection
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>('Family');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedFilterOption(currentFilter.option);
  }, [currentFilter.option]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterOptionClick = (option) => {
    setSelectedFilterOption(option);
    setIsDropdownOpen(false);
    onFilterChange(option, null);
  };

  const handleFilterValueClick = (value) => {
    setIsDropdownOpen(false);
    onFilterChange(selectedFilterOption, value);
  };

  const toggleSortDirection = () => {
    onSortChange(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const getFilterValues = () => {
    switch (selectedFilterOption) {
      case 'Family':
        return filterOptions.families;
      case 'Order':
        return filterOptions.orders;
      case 'Genus':
        return filterOptions.genera;
      default:
        return [];
    }
  };

  return (
    <Row className="mb-4 align-items-center">
      <Col md={4} className="mb-3 mb-md-0">
        <div className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <FaSearch size={18} className="text-muted" />
          </div>
        </div>
      </Col>
      
      <Col md={4} className="mb-3 mb-md-0 position-relative" ref={dropdownRef}>
        <Dropdown show={isDropdownOpen} onToggle={(isOpen) => setIsDropdownOpen(isOpen)}>
          <Dropdown.Toggle as="div" className="w-100">
            <Button 
              variant="outline-secondary" 
              className="w-100 d-flex justify-content-between align-items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{`Filter by: ${selectedFilterOption}${currentFilter.value ? ` (${currentFilter.value})` : ''}`}</span>
              <FaChevronDown size={18} />
            </Button>
          </Dropdown.Toggle>
          
          <Dropdown.Menu className="w-100">
            <h6 className="dropdown-header">Select Filter</h6>
            {['Family', 'Order', 'Genus'].map((option) => (
              <Dropdown.Item 
                key={option}
                onClick={() => handleFilterOptionClick(option)}
                active={selectedFilterOption === option}
              >
                {option}
              </Dropdown.Item>
            ))}
            
            <Dropdown.Divider />
            
            <h6 className="dropdown-header">Select Value</h6>
            {getFilterValues().map((value) => (
              <Dropdown.Item 
                key={value}
                onClick={() => handleFilterValueClick(value)}
                active={currentFilter.value === value}
              >
                {value}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      
      <Col md={4} className="d-flex justify-content-md-end">
        <Button 
          variant="outline-secondary"
          className="d-flex align-items-center"
          onClick={toggleSortDirection}
        >
          Order A-Z {sortDirection === 'asc' ? <FaSortAlphaDown size={16} className="ms-2" /> : <FaSortAlphaUp size={16} className="ms-2" />}
        </Button>
      </Col>
    </Row>
  );
};

export default FruitFilter;