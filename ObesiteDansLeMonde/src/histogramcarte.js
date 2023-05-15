import datanouriture from "./data/donnenourriture.json";

function histogrampays(pays) {

    datar.data = searchByCountry(pays, datanouriture);
    console.log(datar);
    remplacevirgule(datar.data[0]);
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };

    const propertiesMapping = [
        { name: "Gras", key: "Graisse" },
        { name: "Gras Saturé", key: "Saturated Fat (G)" },
        { name: "Sel", key: "Salt (G)" },
        { name: "Carbs (G)", key: "Carbs (G)" },
        { name: "Sucre", key: "Sugars (G)" },
        { name: "Proteine", key: "Protein (G)" },
      ];

    function updateDimensions() {
        const width = parseFloat(my_dataviz.style("width")) - margin.left - margin.right;
        const height = parseFloat(my_dataviz.style("height")) - margin.top - margin.bottom;
        return { width, height };
      }
    
        const my_dataviz = d3.select("#graph");
        const width = 420;
        const height = 300;
    
    const svg = my_dataviz
    .append("svg")
    .attr("width", width  + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);


        const dataForHistogram = datar.data.map(function (d) {
            return { year: d.annee, chapters: d.depenses };
        });

      
            
            const x = d3.scaleBand()
            .domain(propertiesMapping.map(d => d.name))
            .range([0, width])
            .padding(0.2);
        
          const y = d3.scaleLinear()
            .domain([0, 70])
            .range([height, 0]);
        
          svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        
          svg.append("g")
            .call(d3.axisLeft(y));
        
        
          setTimeout(maFonction, 1000);


                
    

        setTimeout(maFonction, 1000);

        function maFonction() {
          svg.selectAll("rect")
            .data(propertiesMapping)
            .enter()
            .append("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(datar.data[0][d.key]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(datar.data[0][d.key]))
            .attr("fill", "black")
            .attr("stroke", "white")
            .attr("stroke-width", 2);
        }

       

window.addEventListener("resize", () => {
    const {width, height} = updateDimensions();
    my_dataviz.select("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
});
    
}


function searchByCountry(pays, datanouriture) {
    var results = [];
    for (var i = 0; i < datanouriture.length; i++) {
      if (datanouriture[i]["Country"] === pays) {
        results.push(datanouriture[i]);
      }
    }
    return results;
  }

  function remplacevirgule(obj) {
    for (let prop in obj) {
      if (typeof obj[prop] === "string") {
        obj[prop] = obj[prop].replace(",", ".");
      }
    }
    return obj;
  }
  
let datar = {
    "data": [
    
    ]
  }
  

  
export {histogrampays};