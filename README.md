# 07-RESTSERVER

API REST de gestión de usuarios, categorías y productos construida con **Node.js**, **Express** y **MongoDB** — proyecto educativo del curso "Node de cero a experto".

## Descripción General

Servidor REST completo con sistema de autenticación seguro, gestión de imágenes y estructura modular escalable. Incluye:

- ✅ **Autenticación**: JWT con expiración de 1 hora + Google Sign-In
- ✅ **Validaciones**: express-validator en todas las rutas
- ✅ **Gestión de roles**: Admin y usuario estándar
- ✅ **Subida de imágenes**: Almacenamiento local y Cloudinary
- ✅ **Gestión de datos**: Usuarios, categorías y productos
- ✅ **Búsqueda**: Búsqueda global en categorías y productos
- ✅ **CORS**: Habilitado para acceso desde múltiples dominios

## Requisitos Previos

- **Node.js** >= 16
- **npm** o **yarn**
- **MongoDB** (local o MongoDB Atlas)
- **(Opcional)** Cuenta Cloudinary para uploads
- **(Opcional)** Google OAuth 2.0 credentials

## Instalación

### 1. Clonar y acceder al repositorio
```bash
cd "07-restserver"
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```env
PORT=3006
MONGODB_CNN=mongodb+srv://usuario:contraseña@cluster.mongodb.net/db_name
SECRETORPRIVATEKEY=tu_clave_secreta_jwt_muy_segura
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
GOOGLE_ID=tu_google_client_id.apps.googleusercontent.com
```

**Variables requeridas**: `PORT`, `MONGODB_CNN`, `SECRETORPRIVATEKEY`  
**Variables opcionales**: `CLOUDINARY_URL`, `GOOGLE_ID`

## Ejecución

### Desarrollo (con nodemon y recarga automática)
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor iniciará en `http://localhost:3006`

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor en modo desarrollo con nodemon |
| `npm start` | Inicia servidor en modo producción |
| `npm test` | Ejecutar pruebas (si aplica) |

## Estructura del Proyecto

```
07-restserver/
├── index.js                              # Entry point de la aplicación
├── package.json                          # Dependencias y scripts
├── .env.example                          # Variables de entorno (ejemplo)
├── .gitignore                            # Archivos ignorados por git
├── README.md                             # Este archivo
│
├── models/                               # Modelos Mongoose y configuración servidor
│   ├── server.js                         # Clase Server (Express, rutas, middlewares)
│   ├── usuario.js                        # Schema Usuario (nombre, email, password, rol, etc)
│   ├── role.js                           # Schema Rol (admin_role, user_role)
│   ├── categoria.js                      # Schema Categoría (nombre, estado, usuario ref)
│   └── producto.js                       # Schema Producto (nombre, precio, categoria, usuario, etc)
│
├── database/
│   └── config.js                         # Conexión MongoDB (mongoose.connect)
│
├── router/                               # Rutas de la API (Express.Router)
│   ├── auth.js                           # Autenticación: POST /login, /google
│   ├── user.js                           # Usuarios: GET, POST, PUT, DELETE /:id
│   ├── categorias.js                     # Categorías: GET, POST, PUT, DELETE
│   ├── productos.js                      # Productos: GET, POST, PUT, DELETE
│   ├── uploads.js                        # Subida de archivos: POST, PUT, GET
│   └── buscar.js                         # Búsquedas globales: GET /:coleccion/:termino
│
├── controllers/                          # Lógica de negocio de cada ruta
│   ├── auth.js                           # authpost(), googleSingIn()
│   ├── user.js                           # userget(), userpost(), userput(), userdelete(), userpatch()
│   ├── categorias.js                     # categoriasget(), categoriaspost(), categoriasput(), categoriasdelete()
│   ├── productos.js                      # productosget(), productopost(), productosput(), productosdelete()
│   ├── uploads.js                        # cargararchivospost(), actualizarimagenclaudinary(), mostrarimagen()
│   └── buscar.js                         # buscarget() - búsqueda en categorías y productos
│
├── middlewares/                          # Funciones middleware de Express
│   ├── validar-jwt.js                    # Valida token JWT en Authorization header
│   ├── validar-roles.js                  # Valida roles (admin_role, user_role, etc)
│   ├── validar-archivo.js                # Valida tipo y tamaño de archivo
│   └── validations.js                    # Middleware de express-validator
│
├── helpers/                              # Funciones auxiliares
│   ├── generar-jwt.js                    # Genera token JWT con expiración 1h
│   ├── google-verify.js                  # Verifica token de Google Sign-In
│   ├── subir-archivo.js                  # Sube archivos a local o Cloudinary
│   └── db-validators.js                  # Validadores custom (email único, rol válido, etc)
│
├── uploads/                              # Almacenamiento local de imágenes
│   ├── imagenes/                         # Imágenes generales
│   ├── productos/                        # Fotos de productos
│   └── usuarios/                         # Avatares de usuarios
│
└── public/                               # Contenido estático
    └── index.html                        # Demo de Google Sign-In
```

## Modelos de Datos

### Usuario
```javascript
{
  nombre: String (requerido),
  correo: String (requerido, único),
  password: String (requerido, >6 caracteres, hasheado con bcrypt),
  img: String (URL de imagen/avatar),
  rol: String (requerido, ej: 'admin_role', 'user_role'),
  estado: Boolean (default: true),
  google: Boolean (default: false, indica si se autenticó con Google)
}
```
**Método especial**: `toJSON()` excluye `password`, `__v`

### Categoría
```javascript
{
  nombre: String (requerido, único),
  estado: Boolean (default: true),
  usuario: ObjectId ref Usuario (requerido)
}
```

### Producto
```javascript
{
  nombre: String (requerido, único),
  estado: Boolean (default: true),
  usuario: ObjectId ref Usuario (requerido),
  categoria: ObjectId ref Categoría (requerido),
  precio: Number (default: 0),
  descripcion: String (default: 'Sin descripción disponible'),
  disponible: Boolean (default: true),
  img: String (URL de imagen)
}
```

### Rol
```javascript
{
  rol: String (requerido, ej: 'admin_role', 'user_role')
}
```

## Endpoints de la API

### Base URL
```
http://localhost:3006/api
```

### Autenticación

#### Login con correo y contraseña
```http
POST /auth/login
Content-Type: application/json

{
  "correo": "usuario@example.com",
  "password": "contraseña123"
}

Response: { token: "eyJ0eXAiOiJKV1Q..." }
```

#### Google Sign-In
```http
POST /auth/google
Content-Type: application/json

{
  "id_token": "token_google_aqui"
}

Response: { token: "eyJ0eXAiOiJKV1Q..."}
```

### Usuarios

#### Obtener todos los usuarios
```http
GET /user
```

#### Obtener usuario por ID
```http
GET /user/:id
```

#### Crear nuevo usuario
```http
POST /user
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "password": "seguro123",
  "rol": "user_role"
}
```

#### Actualizar usuario por ID
```http
PUT /user/:id
Authorization: eyJ0eXAiOiJKV1Q...
Content-Type: application/json

{
  "nombre": "Juan Updated",
  "rol": "admin_role"
}
```

#### Eliminar usuario por ID
```http
DELETE /user/:id
Authorization: eyJ0eXAiOiJKV1Q...
```
*Requiere rol: `admin_role` o `send_role`*

#### Actualización parcial
```http
PATCH /user
```

### Categorías

#### Obtener todas las categorías (público)
```http
GET /categorias
```

#### Obtener categoría por ID (público)
```http
GET /categorias/:id
```

#### Crear categoría (privado - requiere token)
```http
POST /categorias
Authorization: eyJ0eXAiOiJKV1Q...
Content-Type: application/json

{
  "nombre": "Electrónica"
}
```

#### Actualizar categoría (privado - requiere token)
```http
PUT /categorias/:id
Authorization: eyJ0eXAiOiJKV1Q...
Content-Type: application/json

{
  "nombre": "Electrónica Actualizado"
}
```

#### Eliminar categoría (privado - requiere admin)
```http
DELETE /categorias/:id
Authorization: eyJ0eXAiOiJKV1Q...
```
*Requiere rol: `admin_role`*

### Productos

#### Obtener todos los productos (privado - requiere token)
```http
GET /productos
Authorization: eyJ0eXAiOiJKV1Q...
```

#### Obtener producto por ID (público)
```http
GET /productos/:id
```

#### Crear producto (privado - requiere token)
```http
POST /productos
Authorization: eyJ0eXAiOiJKV1Q...
Content-Type: application/json

{
  "nombre": "Laptop HP",
  "categoria": "id_categoria",
  "precio": 899.99,
  "descripcion": "Laptop de alta performance",
  "disponible": true
}
```

#### Actualizar producto (privado - requiere token)
```http
PUT /productos/:id
Authorization: eyJ0eXAiOiJKV1Q...
Content-Type: application/json

{
  "nombre": "Laptop HP Updated",
  "precio": 799.99
}
```

#### Eliminar producto (privado - requiere admin)
```http
DELETE /productos/:id
Authorization: eyJ0eXAiOiJKV1Q...
```
*Requiere rol: `admin_role`*

### Búsquedas

#### Buscar en todas las colecciones
```http
GET /buscar/:coleccion/
```

#### Buscar por término
```http
GET /buscar/:coleccion/:termino

Colecciones soportadas: usuarios, categorias, productos
```

### Subida de Archivos

#### Subir archivo
```http
POST /uploads
(multipart/form-data: file)
```

#### Actualizar imagen de usuario o producto
```http
PUT /uploads/:coleccion/:id
Authorization: eyJ0eXAiOiJKV1Q...
(multipart/form-data: file)

Colecciones: usuarios, productos
```

#### Obtener imagen
```http
GET /uploads/:coleccion/:id
```

## Autenticación y Seguridad

### JWT (JSON Web Token)
- **Generación**: Token con expiración de 1 hora
- **Validación**: Middleware `validar-jwt` revisa el header `Authorization`
- **Payload**: Contiene `uid` (user ID)

### Contraseñas
- **Hash**: Utiliza `bcrypt` (versión 6.0.0)
- **Hash automático**: Se realiza antes de guardar en BD

### Roles y Permisos
- **admin_role**: Acceso total (crear, leer, actualizar, eliminar)
- **user_role**: Crear y actualizar contenido, pero no eliminar
- **send_role**: Rol especial para ciertos permisos

### Validaciones
- Email único en la base de datos
- Campos requeridos validados con express-validator
- MongoId válido para parámetros de ruta
- Archivo válido antes de subir

## Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| express | 5.2.1 | Framework HTTP |
| mongoose | 9.0.2 | ODM MongoDB |
| jsonwebtoken | 9.0.3 | Generación/validación JWT |
| bcrypt | 6.0.0 | Hash de contraseñas |
| express-validator | 7.3.1 | Validaciones en rutas |
| express-fileupload | 1.5.2 | Subida de archivos |
| cloudinary | 2.9.0 | Almacenamiento en nube |
| google-auth-library | 10.5.0 | Verificación Google OAuth |
| cors | 2.8.5 | Control de acceso CORS |
| dotenv | 17.2.3 | Variables de entorno |
| uuid | 13.0.0 | Generación de IDs únicos |

## Configuración de Proyecto

### Punto de entrada
- **Archivo**: `index.js`
- **Clase servidor**: `models/server.js`
- **Conexión BD**: `database/config.js`

### Middlewares globales
- `express.static('public')` - Directorio estático
- `cors()` - Permitir CORS
- `express.json()` - Parseo JSON
- `express-fileupload` - Manejo de uploads

### Rutas base
- `/api/user` - Gestión de usuarios
- `/api/auth` - Autenticación
- `/api/categorias` - Gestión de categorías
- `/api/productos` - Gestión de productos
- `/api/buscar` - Búsquedas globales
- `/api/uploads` - Subida de archivos

## Flujo de Autenticación

1. **Registro/Login**: Usuario proporciona credenciales
2. **Validación**: Contraseña se verifica con bcrypt
3. **Generación JWT**: Se genera token con expiración 1h
4. **Token en header**: Cliente envía `Authorization: <token>` en requests
5. **Validación middleware**: Cada ruta privada valida el token
6. **Acceso**: Si token es válido, se ejecuta la ruta

## Notas Importantes

- Todos los **tokens expiran en 1 hora**
- Las **imágenes se almacenan localmente** en `/uploads` (o Cloudinary si está configurado)
- **CORS está habilitado** para desarrollo - ajustar en producción
- **MongoDB debe estar corriendo** antes de iniciar el servidor
- **Roles deben existir en base de datos** antes de crear usuarios
- **Validaciones de campo requeridas** en todas las rutas POST/PUT

## Desarrollo

Este proyecto es parte del curso "Node de cero a experto" y sirve como referencia educativa para:
- Arquitectura REST
- Autenticación con JWT
- Gestión de roles y permisos
- Validaciones en backend
- Almacenamiento de archivos
- Integración con bases de datos nativas
- Buenas prácticas en nodejs/express

## Contribuir
- Abrir issues y pull requests
- Mantener estilo y pruebas
- Actualizar documentación si cambian rutas o variables de entorno

## Licencia
MIT
