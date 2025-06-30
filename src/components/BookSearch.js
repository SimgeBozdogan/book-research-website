import React, { useState } from 'react';

const BookSearch = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Kitap ara..."
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <span className="button-spinner"></span>
            ) : (
              <>
                Ara
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="search-suggestions">
        <p>Popüler aramalar:</p>
        <div className="suggestion-tags">
          {['Harry Potter', 'Agatha Christie', 'Dan Brown', 'Stephen King', 'Tolkien'].map((suggestion) => (
            <button
              key={suggestion}
              className="suggestion-tag"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
              disabled={loading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearch; 