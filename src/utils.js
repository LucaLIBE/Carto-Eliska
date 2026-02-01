export function addGeojson(data, config, countriesData, color, user) {
    const STORAGE_KEY = user === 'Luca' ? 'carto_eliska_luca_countries' : 'carto_eliska_eliska_countries';
    
    return L.geoJSON(data, {
        style: function (feature) {
            const isCountryInList = countriesData[feature.properties.CNTR_ID];
            return {
                color: config.borderColor,
                weight: config.weight,
                fillColor: isCountryInList ? color : config.fillColor,
                fillOpacity: isCountryInList ? config.fillOpacity : 0
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function(e) {
                const cntrId = feature.properties.CNTR_ID;
                
                // Toggle couleur
                if (countriesData[cntrId]) {
                    delete countriesData[cntrId];
                    layer.setStyle({
                        fillColor: config.fillColor,
                        weight: config.weight,
                        fillOpacity : 0
                    });
                } else {
                    countriesData[cntrId] = color;
                    layer.setStyle({
                        fillColor: color,
                        weight: config.weight,
                        fillOpacity: config.fillOpacity
                    });
                }
                
                // 🔥 SAUVEGARDE AUTOMATIQUE localStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(countriesData));
                console.log(`💾 ${user}: ${cntrId} sauvegardé (${Object.keys(countriesData).length} pays)`);
            });
        }
    });
}
