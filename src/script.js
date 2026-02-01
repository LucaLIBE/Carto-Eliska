// Init map
const map = L.map('map').setView([20,0],2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '© OpenStreetMap'}).addTo(map);

//Charger le GeoJSON des pays
fetch('data/CNTR_RG_60M_2024_3035.geojson')
  .then(response => response.json())
  .then(data => {
    //Ajouter la couche GeoJSON
    const countriesLayer = L.geoJSON(data, {
      style: function (feature) {
        return {
          color: '#555',
          weight: 1,
          fillColor: '#cce5ff',
          fillOpacity: 0.6
        };
      },
      onEachFeature: function (feature, layer) {
        const name = feature.properties.name || 'Pays';
        layer.bindPopup('<strong>' + name + '</strong>');
      }
    }).addTo(map);
  })