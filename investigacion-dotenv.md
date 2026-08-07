# investigacion-dotenv.md

## 1. ¿Qué es dotenv?

**dotenv** es una dependencia de Node.js que permite cargar variables de entorno desde un archivo llamado `.env` y ponerlas a disposición de la aplicación mediante el objeto `process.env`.

Su principal finalidad es separar la **configuración** del **código fuente**, evitando escribir información sensible directamente en los archivos JavaScript. Entre estos datos se encuentran las credenciales de una base de datos, claves de APIs, puertos de ejecución, tokens o cualquier configuración que pueda variar entre distintos entornos.

Al iniciar la aplicación, `dotenv` lee el archivo `.env`, interpreta las variables definidas y las carga en memoria para que puedan utilizarse desde cualquier parte del proyecto.

### Ventajas de utilizar dotenv

- Mantiene las credenciales fuera del código fuente.
- Facilita cambiar la configuración sin modificar los archivos JavaScript.
- Permite utilizar diferentes configuraciones para desarrollo, pruebas y producción.
- Favorece un código más limpio, reutilizable y fácil de mantener.
- Es una práctica ampliamente utilizada en proyectos desarrollados con Node.js.

---

## 2. ¿Cómo se instala?

Para utilizar **dotenv** en un proyecto de Node.js es necesario instalar la dependencia mediante un gestor de paquetes. En este proyecto se utiliza **npm**, por lo que la instalación se realiza ejecutando el siguiente comando desde la terminal, ubicándose en la carpeta raíz del proyecto:

```bash
npm install dotenv
```

Una vez finalizada la instalación, la dependencia se agregará automáticamente al archivo `package.json`, dentro del apartado `dependencies`, permitiendo que pueda ser utilizada mediante la instrucción `import`.

Ejemplo de cómo aparecerá en el `package.json`:

```json
{
  "dependencies": {
    "dotenv": "^17.2.1"
  }
}
```

> **Nota:** Existen otros gestores de paquetes como **Yarn**, **pnpm** o **Bun** que también permiten instalar `dotenv`. Sin embargo, en este proyecto se utiliza **npm**, por lo que la documentación se centra en ese gestor.

---

## 3. ¿Cómo se configura?

Después de instalar la dependencia, se debe crear un archivo llamado **`.env`** en la raíz del proyecto. En este archivo se almacenan las variables de entorno utilizando el formato `NOMBRE=valor`.

### Ejemplo del archivo `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=movies
DB_PORT=3306
PORT=3000
```

Una vez creado el archivo, es necesario importar `dotenv` y ejecutar el método `config()` antes de utilizar cualquier variable de entorno. En proyectos que utilizan **ESModules** (`import/export`), la configuración se realiza de la siguiente manera:

```javascript
import dotenv from "dotenv";

dotenv.config();
```

Se recomienda ejecutar `dotenv.config()` al comienzo del archivo principal (`app.js`, `server.js` o `index.js`), ya que de esta forma todas las variables estarán disponibles durante la ejecución de la aplicación.

> **Importante:** El archivo `.env` no debería subirse a GitHub, ya que puede contener información confidencial. Lo habitual es agregarlo al archivo `.gitignore` y compartir un archivo `.env.example` con la estructura de las variables necesarias, pero sin incluir los valores reales.

---

## 4. ¿Cómo se accede a las variables definidas en el archivo `.env`?

Una vez ejecutado `dotenv.config()`, todas las variables definidas en el archivo `.env` quedan disponibles a través del objeto global `process.env`.

Cada variable puede accederse utilizando su nombre, por ejemplo:

```javascript
const puerto = process.env.PORT;
const host = process.env.DB_HOST;
const usuario = process.env.DB_USER;
const contraseña = process.env.DB_PASSWORD;
```

También pueden utilizarse directamente cuando sean necesarias:

```javascript
app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});
```

> **Nota:** Todas las variables obtenidas mediante `process.env` son de tipo **string**. Si una variable representa un número (como un puerto), Node.js la recibirá como una cadena de texto. En caso de ser necesario, puede convertirse utilizando `Number()` o `parseInt()`.

---

## 5. Ejemplo aplicado a un proyecto Node.js con Express y Sequelize

### Archivo `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=movies
DB_PORT=3306

PORT=3000
```

### Archivo `app.js`

```javascript
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});
```

### Archivo `database.js`

```javascript
import { Sequelize } from "sequelize";

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

export default database;
```

En este ejemplo, la conexión a la base de datos no utiliza valores escritos directamente en el código. En su lugar, Sequelize obtiene la información desde las variables de entorno cargadas por `dotenv`. De esta manera, si en algún momento cambia el host, el usuario, la contraseña o el nombre de la base de datos, únicamente será necesario modificar el archivo `.env`, sin alterar el código fuente de la aplicación.
