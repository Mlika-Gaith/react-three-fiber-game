import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import useGameStore from "../store";
import { useRef } from "react";
import StyledText from "./StyledText";
import Heart from "./Heart";

// Score
function Score() {
  const points = useGameStore((state) => state.points);
  const hearts = useGameStore((state) => state.hearts);
  const { viewport } = useThree();
  const groupRef = useRef();
  const heartsRef = useRef();

  useLayoutEffect(() => {
    const { width, height } = viewport.getCurrentViewport();
    if (groupRef.current && heartsRef.current) {
      groupRef.current.position.set(-width / 2 + 6.5, height / 2 - 1.5, 3.5);
      heartsRef.current.position.set(width / 2 - 6.5, height / 2 - 1.5, 3.5);

      // Set initial scale to make them bigger
      const scale = 1.15; // Adjust scale as needed
      groupRef.current.scale.set(scale, scale, scale);
      heartsRef.current.scale.set(scale, scale, scale);
    }
  }, [viewport]);

  return (
    <>
      <group ref={groupRef}>
        <StyledText
          position={[0, 0, 0]}
          fontSize={0.75}
          anchorX="left"
          anchorY="middle"
          offset={0.1}
        >
          {String(points)}
        </StyledText>
      </group>
      <group ref={heartsRef}>
        {[...Array(hearts)].map((_, index) => (
          <Heart key={index} position={[-index, 0, 0]} />
        ))}
      </group>
    </>
  );
}

export default Score;
