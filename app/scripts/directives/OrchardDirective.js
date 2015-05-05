'use strict';

angular.module('soofaApp').directive('orchardChart', ['d3Service', function(d3Service) {
  return {
    restrict: 'EA',
    scope: {},
    link: link
  };

  function link(scope, element, attrs) {
    d3Service.d3().then(function(d3) {
      var width = 760,
      height = 760;

      var svg = d3.select("orchard-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
        .attr('class', 'well');

      var map = svg.append("g");
      var points = svg.append("g");
      // var legend = svg.append("g")
      //     .attr("class","legend")
      //     .attr("transform","translate(50,30)")
      //     .style("font-size","12px")
      //     .call(d3.legend);


      var projection = d3.geo.mercator()
        .center([42.409906001702293,-71.065948601971])
        .scale(75000);

      var path = d3.geo.path()
        .projection(projection)
        .pointRadius(1);

      var gardenMap = function(){
        d3.json("https://data.cityofboston.gov/resource/cr3i-jj7v.json", function(data){
        var gardens = [];
        for (var i = 1; i < data.length; i++) {
          var obj = {
            site: 'Unnamed',
            longitude: '',
            latitude: '',
            location: ''
          };
          obj.longitude = (parseFloat(data[i].map_location.longitude));
          obj.latitude = (parseFloat(data[i].map_location.latitude) );
          obj.site = data[i].site;
          obj.location = data[i].location;
          gardens.push(obj);

          points.selectAll("circle")
            .data(gardens)
            .enter().append("circle", ".circle")
            .attr('fill', 'white')
            .transition()
            .duration(2000)
            .attr("r", 8)
            .attr('fill', 'rgba(21, 103, 0, 0.7)')
            .attr('class', 'circle')
            // .attr("data-legend",function(d) { return d.site})
            .attr('id', function(d){
            return d.site;
          })
            .attr("transform", function(d) {
              return "translate(" + projection([
                d.latitude ,
                d.longitude
            ]) + ")"
          });
        };
      });
    };

      var orchardMap = function(){
        d3.json("https://data.cityofboston.gov/resource/c7cz-29ak.json", function(data){
        var orchards = [];
        console.log(data);
        for (var i = 1; i < data.length; i++) {
          var obj = {
            site: 'Unnamed',
            fruit: 'Garden',
            longitude: '',
            latitude: '',
            coordinates: 0
          };
          obj.site = data[i].name;
          obj.fruit = data[i].fruit
          obj.longitude = (parseFloat(data[i].map_locations.longitude));
          obj.latitude = (parseFloat(data[i].map_locations.latitude));
          obj.coordinates = parseInt(data[i].coordinates);
          orchards.push(obj);
        };
        points.selectAll("orchard")
          .data(orchards)
          .enter().append("circle", ".orchard")
          .transition()
          .duration(2000)
          .attr("r", 8)
          .attr('fill', 'rgba(239, 242, 71, 0.7)')
          // .attr('opacity', 0.5)
          .attr('class', 'circle')
          .attr('id', function(d){
            return d.site + ' orchard';
          })
          .attr("transform", function(d) {
            return "translate(" + projection([
            d.latitude ,
            d.longitude
          ]) + ")"
        });
      });
    };

    d3.json("boston_neighborhoods.json", function(error, bos) {
      if (error) return console.error(error);
      map.append("path")
      .datum(topojson.feature(bos, bos.objects.counties))
      .attr('fill', 'white')
      .transition()
      .duration(3000)
      .attr("d", d3.geo.path().projection(null))
      .attr('fill', 'gray');
      svg.append("path")
      .datum(topojson.mesh(bos, bos.objects.counties, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", d3.geo.path().projection(null))
      .attr('fill', 'none')
      .attr('stroke', 'white');
    });
    orchardMap();
    gardenMap();
    });
  }
}]);

