import { create } from "zustand";
import startSound from "/src/assets/sounds/start.wav";
import loseSound from "/src/assets/sounds/lose.wav";
import ballDropSound from "/src/assets/sounds/ball-drop.wav";
import pingSound from "/src/assets/sounds/ping.mp3";
import backgroundSound from "/src/assets/sounds/background.mp3";

const start = new Audio(startSound);
const lose = new Audio(loseSound);
const ballDrop = new Audio(ballDropSound);
const ping = new Audio(pingSound);
const background = new Audio(backgroundSound);
background.loop = true;
background.volume = 0.8;

const useGameStore = create((set) => ({
  points: 0,
  hearts: 3,
  totalScore: 0,
  startup: true,
  restart: false,
  enemies: [
    { right: true, long: true, y: 0, speed: 0.05, color: "#ffff00" },
    { right: true, long: false, y: 1, speed: 0.125, color: "#ea00d9" },
    { right: true, long: true, y: 3.5, speed: 0.065, color: "#ef9651" },
    { right: true, long: false, y: 4, speed: 0.01, color: "#46d8e3" },
    { right: true, long: false, y: 4.5, speed: 0.125, color: "#e52867" },
    { right: true, long: false, y: 5.5, speed: 0.075, color: "#86f797" },
    { right: true, long: true, y: 6, speed: 0.085, color: "#86f797" },
    { right: false, long: true, y: 1.5, speed: 0.07, color: "#00ffff" },
    { right: false, long: false, y: 1.25, speed: 0.15, color: "#ffff00" },
    { right: false, long: true, y: 1.5, speed: 0.085, color: "#ea00d9" },
    { right: false, long: true, y: 3, speed: 0.045, color: "#ef9651" },
    { right: false, long: false, y: 5, speed: 0.115, color: "#46d8e3" },
    { right: false, long: false, y: 3.25, speed: 0.145, color: "#e52867" },
    { right: false, long: true, y: 4, speed: 0.105, color: "#ffff00" },
    { right: false, long: true, y: 4.5, speed: 0.135, color: "#00ffff" },
  ],
  start: () => {
    start.play((start.currentTime = 0));
    set({ startup: false, hearts: 3, totalScore: 0 });
    background.play((background.currentTime = 0));
    document.body.style.cursor = "none";
  },
  reset: () => {
    ballDrop.play((ballDrop.currentTime = 0));
    set((state) => {
      if (state.hearts === 1) {
        lose.play((lose.currentTime = 0));
        background.pause();
      }
      return {
        ...state,
        points: 0,
        hearts: state.hearts > 0 ? state.hearts - 1 : 0,
        restart: state.hearts === 0 ? false : true,
        startup: state.hearts === 0 && true,
        totalScore: state.hearts === 0 ? 0 : state.totalScore + state.points,
      };
    });
    setTimeout(() => set((state) => ({ ...state, restart: false })), 10);
  },
  contact: (e) => {
    if (e.contact.impactVelocity > 4)
      set((state) => ({ points: state.points + 1 }));
    ping.play((ping.currentTime = 0));
  },
}));

export default useGameStore;
