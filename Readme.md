# 🔥RIQRA CHALLENGE🔥

## _(Backend developer)_

El siguiente proyecto plantea una solución al reto publicado por [Riqra] en: [https://riqra.notion.site/Backend-Developer-154f10597b7b4309aaff402fb432d9ae]. Las tecnologías usadas son las siguientes:

-   Node con Express.js y Typescript.
-   MySQL/Amazon RDS con el ORM Sequelize.
-   Docker, Amazon ECS, Amazon ECR y Amazon Fargate.

## Production

El proyecto se encuentra actualmente implementado en un contenedor docker, cuya imagen está resgitrada en Amazon ECR, sobre una infraestructura de Amazon Fargate y orquestado por Amazon ECS. **[Clic aquí para ingresar a la URL del proyecto]**.

Así mismo, usa el servicio de bases de datos relacionales Amazon RDS para la persistencia de datos.

## Development

El proyecto se encuentra en el siguiente repositorio remoto: [https://github.com/luiscavibot/riqra-challenge.git]. Para implementar un entorno de desarrollo para el proyecto, proceda con los siguientes pasos.
1.-Clone el proyecto:

```sh
git clone https://github.com/luiscavibot/riqra-challenge.git
```

2.- Instale las dependencias:

```sh
npm install
```

2.- Abra una terminal y ejecute el compilador de typescript:

```sh
tsc --watch
```

3.- Cree una base datos local y un cliente para la misma, ejecutando el archivo docker-compose.yml del proyecto:

```sh
docker-compose up -d
```

4.-Luego de que la base de datos inicie, proceda a arrancar la aplicación con el siguiente comando:

```sh
npm run dev
```

NOTA: URLs de servicios por defecto:
a) Backend server: http://localhost:80
b) Cliente de base de datos local: http://localhost:8080:
(Servidor: db, Usuario: root, Contraseña: riqra, Base de datos: riqra)

**AUTOR: Luis Castillo Villafuerte**  
🤛 😎
🎤

## Development

[riqra]: https://riqra.com
[https://riqra.notion.site/backend-developer-154f10597b7b4309aaff402fb432d9ae]: https://riqra.notion.site/Backend-Developer-154f10597b7b4309aaff402fb432d9ae
[clic aquí para ingresar a la url del proyecto]: http://3.142.241.21/api/v1/promotions
[https://github.com/luiscavibot/riqra-challenge.git]: https://github.com/luiscavibot/riqra-challenge.git
