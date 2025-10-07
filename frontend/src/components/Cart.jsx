import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="login-required">
            <div className="login-icon">🔒</div>
            <h2>Login Required</h2>
            <p>Please log in to view your shopping cart and manage your items.</p>
            <div className="login-buttons">
              <Link to="/" className="btn-primary">
                Go to Homepage
              </Link>
              <button 
                className="btn-secondary"
                onClick={() => setIsLoginPromptOpen(true)}
              >
                Login Now
              </button>
            </div>
          </div>
        </div>

        {/* Login Prompt Modal */}
        {isLoginPromptOpen && (
          <div className="modal-overlay" onClick={() => setIsLoginPromptOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setIsLoginPromptOpen(false)}>×</button>
              <h2>Login Required</h2>
              <p>You need to be logged in to access your cart.</p>
              <div className="login-prompt-buttons">
                <Link to="/" className="btn-primary">
                  Continue Shopping
                </Link>
                <p className="auth-switch">
                  Don't have an account? <Link to="/">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="empty-icon">📚</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any books to your cart yet.</p>
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <div className="cart-header-info">
            <span className="user-welcome">Welcome, {user.fullName || user.email}!</span>
            <span className="cart-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || "/api/placeholder/100/150"} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-author">by {item.author}</p>
                  <div className="item-price">${item.price}</div>
                </div>
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {subtotal < 50 && (
                <div className="shipping-note">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
              <button className="btn-primary checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="recently-viewed">
          <h2>You Might Also Like</h2>
          <div className="suggestions-grid">
            <div className="suggestion-card">
              <img src="/api/placeholder/100/150" alt="Suggested book" />
              <h4>Atomic Habits</h4>
              <p>James Clear</p>
              <span className="price">$24.99</span>
            </div>
            <div className="suggestion-card">
              <img src="/api/placeholder/100/150" alt="Suggested book" />
              <h4>The Alchemist</h4>
              <p>Paulo Coelho</p>
              <span className="price">$18.99</span>
            </div>
            <div className="suggestion-card">
              <img src="/api/placeholder/100/150" alt="Suggested book" />
              <h4>Dune</h4>
              <p>Frank Herbert</p>
              <span className="price">$26.99</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsCheckoutOpen(false)}>×</button>
            <h2>Checkout Coming Soon!</h2>
            <div className="checkout-icon">🛒</div>
            <p>We're working on implementing secure checkout functionality.</p>
            <p>In the meantime, you can continue browsing our collection of books.</p>
            <div className="checkout-buttons">
              <button className="btn-primary" onClick={() => setIsCheckoutOpen(false)}>
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;