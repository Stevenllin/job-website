// @ts-ignore
import { useEffect, useRef } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import { MapChartProps, JobValueMap, MapData } from "./types";

const MapChart: React.FC<MapChartProps> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const values: JobValueMap = props.mapData.reduce((acc: JobValueMap, job: MapData, index: number) => {
      acc[index] = job.number > 2 ? 'More than 2' : 'Less than 2';
      return acc;
    }, {});

    const map = new jsVectorMap({
      selector: mapRef.current,
      map: 'world',
      markers: props.mapData,
      series: {
        markers: [{
          attribute: "fill",
          legend: {
            title: "Number of Jobs",
          },
          scale: {
            "More than 2": "#0766bc",
            "Less than 2": "#ebf6ff",
          },
          values: values
        }]
      },
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
