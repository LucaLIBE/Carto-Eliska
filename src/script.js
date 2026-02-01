import {addGeojson} from './utils.js'

const colorLuca = "rgb(0,0,255)";
const colorEliska = "rgb(255, 0, 234)";

const config = {"borderColor":"#555", "weight":1, "fillColor":"#ffffff", "fillOpacity":"0.2"}
// Init map
const map = L.map('map',{renderer: L.canvas()}).setView([20,0],2);
const background = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '© OpenStreetMap'}).addTo(map);

const baseMaps = {
  "OpenStreetMap": background
};

const memoriesLayer = L.layerGroup();

L.marker([48.8566, 2.3522])
    .bindPopup('<strong>Souvenir</strong><br>À Paris.')
    .addTo(memoriesLayer);

memoriesLayer.addTo(map);

const overlays = {
  "Memories" : memoriesLayer,
}

fetch('data/countries.json')
  .then(response => response.json())
  .then(countriesData => {
    //Charger le GeoJSON des pays
    fetch('data/CNTR_RG_60M_2024_4326.geojson')
      .then(response => response.json())
      .then(data => {
        //Ajouter la layer GeoJSON Luca
        const [countriesLayerLuca, countriesLucaNew] = addGeojson(data, config, countriesData.countriesLuca, colorLuca);
        layersControl.addOverlay(countriesLayerLuca, 'Countries Luca');

        //Ajouter la layer GeoJSON Eliska
        const [countriesLayerEliska, countriesEliskaNew] = addGeojson(data, config, countriesData.countriesEliska, colorEliska);
        layersControl.addOverlay(countriesLayerEliska, 'Countries Eliska');
      });
  })

const layersControl = L.control.layers(baseMaps, overlays).addTo(map);
/*
window.onbeforeunload = function () {
    return "Do you really want to close?";
};*/