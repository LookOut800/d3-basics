'use strict';

angular.module('soofaApp').directive('drinkChart', ['d3Service', '$window', '$timeout', function(d3Service, $window, $timeout){
  return {
    restrict: 'E',
    link: function(scope, iElm, iAttrs, controller) {
        d3Service.d3().then(function(d3) {
      var datum = {
        Year2006: 0,
        Year2007: 0,
        Year2008: 0,
        Year2009: 0,
        Year2010: 0,
        Year2011: 0,
        Year2012: 0,
        Year2013: 0,
        Year2014: 0
      };

      var margin = {top: 20, right: 20, bottom: 30, left: 80},
        width = 700 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        color = d3.scale.category20();

      var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

      var svg = d3.select("drink-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.json('https://data.cityofboston.gov/resource/gb6y-34cq.json', function(error, data) {
        data.forEach(function(d){
          var year = ("Year" + d.licenseadddttm.substring(0,4));
          datum[year] += 1;
        });
        var dataArray = [];
        for(var o in datum) {
            dataArray.push(datum[o]);
        }
        x.domain(Object.keys(datum));
        y.domain([0, d3.max(dataArray)]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + 460 + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .attr("transform", "translate(-15, 0)")
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".5em")
          .style("text-anchor", "end")
          .text("Permits Issued");

        svg.selectAll(".bar")
          .data(dataArray)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("width", x.rangeBand())
          .attr("y", function(d){ return y(d) })
          .attr("height", function(d){ return height - y(d) })
          .transition()
          .duration(2000)
          .attr("transform", function(d, i) { return "translate(" + i * width/dataArray.length + ", 0)"; })
          .attr('fill', 'steelblue');
        });
      });
    }
  };
}]);
// // TODO: change the data
// var dato = [1, 2, 4, 8, 9];

// var width = 300,
//     barHeight = 20;

// // TODO: enable x-scale
// // TODO: enable this in "width" functions
// // var x = d3.scale.linear()
// //     .domain([0, d3.max(data)])
// //     .range([0, width]);

// var chart = d3.select(".chart")
//     .attr("width", width)
//     .attr("height", barHeight * dato.length);

// var bar = chart.selectAll("g")
//     .data(dato)
//   .enter().append("g")
//     .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

// bar.append("rect")
//     .attr("width", function (d) { return d*20; })
//     .attr("height", barHeight - 1);

// TODO: enable text
// bar.append("text")
//     .attr("x", function(d) { return d*10 - 3; })
//     .attr("y", barHeight / 2)
//     .attr("dy", ".35em")
//     .text(function(d) { return d; });
// function type(d) {
//   d = +d;
//   return d;
// }
      // var svg = d3.select(iElm[0]).append('svg').attr('width', 500).attr('height', 500).attr('fill', 'black').append('g')

      // svg.selectAll('circle')
      // .data(scope.data).enter()
      // .append('circle')
      // .attr('cx', 10)
      // .attr('cy', 10)
      // .attr('cr', 10);

// // TODO: change the data
// var data = [1, 2, 4, 8, 9];

// var width = 300,
//     barHeight = 20;

// // TODO: enable x-scale
// // TODO: enable this in "width" functions
// // var x = d3.scale.linear()
// //     .domain([0, d3.max(data)])
// //     .range([0, width]);

// var chart = d3.select(".chart")
//     .attr("width", width)
//     .attr("height", barHeight * data.length);

// var bar = chart.selectAll("g")
//     .data(data)
//   .enter().append("g")
//     .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

// bar.append("rect")
//     .attr("width", function (d) { return d*20; })
//     .attr("height", barHeight - 1);

// // TODO: enable text
// // bar.append("text")
// //     .attr("x", function(d) { return d*10 - 3; })
// //     .attr("y", barHeight / 2)
// //     .attr("dy", ".35em")
// //     .text(function(d) { return d; });
