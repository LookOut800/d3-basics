'use strict';

angular.module('soofaApp').directive('littleChart', ['d3Service', function(d3Service){
  return {
    restrict: 'E',
    replace: false,
    scope: {},
    link: function(scope, iElm, iAttrs, controller) {
      d3Service.d3().then(function(d3) {

        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 60
        },
        width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .rangeRound([height, 0]);

        var color = d3.scale.ordinal()
            .range(["#308fef", "#5fa9f3", "#1176db"]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));

        var svg = d3.select('#container')
          .append('svg').attr("class", "chart")
          .selectAll('#container')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        scope.data = {
          year2006: 0,
          year2007: 0,
          year2008: 0,
          year2009: 0,
          year2010: 0,
          year2011: 0,
          year2012: 0,
          year2013: 0,
          year2014: 0,
          year2015: 0,
        };

        d3.json('https://data.cityofboston.gov/resource/gb6y-34cq.json', function(data){
          console.log('hello');
          data.forEach(function(d){
            var year = ("year" + d.licenseadddttm.substring(0,4));
            scope.data[year] += 1;
          });
        });
      });
    }
  };
}]);

