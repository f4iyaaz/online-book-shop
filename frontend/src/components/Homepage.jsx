import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './Homepage.css';

const Homepage = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const { addToCart, cartItems } = useCart();
  const { user, login, logout } = useAuth();

  // Create a ref for the categories section
  const categoriesSectionRef = React.useRef(null);

  // Mock data - replace with your actual API calls
  useEffect(() => {
    // Featured books data
    const featuredData = [
      {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 24.99,
        image: "/api/placeholder/200/300",
        rating: 4.5,
        category: "Fiction"
      },
      {
        id: 2,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 28.99,
        image: "/api/placeholder/200/300",
        rating: 4.8,
        category: "Sci-Fi"
      },
      {
        id: 3,
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        price: 26.99,
        image: "/api/placeholder/200/300",
        rating: 4.3,
        category: "Fiction"
      }
    ];

    // New releases data
    const newReleasesData = [
      {
        id: 4,
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        price: 22.99,
        image: "/api/placeholder/150/220",
        category: "Fantasy"
      },
      {
        id: 5,
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        price: 25.99,
        image: "/api/placeholder/150/220",
        category: "Mystery"
      },
      {
        id: 6,
        title: "The Sanatorium",
        author: "Sarah Pearse",
        price: 27.99,
        image: "/api/placeholder/150/220",
        category: "Thriller"
      },
      {
        id: 7,
        title: "The Four Winds",
        author: "Kristin Hannah",
        price: 23.99,
        image: "/api/placeholder/150/220",
        category: "Historical Fiction"
      }
    ];

    setFeaturedBooks(featuredData);
    setNewReleases(newReleasesData);
  }, []);

  // Calculate cart items count
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Function to scroll to categories section
  const scrollToCategories = () => {
    categoriesSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Auth handlers
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Mock login - replace with actual API call
    login({ name: 'John Doe', email });
    setIsLoginOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Mock registration - replace with actual API call
    login({ name, email });
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const BookCard = ({ book, size = 'medium' }) => (
    <div className={`book-card ${size}`}>
      <div className="book-image">
        <img src={book.image} alt={book.title} />
        <div className="book-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        {book.rating && (
          <div className="book-rating">
            {'★'.repeat(Math.floor(book.rating))}
            {'☆'.repeat(5 - Math.floor(book.rating))}
            <span>({book.rating})</span>
          </div>
        )}
        {book.category && <span className="book-category">{book.category}</span>}
        <div className="book-price">${book.price}</div>
        <button 
          className="add-to-cart-btn" 
          onClick={() => addToCart(book)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="homepage">
      {/* Navigation Header */}
      <header className="header">
        <div className="container">
          <div className="nav-container">
            <div className="logo">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <h1>BookNook</h1>
              </Link>
            </div>
            <nav className="nav-menu">
              <a href="#home">Home</a>
              <a href="#featured">Featured</a>
              <a href="#new">New Releases</a>
            </nav>
            <div className="auth-buttons">
              {/* Cart Icon */}
              <Link to="/cart" className="cart-icon">
                🛒
                {cartItemsCount > 0 && (
                  <span className="cart-count">{cartItemsCount}</span>
                )}
              </Link>
              
              {user ? (
                <div className="user-menu">
                  <span>Welcome, {user.name}</span>
                  <button className="btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-buttons-container">
                  <button 
                    className="btn-login"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Login
                  </button>
                  <button 
                    className="btn-register"
                    onClick={() => setIsRegisterOpen(true)}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Discover Your Next Favorite Book</h1>
            <p>Explore thousands of books across all genres. From bestsellers to hidden gems, your next great read is just a click away.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Shop Now</button>
              <button 
                className="btn-secondary"
                onClick={scrollToCategories}
              >
                Browse Categories
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-books">
              <div className="book-stack"></div>
              <div className="book-stack"></div>
              <div className="book-stack"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="featured-section" id="featured">
        <div className="container">
          <h2>Featured Books</h2>
          <div className="books-grid">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} size="large" />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section 
        className="categories-section" 
        ref={categoriesSectionRef}
        id="categories"
      >
        <div className="container">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            <div className="category-card fiction">
              <h3>Fiction</h3>
              <p>Explore imaginative worlds</p>
            </div>
            <div className="category-card mystery">
              <h3>Mystery</h3>
              <p>Solve the puzzle</p>
            </div>
            <div className="category-card scifi">
              <h3>Sci-Fi</h3>
              <p>Journey to the future</p>
            </div>
            <div className="category-card romance">
              <h3>Romance</h3>
              <p>Stories of love</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="new-releases-section" id="new">
        <div className="container">
          <h2>New Releases</h2>
          <div className="books-grid horizontal">
            {newReleases.map(book => (
              <BookCard key={book.id} book={book} size="small" />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get notified about new releases, special offers, and reading recommendations.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={() => setIsLoginOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsLoginOpen(false)}>×</button>
            <h2>Login to Your Account</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password" required />
              </div>
              <button type="submit" className="btn-primary full-width">Login</button>
            </form>
            <p className="auth-switch">
              Don't have an account? 
              <button onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}>
                Register here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="modal-overlay" onClick={() => setIsRegisterOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsRegisterOpen(false)}>×</button>
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Full Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password" required />
              </div>
              <button type="submit" className="btn-primary full-width">Register</button>
            </form>
            <p className="auth-switch">
              Already have an account? 
              <button onClick={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}>
                Login here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* AI Chatbot Toggle */}
      <div className="chatbot-space">
        <button 
          className="chatbot-toggle"
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        >
          🤖
        </button>
        <div className={`chatbot-input-container ${isChatbotOpen ? 'open' : ''}`}>
          <div className="chatbot-input-field">
            <input 
              type="text" 
              placeholder="Ask for book recommendations..." 
            />
            <button>Ask AI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;