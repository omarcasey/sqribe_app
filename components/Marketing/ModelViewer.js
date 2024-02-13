import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelViewer = () => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    if (containerRef.current && window) {
      camera.position.z = 5;
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
    }

    const loader = new GLTFLoader();
    loader.load('/3dlogoo.glb', (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;
      scene.add(model);
      animate();
    });

    const animate = () => {
      if (!modelRef.current) return;

      requestAnimationFrame(animate);
      modelRef.current.rotation.y += 0.01; // Adjust rotation speed here
      renderer.render(scene, camera);
    };

    const handleWindowResize = () => {
      if (!window) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    if (window) {
      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      if (window) {
        window.removeEventListener('resize', handleWindowResize);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ModelViewer;
