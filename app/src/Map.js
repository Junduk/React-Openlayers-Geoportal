import React, { Component} from "react";
import Map from "ol/Map";
import View from "ol/View";
import LayerTile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps"
import {FullScreen, defaults as defaultControls} from "ol/control"
import Image from "ol/layer/Image"
import ImageWMS from "ol/source/ImageWMS"
import {fromLonLat} from 'ol/proj'

class MyMap extends Component {
  constructor(props) {
    super(props);

    this.state = { center: fromLonLat([19.836944, 45.251667]), zoom: 12 };

    this.podlogaBing = new LayerTile({
        source: new BingMaps({
          preload: Infinity,
          key: 'AkgabBUO34Sl1LcHyEFv2y5lpBjOUM0X22l2EqvOlPSOcCd9S8WqN-AkBTVUmo-A',
          imagerySet: 'AerialWithLabelsOnDemand',
        }),
    })
    this.podlogaOSM = new LayerTile({
        source: new OSM()
    });
    this.buildings = new Image({
      source: new ImageWMS({
          url:'http://localhost:8080/geoserver/wms',
          params:{'LAYERS': 'app:buildings'},
          serverType:'geoserver'
      }),
    })
    this.landuse = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:landuse'},
            serverType:'geoserver'
        })
    })
    this.natural = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:natural'},
            serverType:'geoserver'
        })
    })
    this.ortofotoNS = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:ortofotoNS'},
            serverType:'geoserver'
        })
    })
    this.place = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:place'},
            serverType:'geoserver'
        })
    })
    this.railways = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:railways'},
            serverType:'geoserver'
        })
    })
    this.road = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:road'},
            serverType:'geoserver'
        })
    })
    this.sentinel2NS = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:sentinel2NS'},
            serverType:'geoserver'
        })
    })
    this.waterways = new Image({
        source: new ImageWMS({
            url:'http://localhost:8080/geoserver/wms',
            params:{'LAYERS': 'app:waterways'},
            serverType:'geoserver'
        })
    })
    this.layers1 = [this.podlogaOSM];

    this.map = new Map({
      controls: defaultControls().extend([new FullScreen()]),
      target: null,
      layers: this.layers1,
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      }),
    });
    this.newSize = [500, 500];
    this.map.setSize(this.newSize);
  }

  download1(){
    const mapCanvas = document.createElement('canvas');
    const size = this.map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    const mapContext = mapCanvas.getContext('2d');
    Array.prototype.forEach.call(
      this.map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
      function (canvas) {
        if (canvas.width > 0) {
          const opacity =
            canvas.parentNode.style.opacity || canvas.style.opacity;
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          let matrix;
          const transform = canvas.style.transform;
          if (transform) {
            // Get the transform parameters from the style's transform matrix
            matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
          } else {
            matrix = [
              parseFloat(canvas.style.width) / canvas.width,
              0,
              0,
              parseFloat(canvas.style.height) / canvas.height,
              0,
              0,
            ];
          }
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          );
          const backgroundColor = canvas.parentNode.style.backgroundColor;
          if (backgroundColor) {
            mapContext.fillStyle = backgroundColor;
            mapContext.fillRect(0, 0, canvas.width, canvas.height);
          }
          mapContext.drawImage(canvas, 0, 0);
        }
      }
    );
    mapContext.globalAlpha = 1;
    mapContext.setTransform(1, 0, 0, 1, 0, 0);
    const link = document.getElementById('image-download');
    link.href = mapCanvas.toDataURL();
    link.click();
  }

  updateMap() {
    this.map.getView().setCenter(this.state.center);
    this.map.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.map.setTarget("map");

    // Listen to map changes
    this.map.on("moveend", () => {
      let center = this.map.getView().getCenter();
      let zoom = this.map.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.map.getView().getCenter();
    let zoom = this.map.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.map.once('rendercomplete', this.download1());
    this.map.renderSync();
}

roadLayer(bool) {
    if(bool === true){
        this.map.removeLayer(this.road);
    } else {
        this.map.addLayer(this.road);
    }
}

  render() {
    this.updateMap(); 
    return (
      <div id="map" style={{ width: "100%", height: "360px" }}>
        <button onClick={this.roadLayer(false)}>Download PNG</button>
        <a id="image-download" download="map.png"></a>
      </div>
    );
  }
}

export default MyMap;