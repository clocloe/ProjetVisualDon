function fonctionne() {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };

  const duration = 4500; // Durée de l'animation en millisecondes

  function updateDimensions() {
      const width = parseFloat(my_dataviz.style("width")) - margin.left - margin.right;
      const height = parseFloat(my_dataviz.style("height")) - margin.top - margin.bottom;
      return { width, height };
  }

  const my_dataviz = d3.select("#stat2");
  const { width, height } = updateDimensions();

  const svg = my_dataviz
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const dataForHistogram = datar.data.map(function (d) {
      return { facteur: d.facteur, pourcentage: d.pourcentage };
  });

  (function (data) {
      const x = d3.scaleBand()
          .domain(data.map(d => d.facteur))
          .range([0, width])
          .padding(0.1);
      svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.pourcentage)])
          .range([height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y));

      setTimeout(maFonction, 1000);

      function maFonction() {
          svg.selectAll("rect")
              .data(data)
              .join("rect")
              .attr("x", d => x(d.facteur))
              .attr("y", d => y(0))
              .attr("width", x.bandwidth())
              .attr("height", 0)
              .style("fill", "#d77c7c")
              .attr("stroke", "#fff")
              .attr("stroke-width", 1)
              .transition()
              .duration(duration)
              .attr("y", d => y(d.pourcentage))
              .attr("height", d => height - y(d.pourcentage));
      }
  })(dataForHistogram);

  window.addEventListener("resize", () => {
      const { width, height } = updateDimensions();
      my_dataviz.select("svg")
          .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
  });
}


let datar = {
  "data": [
    {
      "facteur": "Alimentation",
      "pourcentage": 35 
    },
    {
      "facteur": "Activité physique",
      "pourcentage": 25
    },
    {
      "facteur": "Facteurs génétiques",
      "pourcentage": 20
    },
    {
      "facteur": "Environnement",
      "pourcentage": 10
    },
    {
      "facteur": "Stress",
      "pourcentage": 5
    },
    {
      "facteur": "Sommeil",
      "pourcentage": 3
    },
    {
      "facteur": "Médicaments",
      "pourcentage": 2
    }
]

  }
  

  
export {fonctionne};