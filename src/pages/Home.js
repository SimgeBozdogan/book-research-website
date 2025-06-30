import React, { useState } from 'react';
import BookSearch from '../components/BookSearch';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const searchBooks = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearchTerm(query);
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&langRestrict=tr,en`
      );
      const data = await response.json();
      
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error('Kitap arama hatası:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
            📚 Book Research
          </h1>
          <p className="app-subtitle">
            Kitaplar hakkında aradığınız tüm bilgilere buradan ulaşın
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <BookSearch onSearch={searchBooks} loading={loading} />
          
          {searchTerm && (
            <div className="results-section">
              <h2 className="results-title">
                "{searchTerm}" için {books.length} sonuç bulundu
              </h2>
              
              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Kitaplar aranıyor...</p>
                </div>
              ) : (
                <div className="books-grid">
                  {books.length > 0 ? (
                    books.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))
                  ) : (
                    <div className="no-results">
                      <p>Aradığınız kriterlere uygun kitap bulunamadı.</p>
                      <p>Farklı anahtar kelimeler deneyebilirsiniz.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>© 2024 Book Research - Powered by Google Books API</p>
        </div>
      </footer>
    </>
  );
};

export default Home; 