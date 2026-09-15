const { Op } = require('sequelize');
const Producto = require('../models/Producto');

// 2. GET /api/productos (Listar todos)
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 3. GET /api/productos/:id (Por ID)
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 7. GET /api/productos/buscar?nombre=texto
exports.buscarProductos = async (req, res) => {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      return res.status(200).json([]);
    }

    const productos = await Producto.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 4. POST /api/productos (Registrar)
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, estado } = req.body;

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }
    if (precio === undefined || precio === null || Number(precio) <= 0) {
      return res.status(400).json({ error: 'El precio es obligatorio y debe ser mayor a 0.' });
    }
    if (stock === undefined || stock === null || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      return res.status(400).json({ error: 'El stock es obligatorio y debe ser un entero no negativo.' });
    }

    const nuevoProducto = await Producto.create({
      nombre: nombre.trim(),
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      estado: estado !== undefined ? estado : true
    });

    return res.status(201).json(nuevoProducto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 5. PUT /api/productos/:id (Actualizar)
exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, estado } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }
    if (precio === undefined || precio === null || Number(precio) <= 0) {
      return res.status(400).json({ error: 'El precio es obligatorio y debe ser mayor a 0.' });
    }
    if (stock === undefined || stock === null || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      return res.status(400).json({ error: 'El stock es obligatorio y debe ser un entero no negativo.' });
    }

    await producto.update({
      nombre: nombre.trim(),
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      estado: estado !== undefined ? estado : producto.estado
    });

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 6. DELETE /api/productos/:id (Eliminar)
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.destroy();
    return res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};