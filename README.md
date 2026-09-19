# LA NACION · Tu mirada diaria

Frontend editorial responsive creado con Vite, React y TypeScript, inspirado en la referencia visual suministrada.

## Ejecutar

```sh
npm install
npm run dev
```

## Compilar

```sh
npm run build
npm run preview
```

Incluye búsqueda, filtros por sección, guardados persistentes en localStorage, modal de lectura, resumen mediante Speech Synthesis, reloj de Buenos Aires y clima de Open-Meteo con fallback de demostración. El formulario de suscripción es local y no envía datos. Noticias y cotizaciones son ilustrativas; no existe integración con un servicio editorial ni de pagos.

Logo: LA NACION, https://www.lanacion.com.ar/pf/resources/images/la-nacion.webp. Fotografías ilustrativas de Wikimedia Commons y Unsplash. Este prototipo no es el sitio oficial de LA NACION.

Photo du Congrès / Foto del Congreso: Matías Profeta, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Palacio_del_Congreso_de_la_Naci%C3%B3n_Argentina.jpg · https://creativecommons.org/licenses/by-sa/4.0/. Encuadre mediante CSS, sin modificar el archivo original.

## Organización del código

- `src/main.tsx`: montaje de React.
- `src/App.tsx`: composición de la página y coordinación de navegación.
- `src/components/`: componentes de layout, noticias, widgets, suscripción y UI compartida.
- `src/hooks/`: lógica de estado y efectos de reloj, clima, audio, guardados y notificaciones.
- `src/services/`: acceso HTTP y almacenamiento, con validación de datos externos.
- `src/types/`: contratos TypeScript del dominio.
- `src/data/`: contenido y navegación.
- `src/utils/`: funciones puras de filtrado y fechas.
- `src/styles/`: CSS legible separado por responsabilidad.

## Calidad

`npm run format` aplica Prettier; `npm run format:check` verifica el formato.
`npm run lint` ejecuta ESLint y reglas de hooks; `npm run typecheck` comprueba tipos estrictos.
`npm test` ejecuta las pruebas de datos externos y filtrado.
