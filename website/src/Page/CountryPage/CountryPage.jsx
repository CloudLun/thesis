import React, { useRef, useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import centroids from "../../Data/geojson/centroids.geojson";
import * as d3 from "d3";

const CountryPage = () => {
  const width = window.innerWidth * 0.8;
  const height = window.innerHeight;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(30.128);
  const [lat, setLat] = useState(25.915);
  const [zoom, setZoom] = useState(1.55);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw";
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/cloudlun/cl2eq8ceb000a15o06rah6zx5", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
      interactive: true,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    let transform = d3.geoTransform({ point: projectPoint });
    let path = d3.geoPath().projection(transform);
    // let container = map.getCanvasContainer();

    function projectPoint(lon, lat) {
      var point = map.current.project(new mapboxgl.LngLat(lon, lat));
      this.stream.point(point.x, point.y);
    }
    d3.json(centroids).then((data) => {
      const svg = d3
        .select(mapContainer.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("position", "absolute")
        .style("z-index", 2);

      let points = svg
        .append("g")
        .attr("id", "centroids")
        .selectAll("centroids")
        .data(data.features)
        .enter()
        .append("path")
        .attr("stroke", "none")
        .attr("fill", "red");

      function render() {
        points.attr("d", path.pointRadius(2.5));
      }
      render();
      map.current.on("viewreset", render);
      map.current.on("move", render);
      map.current.on("moveend", render);
    });
  }, [map.current]);

  // const layerStyle = {
  //   id: "point",
  //   type: "circle",
  //   paint: {
  //     "circle-radius": 2,
  //     "circle-color": "#007cbf",
  //   },
  // };

  return (
    <div ref={mapContainer} className="map-container w-full h-full">
      {/* <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 1.65,
        }}
        style={{ width: width, height: height }}
        mapStyle="mapbox://styles/cloudlun/clejmj3hv000j01mmdepmelqm"
        mapboxAccessToken="pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw"
        attributionControl={false}
      >
        <Source id="my-data" type="geojson" data={centroids}>
          <Layer {...layerStyle} />
        </Source>
      </Map> */}
    </div>
  );
};

export default CountryPage;
