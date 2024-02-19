# FrontendProject

## Instalar proyecto

Ejecutar en la carpeta del proyecto `npm install`. Y si es posible, abrir 3 terminales de Visual Studio Code.

## Para poder trabajar con datos de json-server (terminal 1)

Para trabajar con datos sin backend, he utilizado `json-server`.
Para usarlo, ejecutar `json-server --watch .\src\app\mock\getDataHero.json`. Navegar a `http://localhost:3000/` si queremos ver los detalles del json-server y la url de nuestros datos.

## Levantar app (terminal 2)

Para levantar la app, ejecutar `ng serve` y navegar a `http://localhost:4200/`.

## Probar unit tests del servicio (terminal 3)

Para visualizar tests, ejecutar `ng test`.

## Info extra

En la carpeta `src/app/mock` tenemos los siguientes archivos:

[getDataHero.json] --> archivo que usamos para trabajar con json-server y poder hacer llamadas http (se va modificando con las llamadas).
[getDataHeroOriginal.json] --> copia con los datos del archivo anterior para tener siempre una plantilla con ejemplos por si queremos recuperar los datos.
[mockHeroes.ts] --> héroes mockeados para probar test del servicio.