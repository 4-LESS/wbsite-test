import React, { useState, useEffect, useMemo, useCallback } from "react";
import Papa from "papaparse";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductFilters from "../components/ProductFilters"; // Importando el componente de filtros
import { Card, Row, Col, Button, Spinner, Pagination, Container } from "react-bootstrap";

const ITEMS_PER_PAGE = 12;

// Función para generar una URL de imagen placeholder única basada en el ID del producto
const getPlaceholderImage = (id) => {
  // Usamos el ID del producto para obtener una imagen consistente para cada producto
  return `https://picsum.photos/seed/${id}/300/200`;
};

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  // Estados para filtros
  const [selectedLinea, setSelectedLinea] = useState(null);
  const [selectedGrupo, setSelectedGrupo] = useState(null);

  // Obtener el término de búsqueda desde la URL
  const searchTerm = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  }, [location.search]);

  // Filtrar productos basados en searchTerm, selectedLinea y selectedGrupo
  const filteredProductos = useMemo(() => {
    return productos.filter((producto) => {
      const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLinea = selectedLinea ? producto.LINEA === selectedLinea.value : true;
      const matchesGrupo = selectedGrupo ? producto.GRUPO === selectedGrupo.value : true;
      return matchesSearch && matchesLinea && matchesGrupo;
    });
  }, [productos, searchTerm, selectedLinea, selectedGrupo]);

  // Productos de la página actual
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProductos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProductos, currentPage]);

  const totalPages = Math.ceil(filteredProductos.length / ITEMS_PER_PAGE);

  // Cargar productos desde CSV con asignación de imágenes desde CDN
  const loadProductos = useCallback(async () => {
    try {
      const response = await fetch("/data/inventario.csv");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const buffer = await response.arrayBuffer();
      const decoder = new TextDecoder('windows-1252'); // Cambia a 'utf-8' si tu CSV está en UTF-8
      const csvText = decoder.decode(buffer);

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedProductos = results.data
            .filter(item => item.DETALLE && item.PRECIO)
            .map(item => ({
              id: item.CODIGO || Math.random().toString(36).substr(2, 9),
              nombre: item.DETALLE,
              stock: item.STOCK || "0",
              precio: item.PRECIO,
              LINEA: item.LINEA || "Sin LINEA",
              GRUPO: item.GRUPO || "Sin GRUPO",
              image: getPlaceholderImage(item.CODIGO || Math.random().toString(36).substr(2, 9)),
            }));
          setProductos(parsedProductos);
          setIsLoading(false);
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          setError("Hubo un problema al parsear los productos.");
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error("Error al cargar el archivo CSV:", err);
      setError("Hubo un problema al cargar los productos.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  // Manejar búsqueda
  const handleSearch = termino => {
    setCurrentPage(1);
    const params = new URLSearchParams(location.search);
    termino ? params.set("search", termino) : params.delete("search");
    navigate({ search: params.toString() }, { replace: true });
  };

  // Extraer opciones únicas de LINEA
  const lineaOptions = useMemo(() => {
    const uniqueLinea = Array.from(new Set(productos.map(p => p.LINEA).filter(l => l !== "Sin LINEA")));
    uniqueLinea.sort();
    return uniqueLinea.map(linea => ({ value: linea, label: linea }));
  }, [productos]);

  // Extraer opciones únicas de GRUPO basado en LINEA seleccionada
  const grupoOptions = useMemo(() => {
    let grupos = productos.map(p => p.GRUPO).filter(g => g !== "Sin GRUPO");
    if (selectedLinea) {
      grupos = productos
        .filter(p => p.LINEA === selectedLinea.value)
        .map(p => p.GRUPO)
        .filter(g => g !== "Sin GRUPO");
    }
    const uniqueGrupo = Array.from(new Set(grupos));
    uniqueGrupo.sort();
    return uniqueGrupo.map(grupo => ({ value: grupo, label: grupo }));
  }, [productos, selectedLinea]);

  // Manejar cambios en los filtros
  const handleLineaChange = selected => {
    setSelectedLinea(selected);
    setSelectedGrupo(null); // Resetear GRUPO al cambiar LINEA
    setCurrentPage(1);

    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("linea", selected.value);
    } else {
      params.delete("linea");
    }
    params.delete("grupo"); // Resetear grupo cuando cambia linea
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleGrupoChange = selected => {
    setSelectedGrupo(selected);
    setCurrentPage(1);

    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("grupo", selected.value);
    } else {
      params.delete("grupo");
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  // Paginación
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    const siblings = 1;
    const showLeftEllipsis = currentPage > siblings + 3;
    const showRightEllipsis = currentPage < totalPages - (siblings + 2);

    items.push(
      <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
        1
      </Pagination.Item>
    );

    if (showLeftEllipsis) items.push(<Pagination.Ellipsis key="start-ellipsis" />);

    const start = Math.max(2, currentPage - siblings);
    const end = Math.min(totalPages - 1, currentPage + siblings);

    for (let i = start; i <= end; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (showRightEllipsis) items.push(<Pagination.Ellipsis key="end-ellipsis" />);

    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
  };

  // Renderizado de la UI
  if (isLoading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Buscando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1>Productos</h1>
      <SearchBar onSearch={handleSearch} defaultValue={searchTerm} />

      {/* Componente de Filtros */}
      <ProductFilters
        lineaOptions={lineaOptions}
        grupoOptions={grupoOptions}
        selectedLinea={selectedLinea}
        selectedGrupo={selectedGrupo}
        onLineaChange={handleLineaChange}
        onGrupoChange={handleGrupoChange}
      />

      {/* Botón de Reset */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedLinea(null);
              setSelectedGrupo(null);
              handleSearch("");
              setCurrentPage(1);
              navigate({ search: "" }, { replace: true });
            }}
          >
            Resetear Filtros
          </Button>
        </Col>
      </Row>

      {/* Listado de Productos */}
      <Row>
        {currentItems.length ? (
          currentItems.map(({ id, nombre, stock, precio, image }) => (
            <Col key={id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={image}
                  alt={nombre}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{nombre}</Card.Title>
                  <Card.Text>
                    {stock === "0" ? (
                      <span className="text-danger">Agotado</span>
                    ) : (
                      `Stock: ${stock}`
                    )}
                  </Card.Text>
                  <Card.Text>Precio: ${precio}</Card.Text>
                  <Button variant="primary">Ver detalles</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center my-5">
            <p>No se encontraron productos.</p>
          </Col>
        )}
      </Row>
      {renderPagination()}
    </Container>
  );
};

export default Productos;
