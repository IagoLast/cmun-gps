const municipes = require('./municipes');
const express = require('express');
const router = express.Router();
const cache = require('memory-cache');
const TTL = 1800000; // half an hour
const fetch = require('node-fetch');
const BASE_URL = 'http://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCoordenadas.asmx/Consulta_RCCOOR?SRS=EPSG:4326&'
const REGEX = /\(([^\)]+)\)/g;


router.get('/search', function(req, res) {
  let url = BASE_URL + `Coordenada_X=${req.query.lon}&Coordenada_Y=${req.query.lat}`;
  fetch(url)
    .then(res => res.text())
    .then(text => {
      if (text.includes('NO HAY REFERENCIA DISPONIBLE')) {
        return res.sendStatus(404);
      }
      const response = _getMunicipe(text);
      cache.put(req.originalUrl , response , TTL)
      return res.json(response);
    })
    .catch(err => {
      res.sendStatus(500);
    })
});


function _getMunicipe(text) {
  const municipe = REGEX.exec(text)[1];
  return municipes.find(element => element.nm.toLowerCase() === municipe.toLowerCase());
}

module.exports = router;
