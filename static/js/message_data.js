


d3.csv("https://raw.githubusercontent.com/NichelleR/ReasonsWhy/master/Resources/Message_df.csv", function(message_data) {
    
var 
    parseDate = d3.timeParse("%Y-%m-%d"),
    parseTime = d3.timeParse("%I:%M %p")
    parseDay = d3.timeParse("%A"),
    parseFullDate = d3.timeParse("%Y-%m-%d %I:%M:%S.%L")
    formatTime = d3.timeFormat("%I:%M %p")
    formatDate = d3.timeFormat("%Y-%m-%d")

    message_data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.time = parseTime(d.time);
      d.day = parseDay(d.day);
      d.timestamp_formatted = parseFullDate(d.timestamp_formatted);
      // d.time = formatTime(d.timestamp_formatted)
      d.length = +(d.length);
    });


  console.log(message_data[0])    

  var xf = crossfilter(message_data)

  var content = xf.dimension(function (d) { return d.content; }),
    sender = xf.dimension(function (d) { return d.sender_name; })

console.log(xf[0])
});