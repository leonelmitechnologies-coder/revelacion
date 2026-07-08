/**
 * Backend de votos — Revelación de género "¿Niño o Niña?"
 *
 * Publicado como Web App (acceso: Cualquier persona).
 * Los votos se guardan en la hoja "Votos" de la hoja de cálculo.
 */

var NOMBRE_HOJA_VOTOS = 'Votos';

function obtenerHojaVotos() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(NOMBRE_HOJA_VOTOS);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA_VOTOS);
    hoja.appendRow(['Fecha', 'Voto']);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function respuestaJson(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

/** GET ?action=list — devuelve el conteo de votos */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || '';
  if (action !== 'list') {
    return respuestaJson({ ok: true, mensaje: 'Backend Niño o Niña funcionando 🧸' });
  }
  var valores = obtenerHojaVotos().getDataRange().getValues();
  var votos = { Tochi: 0, Chebi: 0 };
  var registros = [];
  for (var i = 1; i < valores.length; i++) {
    var voto = valores[i][1];
    if (votos[voto] !== undefined) votos[voto]++;
    registros.push({ fecha: valores[i][0], voto: voto });
  }
  return respuestaJson({ ok: true, votos: votos, registros: registros });
}

/** POST — registra un voto { action:'voto', voto:'Tochi'|'Chebi' } */
function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    if (datos.action !== 'voto') {
      return respuestaJson({ ok: false, error: 'Acción desconocida' });
    }
    if (datos.voto !== 'Tochi' && datos.voto !== 'Chebi') {
      return respuestaJson({ ok: false, error: 'Voto inválido' });
    }
    obtenerHojaVotos().appendRow([new Date(), datos.voto]);
    return respuestaJson({ ok: true });
  } catch (err) {
    return respuestaJson({ ok: false, error: String(err) });
  }
}
