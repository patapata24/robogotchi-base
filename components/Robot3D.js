// components/Robot3D.js
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

export default function Robot3D({ stats }) {
  const { camera, gl } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const moveUp = useRef(false);
  const moveDown = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW': moveForward.current = true; break;
        case 'KeyS': moveBackward.current = true; break;
        case 'KeyA': moveLeft.current = true; break;
        case 'KeyD': moveRight.current = true; break;
        case 'Space': moveUp.current = true; e.preventDefault(); break;
        case 'ShiftLeft': moveDown.current = true; break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': moveForward.current = false; break;
        case 'KeyS': moveBackward.current = false; break;
        case 'KeyA': moveLeft.current = false; break;
        case 'KeyD': moveRight.current = false; break;
        case 'Space': moveUp.current = false; break;
        case 'ShiftLeft': moveDown.current = false; break;
      }
    };

    const handleClick = () => gl.domElement.requestPointerLock();

    gl.domElement.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      gl.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.exitPointerLock();
    };
  }, [gl]);

  useFrame((state, delta) => {
    const speed = 10 * delta;
    const direction = new THREE.Vector3();

    if (moveForward.current) direction.z -= speed;
    if (moveBackward.current) direction.z += speed;
    if (moveLeft.current) direction.x -= speed;
    if (moveRight.current) direction.x += speed;
    if (moveUp.current) direction.y += speed;
    if (moveDown.current) direction.y -= speed;

    camera.position.add(direction);
  });

  return (
    <>
      <PointerLockControls />
      <mesh position={camera.position.clone().add(new THREE.Vector3(0, -1, -2))}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={stats.happiness > 50 ? "#00ff00" : "#ff0000"} />
      </mesh>
    </>
  );
}