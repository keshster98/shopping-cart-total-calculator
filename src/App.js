import { useState } from "react";
import "./index.css";

// Test data - Do not modify
const products = [
  { id: 1, title: "Minecraft", price: 29.99 },
  { id: 2, title: "FIFA 24", price: 59.99 },
  { id: 3, title: "Tetris", price: 9.99 },
  { id: 4, title: "The Sims", price: 39.99 },
  { id: 5, title: "Mario Kart", price: 49.99 },
];

function App() {
  // State to keep track of the shopping cart
  const [shoppingCart, setShoppingCart] = useState([]);
  // State to keep track of the total price
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Game Store</h1>
      <div className="row">
        {/* Available Games Section */}
        <div className="col-md-6">
          <h2 className="mb-4">Available Games</h2>
          {products.map((product) => {
            // Get the count of the product in the cart for the "X in cart" badge
            const count = shoppingCart.filter(
              (item) => item.id === product.id
            ).length;

            return (
              <div className="card mb-3" key={product.id}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-success">
                      ${product.price.toFixed(2)}{" "}
                      {/* toFixed(X) rounds off the price to X decimal places */}
                    </p>
                  </div>
                  <div>
                    {/* Show count if the product is in the cart, badge beside "Add To Cart" button */}
                    {/* Shorthand Method: If count > 0 is true, it performs code in bracket if not it doesn't */}
                    {count > 0 && (
                      <span className="badge bg-info text-dark me-2">
                        {count} in cart
                      </span>
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        // Add product to the cart. Shopping cart is cloned to prevent issues with original array, newly added product is appended to the new array alongside the original content
                        const updatedCart = [...shoppingCart, product];
                        setShoppingCart(updatedCart);
                        // Update total price
                        setTotalPrice(totalPrice + product.price);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shopping Cart Section */}
        <div className="col-md-6">
          <h2 className="mb-4">Shopping Cart</h2>
          <div className="card p-3 border-0 shadow-sm">
            {/* Show shopping cart only if a product is added to the shopping cart array */}
            {shoppingCart.length > 0 ? (
              <div>
                {shoppingCart.map((cartItem, index) => (
                  <div
                    className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2"
                    key={index}
                  >
                    <div>
                      <p className="mb-0 fw-bold">{cartItem.title}</p>
                      <p className="text-muted mb-0">
                        ${cartItem.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="btn text-danger p-0"
                      onClick={() => {
                        // Remove product from the cart
                        const productToRemove = shoppingCart[index];
                        // Callback function
                        const updatedCart = shoppingCart.filter(
                          (_, i) => i !== index
                        );
                        setShoppingCart(updatedCart);
                        // Update total price
                        setTotalPrice(totalPrice - productToRemove.price);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Display total items and total price */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="text-muted mb-0">Items in Cart:</h6>
                  <h6 className="fw-bold mb-0">{shoppingCart.length}</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <h6 className="text-muted mb-0">Total:</h6>
                  <h6 className="text-success fw-bold mb-0">
                    ${totalPrice.toFixed(2)}
                  </h6>
                </div>

                {/* "Proceed to Checkout" button */}
                <button className="btn btn-success w-100 mt-4 py-2 fw-bold">
                  Proceed to Checkout
                </button>
              </div>
            ) : (
              // If the cart is empty, display a message
              <p className="text-center text-muted">Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
