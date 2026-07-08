# Guía: conectar las confirmaciones con Google Sheets

Sigue estos pasos una sola vez (toma ~5 minutos). Al final tendrás una URL que se pega
en `config.js` y con eso la invitación guarda las confirmaciones en tu hoja de cálculo.

## 1. Crear la hoja de cálculo

1. Entra a [sheets.google.com](https://sheets.google.com) con tu cuenta de Google.
2. Crea una hoja nueva y nómbrala, por ejemplo, **"Revelación Tochi o Chebi"**.
   (No necesitas crear columnas: el script las crea solo.)

## 2. Pegar el script

1. En la hoja, abre el menú **Extensiones → Apps Script**.
2. Borra el contenido del editor y pega TODO el contenido del archivo
   [`apps-script/Code.gs`](apps-script/Code.gs) de este proyecto.
3. Guarda con el icono de disquete (o Ctrl+S).

## 3. Publicar como Web App

1. Arriba a la derecha, clic en **Implementar → Nueva implementación**.
2. En el engrane ⚙ selecciona el tipo **Aplicación web**.
3. Configura:
   - **Descripción:** confirmaciones invitación
   - **Ejecutar como:** *Yo* (tu cuenta)
   - **Quién tiene acceso:** **Cualquier persona** ← importante
4. Clic en **Implementar**.
5. Autoriza los permisos cuando lo pida (Avanzado → Ir a … (no seguro) → Permitir).
   Es tu propio script, es seguro.
6. Copia la **URL de la aplicación web** (termina en `/exec`).

## 4. Pegar la URL en la invitación

1. Abre el archivo `config.js` de este proyecto.
2. Pega la URL entre las comillas de `SCRIPT_URL`:

```js
const SCRIPT_URL = "https://script.google.com/macros/s/TU_ID_AQUI/exec";
```

3. (Opcional) Pon tu número de WhatsApp en `WHATSAPP_PHONE` como respaldo
   (formato `52` + 10 dígitos, ej. `"528112345678"`), y cambia el `ADMIN_PIN`.

## 5. Probar

1. Abre la invitación, llena el formulario y confirma.
2. Revisa que aparezca una fila nueva en la pestaña **Confirmaciones** de tu hoja.
3. Abre `admin.html`, entra con tu PIN y verifica que aparezca la familia.

## Si algo cambia después

- Si editas el código del script, ve a **Implementar → Administrar implementaciones →
  ✏ Editar → Versión: Nueva versión → Implementar** (la URL no cambia).
- Los datos siempre viven en tu hoja: puedes ordenarlos, imprimirlos o borrarlos ahí.
