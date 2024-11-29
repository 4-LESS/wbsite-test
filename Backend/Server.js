const express = require('express');
const Database = require('better-sqlite3'); // Cliente para SQLite

const app = express();

// Conectar a la base de datos
const db = new Database('./database.db');

// Crear tabla de inventario si no existe
db.prepare(`
    CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        category TEXT
    )
`).run();

// Insertar productos de prueba si la tabla está vacía
const initialProducts = [
    { name: "Paracetamol 500mg", description: "Analgésico y antipirético", price: 10.5, quantity: 100, category: "Medicamentos" },
    { name: "Ibuprofeno 200mg", description: "Anti-inflamatorio", price: 15.0, quantity: 50, category: "Medicamentos" },
    { name: "Alcohol en gel 70%", description: "Desinfectante de manos", price: 25.0, quantity: 200, category: "Higiene" }
];

// Verificar si ya existen productos en la tabla
const productExists = db.prepare('SELECT COUNT(*) AS count FROM inventory').get().count === 0;

if (productExists) {
    const insertProduct = db.prepare(`
        INSERT INTO inventory (name, description, price, quantity, category)
        VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((products) => {
        for (const product of products) {
            insertProduct.run(product.name, product.description, product.price, product.quantity, product.category);
        }
    });

    insertMany(initialProducts);
    console.log("Productos de prueba insertados en la base de datos.");
}

app.use(express.json());

// Rutas

// Obtener todos los productos
app.get('/api/inventory', (req, res) => {
    const inventory = db.prepare('SELECT * FROM inventory').all();
    res.json(inventory);
});

// Obtener un producto por ID
app.get('/api/inventory/:id', (req, res) => {
    const product = db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// Insertar un nuevo producto
app.post('/api/inventory', (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    const result = db.prepare(`
        INSERT INTO inventory (name, description, price, quantity, category)
        VALUES (?, ?, ?, ?, ?)
    `).run(name, description, price, quantity, category);

    res.status(201).json({ success: true, id: result.lastInsertRowid });
});

// Configuración del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
