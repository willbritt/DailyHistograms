dataP = d3.json("classData.json");


  var dayIndex = 0;

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

  var barWidth = width/51;

  var yScale = d3.scaleLinear()
                .domain([0,data[0].homework[0].max])
                .range([height,0]);

  var xScale = d3.scaleLinear()
              .domain([0,51])
              .nice()
              .range([0,width])



  var newData = getData(data, dayIndex);

  var binMaker = d3.histogram()
                .domain(xScale.domain())
                .thresholds(xScale.ticks(50));

var bins = binMaker(newData);

setup(data,xScale,yScale,binMaker,bins,width,height,barWidth,margins)

},

function(err)
{console.log(err);}

)

var getData = function(data, dayIndex)
{
  var newData = []

  data.forEach(function(d,i) {newData.push(d.homework[dayIndex]);})

  return newData
}

var setup = function(data,xScale,yScale,binMaker,bins,w,h,barWidth,margins)
{
  var svg = d3.select("svg")
    .attr("width", 600)
    .attr("height",400)

    var xAxis  = d3.axisBottom(xScale)



    var yAxis  = d3.axisLeft(yScale);

    svg.append("g")
           .classed(xAxis,true)
           .call(xAxis)
           .attr("transform","translate("+margins.left+","
           +(margins.top+h)+")"
        );


     svg.append("g")
       .classed(yAxis,true)
       .call(yAxis)
       .attr("transform","translate("+(margins.left-10)+","
       + 5 +")");

console.log(bins)

    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("height", function(d,i){return yScale(data.length-d.length);})
        .attr("width",barWidth)
        .attr("x", function(d, i){return margins.left+xScale(i+i*0.5);})
        .attr("y", function(d, i){return yScale(data.length-d.length)-margins.top-10;})
}
