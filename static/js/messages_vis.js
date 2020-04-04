
// set the dimensions and margins of the graph
var margin = {top: 25, right: 30, bottom: 30, left: 60},
    w = 1750 - margin.left - margin.right,
    h = 900 - margin.top - margin.bottom;

// append the svg object to the body of the page
var messages_svg = d3.select("#messages_dataviz")
  .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/NichelleR/ReasonsWhy/master/Resources/love_df.csv", function(data) {
  // console.log(data[0])


  var 
    parseDate = d3.timeParse("%Y-%m-%d"),
    parseTime = d3.timeParse("%I:%M %p")
    // parseDay = d3.timeParse("%A"),
    // parseFullDate = d3.timeParse("%Y-%m-%d %I:%M:%S.%L")
    formatTime = d3.timeFormat("%I:%M %p")
    formatDate = d3.timeFormat()

  data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.time = parseTime(d.time);
      // d.day = parseDay(d.day);
      // d.timestamp_formatted = parseFullDate(d.timestamp_formatted);
      // d.time = formatTime(d.timestamp_formatted)
      d.length = +(d.length);
  });

  console.log(data[0])
  // data = data.filter(function(d){ return d.length>0 })

  // Add X axis
  var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, w])
    // .nice()
    ;
    messages_svg.append("g")
    .attr("transform", "translate(0," + h + ")")
    .attr("class", "xAxis")
    .call(d3.axisBottom(x));
    // .tickFormat(d3.timeFormat("%Y")).ticks(d3.timeYear.every(1)));

  // // Add Y axis
  var y = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.time; }))
    .range([ h, 0])
    .nice();
    messages_svg.append("g")    
    .attr("class", "yAxis")
    .call(d3.axisLeft(y)
    .tickFormat(d3.timeFormat("%I %p")).ticks(d3.timeHour.every(2)));

  var shape = d3.scaleOrdinal()
    .domain(["MiMs", "Damo"])
    .range([d3.symbolCircle, d3.symbolTriangle])

  var Messages_Tooltip = d3.select("#messages_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("min-width", "400px")
    .style("position", "absolute")
    .style("display", "inline")

  // Three function that change the tooltip when user hover / move / leave a cell
  var messages_mouseover = function(d) {
    Messages_Tooltip
      .style("opacity", 1)
      .style("visibility", "visible")
    }

  var messages_mousemove = function(d) {
    Messages_Tooltip
      .html("Sender: " + d.sender + "<br>" + "Content: " + d.content + "<br>" + "Date: " + d.date + "<br>" + "Time: " + formatTime(d.time))
      // .style("top", (d3.event.pageY+100)+"px")
      // .style("left", (d3.event.pageX) +"px")
      // .style("left", (d3.mouse(this)[0]) + "px")
      // .style("left", d3.select(this).attr("cx") + "px")
      .style("top", d3.select(this).attr("cy") + "px")
      .style("left", function(d){
                    if(d3.event.pageX+400 > 1650){
                        return d3.event.pageX-550+"px"
                    }else{
                        return d3.event.pageX+"px"
                    }
                })
    };

  var messages_mouseleave = function(d) {
    Messages_Tooltip
      .style("opacity", 0)
      .style("visibility", "hidden")
    }

  // // Add dots
  messages_svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("path")
      .attr("cx", function (d) { return x(d.date); } )
      .attr("cy", function (d) { return y(d.time); } )
      // .attr("r", 1.5)
      // .style("fill", "#69b3a2")
      .attr("class", "thing")
      .attr("d", d3.symbol()
        .size(75)
        .type(function(d) {  return shape(d.sender) })
      )
      .attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.time) + ")"; })
      .style("stroke", "white")
      .style("opacity", 0.8)
      .on("mouseover", messages_mouseover) // What to do when hovered
      .on("mousemove", messages_mousemove)
      .on("mouseleave", messages_mouseleave)


    

})
