import { useFrame } from "@react-three/fiber";
import useGameStore from "../store";
import { useRef } from "react";
import StyledText from "./StyledText";

// Game Over
function GameOver() {
  const ref = useRef(null);
  const total = useGameStore((state) => state.totalScore);
  useFrame((state) => {
    const s = 1 + 0.01 * (1 + Math.sin(state.clock.getElapsedTime() * 2)) * 2;
    if (ref.current) ref.current.scale.set(s, s, s);
  });
  return (
    <>
      <StyledText position={[0, -3.5, 1]} ref={ref} fontSize={1.5}>
        Total Score: {total}
      </StyledText>
      <StyledText position={[0, -1.5, 1]} ref={ref} fontSize={1.5}>
        Click To Start
      </StyledText>
      <StyledText position={[0, 0.5, 1]} ref={ref} fontSize={1.5}>
        Game Over
      </StyledText>
    </>
  );
}

export default GameOver;
