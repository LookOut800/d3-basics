'use strict';

angular.module('soofaApp')
  .directive('foodChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
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
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 600 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

          var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var parseDate = d3.time.format("%y-%m-%").parse;

          var line = d3.svg.line()
            .x(function(d) {
              return x(d);
            })
            .y(function(d) {
              return y(d.y);
            })
            .interpolate('linear');

          var svg = d3.select(element[0]).append('svg')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom)
           .append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


          d3.json('https://data.cityofboston.gov/resource/gb6y-34cq.json', function(data) {
            data.forEach(function(d){
            var year = ("Year" + d.licenseadddttm.substring(0,4));
            datum[year] += 1;
        });
        var dataArray = [];
        for(var o in datum) {
            dataArray.push(datum[o]);
        }
        var plotarray = []
        function makeplots(array){
          array.forEach()
        }
        // debugger;
        x.domain(Object.keys(datum));
        y.domain([0, d3.max(dataArray)]);

          svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

          svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Number of things');

          svg.append('path')
            .attr('d', line(datum))
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
          });
        });
      }};
    }]);
