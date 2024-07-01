import useGameStore from "../store";
import Enemy from "./Enemy";
// Enemies
function Enemies() {
  const enemies = useGameStore((state) => state.enemies);
  return enemies.map((props, i) => <Enemy key={i} {...props} />);
}

export default Enemies;
