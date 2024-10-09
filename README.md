# eCommerce Backend API - NestJS

Este es el backend de una aplicación de eCommerce construido con [NestJS](https://nestjs.com/), un framework de Node.js que utiliza TypeScript y está orientado a la construcción de aplicaciones escalables y mantenibles. La API proporciona endpoints para gestionar productos, usuarios, pedidos y autenticación, permitiendo la implementación de un sistema completo para el manejo de un eCommerce.

## Características

- **Gestión de usuarios**: Registro, autenticación y autorización de usuarios.
- **Gestión de productos**: CRUD completo (Crear, Leer, Actualizar, Eliminar) para productos.
- **Gestión de pedidos**: Creación y seguimiento de pedidos por parte de los usuarios.
- **Autenticación JWT**: Seguridad mediante JSON Web Tokens para proteger los endpoints.
- **Base de datos**: Integración con bases de datos relacionales utilizando [TypeORM](https://typeorm.io/).

## Tecnologías principales

- **NestJS**: Framework principal utilizado para la arquitectura del backend.
- **TypeScript**: Lenguaje de programación utilizado para un desarrollo más robusto.
- **TypeORM**: ORM para la integración con la base de datos.
- **JWT**: Autenticación mediante tokens JWT para proteger rutas privadas.
- **PostgreSQL** (o cualquier base de datos relacional compatible con TypeORM): Base de datos para almacenar información de productos, usuarios y pedidos.

## Bitacora

- **09/10/2024** App dockerizada
- **05/10/2024** Documentació generada mediante el uso de swagger y su respectivo plugin
- **29/09/2024** Se añadio un seed que registra un user admin al levantar a aplicación
- **26/09/2024** Guardias para roles implementadas
- **23/09/2024** Jwt y bcrypt implementados así como los cambios en la base de datos para guardar las claves hasheadas, ahora el authguard valida los tokens. La instalación con npm de bcrypt daba problemas y por ende la hice con yarn
- **20/09/2024** Subida de archivos a Cloudinary implementada, con sus respectivasvalidaciones.
- **20/09/2024** Se implementaron validaciones para las solicitudes (requests). También se desarrollaron los módulos de órdenes (order) y detalles de órdenes (order detail), con operaciones CRUD y la lógica necesaria para la adquisición de productos. Finalmente, se configuró la conexión a la base de datos, incluyendo los seeders para la precarga de datos.
- **08/09/2024** Se crearon modulos, controladores, servicios y rutas CRUD de Users, Products y Auth. También en este se creo un guard para las rutas que lo requieren.
- **03/09/2024** Commit inicial, se instalaron dependencias y se inicio el proyecto con Nest.
