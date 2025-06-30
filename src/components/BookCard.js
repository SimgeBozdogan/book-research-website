import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const volumeInfo = book.volumeInfo || {};
  const saleInfo = book.saleInfo || {};
  
  const {
    title = 'Başlık bilgisi bulunamadı',
    authors = [],
    publishedDate = '',
    description = '',
    imageLinks = {},
    pageCount,
    language = '',
    categories = [],
    averageRating,
    ratingsCount,
    publisher = '',
    previewLink,
    infoLink
  } = volumeInfo;

  const {
    buyLink,
    retailPrice = {}
  } = saleInfo;

  const thumbnail = imageLinks.thumbnail || imageLinks.smallThumbnail || '/api/placeholder/128/192';
  
  const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatPrice = (price) => {
    if (!price || !price.amount) return null;
    return `${price.amount} ${price.currencyCode}`;
  };

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img 
          src={thumbnail} 
          alt={title}
          className="book-image"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" viewBox="0 0 128 192"><rect width="128" height="192" fill="%23f0f0f0"/><text x="64" y="100" text-anchor="middle" fill="%23999" font-size="14">Resim yok</text></svg>';
          }}
        />
      </div>
      
      <div className="book-details">
        <h3 className="book-title">{title}</h3>
        
        {authors.length > 0 && (
          <p className="book-authors">
            <strong>Yazar:</strong> {authors.join(', ')}
          </p>
        )}
        
        <div className="book-meta">
          {publishedDate && (
            <span className="meta-item">📅 {publishedDate.split('-')[0]}</span>
          )}
          {pageCount && (
            <span className="meta-item">📄 {pageCount} sayfa</span>
          )}
          {language && (
            <span className="meta-item">🌐 {language.toUpperCase()}</span>
          )}
        </div>

        {publisher && (
          <p className="book-publisher">
            <strong>Yayınevi:</strong> {publisher}
          </p>
        )}

        {categories.length > 0 && (
          <div className="book-categories">
            {categories.slice(0, 3).map((category, index) => (
              <span key={index} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        )}

        {averageRating && (
          <div className="book-rating">
            <span className="rating-stars">
              {'⭐'.repeat(Math.round(averageRating))}
            </span>
            <span className="rating-text">
              {averageRating}/5 ({ratingsCount || 0} değerlendirme)
            </span>
          </div>
        )}

        {description && (
          <p className="book-description">
            {truncateText(description.replace(/<[^>]*>/g, ''))}
          </p>
        )}

        {formatPrice(retailPrice) && (
          <div className="book-price">
            <strong>Fiyat:</strong> {formatPrice(retailPrice)}
          </div>
        )}

        <div className="book-actions">
          {previewLink && (
            <a 
              href={previewLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button preview-button"
            >
              👁️ Önizle
            </a>
          )}
          <button 
            onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
            className="action-button info-button"
          >
            ℹ️ Detaylar
          </button>
          {buyLink && (
            <a 
              href={buyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button buy-button"
            >
              🛒 Satın Al
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard; 