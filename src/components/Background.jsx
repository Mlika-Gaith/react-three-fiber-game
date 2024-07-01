import * as THREE from "three";
import { Plane, useAspect } from "@react-three/drei";

// Background
function Bg() {
  const video = document.createElement("video");
  video.src = "../assets/video/background.mp4";
  video.loop = true;
  video.muted = true;
  video.play();

  const texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  const scale = useAspect(1286, 574, 1.5);
  return <Plane scale={scale} material-map={texture} />;
}

export default Bg;
