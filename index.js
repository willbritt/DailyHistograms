dataP = d3.json("classData.json");

dataP.then(function(data)
{
  console.log("data",data)


  var xScale = d3.scaleLinear()
              .domain(d3.extent(data))
              .nice()

  var binMaker = d3.histogram()
                .domain.(xScale.domain())
                .threshold(xScale.ticks(50));

var bins = binMaker(data);

setup(data,xScale,binMaker,bins)

},

function(err)
{console.log(err);}

)


var setup = function(data,xScale,binMaker,bins)
{
  var svg = d3.select("svg")
    .attr("width", 600)
    .attr("height",400)
}
