declare module 'react-vertical-timeline-component' {
  import * as React from 'react';

  export interface VerticalTimelineProps {
    className?: string;
    layout?: string;
    lineColor?: string;
    animate?: boolean;
    children?: React.ReactNode;
  }

  export interface VerticalTimelineElementProps {
    className?: string;
    date?: string;
    dateClassName?: string;
    iconClassName?: string;
    iconOnClick?: () => void;
    iconStyle?: React.CSSProperties;
    icon?: React.ReactNode;
    position?: string;
    style?: React.CSSProperties;
    textClassName?: string;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    intersectionObserverProps?: any;
    visible?: boolean;
    children?: React.ReactNode;
  }

  export class VerticalTimeline extends React.Component<VerticalTimelineProps> {}
  export class VerticalTimelineElement extends React.Component<VerticalTimelineElementProps> {}
}

declare module 'react-vertical-timeline-component/style.min.css' {
  const style: any;
  export default style;
}