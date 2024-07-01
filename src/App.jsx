import { Physics } from "@react-three/cannon";
import { Canvas, useFrame } from "@react-three/fiber";
import useGameStore from "./store";
import { Suspense } from "react";
import * as THREE from "three";
import Walls from "./components/Walls";
import Enemies from "./components/Enemies";
import Ball from "./components/Ball";
import Paddle from "./components/Paddle";
import Score from "./components/Score";
import Startup from "./components/Startup";
import GameOver from "./components/GameOver";
import Bg from "./components/Background";
import "./App.css";

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

export default function App() {
  const startup = useGameStore((state) => state.startup);
  const start = useGameStore((state) => state.start);
  const hearts = useGameStore((state) => state.hearts);

  return (
    <div onClick={start}>
      <Canvas
        shadows
        gl={{ antialias: false, alpha: false }}
        dpr={0.25}
        camera={{ position: [0, 5, 12], fov: 50 }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight castShadow position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -10]} />
        {!startup && hearts > 0 && (
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
        {hearts === 0 && <GameOver />}
        <Score />
        <Suspense fallback={null}>
          <Bg />
        </Suspense>
        <Perspective />
      </Canvas>
    </div>
  );
}
