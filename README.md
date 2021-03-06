# cow-ork

- [cow-ork](#cow-ork)
  - [Instalación y uso](#instalación-y-uso)
    - [server/.env.example](#serverenvexample)
    - [client/.env.example](#clientenvexample)
  - [Realizando reservas](#realizando-reservas)
  - [Autores](#autores)

## Instalación y uso

Instalar las dependencias:

```bash
npm install
```

Copiar los archivos `server/.env.example` y `client/.env.example` y renombrar ambos a `.env`. Probablemente sea necesario modificar el usuario y la contraseña, también se debe crear la base de datos, adicionalmente, será necesaria una cuenta en [Mailjet](https://www.mailjet.com/) y [Stripe](https://stripe.com/), para ajustar las variables de entorno según correspondan.

### server/.env.example

```
HOST=localhost
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_NAME=cow_ork
DB_USER=root
DB_PASSWORD=

JWT_SECRET=SecretCowLevel

MAILJET_API_KEY=
MAILJET_API_SECRET=
MAILJET_SENDER_NAME=cow-ork
MAILJET_SENDER_EMAIL=admin@cow-ork.com

STRIPE_API_SECRET=
```

### client/.env.example

```
REACT_APP_SERVER_URL=http://localhost:3001
REACT_APP_STRIPE_PUBLIC_KEY=
```

Inicializar la base de datos:

```bash
npm run migrate
```

Al ejecutar el comando `npm run migrate`, las migraciones crearán las tablas con información que se utilizó para testear la aplicación, todos los datos han sido generados de forma aleatoria. La lista de usuarios insertada es la siguiente:

|              Correo              | Contraseña |      Rol      |
| :------------------------------: | :--------: | :-----------: |
|        admin@cow-ork.com         |   123456   | Administrador |
|     fhunnisett1@archive.org      |   123456   |    Usuario    |
|     bjefferson2@google.co.jp     |   123456   |    Usuario    |
|        bhearty3@hc360.com        |   123456   |    Usuario    |
| plambertazzi4@huffingtonpost.com |   123456   |    Usuario    |
|        bphette5@narod.ru         |   123456   |    Usuario    |
|         twiper6@fda.gov          |   123456   |    Usuario    |
|      rstrickland7@wired.com      |   123456   |    Usuario    |
| dmarwood8@nationalgeographic.com |   123456   |    Usuario    |
|      athorndale9@nsw.gov.au      |   123456   |    Usuario    |

Iniciar la REST API:

```bash
npm run start:api
```

Iniciar la aplicación de React:

```bash
npm start
```

## Realizando reservas

Para realizar una reserva, se debe introducir una tarjeta de crédito válida para tests con Stripe, por ejemplo:

```bash
4242 4242 4242 4242
```

El resto de los campos pueden ser inventados, pero la fecha de caducidad debe ser mayor a la actual.

## Autores

- **Adrián Rey** ([@arlomba](https://github.com/arlomba))
- **João Silva** ([@JFSilvaM](https://github.com/JFSilvaM))
