import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book;

  if (!book) {
    return (
      <div className="book-detail-container">
        <div className="container">
          <div className="detail-error">
            <h2>Kitap bulunamadı</h2>
            <p>Aranan kitap detayları mevcut değil.</p>
            <button 
              onClick={() => navigate('/')}
              className="back-button"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

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
    infoLink,
    maturityRating,
    printType,
    industryIdentifiers = []
  } = volumeInfo;

  const {
    buyLink,
    retailPrice = {},
    isEbook,
    saleability
  } = saleInfo;

  const thumbnail = imageLinks.thumbnail || imageLinks.smallThumbnail || imageLinks.small || imageLinks.medium;
  
  const formatPrice = (price) => {
    if (!price || !price.amount) return null;
    return `${price.amount} ${price.currencyCode}`;
  };

  const formatDate = (date) => {
    if (!date) return 'Bilinmiyor';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getISBN = () => {
    const isbn13 = industryIdentifiers.find(id => id.type === 'ISBN_13');
    const isbn10 = industryIdentifiers.find(id => id.type === 'ISBN_10');
    return isbn13?.identifier || isbn10?.identifier || 'Bilinmiyor';
  };

  return (
    <div className="book-detail-page">
      <header className="detail-header">
        <div className="container">
          <button 
            onClick={() => navigate('/')}
            className="back-button"
          >
            ← Geri
          </button>
          <h1>Kitap Detayı</h1>
        </div>
      </header>

      <main className="detail-main">
        <div className="container">
          <div className="detail-content">
            <div className="detail-hero">
              <div className="detail-image-section">
                {thumbnail ? (
                  <img 
                    src={thumbnail} 
                    alt={title}
                    className="detail-book-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="300" height="450" fill="%23f0f0f0"/><text x="150" y="225" text-anchor="middle" fill="%23999" font-size="20">Resim yok</text></svg>';
                    }}
                  />
                ) : (
                  <div className="detail-no-image">
                    <span>📚</span>
                    <p>Resim yok</p>
                  </div>
                )}
              </div>
              
              <div className="detail-info-section">
                <h2 className="detail-book-title">{title}</h2>
                
                {authors.length > 0 && (
                  <div className="detail-authors">
                    <strong>Yazar(lar):</strong>
                    <span>{authors.join(', ')}</span>
                  </div>
                )}
                
                {averageRating && (
                  <div className="detail-rating">
                    <span className="rating-stars">
                      {'⭐'.repeat(Math.round(averageRating))}
                    </span>
                    <span className="rating-text">
                      {averageRating}/5 ({ratingsCount || 0} değerlendirme)
                    </span>
                  </div>
                )}

                {categories.length > 0 && (
                  <div className="detail-categories">
                    {categories.map((category, index) => (
                      <span key={index} className="detail-category-tag">
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {formatPrice(retailPrice) && (
                  <div className="detail-price">
                    <strong>Fiyat: {formatPrice(retailPrice)}</strong>
                  </div>
                )}

                <div className="detail-actions">
                  {previewLink && (
                    <a 
                      href={previewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-action-button preview-button"
                    >
                      👁️ Önizle
                    </a>
                  )}
                  {infoLink && (
                    <a 
                      href={infoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-action-button info-button"
                    >
                      🔗 Google Books'ta Gör
                    </a>
                  )}
                  {buyLink && (
                    <a 
                      href={buyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-action-button buy-button"
                    >
                      🛒 Satın Al
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="detail-specifications">
              <h3>Kitap Bilgileri</h3>
              <div className="specs-grid">
                {publisher && (
                  <div className="spec-item">
                    <strong>Yayınevi:</strong>
                    <span>{publisher}</span>
                  </div>
                )}
                
                <div className="spec-item">
                  <strong>Yayın Tarihi:</strong>
                  <span>{formatDate(publishedDate)}</span>
                </div>
                
                {pageCount && (
                  <div className="spec-item">
                    <strong>Sayfa Sayısı:</strong>
                    <span>{pageCount} sayfa</span>
                  </div>
                )}
                
                {language && (
                  <div className="spec-item">
                    <strong>Dil:</strong>
                    <span>{language.toUpperCase()}</span>
                  </div>
                )}
                
                <div className="spec-item">
                  <strong>ISBN:</strong>
                  <span>{getISBN()}</span>
                </div>
                
                {printType && (
                  <div className="spec-item">
                    <strong>Tür:</strong>
                    <span>{printType === 'BOOK' ? 'Kitap' : printType}</span>
                  </div>
                )}
                
                {saleability && (
                  <div className="spec-item">
                    <strong>Satış Durumu:</strong>
                    <span>{saleability === 'FOR_SALE' ? 'Satışta' : 'Satışta değil'}</span>
                  </div>
                )}
              </div>
            </div>

            {description && (
              <div className="detail-description">
                <h3>Açıklama</h3>
                <div className="description-content">
                  {description.replace(/<[^>]*>/g, '')}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail; 