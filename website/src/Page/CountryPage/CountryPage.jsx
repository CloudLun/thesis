import React, { useRef, useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";

import centroids from "../../Data/geojson/centroids.geojson";

const CountryPage = () => {
  const width = window.innerWidth * 0.8 ;
  const height = window.innerHeight;

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 2,
      "circle-color": "#007cbf",
    },
  };

  return (
    <div className="">
      <Map
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
      </Map>
    </div>
  );
};

export default CountryPage;
