import React, { Component } from "react";
import { WMSTileLayer } from "react-leaflet"

class LayerOrtofotoNS extends Component {
    
    render() {  
        return(
            <WMSTileLayer 
                url="http://localhost:8080/geoserver/app/wms?"
                version="2.20.1"
                opacity={this.props.data}
                transparent
                layers={"app:ortofotoNS"}
                srs="EPSG:32634"
                format="image/png"
            />
        );
    }
}

export default LayerOrtofotoNS;