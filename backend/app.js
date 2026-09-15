const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Conectado a SQL Server y tablas sincronizadas.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con SQL Server:', err);
  });