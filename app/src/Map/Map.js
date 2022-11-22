import React, { useState, useRef, useEffect } from "react";
import Map from 'react-openlayers'
import View from 'react-openlayers'
import TileLayer from 'react-openlayers'
import VectorLayer from 'react-openlayers'
import VectorSource from 'react-openlayers'
import XYZ from 'react-openlayers'

function Map1() {
    const [ map, setMap ] = useState();
    const [ featuresLayer, setFeaturesLayer ] = useState();
    const [ selectedCoord , setSelectedCoord ] = useState();

    const mapElement = useRef();

    // initialize map on first render - logic formerly put into componentDidMount
    useEffect( () => {

        // create and add vector source layer
        const initalFeaturesLayer = new VectorLayer({
        source: new VectorSource()
        })

        // create map
        const initialMap = new Map({
        target: mapElement.current,
        layers: [
            
            // USGS Topo
            new TileLayer({
                source: new XYZ({
                    url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
                })
            }),

            initalFeaturesLayer
            
        ],
        view: new View({
            projection: 'EPSG:3857',
            center: [0, 0],
            zoom: 2
        }),
        controls: []
        })

        // save map and vector layer references to state
        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)

    },[])
    
    var map1 = new Map({
        //controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
        //layers: layers1,
        //target: 'map',
        view: new View({
            //center:ol.proj.fromLonLat([19.836944, 45.251667]),
            zoom:6
        })
    })
    return (
        //<div ref={mapElement} className="map-container"></div>
        <div>
            map1
        </div>
    )
}

export default Map1