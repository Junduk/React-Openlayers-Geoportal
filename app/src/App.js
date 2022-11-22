import {
    interaction, layer, custom, control, source, markers,
    Interactions, Overlays, Controls, Sources, selectedMarkerStyle,
    Map, Layers, Overlay, Util, BingMaps
} from "react-openlayers";
import BingMapsReact from "bingmaps-react";
import { Map as Map1 } from "ol"
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Bing from 'ol/source/BingMaps'
import View from 'ol/View';
  
  function App() {
    return (
      <div className="App">
        <Map 
            height="500px"
            width="500px"
            view={{center:[0,0], zoom:2}}>
            <Layers>
                <layer.Tile 
                    opacity={1}>
                </layer.Tile>
            </Layers>
            <Controls attribution={false} zoom={true}>
                <control.FullScreen />
            </Controls>
            <Interactions>
                <interaction.Select style={selectedMarkerStyle} />
                <interaction.Draw source={markers} type='Point' />
            </Interactions>
        </Map>
      </div>
    );
  }
  
  export default App;
