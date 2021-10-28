export interface IComponent<TUpdate extends object = {}> {
  render: () => void;
  update?: (params: TUpdate) => void;
  init?: () => void;
}

export interface IDimensions {
  width: number;
  height: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IOffset {
  dx: number;
  dy: number;
}
