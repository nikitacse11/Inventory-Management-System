import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import products from "./products.json";


const Inventory = () => {
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      if (!prevCart[productId]) return prevCart;
      const updatedCart = { ...prevCart, [productId]: prevCart[productId] - 1 };
      if (updatedCart[productId] <= 0) delete updatedCart[productId];
      return updatedCart;
    });
  };

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const product = products.find((p) => p.id === parseInt(id));
    return { ...product, quantity };
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = Object.values(cart).reduce((acc, count) => acc + count, 0);

  return (
    <div className="container mt-4 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center w-100">Inventory Management System</h2>
        <button
          className="btn btn-primary position-absolute top-0 end-0 m-3"
          onClick={() => setShowCart(!showCart)}
        >
          Cart ({cartItemCount})
        </button>
      </div>
      
      <div className={`cart-sidebar ${showCart ? "cart-open" : ""}`}>
        <button className="close-cart" onClick={() => setShowCart(false)}>&times;</button>
        <h4 className="text-center">Cart Items</h4>
        {cartItems.length > 0 ? (
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} (₹{item.price} x {item.quantity})
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
              Total Price:
              <span>₹{totalPrice}</span>
            </li>
          </ul>
        ) : (
          <p className="text-center">No items in cart</p>
        )}
      </div>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card p-3 text-center">
              <img src={product.image} alt={product.name} className="img-fluid mb-2" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <h5>{product.name}</h5>
              <p>Price: ₹{product.price}</p>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-danger me-2" onClick={() => handleRemoveFromCart(product.id)}>-</button>
                <span className="mx-2">{cart[product.id] || 0}</span>
                <button className="btn btn-success ms-2" onClick={() => handleAddToCart(product.id)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
