import { useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import useGameStore from "../store";
import { useGLTF } from "@react-three/drei";

// The Ball Component
function Ball() {
  // Create a physics sphere
  const [ref, api] = useSphere(() => ({
    mass: 1, // mass of the sphere
    args: [0.4], // radius of the sphere
    position: [0, 4, 0], // Initial position
    velocity: [0, 5, 0], // Initial velocity
  }));
  const restart = useGameStore((state) => state.restart);
  useEffect(() => {
    if (restart) {
      api.position.set(0, 3, 0);
      api.velocity.set(0, 5, 0);
      api.angularVelocity.set(0, 0, 0);
    }
  }, [restart]);

  // Load GLB Model
  const { nodes, materials } = useGLTF("/src/assets/3d/master_ball.glb");
  return (
    <group dispose={null} ref={ref}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pasted__pasted__pSphere5_lambert1_0.geometry}
          material={materials.lambert1}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.6}
        />
      </group>
    </group>
  );
}

export default Ball;
