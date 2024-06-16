import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const fetchProducts = async () => {
      const response = await fetch(`${URL}/api/productos`);
      const data = await response.json();
      setProducts(data);
    };
    
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
