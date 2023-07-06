export interface IProps {
  blockRef: React.RefObject<HTMLDivElement>;
}
export interface IFaqProps {
  question: string;
  answer: string;
}
export type SeekProps = React.MutableRefObject<{
  set: (a: number) => void;
  get: () => number;
}>;
