import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, clearCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import "../../Style/ProductList.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.items || []);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleRemove = (id) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleClear = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(clearCart());
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  useEffect(() => {
    console.log('Cart updated, recalculate total:', calculateTotal());
  }, [cartItems]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="item-info">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="item-image"
                      />
                      <div className="item-details">
                        <p className="item-title">{item.title}</p>
                        <p className="item-price">
                          Price: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="item-stock">In Stock</p>
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => handleRemove(item.id)} className="remove-button">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleClear} className="clear-cart-button">
                Clear Cart
              </button>
            </>
          )}
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Subtotal: ${calculateTotal()}</p>
          <p>Discount: $0.00</p>
          <p>Delivery: Free</p>
          <p>Tax: $0.00</p>
          <h4>Total: ${calculateTotal()}</h4>
          <button className="checkout-button">Proceed to Checkout</button>
          <button className="continue-shopping-button" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
