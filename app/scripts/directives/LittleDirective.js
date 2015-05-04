'use strict';

angular.module('soofaApp').directive('liqChart', ['d3Service', '$window', '$timeout', function(d3Service, $window, $timeout){
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
        height = 700 - margin.top - margin.bottom,
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

      var svg = d3.select("liq-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.json('https://data.cityofboston.gov/resource/hda6-fnsh.json', function(error, data) {
        console.log(data);
        data.forEach(function(d){
          var year = ("Year" + d.issdttm.substring(0,4));

          if (year != NaN) {
            datum[year] += 1; }
          // debugger;
        });
        var dataArray = [];
        for(var o in datum) {
            dataArray.push(datum[o]);
        }
        x.domain(Object.keys(datum));
        y.domain([0, d3.max(dataArray)]);
        debugger;

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + 5 + ")")
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
          .text("Licenses Issued");

        svg.selectAll(".bar")
          .data(dataArray)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("transform", function(d, i) { return "translate(" + i * width/dataArray.length + ", 0)"; })
          .attr("width", x.rangeBand())
          .attr('fill', function(d){return color(d)})
          .attr("y", function(d){ return y(d) })
          .transition()
          .duration(6000)
          .attr("height", function(d){ return height - y(d) });
        });
      });
    }
  };
}]);
