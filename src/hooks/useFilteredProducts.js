// src/hooks/useFilteredProducts.js
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useFilteredProducts = (productos) => {
  const [filteredProducts, setFilteredProducts] = useState(productos);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    setSearchTerm(search);
  }, [location]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredProducts(
      productos.filter(product =>
        product.nombre.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, productos]);

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    navigate(`/productos?search=${encodeURIComponent(term)}`);
  };

  return { filteredProducts, searchTerm, handleSearchSubmit };
};

export default useFilteredProducts;
