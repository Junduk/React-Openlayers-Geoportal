import React, { useState, useRef, useEffect } from "react";
import "./DiplomskiContainer.css"
import Map from "ol/Map";
import View from "ol/View";
import LayerTile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps"
import {FullScreen, defaults as defaultControls} from "ol/control"
import Image from "ol/layer/Image"
import ImageWMS from "ol/source/ImageWMS"
import {fromLonLat, toLonLat} from 'ol/proj'
import Draw, {createBox, createRegularPolygon} from 'ol/interaction/Draw';
import Overlay from 'ol/Overlay';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {LineString, Polygon} from 'ol/geom';
import {Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {getArea, getLength} from 'ol/sphere';
import {unByKey} from 'ol/Observable';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Icon from 'ol/style/Icon';

function DiplomskiContainer() {
    
    const[map, setMap] = useState(0);
    const[sentinel2NS, setSentinel2NS] = useState(0);
    const[buildings, setBuildings] = useState(0);
    const[landuse, setLanduse] = useState(0);
    const[natural, setNatural] = useState(0);
    const[place, setPlace] = useState(0);
    const[railways, setRailways] = useState(0);
    const[road, setRoad] = useState(0);
    const[waterways, setWaterways] = useState(0);
    const[podlogaOSM, setPodlogaOSM] = useState(0);
    const[podlogaBing, setPodlogaBing] = useState(0)
    const[value, setValue] = useState("OSM");
    let vectorBool = false;
    let click;
    let iconBool = false;
    let arrayOfPins = [];
    const source1 = new VectorSource({wrapX: false});
    const vector = new VectorLayer({
        source: source1,
    });
    let shapesBool = false;
    let draw1;
    const type2Ref = useRef();
    const menu1 = useRef();
    const menu2 = useRef();
    
    let measureTooltipElement;
    let measureTooltip;
    let helpTooltipElement;
    let helpTooltip;
    let draw; 
    let drawBool = false;
    let layer1 = 0;
    let layer2 = 0;
    let layer3 = 0;
    let layer4 = 0;
    let layer5 = 0;
    let layer6 = 0;
    let layer7 = 0;
    let layer8 = 0;
    
    useEffect(() => {
        let newPodlogaBing =new LayerTile({
            source: new BingMaps({
                preload: Infinity,
                key: 'AkgabBUO34Sl1LcHyEFv2y5lpBjOUM0X22l2EqvOlPSOcCd9S8WqN-AkBTVUmo-A',
                imagerySet: 'AerialWithLabelsOnDemand',
                
            }),
        });
        setPodlogaBing(newPodlogaBing);

        let newPodlogaOSM = new LayerTile({
            source: new OSM(),
            
        });
        setPodlogaOSM(newPodlogaOSM);

        let newSentinel2NS = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:sentinel2NS'},
                serverType:'geoserver',
                
            }),
        });
        setSentinel2NS(newSentinel2NS);

        let newBuildings = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:buildings'},
                serverType:'geoserver',
                
            }),
        });
        setBuildings(newBuildings);

        let newLanduse = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:landuse'},
                serverType:'geoserver',
                
            }),
        });
        setLanduse(newLanduse);

        let newNatural = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:natural'},
                serverType:'geoserver',
                
            }),
        });
        setNatural(newNatural);

        /*
        let newOrtofotoNS = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:ortofotoNS'},
                serverType:'geoserver',
                
            })
        });
        setOrtofotoNS(newOrtofotoNS);
        */

        let newPlace = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:place'},
                serverType:'geoserver',
                
            })
        });
        setPlace(newPlace);

        let newRailways = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:railways'},
                serverType:'geoserver',
                
            }),
        });
        setRailways(newRailways);

        let newRoad = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:road'},
                serverType:'geoserver',
                
            }),
        });
        setRoad(newRoad);

        let newWaterways = new Image({
            source: new ImageWMS({
                url:'http://localhost:8080/geoserver/wms',
                params:{'LAYERS': 'app:waterways'},
                serverType:'geoserver',
                
            }),
        });
        setWaterways(newWaterways);

        let newMap = new Map({
            controls: defaultControls({ attribution: false }).extend([new FullScreen()]),
            view: new View({
                center: fromLonLat([19.836944, 45.251667]),
                zoom: 12
            }),
            target: "map",
        });

        setMap(newMap);
        newMap.addLayer(newPodlogaOSM);
        newMap.addLayer(newPodlogaBing);
        newMap.addLayer(newSentinel2NS);
        newMap.addLayer(newBuildings);
        newMap.addLayer(newLanduse);
        newMap.addLayer(newNatural);
        newMap.addLayer(newPlace);
        newMap.addLayer(newRailways);
        newMap.addLayer(newRoad);
        newMap.addLayer(newWaterways);
        
        newPodlogaBing.setOpacity(0);
        newSentinel2NS.setOpacity(0);
        newBuildings.setOpacity(0);
        newLanduse.setOpacity(0);
        newNatural.setOpacity(0);
        newPlace.setOpacity(0);
        newRailways.setOpacity(0);
        newRoad.setOpacity(0);
        newWaterways.setOpacity(0);

        menu1.current.style.display = "none";
        menu2.current.style.display = "none";
    }, []);

    function handleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();
    }

    function download1(){
        /*
        const map1 = new Map({
            layers: [
                new LayerTile({
                    source: new OSM(),
                    //
                })
            ],
            target: 'map',
            view: new View({
              center: [0, 0],
              zoom: 2,
            }),
          });
          */
          console.log(map.getSize());
          //map1.once('rendercomplete', function () {
            //const mapCanvas = document.createElement('canvas');
            /*
            const size = map1.getSize();
            mapCanvas.width = size[0];
            mapCanvas.height = size[1];
            const mapContext = mapCanvas.getContext('2d');
            Array.prototype.forEach.call(
              map1.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
              function (canvas) {
                if (canvas.width > 0) {
                  const opacity =
                    canvas.parentNode.style.opacity || canvas.style.opacity;
                  mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                  let matrix;
                  const transform = canvas.style.transform;
                  if (transform) {
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
            link.click();*/
          //});
          //map1.renderSync();
    }

    function download() {
        if(map.getSize() !== undefined){
            map.once('rendercomplete', function () {
                console.log(map.getSize());
                const mapCanvas = document.createElement('canvas');
                const size = map.getSize();
                mapCanvas.width = size[0];
                mapCanvas.height = size[1];
                const mapContext = mapCanvas.getContext('2d');
                Array.prototype.forEach.call(
                map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
                function (canvas) {
                    if (canvas.width > 0) {
                        const opacity =
                            canvas.parentNode.style.opacity || canvas.style.opacity;
                        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                        
                        const backgroundColor = canvas.parentNode.style.backgroundColor;
                        if (backgroundColor) {
                            mapContext.fillStyle = backgroundColor;
                            mapContext.fillRect(0, 0, canvas.width, canvas.height);
                        }

                        let matrix;
                        const transform = canvas.style.transform;
                        if (transform) {
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
                        CanvasRenderingContext2D.prototype.setTransform.apply(
                            mapContext,
                            matrix
                        );
                        mapContext.drawImage(canvas, 0, 0);
                    }
                }
                );
                mapContext.globalAlpha = 1;
                mapContext.setTransform(1, 0, 0, 1, 0, 0);
                const link = document.getElementById('image-download');
                link.href = mapCanvas.toDataURL();
                console.log("8");
                link.click();
            });
            map.renderSync();
        }
    }
    
    function handleChange(changeEvent) {
        if(changeEvent.target.checked){
            setValue(changeEvent.target.name); 
        }
        baseChange();
    } 
    
    function baseChange(){
        if(value === "OSM"){
            podlogaBing.setOpacity(1);
            podlogaOSM.setOpacity(0)
        } else if(value === "Bing") {
            podlogaBing.setOpacity(0);
            podlogaOSM.setOpacity(1);
        } else {
            console.log("Error");
        }
    }

    function handleLayerChange(changeEvent) {
        if(changeEvent.target.name === "layer1Checkbox"){
            if(changeEvent.target.checked){
                layer1 = 1;
                sentinel2NS.setOpacity(layer1);
            } else {
                layer1 = 0;
                sentinel2NS.setOpacity(layer1);
            }
        } else if(changeEvent.target.name === "layer2Checkbox"){
            if(changeEvent.target.checked){
                layer2 = 1;
                buildings.setOpacity(layer2);
            } else {
                layer2 = 0;
                buildings.setOpacity(layer2);
            }
        } else if(changeEvent.target.name === "layer3Checkbox"){
            if(changeEvent.target.checked){
                layer3 = 1;
                landuse.setOpacity(layer3);
            } else {
                layer3 = 0;
                landuse.setOpacity(layer3);
            }
        } else if(changeEvent.target.name === "layer4Checkbox"){
            if(changeEvent.target.checked){
                layer4 = 1;
                natural.setOpacity(layer4);
            } else {
                layer4 = 0;
                natural.setOpacity(layer4);
            }
        } else if(changeEvent.target.name === "layer5Checkbox"){
            if(changeEvent.target.checked){
                layer5 = 1;
                place.setOpacity(layer5);
            } else {
                layer5 = 0;
                place.setOpacity(layer5);
            }
        } else if(changeEvent.target.name === "layer6Checkbox"){
            if(changeEvent.target.checked){
                layer6 = 1;
                railways.setOpacity(layer6);
            } else {
                layer6 = 0;
                railways.setOpacity(layer6);
            }
        } else if(changeEvent.target.name === "layer7Checkbox"){
            if(changeEvent.target.checked){
                layer7 = 1;
                road.setOpacity(layer7);
            } else {
                layer7 = 0;
                road.setOpacity(layer7);
            }
        } else if(changeEvent.target.name === "layer8Checkbox"){
            if(changeEvent.target.checked){
                layer8 = 1;
                waterways.setOpacity(layer8);
            } else {
                layer8 = 0;
                waterways.setOpacity(layer8);
            }
        }
    };

    function mapAddDraw(){
        if(!drawBool){
            drawBool = true;
            
            const raster = new TileLayer({
                source: new OSM(),
            });
            
            const source = new VectorSource();
            
            const vector = new VectorLayer({
            source: source,
            style: {
                'fill-color': 'rgba(255, 255, 255, 0.2)',
                'stroke-color': '#ffcc33',
                'stroke-width': 2,
                'circle-radius': 7,
                'circle-fill-color': '#ffcc33',
            },
            });
            
            let sketch;
            const continuePolygonMsg = 'Click to continue drawing the polygon';
            const continueLineMsg = 'Click to continue drawing the line';
            const pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            let helpMsg = 'Click to start drawing';
            
            if (sketch) {
                const geom = sketch.getGeometry();
                if (geom instanceof Polygon) {
                helpMsg = continuePolygonMsg;
                } else if (geom instanceof LineString) {
                helpMsg = continueLineMsg;
                }
            }
            
            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);
            
            helpTooltipElement.classList.remove('hidden');
            };
            
            map.on('pointermove', pointerMoveHandler);
            
            map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
            });
            
            const typeSelect = document.getElementById('type1');
            const formatLength = function (line) {
            const length = getLength(line);
            let output;
            if (length > 100) {
                output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
            } else {
                output = Math.round(length * 100) / 100 + ' ' + 'm';
            }
            return output;
            };
            
            const formatArea = function (polygon) {
            const area = getArea(polygon);
            let output;
            if (area > 10000) {
                output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
            } else {
                output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
            }
            return output;
            };
            
            function addInteraction() {
            const type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
            draw = new Draw({
                source: source,
                type: type,
                style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new CircleStyle({
                    radius: 5,
                    stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                    }),
                }),
                }),
            });
            map.addInteraction(draw);
            
            createMeasureTooltip();
            createHelpTooltip();
            
            let listener;
            draw.on('drawstart', function (evt) {
                sketch = evt.feature;
            
                let tooltipCoord = evt.coordinate;
            
                listener = sketch.getGeometry().on('change', function (evt) {
                const geom = evt.target;
                let output;
                if (geom instanceof Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
                });
            });
            
            draw.on('drawend', function () {
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                measureTooltip.setOffset([0, -7]);
                sketch = null;
                measureTooltipElement = null;
                createMeasureTooltip();
                unByKey(listener);
            });
            }
            function createHelpTooltip() {
                if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
                }
                helpTooltipElement = document.createElement('div');
                helpTooltipElement.className = 'ol-tooltip hidden';
                helpTooltip = new Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left',
                });
                map.addOverlay(helpTooltip);
            }
            
            function createMeasureTooltip() {
                if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
                }
                measureTooltipElement = document.createElement('div');
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
                measureTooltip = new Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center',
                stopEvent: false,
                insertFirst: false,
                });
                map.addOverlay(measureTooltip);
            }
            
            typeSelect.onchange = function () {
                map.removeInteraction(draw);
                addInteraction();
            };
            
            addInteraction();

            document.getElementById('measureB').classList.add("bClass");
            menu2.current.style.display = "block";
        } else {
            map.removeInteraction(draw);
            map.removeOverlay(measureTooltip);
            map.removeOverlay(helpTooltip);
            map.removeOverlay(measureTooltipElement);
            map.removeOverlay(helpTooltipElement);
            drawBool = false;
            document.getElementById('measureB').classList.remove("bClass");
            menu2.current.style.display = "none";
        }
    }

    function mapAddIconSymbolizer(){
      if(!iconBool){
        iconSymbolizer1();
        document.getElementById('iconB').classList.add("bClass");
        iconBool = true;
      } else {
        unByKey(click);
        document.getElementById('iconB').classList.remove("bClass");
        iconBool = false;
      }
    }

    function iconSymbolizer1(){
        var iconStyle = new Style({
            image: new Icon(({
                anchor: [0.5, 1],
                src: "https://openlayers.org/en/latest/examples/data/icon.png"
            }))
          });
          var coordinates;
          click = map.on('click', function (evt) {
            var coords = toLonLat(evt.coordinate);
            var lon = coords[0];
            var lat = coords[1];
            coordinates = [lon, lat];
            var iconFeature = new Feature({geometry: new Point(fromLonLat(coordinates))});
            iconFeature.setStyle(iconStyle);
            var layer = new VectorLayer({
              source: new VectorSource({
                features: [iconFeature]})});
            arrayOfPins.push(layer);
            map.addLayer(layer);
          });
    }

    function resetIcons(){
        for(var i = 0; i <= arrayOfPins.length; i++){
          map.removeLayer(arrayOfPins[i]);
        }
    }
    
    function reset(){
        vector.getSource().clear();
    }
      
    function drawing(){
        if(!shapesBool){
            if(!vectorBool){
                vectorBool = true;
                map.addLayer(vector);
            }
            shapesBool = true;
            document.getElementById('drawB').classList.add("bClass");
            drawing1();
            menu1.current.style.display = "block";
        } else {
            shapesBool = false;
            document.getElementById('drawB').classList.remove("bClass");
            map.removeInteraction(draw1);
            menu1.current.style.display = "none";
        }
    }
      
    function drawing1() {
        let type = type2Ref.current.value;
        if (type !== 'None') {
            let geometryFunction;
            if (type === 'Square') {
                type = 'Circle';
                geometryFunction = createRegularPolygon(4);
            } else if (type === 'Box') {
                type = 'Circle';
                geometryFunction = createBox();
            } else if (type === 'Star') {
                type = 'Circle';
                geometryFunction = function (coordinates, geometry) {
                const center = coordinates[0];
                const last = coordinates[coordinates.length - 1];
                const dx = center[0] - last[0];
                const dy = center[1] - last[1];
                const radius = Math.sqrt(dx * dx + dy * dy);
                const rotation = Math.atan2(dy, dx);
                const newCoordinates = [];
                const numPoints = 12;
                for (let i = 0; i < numPoints; ++i) {
                    const angle = rotation + (i * 2 * Math.PI) / numPoints;
                    const fraction = i % 2 === 0 ? 1 : 0.5;
                    const offsetX = radius * fraction * Math.cos(angle);
                    const offsetY = radius * fraction * Math.sin(angle);
                    newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                }
                newCoordinates.push(newCoordinates[0].slice());
                if (!geometry) {
                    geometry = new Polygon([newCoordinates]);
                } else {
                    geometry.setCoordinates([newCoordinates]);
                }
                return geometry;
                };
            }
        draw1 = new Draw({
            source: source1,
            type: type,
            geometryFunction: geometryFunction,
        });
        map.addInteraction(draw1);
        }
    }

    function shapeChange() {
        if(shapesBool){
            map.removeInteraction(draw1);
            draw1 = "";
            drawing1();
        }
    };
    
    return (
        <div className="divv">
            <div className="sidebar">
                <div className="sidebar1">
                    <h2><u>Layers</u></h2>
                    <div className="base">
                        <form onSubmit={handleFormSubmit}>
                            <input 
                                id="a"
                                type="radio" 
                                className="base-item"
                                name="OSM"
                                checked={value === "OSM"}
                                onChange={handleChange}
                            /> OSM <br/>
                            <input 
                                id="b"
                                type="radio" 
                                className="base-item"
                                name="Bing"
                                checked={value === "Bing"}
                                onChange={handleChange}
                            /> Bing <br/>
                        </form>
                    </div>
                    <div className="separator"/>
                    <div className="layers">
                        <input className="layers-item" type="checkbox" name="layer1Checkbox" onChange={handleLayerChange} value="selectFeature"/>Select Feature<br/>
                        <input className="layers-item" type="checkbox" name="layer2Checkbox" onChange={handleLayerChange} value="buildings"/>Buildings<br/>
                        <input className="layers-item" type="checkbox" name="layer3Checkbox" onChange={handleLayerChange} value="landuse"/>Landuse<br/>
                        <input className="layers-item" type="checkbox" name="layer4Checkbox" onChange={handleLayerChange} value="natural"/>Natural<br/>
                        <input className="layers-item" type="checkbox" name="layer5Checkbox" onChange={handleLayerChange} value="places"/>Places<br/>
                        <input className="layers-item" type="checkbox" name="layer6Checkbox" onChange={handleLayerChange} value="railways"/>Railways<br/>
                        <input className="layers-item" type="checkbox" name="layer7Checkbox" onChange={handleLayerChange} value="roads"/>Roads<br/>
                        <input className="layers-item" type="checkbox" name="layer8Checkbox" onChange={handleLayerChange} value="waterways"/>Waterways<br/>
                    </div>
                </div>
                <div className="sidebar2">
                    <h2><u>Functions</u></h2>
                    <div className="buttons">
                        <button className="button-item" onClick={download} type="button" >Download PNG</button><br/>
                        <a id="image-download" download="map.png"></a>
                        <button className="button-item" id="iconB" type="button" onClick={mapAddIconSymbolizer}>Icon Symbolizer</button><br/>
                        <button className="button-item" id="resetIconsB" type="button" onClick={resetIcons}>Reset Icons</button><br/>
                        <button className="button-item" id="measureB" type="button" onClick={mapAddDraw}>Measure</button><br/>
                        <button className="button-item" id="drawB" type="button" onClick={drawing}>Draw Shapes</button><br/>
                        <button className="button-item" id="resetB" type="button" onClick={reset}>Reset Shapes</button><br/>
                    </div>
                    <div className="separator"/>
                    <div className="type1" ref={menu1}>
                        <label htmlFor="type2">Shape type:</label><br/>
                        <select ref={type2Ref} id="type2" onChange={shapeChange}>
                            <option value="Circle">Circle</option>
                            <option value="Square">Square</option>
                            <option value="Box">Box</option>
                            <option value="Star">Star</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                    <div className="type2" ref={menu2}>
                        <label htmlFor="type1">Measurement type:</label><br/>
                        <select id="type1">
                            <option value="length">Length (LineString)</option>
                            <option value="area">Area (Polygon)</option>
                        </select><br/>
                    </div>
                </div>
            </div>
            <div id='map' className="map" width="100%" height="100%"/>
        </div>
    );
}

export default DiplomskiContainer;