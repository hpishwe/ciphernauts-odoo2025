import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => setProducts((prev) => [product, ...prev]);

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
} 