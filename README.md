
# 🍽️ API Restaurante - Desafío Técnico

Bienvenido a la API para la gestión de productos y órdenes de un restaurante. Este proyecto forma parte de un desafío técnico, y tiene como objetivo administrar un inventario de productos y permitir la creación de órdenes con validaciones de stock.

---

## ⚙️ Instalación

```
npm install
```

---

## 🛠️ Configuración 

1. Copiar el archivo `.env.example` y renombrarlo como `.env`.
2. Reemplazar los valores con los datos correspondientes:

```env
# Puerto en el que corre la aplicación
PORT=3000

# Usuario de la base de datos
PG_USER=tu_usuario

# Contraseña del usuario de la base de datos
PG_PASSWORD=tu_contraseña

# Nombre de la base de datos
PG_DATABASE=tu_base_de_datos

# Host donde se encuentra la base de datos (normalmente localhost)
PG_HOST=localhost

# Puerto de conexión de la base de datos (por defecto 5432 para PostgreSQL)
PG_PORT=5432

```

---

## 🚀 Comandos útiles

```
npm run dev     # Ejecuta el proyecto en modo desarrollo con nodemon
npm run start   # Ejecuta el proyecto en modo producción
```

---

## 📡 Endpoints principales

### 📦 Productos

- `GET /products`  
  🔹 Lista todos los productos con stock mayor a 0

- `GET /products/:id`  
  🔹 Trae un producto específico por ID (si su stock > 0)

- `POST /products`  
  🔹 Crea un nuevo producto  
  📝 **Body ejemplo:**
  ```json
  {
    "name": "Producto 1",
    "price": 29.3,
    "stock": 3
  }
  ```

- `PUT /products/:id`  
  🔹 Actualiza un producto por ID  
  📝 **Body ejemplo:**
  ```json
  {
    "name": "Producto 1",
    "price": 13.5,
    "stock": 1
  }
  ```

---

### 🧾 Órdenes

- `POST /orders`  
  🔹 Crea una nueva orden (solo si hay stock disponible)  
  📝 **Body ejemplo:**
  ```json
  {
    "customer_name": "Customer 1",
    "products": [
      {
        "product_id": 10,
        "amount": 1
      }
    ]
  }
  ```

- `GET /orders`  
  🔹 Lista todas las órdenes

- `GET /orders/:id`  
  🔹 Muestra una orden específica por ID

###  Seeder
- `POST /seeder`
  🔹 Precarga la base de datos con datos ficticios (productos y ordenes)

## Ayuda para limpiar la base de datos
```bash
-- Borrar todos los registros en orden correcto
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;

-- Reiniciar los IDs autoincrementales (si estás usando Postgres)
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;

```