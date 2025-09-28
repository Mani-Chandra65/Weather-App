import React, { useState } from 'react';
import { Search, MapPin, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SearchBar = ({ onSearch, onLocationClick, onAddToComparison }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleLocationClick = () => {
    toast.loading('Getting your location...', { id: 'location' });
    onLocationClick();
    setTimeout(() => {
      toast.dismiss('location');
    }, 2000);
  };

  const handleAddToComparison = () => {
    if (searchTerm.trim()) {
      onAddToComparison(searchTerm.trim());
      setSearchTerm('');
      toast.success('City added to comparison!');
    } else {
      toast.error('Please enter a city name first');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          
          <div className="search-actions">
            <button
              type="button"
              className="location-btn"
              onClick={handleLocationClick}
              title="Use current location"
            >
              <MapPin size={18} />
            </button>
            
            <button
              type="button"
              className="comparison-btn"
              onClick={handleAddToComparison}
              title="Add to comparison"
              style={{
                position: 'absolute',
                right: '55px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                color: 'var(--text-primary)',
              }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
