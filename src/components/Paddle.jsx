import { useBox } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { a } from "@react-spring/three";
import useCollide from "./useCollide";
// Paddle
function Paddle() {
  const { viewport } = useThree();
  const { width, height } = viewport;
  const [impact, onCollide] = useCollide();
  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    args: [2.25, 0.75, 1],
    onCollide,
  }));
  useFrame((state) => {
    api.position.set(state.mouse.x * (width / 2 + 2), -height / 2.5, 0);
    api.rotation.set(0, 0, (state.mouse.x * Math.PI) / 5);
  });
  return (
    <Box receiveShadow castShadow ref={ref} args={[2.25, 0.75, 1]}>
      <a.meshStandardMaterial
        color={impact.to([0, 1], ["#e52867", "#ea00d9"])}
      />
    </Box>
  );
}

export default Paddle;
