

import data from "./data/BouffesPlusCaloriques.json"
function bubbles(){


  const width = 900;
  const height = 700;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["Fat (G)"])])
    .range([40, width - 40]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["Protein (G)"])])
    .range([height - 40, 40]);

  const radiusScale = d3.scalePow()
    .exponent(2)
    .domain([0, d3.max(data, d => d["Total Calories (Kcal)"])])
    .range([4, 80]);

  const svg = d3.select("#svg");

  const simulation = d3.forceSimulation(data)
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", d3.forceCollide(d => radiusScale(d["Total Calories (Kcal)"]) + 1))
    .on("tick", ticked);

  function ticked() {
    circles.attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  const tooltip = d3.select("body").append("div")
  .style("color", "white")
  .style("position", "absolute")
  .style("background-color", "#855A69")
  .style("padding", "10px")
  .style("border-radius", "14px")
  .style("border", "3px solid #ccc")
  .style("box-shadow", "3px 3px 6px rgba(0, 0, 0, 0.3)")
  .style("pointer-events", "none")
  .style("display", "none");

  // Créez des motifs et des images pour chaque élément de données
  const defs = svg.append("defs");
  data.forEach((d, i) => {
    const pattern = defs.append("pattern")
      .attr("id", `image-${i}`)
      .attr("width", 1)
      .attr("height", 1)
      .attr("patternUnits", "objectBoundingBox");

    const radius = radiusScale(d["Total Calories (Kcal)"]);
    const scaleFactor = radius / 40; // Ajustez ce facteur pour modifier le redimensionnement de l'image
    const imageWidth = 100 * scaleFactor;
    const imageHeight = 100 * scaleFactor;

    pattern.append("image")
      .attr("href", d.image)
      .attr("width", imageWidth)
      .attr("height", imageHeight)
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("x", (1 - scaleFactor) / 2)
      .attr("y", (1 - scaleFactor) / 2);
  });

  const circles = svg.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d["Fat (G)"]))
    .attr("cy", d => yScale(d["Protein (G)"]))
    .attr("r", 0)
    .attr("fill", (d, i) => `url(#image-${i})`)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .on("mouseover", (event, d) => {
      const tooltipWidth = 200; // Vous pouvez définir la largeur de la tooltip ici
      const tooltipHeight = 300; // Vous pouvez définir la hauteur de la tooltip ici
    
      let left = event.pageX + 10;
      let top = event.pageY - 40;
    
      // Ajuster la position de la tooltip si elle dépasse les limites de la fenêtre
      if (left + tooltipWidth > window.innerWidth) {
        left = left - tooltipWidth + 20;
      }
      if (top + tooltipHeight > window.innerHeight) {
        top = top - tooltipHeight + 40;
      }
    
      tooltip.html(`<div style="text-align: center; margin-bottom: 10px;">
                        <img src="${d.image}" width="100" style="border-radius: 5px;" />
                      </div>
                      <p>Pays : <span style="font-weight:bold;"> ${d.Country}</span> </p>
                      <p>Plat traditionnel :  ${d["National Dish"]}</p>
                      <p>Calories totales :  <span style="font-weight:bold;">${d["Total Calories (Kcal)"]} Kcal</span> </p>
                      <p>Gras :  ${d["Fat (G)"]}g</p>
                      <p>Proteine :  ${d["Protein (G)"]}g</p>
                      `)
        .style("left", `${left}px`)
        .style("top", `${top}px`)
        .style("display", "block");
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
    });
    
    
  circles.transition()
    .duration(2000)
    .attr("r", d => radiusScale(d["Total Calories (Kcal)"]));

}




export { bubbles};