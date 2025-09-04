import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function NetworkMesh() {
  const init = useCallback(async (engine) => { 
    await loadFull(engine); 
  }, []);
  
  return (
    <Particles
    
      id="tsparticles"
      init={init}
      className="absolute inset-0"
      options={{
        background: { color: "transparent" },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 65, density: { enable: true, area: 900 } },
          color: { value: ["#06B6D4", "#8B5CF6", "#22C55E"] },
          shape: { type: "circle" },
          opacity: { value: 0.35 },
          size: { value: { min: 1, max: 3 } },
          links: {
            enable: true,
            distance: 120,
            color: "#38BDF8",
            opacity: 0.25,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: { default: "bounce" }
          }
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" }, resize: true },
          modes: { grab: { distance: 140, links: { opacity: 0.5 } } }
        },
        detectRetina: true
      }}
    />
  );
}
