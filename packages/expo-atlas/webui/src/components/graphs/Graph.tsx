import ReactECharts from 'echarts-for-react';
import { ComponentProps, RefObject, useEffect, useRef, useState } from 'react';

export function Graph(props: ComponentProps<typeof ReactECharts>) {
  const container = useRef<HTMLDivElement>(null);
  const containerHeight = useDynamicHeight(container);

  const echartOptions = {
    ...(props.opts ?? {}),
    height: props.opts?.height ?? containerHeight,
  };

  return (
    <div ref={container} className="flex-1">
      <ReactECharts
        lazyUpdate
        {...props}
        opts={echartOptions}
      />
    </div>
  )
}

function useDynamicHeight<T extends HTMLElement>(ref: RefObject<T>, initialHeight = 300) {
  const [size, setSize] = useState({ height: initialHeight, width: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize(entry.contentRect);
      }
    });

    if (ref.current) resizeObserver.observe(ref.current);

    return () => {
      if (ref.current) resizeObserver.unobserve(ref.current);
    };
  }, [ref]);

  return size.height;
};
