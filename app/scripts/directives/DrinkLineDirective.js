'use strict';

angular.module('soofaApp')
  .directive('drinkLineChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {

      d3Service.d3().then(function(d3) {

      d3.json('https://data.cityofboston.gov/resource/gb6y-34cq.json', function(data) {

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
        data.forEach(function(d){
            var year = ("Year" + d.licenseadddttm.substring(0,4));
            datum[year] += 1;
          });
          var dataArray = [];
          for(var o in datum) {
            dataArray.push(datum[o]);
          }
        var plots = d3.range(8).map(function(d){
              return {x: d + 1, y: dataArray[d]}
            });
        var WIDTH = 700,
            HEIGHT = 500,
            MARGINS = {
              top: 20,
              right: 20,
              bottom: 20,
              left: 50
            },
            xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(plots, function(d) {
              return d.x;
            }), d3.max(plots, function(d) {
              return d.x;
            })]),
            yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(plots, function(d) {
              return d.y;
            }), d3.max(plots, function(d) {
              return d.y;
            })]),
            xAxis = d3.svg.axis()
              .scale(xRange)
              .tickValues([0,1,2,3,4,5,6,7,8])
              .tickSize(5)
              .tickSubdivide(true),
            yAxis = d3.svg.axis()
              .scale(yRange)
              .tickSize(5)
              .orient('left')
              .tickSubdivide(true);

        var svg = d3.select('drink-line-chart').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);
        svg.append('svg:g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
          .call(xAxis);

        svg.append('svg:g')
          .attr('class', 'y axis')
          .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
          .call(yAxis);

        var parseDate = d3.time.format("%y-%m-%d").parse;

        var lineFunc = d3.svg.line()
          .x(function(d) { return xRange(d.x); })
          .y(function(d) { return yRange(d.y); })
          .interpolate('monotone');

        svg.append('svg:path')
          .attr('d', lineFunc(plots))
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 5)
          .attr('fill', 'none')
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseout", mouseout);

        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", 10)
          .attr('x', -50)
          .attr("dy", ".5em")
          .attr("transform", "rotate(-90)")
          .text("Permits Issued");

        var div = d3.select("drink-line-chart").append("div")
          .attr("class", "tooltip")
          .style("opacity", 1e-6);

        function mouseover() {
          div.transition()
            .style("opacity", .8)
            .attr('fill', 'gray');
        }

        function mousemove(d) {
          div.text(d3.event.pageY - HEIGHT)
            .style("left", (d3.event.pageX - 24) + "px")
            .style("top", (d3.event.pageY - 20) + "px");
        }

        function mouseout() {
          div.transition()
              .style("opacity", 1e-6);
        }
      });
    });
  }};
}]);
