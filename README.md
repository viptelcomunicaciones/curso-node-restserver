# 07-RESTSERVER

Servidor REST de ejemplo construido con Node.js, Express y MongoDB — proyecto del curso "Node de cero a experto" (07-restserver).

## Descripción
API para gestionar usuarios, roles, categorías y productos, con:
- Autenticación JWT y Google Sign-In.
- Validaciones con express-validator.
- Subida y gestión de imágenes (local / Cloudinary).
- Estructura modular: routers, controladores, middlewares, helpers y modelos Mongoose.

## Requisitos
- Node.js >= 16
- npm o yarn
- MongoDB (local o Atlas)

## Instalación
1. Clonar repositorio y situarse en la carpeta:
   cd "07-restserver"
2. Instalar dependencias:
   npm install
   o
   yarn install

## Variables de entorno
Copiar `.env.example` a `.env` y configurar al menos:
- PORT=3006
- MONGODB_CNN=<cadena_de_conexión_mongodb>
- SECRETORPRIVATEKEY=<clave_secreta_jwt>
Opcionales:
- CLOUDINARY_URL=<url_cloudinary>
- GOOGLE_ID=<client_id_google>

## Ejecutar
- Desarrollo (con nodemon): npm run dev
- Producción: npm start

Entry point: `index.js`  
Clase servidor: `models/server.js`  
Conexión DB: `database/config.js`

## Scripts (package.json)
- npm run dev — desarrollo (nodemon)
- npm start — producción
- npm test — ejecutar pruebas (si aplica)

## Estructura del repositorio
```
07-restserver/
├── index.js                          # Entry point
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── README.md
│
├── models/
│   ├── server.js                     # Clase servidor (Express)
│   ├── usuario.js                    # Schema usuario
│   ├── role.js                       # Schema rol
│   ├── categoria.js                  # Schema categoría
│   └── producto.js                   # Schema producto
│
├── database/
│   └── config.js                     # Conexión MongoDB
│
├── routes/
│   ├── user.js                       # Rutas usuarios
│   ├── auth.js                       # Autenticación y login
│   ├── categorias.js                 # Rutas categorías
│   ├── productos.js                  # Rutas productos
│   ├── uploads.js                    # Subida de archivos
│   └── buscar.js                     # Búsquedas
│
├── controllers/
│   ├── usuariosController.js         # Lógica usuarios
│   ├── authController.js             # Lógica autenticación
│   ├── categoriasController.js       # Lógica categorías
│   ├── productosController.js        # Lógica productos
│   ├── uploadsController.js          # Lógica uploads
│   └── buscarController.js           # Lógica búsquedas
│
├── middlewares/
│   ├── validar-jwt.js                # Validación JWT
│   ├── validar-archivo.js            # Validación archivos
│   ├── validar-roles.js              # Validación roles/permisos
│   └── validations.js                # Validaciones express-validator
│
├── helpers/
│   ├── generar-jwt.js                # Generación de tokens JWT
│   ├── google-verify.js              # Verificación Google Sign-In
│   ├── subir-archivo.js              # Lógica subida (local/Cloudinary)
│   └── db-validators.js              # Validadores personalizados BD
│
├── uploads/                          # Almacenamiento local imágenes
│   └── .gitkeep
│
└── public/                           # Demo Google Sign-In
    ├── index.html
    └── [assets]
```

## Endpoints principales (resumen)
Base URL: `http://localhost:{PORT}/api`

### Auth
- `POST /auth/login` — `{ correo, password }` → token
- `POST /auth/google` — `{ id_token }` → token (Google Sign-In)

### Usuarios
- `GET /user?limite=5&desde=0` — listar
- `POST /user` — crear `{ nombre, correo, password, rol }`
- `PUT /user/:id` — actualizar
- `DELETE /user/:id` — eliminar

### Categorías
- `GET /categorias` — listar
- `GET /categorias/:id` — obtener por ID
- `POST /categorias` — crear (token requerido)
- `PUT /categorias/:id` — actualizar (token requerido)
- `DELETE /categorias/:id` — eliminar (admin)

### Productos
- `GET /productos` — listar
- `GET /productos/:id` — obtener por ID
- `POST /productos` — crear (token requerido)
- `PUT /productos/:id` — actualizar (token requerido)
- `DELETE /productos/:id` — eliminar (admin)

### Uploads / Imágenes
- `POST /uploads` — subir archivo
- `PUT /uploads/:coleccion/:id` — actualizar imagen
- `GET /uploads/:coleccion/:id` — mostrar imagen

### Búsquedas
- `GET /buscar/:coleccion/:termino` — buscar por término

## Seguridad y validaciones
- JWT: generación en `helpers/generar-jwt.js`, verificación en `middlewares/validar-jwt.js`.
- Roles y permisos: `middlewares/validar-roles.js`.
- Validaciones de datos: `express-validator` y `helpers/db-validators.js`.

## Subida de archivos
- Lógica central: `helpers/subir-archivo.js`.
- Middleware de comprobación: `middlewares/validar-archivo.js`.
- Soporta almacenamiento local y Cloudinary (configurar `CLOUDINARY_URL`).

## Pruebas
- Añadir y ejecutar pruebas con `npm test` si están presentes.
- Para pruebas manuales usar Postman o Insomnia apuntando a http://localhost:{PORT}/api.

## Contribuir
- Abrir issues y pull requests.
- Mantener estilo y pruebas.
- Actualizar documentación si se cambian rutas o variables de entorno.

## Notas
- Asegurar que `MONGODB_CNN` y `SECRETORPRIVATEKEY` estén en `.env`.
- Revisar `uploads/` en .gitignore y permisos de lectura/escritura.

## Licencia
MIT
