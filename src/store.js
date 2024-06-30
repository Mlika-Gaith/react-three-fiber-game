import { create } from "zustand";

const useGameStore = create((set) => ({
  points: 0,
  startup: true,
  restart: false,
  enemies: [
    { right: true, long: true, y: 0, speed: 0.05, color: "#54255e" },
    { right: true, long: false, y: 1, speed: 0.125, color: "#ea00d9" },
    { right: true, long: true, y: 3.5, speed: 0.065, color: "#ef9651" },
    { right: true, long: false, y: 4, speed: 0.01, color: "#46d8e3" },
    { right: true, long: false, y: 4.5, speed: 0.125, color: "#e52867" },
    { right: true, long: false, y: 5.5, speed: 0.075, color: "#442e55" },
    { right: true, long: true, y: 6, speed: 0.085, color: "#442e55" },
    { right: false, long: true, y: 1.5, speed: 0.07, color: "#3a516f" },
    { right: false, long: false, y: 1.25, speed: 0.15, color: "#54255e" },
    { right: false, long: true, y: 1.5, speed: 0.085, color: "#ea00d9" },
    { right: false, long: true, y: 3, speed: 0.045, color: "#ef9651" },
    { right: false, long: false, y: 5, speed: 0.115, color: "#46d8e3" },
    { right: false, long: false, y: 3.25, speed: 0.145, color: "#e52867" },
    { right: false, long: true, y: 4, speed: 0.105, color: "#442e55" },
    { right: false, long: true, y: 4.5, speed: 0.135, color: "#3a516f" },
  ],
  start: () => {
    set({ startup: false });
    document.body.style.cursor = "none";
  },
  reset: () => {
    set({ points: 0, restart: true });
    setTimeout(() => set({ restart: false }), 10);
  },
  contact: (e) => {
    if (e.contact.impactVelocity > 4)
      set((state) => ({ points: state.points + 1 }));
  },
}));

export default useGameStore;
