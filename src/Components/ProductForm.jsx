// This functional component renders a form for adding or editing a product.
// It uses props to manage form input values and handles user interactions.
export default function ProductForm({
  productName, // Current value of the product name input
  brand, // Current value of the brand input
  link, // Current value of the image link input
  price, // Current value of the price input
  handleSubmit, // Function to handle form submission
  setProductName, // Function to update the product name state
  setLink, // Function to update the image link state
  setBrand, // Function to update the brand state
  setPrice, // Function to update the price state
}) {
  return (
    // Main container for the form with a CSS class for styling
    <div className="productform">
      {/* Form element with an onSubmit handler to process form data */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* Form header */}
          <h2>Product Form</h2>
          {/* Label and input field for the product name */}
          <label>Product Name: </label>
          <input
            type="text" // Input type is text
            id="name" // Unique identifier for the input
            value={productName} // Controlled input tied to productName prop
            onChange={(e) => setProductName(e.target.value)} // Update productName state on user input
          />
        </div>

        <div>
          {/* Label and input field for the brand */}
          <label>Brand: </label>
          <input
            type="text" // Input type is text
            id="brand" // Unique identifier for the input
            value={brand} // Controlled input tied to brand prop
            onChange={(e) => setBrand(e.target.value)} // Update brand state on user input
          />
        </div>

        <div>
          {/* Label and input field for the image link */}
          <label>Image Link: </label>
          <input
            type="text" // Input type is text
            id="link" // Unique identifier for the input
            value={link} // Controlled input tied to link prop
            onChange={(e) => setLink(e.target.value)} // Update link state on user input
          />
        </div>

        <div className="price">
          {/* Label and input field for the price */}
          <label>Price:</label>
          <input
            type="number" // Input type is number to allow numeric values
            id="price" // Unique identifier for the input
            value={price} // Controlled input tied to price prop
            onChange={(e) => setPrice(e.target.value)} // Update price state on user input
          />
        </div>

        {/* Button to submit the form */}
        <button type="submit" className="addproduct">
          Add Product
        </button>
      </form>
    </div>
  );
}
