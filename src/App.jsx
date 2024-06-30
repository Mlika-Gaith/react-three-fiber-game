import React, { useCallback, useLayoutEffect } from "react";
import { Physics, useSphere, useBox, usePlane } from "@react-three/cannon";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import useGameStore from "./store";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Plane, useAspect, Text, useGLTF, Box } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import "./App.css";

// Collision
function useCollide(onColide) {
  const contact = useGameStore((state) => state.contact);
  // Collision animation creation
  const [{ impact }, set] = useSpring({ impact: 0 }, []);
  // Run Collision Effect
  const event = useCallback((e) => {
    set({ impact: 10, config: { immediate: true } });
    requestAnimationFrame(() => set({ impact: 0 }));
    if (onColide) onColide(e);
    contact(e);
  }, []);
  return [impact, event];
}

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
        color={impact.to([0, 1], ["#ea00d9", "#711c91"])}
      />
    </Box>
  );
}

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

// Enemy Component
function Enemy({
  long = false,
  right = false,
  y = 2,
  speed = 0.1,
  color = "#0abdc6",
}) {
  const { viewport } = useThree();
  const { width } = viewport;
  const [impact, onCollide] = useCollide();
  const [ref, api] = useBox(() => ({
    type: "Static",
    args: [long ? 2.25 : 1.25, 0.75, 1],
    rotation: [0, 0, right ? 0.1 : -0.1],
    onCollide,
  }));
  let initial = right ? width : -width;
  let x = initial;
  useFrame((state, delta) => {
    api.position.set((x = right ? x - speed : x + speed), y, 0);
    if (right ? x + 2 < -width / 2 : x - 2 > width / 2) x = initial;
  });
  return (
    <Box
      receiveShadow
      castShadow
      ref={ref}
      args={[long ? 2.25 : 1.25, 0.75, 1]}
    >
      <a.meshStandardMaterial color={impact.to([0, 1], [color, "white"])} />
    </Box>
  );
}

// Enemies
function Enemies() {
  const enemies = useGameStore((state) => state.enemies);
  return enemies.map((props, i) => <Enemy key={i} {...props} />);
}

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
// Background
function Bg() {
  const texture = useLoader(
    THREE.TextureLoader,
    "src/assets/img/background.png"
  );
  const scale = useAspect(1286, 574, 1.5);
  return <Plane scale={scale} material-map={texture} />;
}

// Game Text
const StyledText = React.forwardRef(
  (
    {
      children,
      fontSize = 1,
      offset = 0.25,
      anchorX = "center",
      anchorY = "middle",
      textAlign = "justify",
      lineHeight = 0.75,
      ...props
    },
    ref
  ) => {
    const { viewport } = useThree();
    const textProps = {
      children,
      anchorX,
      anchorY,
      maxWidth: viewport.width,
      lineHeight,
      fontSize,
      textAlign,
      "material-depthTest": false,
    };
    return (
      <group ref={ref} {...props}>
        <Text position-z={-offset} color="#ff3080" {...textProps} />
        <Text color="white" {...textProps} />
      </group>
    );
  }
);
StyledText.displayName = "StyledText";
// Startup
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

// create smooth interactive camera movement
function Perspective() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.mouse.x * 2,
      0.1
    );
    state.camera.updateProjectionMatrix();
  });
}

function App() {
  const startup = useGameStore((state) => state.startup);
  const start = useGameStore((state) => state.start);
  return (
    <div onClick={start}>
      <Canvas
        shadows
        gl={{ antialias: false, alpha: false }}
        dpr={0.25}
        camera={{ position: [0, 5, 12], fov: 50 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight castShadow position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -10]} />
        {!startup && (
          <Physics
            defaultContactMaterial={{
              restitution: 1.07,
              contactEquationRelaxation: 10,
            }}
            gravity={[0, -30, 0]}
          >
            <Walls />
            <Ball />
            <Paddle />
            <Enemies />
          </Physics>
        )}
        {startup && <Startup />}
        <Suspense fallback={null}>
          <Bg />
        </Suspense>
        <Perspective />
      </Canvas>
    </div>
  );
}

export default App;
