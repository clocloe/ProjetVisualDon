import data from "./data/json2014.json";
import data2 from "./data/data.json";
import L from "leaflet";
import { popup, popup2 } from "./large-popup.js";
import {histogrampays} from "./histogramcarte.js";
import datanouriture from "./data/donnenourriture.json";
//import  countriesGeoJSON from "./data/world-administrative-boundaries.json";

async function loadGeoJSON(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  }


  let paysactuelle = "";
  let ine = 0;
  async function cartechoropleth(){

    console.log(data);
    console.log(data2);
  const countriesGeoJSON = await loadGeoJSON("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json");
    console.log(countriesGeoJSON);
    countriesGeoJSON.features.push(cordonenauru);
    countriesGeoJSON.features.push(cookIslands);
    console.log(countriesGeoJSON);
    //countriesGeoJSON.features.push(randomisland);

  document.getElementById("slider").addEventListener("input", function (e) {

    const value = e.target.value;
    document.getElementById("map1").style.width = `${value}%`;

  });

  
      let synchronizing = false;

      

    let switchs = document.querySelector("#switch input");
    switchs.addEventListener("change", function (e) {
      if (e.target.checked) {
        map1.scrollWheelZoom.enable();
        map2.scrollWheelZoom.enable();
      } else {
        map1.scrollWheelZoom.disable();
        map2.scrollWheelZoom.disable();
      }
    });
      let scroll = false;

      let map1 = L.map("map1", {
        center: [0, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 4.5,
        scrollWheelZoom: scroll,
      });
      
      let map2 = L.map("map2", {
        center: [0, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 4.5,
        scrollWheelZoom: false, 
      });
      

      map1.on("click", hideLargePopup);
      map2.on("click", hideLargePopup);

      map1.on("move", debounce((e) => synchronizeMaps(map2, map1), 50));
      map1.on("zoomend", debounce((e) => synchronizeMaps(map2, map1), 8));
      
      map2.on("move", debounce((e) => synchronizeMaps(map1, map2), 7));
      map2.on("zoomend", debounce((e) => synchronizeMaps(map1, map2), 8));


      affichecarte1(map1);
      affichecarte2(map2);

 

      function getColor(value) {
        const minValue = 40;
        const maxValue = 0;
      
        const red = 255;
        const green = Math.floor(255 * (value - minValue) / (maxValue - minValue));
        const blue = 0;
      
        return `rgb(${red}, ${green}, ${blue}, 0.9)`;
      }
      function getColor2(value) {
        const minValue = 2;
        const maxValue = 50;
      
        const red = 0;
        const green = 0;
        const blue = Math.floor(255 - (255 * (value - minValue) / (maxValue - minValue)));
      
        return `rgb(${red}, ${green}, ${blue})`;
      }
      

  //carte
  function zoomToFeature(e, map) {
    map.fitBounds(e.target.getBounds());
    
  }

  function resetHighlight(e) {
    let layer = e.target;

    layer.setStyle({
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    });

    layer.closePopup();
  }

  function synchronizeMaps(mapToUpdate, referenceMap) {
    if (synchronizing) return;
  
    synchronizing = true;
  
    const newCenter = referenceMap.getCenter();
    const newZoom = referenceMap.getZoom();
  
    mapToUpdate.setView(newCenter, newZoom);
  
    synchronizing = false;
  }

  function debounce(func, wait) {
    let timeout;
  
    return function (...args) {
      const context = this;
  
      clearTimeout(timeout);
  
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }


  function findValueByCountryCode(code) {
    const countryData = data.find((country) => country.code === code);
  
    return countryData ? countryData.value : 0;
  }

  function findCountryDataByCountryCode(code) {
    return data.find((country) => country.code === code);
  }

  function findCountryDataByCountryCode2(code) {
    return data2.find((country) => country.cca3 === code || country.id === code);
  }  
  
  function findObesityRateByCountryCode(code) {
    const countryData = data2.find((country) => country.cca3 === code || country.id === code);
    return countryData ? countryData.obesityRate : 0;
  }

  function searchByCountry(pays, datanouriture) {
    var results = "";
    for (var i = 0; i < datanouriture.length; i++) {
      if (datanouriture[i]["Country"] === pays) {
        results = datanouriture[i]["National Dish"];
        
      }
    }
    return results;
  }


 
  async function displayLargePopup(countryData) {
    const container = document.getElementById("large-popup-container");
  
    // Utilisez le modèle popup2 pour les données de data2
      if (countryData.hasOwnProperty("obesityRate")) {
        container.innerHTML = popup2();
      
      } else {
        container.innerHTML = popup();

      }

   
      container.style.display = "block";
      
      
      container.style.animation = "fadeIn 0.5s";
    
      document.getElementById("country-name").textContent = countryData.Country || countryData.country;

      if (countryData.hasOwnProperty("obesityRate")) {
        document.getElementById("obesityRate").textContent = countryData.obesityRate;
        document.getElementById("rank").textContent = countryData.rank;
        document.getElementById("population").textContent = countryData.pop2023;
        document.getElementById("plat").textContent =  searchByCountry(paysactuelle, datanouriture);
      
        console.log(paysactuelle);
        histogrampays(paysactuelle);
        // Mettez à jour les autres éléments avec les informations supplémentaires
      } else {
        document.getElementById("average").textContent = countryData.value || countryData.obesityRate;
        document.getElementById("female").textContent = countryData.Female || "";
        document.getElementById("male").textContent = countryData.Male || "";
       document.getElementById("plat").textContent =  searchByCountry(paysactuelle, datanouriture);
      
        console.log(paysactuelle);
        histogrampays(paysactuelle);
        // Mettez à jour les autres éléments avec les informations supplémentaires
      }
    }

  function hideLargePopup() {
    const container = document.getElementById("large-popup-container");
    container.style.display = "none";
  }

  function createPopupContent(countryData) {
    return `
        <strong>${countryData.Country}</strong><br>
        Moyenne : ${countryData.value.toFixed(1)}<br>
        Femme : ${countryData.Female.toFixed(1)}<br>
        Homme : ${countryData.Male.toFixed(1)}
    `;
  }

  function createPopupContent2(countryData) {
    return `
        <strong>${countryData.country}</strong><br>
        Moyenne : ${countryData.obesityRate}<br>
        Positionnement : ${countryData.rank}<br>
       
    `;
  }


  
  function affichecarte1(map) {

    return L.geoJson(countriesGeoJSON, {


      style: function (feature) {
        const value = findValueByCountryCode(feature.id);
        return {
          fillColor: getColor(value),
          weight: 1,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
         };
      },
      onEachFeature: function (feature, layer) {
        layer.on({
          mousemove: highlightFeature,
          mouseout: resetHighlight,
          click: (e) => zoomToFeature(e, map),
        });
      },
    }).addTo(map);;
  }




  function affichecarte2(map) {

  return L.geoJson(countriesGeoJSON, {
      style: function (feature) {
        const obesityRate = findObesityRateByCountryCode(feature.id);
        return {
          fillColor: getColor2(obesityRate),
          weight: 1,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        
         };
      },
      onEachFeature: function (feature, layer) {
        layer.on({
          mousemove: highlightFeature2,
          mouseout: resetHighlight,
          click: (e) => zoomToFeature(e, map),
        });
      },
    }).addTo(map);;
  }

  function highlightFeature(e) {
    var layer = e.target;
    const countryCode = layer.feature.id;
    const countryData = findCountryDataByCountryCode(countryCode);
  
    layer.setStyle({
      weight: 0,
      color: "#666",
      dashArray: "",
      fillOpacity: 1,
    });
  
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  
    if (countryData) {
      const popupContent = createPopupContent(countryData);
      layer.bindPopup(popupContent).openPopup();
    }
  
    // Appeler displayLargePopup seulement lors du clic
    layer.on("click", function () {
      if (countryData) {
        paysactuelle = countryData.Country;
        displayLargePopup(countryData, e.originalEvent);
        
        console.log(paysactuelle);

      }
    });
  }
  
  // Modification dans la fonction highlightFeature2
  function highlightFeature2(e) {
    var layer = e.target;
    const countryCode = layer.feature.id;
    const countryData = findCountryDataByCountryCode2(countryCode);
    console.log(countryData)
    layer.setStyle({
      weight: 0,
      color: "#666",
      dashArray: "",
      fillOpacity: 1,
    });
  
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  
    if (countryData) {
      const popupContent = createPopupContent2(countryData);
      layer.bindPopup(popupContent).openPopup();
    }
  
    // Appeler displayLargePopup seulement lors du clic
    layer.on("click", function () {
      if (countryData) {
        paysactuelle = countryData.country;
        displayLargePopup(countryData, e.originalEvent);
        
         console.log(paysactuelle);
      }
    });
  }

  function resetHighlight(e) {
    let layer = e.target;

    layer.setStyle({
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    });

    layer.closePopup();
  }

}

let cordonenauru ={"geometry": {
    
    "coordinates": [
      [
        [167.020643, -0.861606],
  [167.006426,  0.267701],
  [166.802498,  0.267701],
  [166.788081, -0.165219],
  [166.656831, -0.165219],
  [166.656831, -0.861606],
  [166.990164, -1.007493],
  [167.005581, -0.861606],
  [167.039164, -0.861606],
  [167.054581, -1.007493],
  [167.020643, -1.007493],
  [167.003048, -1.153379],
  [166.990164, -1.153379],
  [166.973569, -1.007493],
  [166.956831, -1.007493],
  [166.941236, -0.861606],
  [166.973569, -0.165219],
  [166.990164, -0.861606],
  [167.023498, -0.861606],
  [167.020643, -0.861606]
      ]
    ],
    "type": "Polygon"
  },
  "id": "NRU",
  "properties": {
    "name": "Nauru"
  },
  "type": "Feature",
}
let cookIslands = {
  "type": "Feature",
  "id": "COK",
  "properties": {
    "name": "Cook Islands"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [165.836276, 0.476181],
        [165.812159, 0.529155],
        [165.701752, 0.530488],
        [165.703084, 0.643894],
        [165.416577, 0.649226],
        [165.415244, 0.312886],
        [165.157571, 0.309220],
        [165.160237, 0.162882],
        [165.304575, 0.160216],
        [165.306907, -0.320454],
        [165.573479, -0.322786],
        [165.571147, 0.161548],
        [165.715485, 0.159216],
        [165.713153, 0.305554],
        [165.836276, 0.476181]
     
      ]
    ]
  }
};


let randomisland ={
  "type": "Feature",
  "id": "RND",
  "properties": {
    "name": "RandomIsland"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [-140, 20],
        [-60, 20],
        [-60, 60],
        [-140, 60],
        [-140, 20]
      ]
    ]
  }
}



export {cartechoropleth};