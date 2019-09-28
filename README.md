# Landstorm Developer System

Es un sistema gratuito para desarrolladores web que genera un entorno de desarrollo específicamente para sitios web estáticos construidos a partir de componentes en pug, librerías javascript y el framework css nativo de landstorm.

Esta construido con las siguientes tecnologías y solo esta disponible para sistemas operativos de 64 bits:

- Node.js
- Webpack 4
- Pug
- Sass
- Javascript


## Instalación


### Paso 1 - Instalar Node.js y GIT

Lo primero que deberás realizar es instalar Node.js y GIT en tu pc. Te dejo los enlaces de descarga:

[Descargar Node.js](https://nodejs.org/es/download/)

[Descargar GIT](https://git-scm.com)


### Paso 2 - Clonar el proyecto Landstorm
Una vez que instalamos Node y Git en el pc, usaremos la consola de Node.js en Windows la cual es "Node Command Prompt". 

Al abrir la terminal nos aparecera una ruta como la siguiente a la que debemos agregar los directorios donde queramos trabajar. En este ejemplo usare el escritorio (Desktop).

```bash
c:\users\user\
```

Para trabajar en el escritorio ejecutamos el siguiente comando:
```bash
cd desktop
```

Ahora la nueva ruta es:
```bash
c:\users\user\desktop
```
Ahora, en consola ejecutamos el siguiente comando para clonar el proyecto landstorm directamente del repositorio actual en github.

```bash
git clone https://github.com/LuisDark123/landstorm_ds.git
```

Ingresamos en el nuevo directorio que se creo en el escritorio con el nombre "landstorm_ds":
```bash
cd landstorm_ds
```

Continuamos ejecutando los siguientes comandos para generar un archivo package.json y un archivo package-lock.json que son esenciales para nuestro proyecto.

```bash
npm init -y
```

```bash
npm install
```

### Paso 3 - Configurar los scripts de Webpack y Webpack Dev Server

En el archivo package.json debemos agregar los siguientes scripts:

```json
"scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js -d",
    "build": "webpack --config webpack.build.js -p"
  },
```

Para configurar Webpack Dev Server primero debemos ejecutar en la consola el siguiente comando y copiar la Dirección IPv4 que nos aparecen entre todos los resultados.

```bash
ipconfig
```

Abrimos el archivo "webpack.config.js", localizamos el siguiente código y pegamos la Dirección IPv4 que obtuvimos anteriormente:

```javascript
devServer: {    // Configuración del servidor
      contentBase: path.join(__dirname + '/dist'),
      compress: true,
      port: 8080,   // Puerto
      host: 'Aquí tu IPv4',   // Dirección IPv4 del equipo
      open: true
  },
```

### Paso 4 - Instalar todas las dependencias de Webpack
Antes de usar cualquier comando de Webpack necesitaremos instalar todas las dependencias que se usaron para construir el sistema landstorm:

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge clean-webpack-plugin copy-webpack-plugin css-loader file-loader html-critical-webpack-plugin html-webpack-plugin imagemin-mozjpeg imagemin-webp imagemin-webpack-plugin mini-css-extract-plugin node-sass optimize-css-assets-webpack-plugin postcss-loader pug pug-loader sass-loader autoprefixer uglifyjs-webpack-plugin zip-webpack-plugin
```

### Paso 5 - Generar un bundle de producción
Con el siguiente comando podremos generar bundles que contengan tanto los archivos mirificados, optimizados y concatenados asi como un archivo zip para subir a un hosting compartido como por ejemplo Cpanel.

```bash
npm run build
```

### Paso 6 - Abrir el servidor de desarrollo
Con el siguiente comando inicializaremos el servidor que nos ofrece Webpack-dev-server para realizar en tiempo real cambios en el sitio que estamos construyendo:

```bash
npm start
```
---
#### Listo ya tienes tu sistema de desarrollo web configurado ahora solo queda agregar los componentes oficiales de Landstorm o crear tus propios componentes.