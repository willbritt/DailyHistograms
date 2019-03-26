dataP = d3.json("classData.json");

dataP.then(function(data)
{
  console.log("data",data)

  var screen =
  {
    width: 600,
    height: 400
  }


    var margins =
    {
      top: 10,
      bottom: 50,
      left: 50,
      right: 50
    }

  var width = screen.width-margins.left-margins.right;
  var height = screen.height-margins.top-margins.bottom;

  var barWidth = width/4;

  var yScale = d3.scaleLinear()
                .domain([0,d3.max(bins, function(d){return d;})])
                .range([height,0]);

  var xScale = d3.scaleLinear()
              .domain(d3.extent(data))
              .nice()

  var binMaker = d3.histogram()
                .domain.(xScale.domain())
                .threshold(xScale.ticks(50));

var bins = binMaker(data);

setup(data,xScale,yScale,binMaker,bins,width,height,barwidth,margins)

},

function(err)
{console.log(err);}

)


var setup = function(data,xScale,yScale,binMaker,bins,width,height,barwidth,margins)
{
  var svg = d3.select("svg")
    .attr("width", 600)
    .attr("height",400)

    var xAxis  = d3.axisBottom(xScale)
                  .scale(xScale)
                  .tickValues([.5,1.5,2.5,3.5])
                  .tickFormat(function(d, i){
                    return data[0].grades[i].name;
                  })



    var yAxis  = d3.axisLeft(yScale);

    svg.append("g")
           .classed(xAxis,true)
           .call(xAxis)
           .attr("transform","translate("+margins.left+","
           +(margins.top+ h)+")"
         );




     svg.append("g")
       .classed(yAxis,true)
       .call(yAxis)
       .attr("transform","translate("+(margins.left-20)+","
       + 5 +")");




    svg.selectAll("rect")
        .data(data[0].grades)
        .enter()
        .append("rect")
        .attr("height", function(d){return h-yScale(0);})
        .attr("width",barWidth-20)
        .attr("x", function(d, i){return xScale(i+.5);})
        .attr("y", function(d, i){return yScale(d.grade);})
        .attr("fill",function(d) {return colors(d.name);})
}
