## REST Server con Node.js y Express

### Descripción
Servidor REST API construido con Node.js y Express para gestión de usuarios y roles. Incluye validación de datos, autenticación con bcrypt y conexión a MongoDB.

### Requisitos previos
- Node.js (v14 o superior)
- npm
- MongoDB

### Instalación
```bash
npm install
```

### Configuración
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=8000
MOMGODB_CNN=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_bd
```

### Uso
Para iniciar el servidor:
```bash
npm start
```

O en modo desarrollo con nodemon:
```bash
npm run dev
```

### Estructura del proyecto
```
├── public/              # Archivos estáticos
├── router/              # Rutas de la API
├── controllers/         # Controladores
├── models/              # Modelos de datos (Usuario, Role, Server)
├── database/            # Configuración de BD
├── middlewares/         # Middlewares de validación
├── helpers/             # Validadores personalizados
├── index.js             # Punto de entrada
└── package.json         # Dependencias del proyecto
```

### Endpoints principales

#### Usuarios
- `GET /api/user` - Obtener todos los usuarios (con paginación)
  - Query params: `limite` (default: 5), `desde` (default: 0)
- `POST /api/user` - Crear nuevo usuario
- `PUT /api/user/:id` - Actualizar usuario por ID
- `DELETE /api/user/:id` - Eliminar usuario por ID (cambiar estado a inactivo)
- `PATCH /api/user` - Actualizar parcialmente

### Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB con Mongoose
- bcrypt (encriptación de contraseñas)
- express-validator (validación de datos)
- CORS
- dotenv (variables de entorno)

### Licencia
ISC
