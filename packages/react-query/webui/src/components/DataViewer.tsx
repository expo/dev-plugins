import ReactJson from 'react-json-view';

export default function DataViewer({ src }: { src: unknown }) {
  if (src === null || src === undefined) {
    return <span>{src}</span>;
  }
  if (typeof src === 'object') {
    return <ReactJson src={src} enableClipboard={false} collapsed />;
  }
  return <span>{src.toString()}</span>;
}
