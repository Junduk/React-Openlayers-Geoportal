import L from 'leaflet';
import 'leaflet-easyprint';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


function Download(props) {
    const map = useMap();
    useEffect(() => {
        const control = L.easyPrint({
        ...props
        });
        map.addControl(control)
        return () => {
        map.removeControl(control);
        }
    }, [map]);


    return null;
}

export default Download