## webserver + restserver

### Descripción
Proyecto de servidor REST construido con Node.js y Express. Incluye un servidor web y un servidor REST API funcional.

### Requisitos previos
- Node.js (v14 o superior)
- npm

### Instalación
```bash
npm install
```

### Uso
Para iniciar el servidor:
```bash
npm start
```

O en modo desarrollo:
```bash
npm run dev
```

### Estructura del proyecto
```
├── public/           # Archivos estáticos
├── routes/          # Rutas de la API
├── controllers/     # Controladores
├── models/          # Modelos de datos
├── server.js        # Archivo principal del servidor
└── package.json     # Dependencias del proyecto
```

### Endpoints principales
- `GET /api/` - Obtener información
- `POST /api/` - Crear nuevos datos
- `PUT /api/:id` - Actualizar datos
- `DELETE /api/:id` - Eliminar datos

### Tecnologías utilizadas
- Node.js
- Express.js
- REST API
- JavaScript ES6+

### Licencia
MIT 
