declare module "react-simple-maps" {
  import { ReactNode, MouseEvent, CSSProperties } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }
  export function ComposableMap(props: ComposableMapProps): JSX.Element;

  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: GeoObject[] }) => ReactNode;
  }
  export interface GeoObject {
    rsmKey: string;
    id: string | number;
    properties: Record<string, unknown>;
  }
  export function Geographies(props: GeographiesProps): JSX.Element;

  interface GeographyProps {
    geography: GeoObject;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: { default?: CSSProperties; hover?: CSSProperties; pressed?: CSSProperties };
    onMouseEnter?: (evt: MouseEvent) => void;
    onMouseMove?: (evt: MouseEvent) => void;
    onMouseLeave?: (evt: MouseEvent) => void;
    onClick?: (evt: MouseEvent) => void;
  }
  export function Geography(props: GeographyProps): JSX.Element;

  interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }
  export function Marker(props: MarkerProps): JSX.Element;

  interface AnnotationProps {
    subject: [number, number];
    dx?: number;
    dy?: number;
    connectorProps?: Record<string, unknown>;
    children?: ReactNode;
  }
  export function Annotation(props: AnnotationProps): JSX.Element;
}
