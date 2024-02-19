# FrontendProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## EXTRA SARA GONZÁLEZ

Para empezar, lanzar `npm install` en la carpeta del proyecto. Posteriormente abrir dos terminales del proyecto: en una ejecutar `ng serve` para levantar la aplicación web y en otra ejecutar `json-server --watch .\src\app\mock\getDataHero.json` para poder trabajar con nuestros datos mockeados a modo de API. Navegar a `http://localhost:4200/` para visualizar la aplicación y a `http://localhost:3000/` para ver los detalles del json-server.

En la carpeta `src/app/mock` tenemos los siguientes archivos:

[getDataHero.json] --> archivo que usamos para trabajar con json-server y poder hacer llamadas http.
[getDataHeroOriginal.json] --> copia con los datos del archivo anterior para tener siempre una plantilla con ejemplos (ya que los datos de getDataHero.json se van modificando según las acciones que hagamos).
[mockHeroes.ts] --> héroes mockeados para probar test del servicio