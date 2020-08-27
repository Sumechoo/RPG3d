import React, { useRef, useEffect } from "react";
import "./styles.css";
import { MainRenderer } from "./classes/MainRenderer";

const renderer = new MainRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
  requestAnimationFrame(animate);
  renderer.animate();
}

animate();

export default function App() {
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = displayRef.current;

    if (!current) {
      return;
    }

    current.appendChild(renderer.domElement);
  }, [displayRef]);

  return <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}} ref={displayRef} />;
}
