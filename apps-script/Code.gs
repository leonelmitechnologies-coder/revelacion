/**
 * Backend de confirmaciones — Revelación de género "¿Tochi o Chebi?"
 *
 * Pega este código en un proyecto de Google Apps Script vinculado a tu
 * hoja de cálculo (instrucciones en SETUP-GOOGLE-SHEETS.md) y publícalo
 * como Web App con acceso para "Cualquier persona".
 */

var NOMBRE_HOJA = 'Confirmaciones';

function obtenerHoja() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(NOMBRE_HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
    hoja.appendRow(['Fecha registro', 'Familia', 'Personas', 'Voto']);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function respuestaJson(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

/** GET ?action=list — devuelve todas las confirmaciones */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || '';
  if (action !== 'list') {
    return respuestaJson({ ok: true, mensaje: 'Backend Tochi o Chebi funcionando 🧸' });
  }
  var hoja = obtenerHoja();
  var valores = hoja.getDataRange().getValues();
  var registros = [];
  for (var i = 1; i < valores.length; i++) {
    registros.push({
      fecha: valores[i][0],
      familia: valores[i][1],
      personas: valores[i][2],
      voto: valores[i][3]
    });
  }
  return respuestaJson({ ok: true, registros: registros });
}

/** POST — registra una confirmación { action:'rsvp', familia, personas, voto } */
function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    if (datos.action !== 'rsvp') {
      return respuestaJson({ ok: false, error: 'Acción desconocida' });
    }
    var familia = String(datos.familia || '').trim().substring(0, 80);
    var personas = Math.max(1, Math.min(30, parseInt(datos.personas, 10) || 1));
    var voto = datos.voto === 'Tochi' || datos.voto === 'Chebi' ? datos.voto : '';
    if (!familia) {
      return respuestaJson({ ok: false, error: 'Falta el nombre de la familia' });
    }
    obtenerHoja().appendRow([new Date(), familia, personas, voto]);
    return respuestaJson({ ok: true });
  } catch (err) {
    return respuestaJson({ ok: false, error: String(err) });
  }
}
