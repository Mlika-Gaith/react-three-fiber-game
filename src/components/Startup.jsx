import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import StyledText from "./StyledText";

function Startup() {
  const ref = useRef(null);
  useFrame((state) => {
    const s = 1 + 0.01 * (1 + Math.sin(state.clock.getElapsedTime() * 2)) * 2;
    if (ref.current) ref.current.scale.set(s, s, s);
  });
  return (
    <StyledText position={[0, 0.5, 1]} ref={ref} fontSize={1.5}>
      Click To Start
    </StyledText>
  );
}

export default Startup;
