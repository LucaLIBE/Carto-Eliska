import {addGeojson} from './utils.js'

let editMode = false
const colorLuca = "rgb(0,0,255)";
const colorEliska = "rgb(255, 0, 234)";

const config = {"borderColor":"#555", "weight":1, "fillColor":"#ffffff", "fillOpacity":"0.2"}
// Init map
const map = L.map('map',{renderer: L.canvas()}).setView([55.182465, 16.875],4);
const background = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '© OpenStreetMap'}).addTo(map);

const baseMaps = {
  "OpenStreetMap": background
};

const memoriesLayer = L.layerGroup();
const countriesLayer = L.layerGroup();

L.marker([48.8716, 2.4459]) //montreuil
  .bindPopup('<strong>Là où j\'ai vécu</strong><br>')
  .addTo(memoriesLayer);

L.marker([49.2011, 16.6170]) //brno
  .bindPopup('<strong>Là où ma chérie est née et a vécue</strong><br>')
  .addTo(memoriesLayer);

L.marker([65.05897, 25.4565]) //oulu
  .bindPopup('<strong>La rencontre qui a tout changé</strong><br>')
  .addTo(memoriesLayer);

L.polyline([
  [48.84367617727348, 2.3662791335363327], //paris
  [45.23859281198733, 0.5233340522621293], //périgueux
  [43.611476095972726, 1.4537361791550047], //toulouse
  [43.605913952793124, 3.880151754023454], //montpellier
  [43.30319707280594, 5.381010909826569], //marselle
  [43.128611354844324, 5.929518096325256], //toulon
  [43.66907435893387, 7.210809923338476] //nice
  ],
  {
    color : '#00f',
    weight : 4,
    opacity : 0.8,
    smoothFactor : 1
  })
  .bindPopup('<strong>Premier été ensemble</strong><br>')
  .addTo(memoriesLayer); 

memoriesLayer.addTo(map);

const overlays = {
  "<strong>Lieux marquants</strong>" : memoriesLayer,
}

fetch('data/countries.json')
  .then(response => response.json())
  .then(countriesData => {
    //Charger le GeoJSON des pays
    fetch('data/CNTR_RG_03M_2024_4326.geojson')
      .then(response => response.json())
      .then(data => {
        addGeojson(data, config, [], colorLuca)[0].addTo(memoriesLayer);
        //Ajouter la layer GeoJSON Luca
        const [countriesLayerLuca, countriesLucaNew] = addGeojson(data, config, countriesData.countriesLuca, colorLuca);
        layersControl.addOverlay(countriesLayerLuca, '<strong>Pays Luca</strong>');

        //Ajouter la layer GeoJSON Eliska
        const [countriesLayerEliska, countriesEliskaNew] = addGeojson(data, config, countriesData.countriesEliska, colorEliska);
        layersControl.addOverlay(countriesLayerEliska, '<strong>Pays Eliska</strong>');
      });
  })

const layersControl = L.control.layers(baseMaps, overlays).addTo(map);

function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);
}
map.on('click', onMapClick);

