import * as d3 from 'd3';


  function afficherDataMonde() {

    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const my_dataviz = d3.select("#stat3");

    function updateDimensions() {
        console.log(my_dataviz);
        const width = parseFloat(my_dataviz.style("width")) - margin.left - margin.right;
        const height = parseFloat(my_dataviz.style("height")) - margin.top - margin.bottom;
        return {width, height};
    }

  let {width, height} = updateDimensions();


 

  const svg = my_dataviz
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = datar.data;

    data.forEach(function (d) {
        d.date = new Date(+d.annee, 0); 
        d.value = +d.depenses;
        delete d.annee; 
        delete d.depenses; 
    });


    const x = d3.scaleTime()
        .domain(d3.extent(data, function (d) {
            return d.date;
        }))
        .range([0, width])
        ;
      const uniqueYears = Array.from(new Set(data.map(d => d.date.getFullYear())));


      const filteredYears = uniqueYears.filter(year => (year - uniqueYears[0]) % 3 === 0);

      const xAxis = d3.axisBottom(x)
          .tickValues(filteredYears.map(year => new Date(year, 0, 1)))
          .tickFormat(d3.timeFormat("%Y")); 

      svg.append("g")
    .attr("transform", `translate(7, ${height})`)
    .call(xAxis);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return +d.value;
        })])
        .range([height, 0]);


    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("transform", `translate(7, 0)`);

    const lineGenerator = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.value);
        });

    const pathData = lineGenerator(data);


// 1. Animer le tracé de la ligne


setTimeout(affichegraph,1100);

function affichegraph(){

    svg.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "white")
.attr("stroke-width", 2)
.attr("d", pathData)
.attr("transform", `translate(7, 0)`)
.attr("stroke-dasharray", function() {
    const totalLength = this.getTotalLength();
    return `${totalLength} ${totalLength}`;
})
.attr("stroke-dashoffset", function() {
    return this.getTotalLength();
})
.transition()
.duration(4500)
.ease(d3.easeLinear)
.attr("stroke-dashoffset", 0);


}
        window.addEventListener("resize", () => {
          const {width, height} = updateDimensions();
          my_dataviz.select("svg")
              .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
      });
}


let datar = {
  "data": [
    {
    "annee": 1997,
    "depenses": 200000000
    },
    {
    "annee": 1998,
    "depenses": 220000000
    },
    {
    "annee": 1999,
    "depenses": 240000000
    },
    {
    "annee": 2000,
    "depenses": 260000000
    },
    {
    "annee": 2001,
    "depenses": 280000000
    },
    {
    "annee": 2002,
    "depenses": 300000000
    },
    {
    "annee": 2003,
    "depenses": 320000000
    },
    {
    "annee": 2004,
    "depenses": 340000000
    },
    {
    "annee": 2005,
    "depenses": 360000000
    },
    {
    "annee": 2006,
    "depenses": 380000000
    },
    {
    "annee": 2007,
    "depenses": 400000000
    },
    {
    "annee": 2008,
    "depenses": 420000000
    },
    {
    "annee": 2009,
    "depenses": 440000000
    },
    {
    "annee": 2010,
    "depenses": 460000000
    },
    {
    "annee": 2011,
    "depenses": 480000000
    },
    {
    "annee": 2012,
    "depenses": 500000000
    },
    {
    "annee": 2013,
    "depenses": 520000000
    },
    {
    "annee": 2014,
    "depenses": 540000000
    },
    {
    "annee": 2015,
    "depenses": 560000000
    },
    {
    "annee": 2016,
    "depenses": 580000000
    }
    ]
  }
  


export { afficherDataMonde };
