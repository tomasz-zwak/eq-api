export interface QueryResponse {
  type: string;
  metadata: Metadata;
  features: Feature[];
  bbox: number[];
}

export interface Metadata {
  generated: number;
  url: string;
  title: string;
  status: number;
  api: string;
  count: number;
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
  id: string;
}

export interface Properties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: any;
  url: string;
  detail: string;
  felt?: number;
  cdi?: number;
  mmi?: number;
  alert?: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst?: number;
  dmin?: number;
  rms: number;
  gap?: number;
  magType: string;
  type: string;
  title: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}
