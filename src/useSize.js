import useResizeObserver from "@react-hook/resize-observer";
import { useLayoutEffect, useState } from "react";

export default function useSize(target) {
  const [size, setSize] = useState();
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}
