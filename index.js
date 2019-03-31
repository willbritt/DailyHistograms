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
var text = d3.select("body").append("text")
.text("Current Day: 2")

makeButtons(data,xScale,yScale,binMaker,bins,width,height,barWidth,margins,text)
setup(data,xScale,yScale,binMaker,bins,width,height,barWidth,margins)
},

function(err)
{console.log(err);}

)

var makeButtons = function(data,xScale,yScale,binMaker,bins,w,h,barWidth,margins,text)
{
  d3.select("body").selectAll("button")
    .data(data)
    .enter()
    .append("button")
    .text(function(d,i){if(i<19){return "Day: "+d.homework[i].day;}})
    .style("opacity", function(d,i){if(i>=19){return 0;}})
    .style("display", "block")
    .style("margin", "4px")
    .on('click', function(d,i){ return update(i,data,xScale,yScale,binMaker,bins,w,h,barWidth,margins,text); });
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
                .tickValues([4.5,14.5,24.5,34.5,44.5])
                .tickFormat(function(d,i){return ""+bins[i].x0+"-"+bins[i].x1+"";})


    var yAxis  = d3.axisLeft(yScale);

    svg.append("g")
           .classed(xAxis,true)
           .call(xAxis)
           .attr("transform","translate("+margins.left+","
           +(margins.top+h)+")");

    svg.append("text")
      .attr("transform","translate(" + (w/2) + " ," + (h + 50) + ")")
      .text("Homework Grade");


     svg.append("g")
       .classed(yAxis,true)
       .call(yAxis)
       .attr("transform","translate("+(margins.left-10)+"," + 5 +")");

     svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x",0 - ((h/ 2) + 75))
      .attr("y", 10)
      .text("Number of Occurences");

//console.log(bins)

    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("height", function(d,i){return h-yScale(d.length);})
        .attr("width", barWidth-5)
        .attr("fill", "steelblue")
        .attr("x", function(d, i){return i*(w*4.7/(data.length))+margins.left;})
        .attr("y", function(d, i){return h-yScale(data.length-d.length)+margins.top-5;})



}

var update = function(dataIndex,data,xScale,yScale,binMaker,bins,w,h,barWidth,margins,text)
{
    var svg = d3.select("svg")
    console.log("Click")
    var dataToUpdate = getData(data, dataIndex);
    var binsNew = binMaker(dataToUpdate);


    svg.selectAll("rect")
        .data(binsNew)
        .transition()
        .attr("height", function(d,i){return h-yScale(d.length);})
        .attr("width", barWidth-5)
        .attr("fill", "steelblue")
        .attr("x", function(d, i){return i*(w*4.7/(data.length))+margins.left;})
        .attr("y", function(d, i){return h-yScale(data.length-d.length)+margins.top-5;})
        .style("opacity", function(d,i){if(i>=5){return 0;}})



      text.text(function(d,i){return "Current Day: "+data[0].homework[dataIndex].day})

}
