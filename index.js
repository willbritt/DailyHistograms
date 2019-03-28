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

  var yScale = d3.scaleLinear()
                .domain([0,data.length])
                .range([height,0]);

  var xScale = d3.scaleLinear()
              .domain([0,50])
              .nice()
              .range([0,width])



  var newData = getData(data, dayIndex);

  var binMaker = d3.histogram()
                .domain(xScale.domain())
                .thresholds(xScale.ticks(5));

var bins = binMaker(newData);

var barWidth = width/bins.length;
makeButtons(newData)
setup(data,xScale,yScale,binMaker,bins,width,height,barWidth,margins)
update(data,xScale,yScale,binMaker,bins,width,height,barWidth,margins)
},

function(err)
{console.log(err);}

)

var makeButtons = function(data)
{
  d3.select("body").selectAll("button")
    .data(data)
    .enter()
    .append("button")
    .text(function(d){return "Day: "+d.day})
    //.attr("on", update(d))
}

var getData = function(data, dayIndex)
{
  var newData = []

  data.forEach(function(d,i) {newData.push(d.homework[dayIndex].grade);})

  return newData
}

var setup = function(data,xScale,yScale,binMaker,bins,w,h,barWidth,margins)
{
  var svg = d3.select("svg")
    .attr("width", 600)
    .attr("height",400)

    var xAxis  = d3.axisBottom(xScale)
                .scale(xScale)
                .tickValues([5,15,25,35,45])
                .tickFormat(function(d,i){return ""+bins[i].x0+"-"+bins[i].x1+"";})



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
        .attr("height", function(d,i){return h-yScale(d.length);})
        .attr("width", barWidth)
        .attr("x", function(d, i){return i*(w*5/(data.length))+margins.left-18;})
        .attr("y", function(d, i){return h-yScale(data.length-d.length)+margins.top-5;})
}

var update = function(data,xScale,yScale,binMaker,bins,w,h,barWidth,margins)
{
  var svg = d3.select("svg")

    var xAxis  = d3.axisBottom(xScale)
                .scale(xScale)
                .tickValues([5,15,25,35,45])
                .tickFormat(function(d,i){return ""+bins[i].x0+"-"+bins[i].x1+"";})



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
        .attr("height", function(d,i){return h-yScale(d.length);})
        .attr("width", barWidth)
        .attr("x", function(d, i){return i*(w*5/(data.length))+margins.left-18;})
        .attr("y", function(d, i){return h-yScale(data.length-d.length)+margins.top-5;})
}
