// Importing the ProductCard component to display individual product information.
import ProductCard from "./ProductCard";

// This component renders a container for displaying a list of products.
// It receives a list of products and functions for handling various actions.
export default function ProductsContainer({
  products, // Array of product objects to display
  handleAddQuantity, // Function to increase product quantity
  handleRemoveQuantity, // Function to decrease product quantity
  handleAddToCart, // Function to add a product to the cart
  productQuantity, // Array containing the quantities of each product
}) {
  return (
    // Main container for products with a CSS class for styling
    <div className="ProductsContainer">
      {/* Iterate over the products array and render a ProductCard for each product */}
      {products.map((product) => (
        <ProductCard
          key={product.id} // Unique key for React to track the component
          {...product} // Spread operator to pass all product properties as props
          handleAddQuantity={handleAddQuantity} // Pass function to increase quantity
          handleRemoveQuantity={handleRemoveQuantity} // Pass function to decrease quantity
          handleAddToCart={handleAddToCart} // Pass function to add product to cart
          productQuantity={
            productQuantity.find((p) => p.id === product.id).quantity
          }
          // Extract the quantity of the current product from productQuantity array
        />
      ))}
    </div>
  );
}
