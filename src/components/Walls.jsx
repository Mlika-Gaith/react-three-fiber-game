import { useLayoutEffect } from "react";
import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import useGameStore from "../store";
import useCollide from "./useCollide";

// Walls
function Walls() {
  const reset = useGameStore((state) => state.reset);
  const { viewport } = useThree();
  const { width, height } = viewport;
  const [, onCollide] = useCollide();
  const [, apiLeft] = usePlane(() => ({
    type: "Static",
    rotation: [-Math.PI / 2, Math.PI / 2, 0],
    onCollide,
  }));
  const [, apiRight] = usePlane(() => ({
    type: "Static",
    rotation: [Math.PI / 2, -Math.PI / 2, 0],
    onCollide,
  }));
  const [, apiBottom] = usePlane(() => ({
    type: "Static",
    rotation: [-Math.PI / 2, 0, 0],
    onCollide: reset,
  }));
  useLayoutEffect(() => {
    apiBottom.position.set(0, -height * 2, 0);
    apiLeft.position.set(-width / 2 - 2, 0, 0);
    apiRight.position.set(width / 2 + 2, 0, 0);
  }, [width, height]);
  return null;
}

export default Walls;
