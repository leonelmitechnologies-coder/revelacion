# Invitación digital — Revelación de género "¿Tochi o Chebi?"

**Fecha:** 2026-07-07
**Estado:** Aprobado por el usuario

## Objetivo

Invitación web interactiva para la revelación de género del bebé de Leonel Hernández y
Aleida Duarte, compartible como enlace por WhatsApp, con confirmación de asistencia
registrada en Google Sheets y una pantalla de administrador para ver la lista de invitados.

## Datos del evento

| Campo | Valor |
|---|---|
| Papás | Leonel Hernández & Aleida Duarte |
| Evento | Revelación de género |
| Apodos del bebé | **Tochi** si es niña · **Chebi** si es niño |
| Fecha y hora | Domingo 26 de julio de 2026, 4:00 PM |
| Lugar | "Quinta Treviño" — Nogal, Carrizalejo, 65770 Gral. Zuazua, N.L. |
| Nacimiento estimado | Diciembre 2026 (se menciona como "Bebé Hernández Duarte llega en diciembre 2026") |

## Estilo visual

Opción **B · Boho elegante neutro** (elegida entre 4 propuestas):

- Paleta: beige/arena, dorado suave, blanco crema; acentos rosa pastel y azul pastel solo
  en los elementos Tochi/Chebi.
- Tipografía elegante: serif/script para títulos (estilo "Gender Reveal" caligráfico de la
  imagen de referencia), sans-serif limpia para el cuerpo.
- Recursos del usuario (en la raíz del proyecto, se convertirán a **PNG con fondo
  transparente**):
  - Osita acuarela con moños rosas → representa a **Tochi**
  - Osito acuarela en coche azul → representa a **Chebi**
  - Foto "Team Girl" (Aleida de bebé) y "Team Boy" (Leonel de niño) → sección de votación
  - Póster "Bienvenidos Gender Reveal" → referencia de estilo tipográfico (no se incrusta tal cual)
- Animaciones sutiles: aparición al hacer scroll, ositos flotando suavemente, cuenta
  regresiva animada.
- Mobile-first: se verá principalmente en teléfonos vía WhatsApp. Incluir metaetiquetas
  Open Graph (título, descripción e imagen) para que el enlace muestre una vista previa
  bonita en WhatsApp.

## Estructura de la página (invitación)

Página única `index.html` con secciones en scroll:

1. **Portada** — "Leonel & Aleida", título "¿Tochi o Chebi?", los dos ositos, fecha.
2. **Detalles del evento** — fecha, hora, lugar con botón "Cómo llegar" (Google Maps a
   Quinta Treviño), y **cuenta regresiva** en vivo (días/horas/min/seg al 26-jul-2026 4 PM).
3. **Votación** — "¿A quién se parecerá?": Team Tochi (foto de Aleida bebé) vs Team Chebi
   (foto de Leonel niño). El voto se elige aquí y se envía junto con la confirmación.
4. **Confirmación de asistencia** — formulario: nombre de la familia + número de personas
   + voto seleccionado → botón "Confirmar asistencia". Guarda en Google Sheets. Mensaje
   de éxito con agradecimiento. Evitar dobles envíos (deshabilitar botón + marca en
   localStorage).
5. **Cierre** — "Bebé Hernández Duarte llega en diciembre 2026" con detalle dorado.

## Pantalla de administrador

- Archivo separado `admin.html`, no enlazado desde la invitación (URL secreta).
- Protegida con **PIN** simple solicitado al abrir (disuasión, no seguridad bancaria; los
  datos no son sensibles).
- Muestra: lista de familias confirmadas (nombre, personas, voto, fecha/hora), **total de
  familias**, **total de personas**, y marcador **Team Tochi vs Team Chebi** con barra
  visual.
- Botón de actualizar (recarga los datos de la hoja).

## Backend: Google Sheets + Apps Script

- Una hoja de cálculo de Google del usuario con columnas:
  `Fecha registro | Familia | Personas | Voto`.
- Un **Google Apps Script** publicado como Web App:
  - `POST` (o GET con parámetros, para evitar problemas CORS): agrega una fila de
    confirmación.
  - `GET ?action=list`: devuelve todas las confirmaciones en JSON (usado por `admin.html`).
- Sin servidores propios; gratis. El usuario deberá crear la hoja y pegar el script
  (guiado paso a paso durante la implementación).

## Publicación y compartir

- Hosting estático gratuito: **GitHub Pages** (o Netlify como alternativa) — se decide
  con el usuario en la fase de despliegue según si tiene cuenta de GitHub.
- Lo que se comparte por WhatsApp es el enlace: al abrirlo se ve la invitación completa.
- Open Graph configurado para vista previa atractiva del enlace.

## Manejo de errores

- Si Google Sheets no responde al confirmar: mensaje amable + botón alternativo que abre
  WhatsApp con mensaje pre-escrito ("Familia X confirmamos, somos N").
- Cuenta regresiva llega a cero: cambia a "¡Es hoy! 🎉".
- Admin sin conexión o PIN incorrecto: mensajes claros, reintento.

## Pruebas

- Verificación visual en viewport móvil (WhatsApp abre en navegador del teléfono).
- Prueba end-to-end del formulario: confirmar → fila aparece en la hoja → admin la muestra.
- Prueba de la vista previa Open Graph.

## Fuera de alcance (YAGNI)

- Música de fondo, galería de fotos, edición/cancelación de confirmaciones por el
  invitado, multi-idioma, autenticación real.
