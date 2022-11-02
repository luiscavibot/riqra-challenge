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

b) Cliente de base de datos local: http://localhost:8080

(Servidor: db, Usuario: root, Contraseña: riqra, Base de datos: riqra)

## Routes

Creación de una promoción:

```sh
POST /carts
*body example:
{
    "name": "Nombre de la promoción",
	"validityPeriodStart": "2022-10-27",
	"validityPeriodExpiration": "2022-10-28",
	"activated": false,
	"rules": [
		{
			"ruleType": "PRODUCTSELECTOR",
			"actions": [
				{
					"actionType": "CARTDISCOUNT",
					"discountType": "FIXED",
					"discountValue": 20
				}
			],
			"skus": ["leche", "galleta"]
		},
		{
			"ruleType": "CARTTOTAL",
			"actions": [
				{
					"actionType": "CARTDISCOUNT",
					"discountType": "PERCENTAGE",
					"discountValue": 50
				}
			],
			"greaterThan": 200
		}
	]
}
```

**name**: El nombre de la promoción.

**validityPeriodStart**: Inicio del periodo de promoción.

**validityPeriodExpiration**: Fin del periodo de promoción.

**activated**: Inidica si la campaña está activa.

**rules**: Reglas de la promoción a evaluar.

**ruleType**: Tipo de regla. Solo se aceptán dos posibles valores: PRODUCTSELECTOR y CARTTOTAL.

**actionType**: Tipo de acción. Actualmente solo se acepta un posible valor: CARTDISCOUNT.

**discountType**: Tipo de descuento. Solo se aceptán dos tipos de descuentos: PERCENTAGE y FIXED.

**greaterThan**: Este campo toma un valor cuando se elige el ruletype CARTTOTAL. Indica la cantidad a superar para aplicar el descuento señalado en discountValue.

**discountValue**: Valor del descuento tipo flotante. Si el discountType es PERCENTAGE, el valor declarado será considerado como un porcentaje y si fuese FIXED, el valor mantiene su naturaleza.

**skus**: Este campo toma un arreglo de strings cuando se elige el ruletype PRODUCTSELECTOR. Representa los productos que deben estar incluidos en el carrito de compra.

Ver todas las promociones registradas:

```sh
GET /promotions
```

Ver una promoción registrada específica:

```sh
GET /promotions/:id
```

Actualizar una promoción:

```sh
PUT /promotions/:id
*Body: Del mismo tipo usado en la creación de una promoción.
```

Borrar una promoción:

```sh
DELETE /promotions/:id
```

Creación de un Carrito de compra:

```sh
POST /promotions
*body example:
{
  "lineItems": [
      {
        "sku": "apple",
        "price": 2,
        "qty": 1
      },
      {
        "sku": "orange",
        "price": 3,
        "qty": 1
      }
  ]
}
```

**lineItems**: Una matriz de productos.

**skus**: Código de producto.

**price**: Precio del producto.

**qty**: Cantidad de ítems de un producto.

---

**AUTOR: Luis Castillo Villafuerte**  
🤛 😎

🎤

## Development

[riqra]: https://riqra.com
[https://riqra.notion.site/backend-developer-154f10597b7b4309aaff402fb432d9ae]: https://riqra.notion.site/Backend-Developer-154f10597b7b4309aaff402fb432d9ae
[clic aquí para ingresar a la url del proyecto]: http://3.142.241.21/api/v1/promotions
[https://github.com/luiscavibot/riqra-challenge.git]: https://github.com/luiscavibot/riqra-challenge.git
