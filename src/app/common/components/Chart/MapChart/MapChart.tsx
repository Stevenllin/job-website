// @ts-ignore
import { useEffect, useRef } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import { MapChartProps } from "./types";

const MapChart: React.FC<MapChartProps> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = new jsVectorMap({
      selector: mapRef.current,
      map: 'world',
      markers: props.mapData,
      labels: {
        markers: {
          render(marker: { name?: string; labelName?: string }, index: number) {
            return marker.name
          }
        }
      },
      onMarkerClick: (_: React.MouseEvent, markerIndex: number) => {
        const marker = props.mapData[markerIndex];
        props.onSelectCountry(marker.name)
      }
    });
    

    // 清理 map instance
    return () => {
      map && map.destroy();
    };
  }, []);

  return (
    <div id="map" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
  )
}

export default MapChart;
