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

Incluye búsqueda, filtros por sección, guardados persistentes, modal con enlace a la noticia original, resumen mediante Speech Synthesis y reloj de Buenos Aires. El clima de Open-Meteo muestra los próximos siete días con máximas, mínimas, probabilidad de lluvia y viento. La card de TikTok contiene una selección de videos positivos con desplazamiento automático, pausa y respeto por la preferencia de movimiento reducido. La barra de lecturas indica cuántas quedan de diez, pasa a naranja desde cinco y a rojo desde ocho; el historial es local y se renueva cada día en horario de Buenos Aires. El formulario de suscripción es local; cotizaciones y pagos no están conectados.

## Noticias mediante GNews

Las cards consumen `/api/news` desde el servidor. Para activar GNews, copiá `.env.example` a `.env`, completá `GNEWS_API_KEY` con tu clave y reiniciá el servidor. La clave no se incluye en el frontend. La integración usa [Top Headlines de GNews](https://docs.gnews.io/endpoints/top-headlines-endpoint), en español y para Argentina, con diez titulares por consulta. Sin clave se utiliza el RSS público de LA NACION, identificado en pantalla.

Las respuestas se validan y se guardan en caché durante cinco minutos. Si el proveedor falla se conserva la última respuesta hasta una hora, marcada como desactualizada; sin caché se muestra un error y la opción de reintentar. Los videos de TikTok dependen de la disponibilidad y permisos del servicio; cada uno incluye un enlace directo alternativo.

Para producción: Node.js 22.9 o superior, `npm run build` y `npm start` (puerto 3000 o `PORT`). Publicar únicamente `dist` en un alojamiento estático no incluye `/api/news`.

### Despliegue en Vercel

El repositorio incluye `api/news.ts`, una función Node.js que publica `/api/news` junto al frontend de Vite. `vercel.json` configura la compilación y permite hasta 30 segundos de ejecución para la consulta al proveedor (su timeout es de 12 segundos). No se necesita ejecutar `npm start` en Vercel. Si se utiliza GNews, configurar `GNEWS_API_KEY` en las variables del proyecto para Production y volver a desplegar; sin clave se utiliza el RSS público. La caché en memoria pertenece a cada instancia de la función y puede reiniciarse entre invocaciones.

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
