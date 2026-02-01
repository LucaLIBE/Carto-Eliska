export function addGeojson(data, config, countriesData, color) {
    var countriesDataNew = countriesData
    var personLayer = L.geoJSON(data, {
          style: function (feature) {
            const isCountryInList=countriesData.includes(feature.properties.CNTR_ID);
            return {
              color: config.borderColor,
              weight: config.weight,
              fillColor: isCountryInList? color : config.fillColor,
              fillOpacity: isCountryInList? config.fillOpacity : 0
            }; 
          },
          onEachFeature: function (feature, layer) {
            layer.on('click', function(e){
                L.DomEvent.stopPropagation(e.originalEvent);
                if (countriesData.includes(feature.properties.CNTR_ID)) {
                    layer.setStyle({
                    color: config.borderColor,
                    weight: config.weight,
                    fillColor: config.fillColor,
                    fillOpacity: 0
                    });
                countriesDataNew = removeItem(countriesDataNew, feature.properties.CNTR_ID)
                }
                else {
                    layer.setStyle({
                        color: config.borderColor,
                        weight: config.weight,
                        fillColor: color,
                        fillOpacity: config.fillOpacity
                    });
                    countriesDataNew.push(feature.properties.CNTR_ID)
                }
            })
      }
        });
    return [personLayer, countriesDataNew];
}


function removeItem(array, itemToRemove) {
    const index = array.indexOf(itemToRemove);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}