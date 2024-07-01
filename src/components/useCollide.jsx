import { useCallback } from "react";
import useGameStore from "../store";
import { useSpring } from "@react-spring/three";

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

export default useCollide;
