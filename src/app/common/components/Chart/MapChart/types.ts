export interface MapChartProps {
  mapData: MapData[];
  onSelectCountry: (name: string) => void;
}

export interface JobValueMap {
  [index: number]: string;
}

export interface MapData {
  name: string;
  number: number;
  coords: number[];
}