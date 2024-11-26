import { useState, useEffect } from "react"; // React hooks for state and lifecycle management
import CartContainer from "./CartContainer"; // Component to display and manage the shopping cart
import ProductForm from "./ProductForm"; // Form for adding new products
import ProductsContainer from "./ProductsContainer"; // List of available products
import NavBar from "./NavBar"; // Navigation bar, possibly showing the cart item count
import axios from "axios"; // HTTP client for making API calls

export default function GroceriesAppContainer() {
  // State variables to manage different parts of the application
  const [productQuantity, setProductQuantity] = useState([]); // Stores product quantities
  const [cartList, setCartList] = useState([]); // Stores products in the shopping cart
  const [productList, setProductList] = useState([]); // Stores all available products
  const [newProduct, setNewProduct] = useState({
    productName: "",
    image: "",
    price: "",
    brand: "",
  }); // Holds form data for a new product

  // Temporary states for form inputs
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setLink] = useState("");

  // Handles submission of the product form
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    const newProductData = { productName, price, brand, image }; // Create a new product object
    setProductName(""); // Clear form input
    setPrice(0);
    setBrand("");
    setLink("");
    addNewProduct(newProductData); // Add the new product to the database
  };

  // Fetch products from the database when the component mounts
  useEffect(() => {
    fetchProductsFromDB(); // Fetch data only once at the beginning
  }, []);

  // Maps products to an array of objects with quantity initialized to 0
  const initialQuantity = (prods) =>
    prods.map((prod) => ({ id: prod.id, quantity: 0 }));

  // Fetches products from the database using an API call
  const fetchProductsFromDB = async () => {
    try {
      const result = await axios.get("http://localhost:3000/products");
      setProductList(result.data); // Update state with fetched products
      setProductQuantity(initialQuantity(result.data)); // Initialize quantities
    } catch (error) {
      console.error(error.message); // Handle any API errors
    }
  };

  // Adds a new product to the database
  const addNewProduct = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );
      setProductList((prev) => [...prev, response.data]); // Append new product to the list
      setNewProduct({ productName: "", price: "", brand: "", image: "" }); // Reset form
    } catch (error) {
      console.error(error.message); // Handle errors
    }
  };

  // Deletes a product by its ID
  const handleDeleteProduct = async (productId) => {
    try {
      console.log("Deleting product with ID:", productId); // Debug log
      await axios.delete(`http://localhost:3000/products/${productId}`);
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      ); // Remove the deleted product from the state
    } catch (error) {
      console.error("Error deleting product:", error); // Handle errors
    }
  };

  // Updates a product's details
  const handleEditProduct = async (productId, updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${productId}`,
        updatedProduct
      );
      setProductList((prev) =>
        prev.map((product) =>
          product.id === productId ? response.data : product
        )
      ); // Update the product in the state
    } catch (error) {
      console.error(error.message); // Handle errors
    }
  };

  // Adjusts the quantity of a product
  const handleAddQuantity = (productId, mode) => {
    const updater = (productList) =>
      productList.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

    if (mode === "cart") {
      setCartList(updater(cartList)); // Update cart quantities
    } else {
      setProductQuantity(updater(productQuantity)); // Update product list quantities
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    const updater = (productList) =>
      productList.map((product) =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

    if (mode === "cart") {
      setCartList(updater(cartList)); // Decrease cart quantities
    } else {
      setProductQuantity(updater(productQuantity)); // Decrease product list quantities
    }
  };

  // Adds a product to the shopping cart
  const handleAddToCart = (productId) => {
    const product = productList.find((p) => p.id === productId); // Find the product
    const quantityObj = productQuantity.find((q) => q.id === productId); // Find its quantity

    if (!quantityObj || quantityObj.quantity === 0) {
      alert(`Please select a quantity for ${product.productName}`);
      return;
    }

    setCartList((prev) => {
      const productInCart = prev.find((p) => p.id === productId);

      if (productInCart) {
        return prev.map((p) =>
          p.id === productId
            ? { ...p, quantity: p.quantity + quantityObj.quantity }
            : p
        );
      }

      return [...prev, { ...product, quantity: quantityObj.quantity }]; // Add new item to cart
    });
  };

  // Removes a product from the cart
  const handleRemoveFromCart = (productId) => {
    setCartList((prev) => prev.filter((product) => product.id !== productId));
  };

  // Clears the entire cart
  const handleClearCart = () => {
    setCartList([]); // Reset cart state
  };

  // Renders the application UI
  return (
    <div>
      {/* Navigation bar displaying the number of items in the cart */}
      <NavBar quantity={cartList.length} />
      <div className="GroceriesApp-Container">
        {/* Form to add new products */}
        <ProductForm
          onAddProduct={setNewProduct}
          handleSubmit={handleSubmit}
          setProductName={setProductName}
          setBrand={setBrand}
          setLink={setLink}
          setPrice={setPrice}
        />
        {/* Container for the product list */}
        <ProductsContainer
          products={productList}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleDeleteProduct={handleDeleteProduct}
          handleEditProduct={handleEditProduct}
        />
        {/* Container for the shopping cart */}
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
