# Levantar BD y sitio

## Levantar Base de datos

Abrimos Docker y TablePlus, luego abrimos una terminal, parados en la carpeta raiz escribimos el sig comando, con el levantamos al BD:

```bash
docker compose up -d
```

El siguiente comando nos indica las imagenes q se estan ejecutando y el puerto:

```bash
docker ps
```

Para ver las tablas en TablePlus tenemos que elegir la conexxion configurada para esa BD, se abe otra ventana, vamos al ícono de Base de Dato y seleccionamos db_crud, luego le damos click al botón "Open".

## Levantar proyecto

Abrimos una terminal, parados en la carpeta raiz escribimos el sig comando:

Escucha constantemente los cambios

```bash
yarn run start:dev
```

<!-- También tenemos este comando el cual hay que levancorrer cada vez que se hagan cambios

```bash
yarn nest start
``` -->

<!-- https://github.com/bluuweb/nestjs-mysql-cats-backend-node-docker-tyorm -->
---

---

---

# Crear y configurar paso a paso

## Nestjs

Nest nos permite construir aplicaciones escalables y robustas utilizando TypeScript.

[Nest](https://docs.nestjs.com/)

### Instalamos Nest y creamos un proyecto

```bash
$ npm i -g @nestjs/cli

$ nest new .
# or
$ nest new 'nombreProyecto'
```

## Docker Compose

Docker Compose es una herramienta para definir y ejecutar aplicaciones de múltiples contenedores.

[Archivo de configuración](https://bluuweb.dev/nestjs/crud-mysql.html)

Docker compose nos sirve para levantar una base de datos sin tener que instalarla en nuestra pc, usaremos mysql.

### Instalar en windows

Pre Requisitos: Docker para Windows requiere Windows 10 Pro de 64 bits con Hyper-V disponible. Consulte Qué debe saber antes de realizar la instalación para obtener una lista completa de los requisitos previos.

Descargamos el instalador:

[Instalador de Docker](https://docs.docker.com/desktop/install/windows-install/#download-docker-for-windows)

Ejecutamos el instalador, damos OK para que lo instale, esperamos a que finalice.

Reiniciamos la pc, docker se abrirá al iniciar, nos pide registrarnos, luego de hacerlo iniciamos sesión en la app de la pc (Docker Descktop).

### Usar un archivo de configuración de Docker

Instalamos la extensión de Docker en VS, creamos el archivo docker-compose.yml en la raíz del proyecto y le pegamos las siguientes lineas:

version: "3.8"
services:
mysql:
image: mysql:8.0
container_name: mysql_db
restart: always
environment:
MYSQL_ROOT_PASSWORD: root
MYSQL_DATABASE: db_crud
MYSQL_USER: user_crud
MYSQL_PASSWORD: root
volumes: - ./mysql:/var/lib/mysql
ports: - "3307:3306"

### Levantar el contenedor en 2º plano

lee el archivo .yml, descarga la imagen de docker, y la levanta. Se puede ver el puerto en Docker Desktop.

```bash
docker compose up -d
```

## Visualizar la BD

Algunas recomendaciones son TablePlus y DBeaver

### Instalar TablePlus para windows

Herramienta GUI moderna, nativa y amigable para bases de datos relacionales: MySQL, PostgreSQL, SQLite y más.

[Instalador de TablePlus](https://tableplus.com/download)

Descargamos, instalamos y abrimos el programa.

### Configurar la BD

ya en TablePlus vemos un input con el texto "Serch for connection...", a su lado un +, clickeamos el + y seleccionamos MySQL.

Ahora configuramos la BD usando los datos del archivo .yml.

Datos en TablePlus: Datos en .yml
Name: Nestjs-MySQL

| Datos en TablePlus | Datos en .yml             |
| ------------------ | ------------------------- |
| Name:              | Nestjs-MySQL (a elección) |
| Host:              | localhost (siempre)       |
| Port:              | "3307:3306" --> 3307      |
| User:              | MYSQL_USER:               |
| Password:          | MYSQL_PASSWORD:           |

Luego clickeamos el botón connect, se abre una nueva ventana, en la barra superiar vemos el icono de base de dato, clickeamos y seleccionamos la BD creada.

## Comandos de Nest

Nest separa en modulos, componentes o capas de negocios.

### Creando resource (recurso)

```bash
$ nest g res cats
##or
$ nest g res cats --no-spec  'no hace archivos de test'
```

Luego se selecciona la capa de transporte (REST API, GraphQL code o schema first, Microservice, Webcoket).

Luego pregunta si debe generar todo el CRUD.

contoller/controlador @Get (recibe solicitud del cliente, se la da al servicio, el servicio le da una respuesta y el controlador se lo devuelve al cliente)
Servicio (se llaman proveedores en nets)
service/servicio (tiene los metodos que se llaman desde los controladores)

### Instalando y usando validador

```bash
yarn add class-validator class-transformer -SE
```

Haremos validaciones de los datos de entrada en el main

app.setGlobalPrefix('api/v1'); 

 `main.ts`

app.useGlobalPipes(
  new ValidationPipe({

    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,

  })
); 

whitelist: (el validador quitará al objeto validado (devuelto) cualquier propiedad que no utilice ningún decorador de validación.)
forbidNonWhitelisted: (en lugar de eliminar las propiedades no incluidas en la lista blanca, el validador generará una excepción)
transform: (transofrma los datos siempre cuando pueda)

[Todos los validadores](https://docs.nestjs.com/techniques/validation)

## Integrar BD con TypeORM

Paquete que nos ayuda a conextar la BD con node. Existen varias bibloitecas de integración de base de dato que podemos usar: MikroORM, Sequelize, Knex.js, Prisma, Mongoose TypeORM.

[Integradores para Nest](https://docs.nestjs.com/techniques/database)

Para integrarse con bases de datos SQL y NoSQL, Nest proporciona el @nestjs/typeorm paquete. TipoORM es el Object Relational Mapper (ORM) más maduro disponible para TypeScript. Como está escrito en TypeScript, se integra bien con el marco Nest.

Primero instalamos.

```bash
$ npm install --save @nestjs/typeorm typeorm mysql2
#or
$ yarn add @nestjs/typeorm typeorm mysql2
```

Luego importamos en el modulo principal.

 `app.module.ts`

@Module({
  imports: [..., TypeOrmModule.forRoot({

    type: 'mysql',
    host: 'localhost',
    port: aca es 3307, depende de lo indicado en el .yml, ports: - "3307:3306" entonces es '3307'
    username: el indicado en MYSQL_USER,
    password: el indicado en MYSQL_PASSWORD,
    database: el indicado en MYSQL_DATABASE,
    // entities: [], reemplazado por autoLaoadEntities,
    autoLoadEntities: true, //carga las entidades automáticamente
    synchronize: true,

  }), ], 
  ..., 
})

## Configurando entidadades

Vamos a usar patrones de diseño repository y para ello vamos a explicar que es

### Patron de diseño Repository

Es un patron de diseño arquitectónico utilizado en el desarrollo de software para separar la lógica de acceso a datos y la lógica de negocios, proporciona una interfaz entre la capa de lógica de negocios y la de acceso a datos, que hace que el código sea más desacoplado y flexible. Características y beneficios: Abstracción de la fuente de datos, reutilización de codigos, separación de responzabilidades, facilita las pruebas unitarias, mejora la seguridad.

TypeORM admite el patron de diseño repositorio, por lo que cada entidad tiene su porpio repositorio, estos se pueden obtener de la fuente de datos de la BD.

### Propiedades de una entidad

Usaremos los metodos y decoradores de TypeORM para hacer las entidades, estas entidades tienen propiedades donde se guardan valores, una de las propiedades más importantes de una entidad es el Id (primary key), el cual es único e irrepetible en cada Colección.

* En BD NO relacionales son los Campos del Documento en la Colecciones.
* En BD relacionales son los Atributos de la Tabla/Relacion en la Colección.

### Creamos la entidad

 `en cat.entity.ts`

@Entity()
export class Cat {
  @Column({ primary: true, generated: true })
  id: number; 

  @Column()
  name: string; 

  @Column()
  age: number; 

  @Column()
  breead: string; 

  @UpdateDateColumn({ type: 'timestamp' })
  dateModified: Date; 

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date; 
}

 `cats.module.ts`

@Module({
  imports: [TypeOrmModule.forFeature([Cat])], 
  controllers: [CatsController], 
  providers: [CatsService], 
})

  <br/>

## Métodos del Repository

## Inyectando métodos de la BD para su uso

Le inyectaremos a al service cats el RepositorioCat para que pueda usar los métodos de éste, luego lo inicializamos:

 `cats.service.ts`

@Injectable()
export class CatsService {
  constructor(

    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>

  ) {}
  ...
}

vamos a poder acceder en la clase CatsService a todos los métodos inyectados.

## Usando los métodos inyectados

Vamos a modificar cada método en service parar que traiga, edite o elimine de la BD, o bien cree en la BD, para ello vamos a usar en cada metodo de service los metodos inyectados de la BD.

### Método findAll

 `cats.service.ts`

export class CatsService {
  constructor( ... ) {}

  async findAll() {

    return await this.catsRepository.find();

  }
  ...
}

### Método create

Los métodos de creación, edición y todo aquel que use un parametros, tiene un Dto (Data Transfer Object), que se usan para realizar la tarea del método, crear apartir de los datos enviados, reemplazar determinada infomración, eliminar aquel que tenga determinado dato, o buscar aque aquel que tenga determinado dato, esta data se esta gestionando desde el Cliente hacia el controlador y si esta data no esta mapeada, estructurada y validada pueden generar graves problemas.

Antes de completar este método hay que definir el dto del método create

 `dto/create-cat.dto.ts`

export class CreateCatDto {
 @IsString()
  @MinLength(1)
  @MaxLength(10)
  name: string; 

  @IsInt()
  @IsPositive()
  age: number; 

  @IsString()
  @IsOptional()
  breead?: string; 
}

Si el cliente intenta enviar un dato que no esta en el dto el validador enviará un error especificando el problema.

Hora haremos el método create:

 `cats.service.ts`

export class CatsService {
  ...
  async create(createCatDto: CreateCatDto) {

    try {
      return await this.catRepository.save(createCatDto);
    } catch (error) {
      console.warn(error);
    }

  }
  ...
}

### Método findOne

 `cats.service.ts`

export class CatsService {
  ...
 async findOne(id: number) {

    try {
      return await this.catsRepository.findOneBy({ id });
    } catch (error) {
      console.warn(error);
    }

  }
  ...
}

### Método remove

existen varios metodos en Nest para eliminar registros de una tabla, los mas recomendados son:

* softDelete (eliminación lógica): marca el registro como eliminado a través de una actualización del mismo, esto permitirnos manejar un histórico de cada registro.

* softRemove (eliminación permanente): remueve de forma definitiva el registro seleccionado.

usaremos el método softDelete y dejaremos un ejemplo de como se usa el softRemove 

 `cats.service.ts`

export class CatsService {
  ...
  async remove(id: number) {

    try {
      return await this.catRepository.softDelete({ id });
      // return await this.catRepository.softRemove({ id }); 
    } catch (error) {
      console.warn(error);
    }

  }
  ...
}

### Método update

Antes de completar este método hay que definir el dto del método update

 `dto/create-cat.dto.ts`

export class UpdateCatDto {
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  name?: string; 

  @IsInt()
  @IsPositive()
  @IsOptional()
  age?: number; 

  @IsString()
  @IsOptional()
  breed?: string; 
}

 `cats.service.ts`

export class CatsService {
  ...
  async update(id: number, updateCatDto: UpdateCatDto) {

    try {
      return await this.catRepository.update(id, updateCatDto);
    } catch (error) {
      console.warn(error);
    }

  }
  ...
}

---

---

---

 <br/>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

    <p align="center">

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>

    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

* Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
