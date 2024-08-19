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
      zoomOnScroll: false, // 禁用滑鼠滾輪縮放
      markers: props.mapData,
      labels: {
        markers: {
          // Starting from jsvectormap v1.2 the render function receives
          // the marker object as a first parameter and index as the second.
          render(marker: { name?: string; labelName?: string }, index: number) {
            return marker.name || marker.labelName || 'Not available'
          }
        }
      },
      onMarkerClick: (event: React.MouseEvent, markerIndex: number) => {
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
