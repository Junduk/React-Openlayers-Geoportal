import React, { Component } from "react"
import { TileLayer } from "react-leaflet"
import LayerOrtofotoNS from "./LayerOrtofotoNS"
import LayerBuildings from "./LayerBuildings"
import LayerLanduse from "./LayerLanduse"
import LayerNatural from "./LayerNatural"
import LayerPlaces from "./LayerPlaces"
import LayerRailways from "./LayerRailways"
import LayerRoads from "./LayerRoads"
import LayerWaterways from "./LayerWaterways"

class OSM extends Component {

    render() {  
        const layer = this.props.data
        const layer1 = layer[0];
        const layer2 = layer[1];
        const layer3 = layer[2];
        const layer4 = layer[3];
        const layer5 = layer[4];
        const layer6 = layer[5];
        const layer7 = layer[6];
        const layer8 = layer[7];
        return(
            <div>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <LayerOrtofotoNS data={layer1}/>
                <LayerBuildings data={layer2}/>
                <LayerLanduse data={layer3}/>
                <LayerNatural data={layer4}/>
                <LayerPlaces data={layer5}/>
                <LayerRailways data={layer6}/>
                <LayerRoads data={layer7}/>
                <LayerWaterways data={layer8}/>
            </div>
        );
    }
}

export default OSM;
/*
<MapContainer 
                value="OSM"
                center={[45.26722, 19.83361]} 
                zoom={12} 
                scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <WMSTileLayer 
                    url="http://localhost:8080/geoserver/app/wms?"
                    version="2.20.1"
                    opacity={1}
                    transparent
                    layers={"app:ortofotoNS"}
                    srs="EPSG:32634"
                    format="image/png"
                />
            </MapContainer>
            */