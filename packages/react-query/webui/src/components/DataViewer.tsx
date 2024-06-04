import ReactJson from 'react-json-view';

export default function DataViewer({ src }: { src: unknown }) {
  if (typeof src !== 'object' || src === null) {
    return <ReactJson src={{ __default: src }} enableClipboard={false} collapsed />;
  }
  return <ReactJson src={src} enableClipboard={false} collapsed />;
}
