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

- **08/09/2024** Se crearon modulos, controladores, servicios y rutas CRUD de Users, Products y Auth. También en este se creo un guard para las rutas que lo requieren
- **03/09/2024** Commit inicial, se instalaron dependencias y se inicio el proyecto con Nest
