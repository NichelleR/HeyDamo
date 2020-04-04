


d3.csv("https://raw.githubusercontent.com/NichelleR/ReasonsWhy/master/Resources/content_df.csv", function(message_data) {
    
    message_data = message_data.filter(function(d){ return d.word_count>25 })

var 
    parseDate = d3.timeParse("%Y-%m-%d"),
    parseTime = d3.timeParse("%I:%M %p")
    parseDay = d3.timeParse("%A"),
    parseFullDate = d3.timeParse("%Y-%m-%d %A %I:%M:%S.%L")
    formatTime = d3.timeFormat("%I:%M %p")
    formatDate = d3.timeFormat("%Y-%m-%d")

    message_data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.time = parseTime(d.time);
      d.day = parseDay(d.day);
      d.timestamp = parseFullDate(d.timestamp_formatted);
      // d.time = formatTime(d.timestamp_formatted)
      d.length = +(d.length);
    });


  console.log(message_data[0])    

  var xf = crossfilter(message_data)

  var content = xf.dimension(function (d) { return d.content; }),
    sender = xf.dimension(function (d) { return d.sender_name; }),
    date = xf.dimension(function (d) { return d.date; }),
    day = xf.dimension(function (d) { return d.day; }),
    time = xf.dimension(function (d) { return d.time; })

console.log(content[0], sender[0], date[0], day[0], time[0])
});