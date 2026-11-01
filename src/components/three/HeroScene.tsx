import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const BLUE = new THREE.Color("#3b82f6");
const VIOLET = new THREE.Color("#8b5cf6");

function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.copy(Math.random() > 0.5 ? BLUE : VIOLET);
      c.offsetHSL(0, 0, (Math.random() - 0.5) * 0.25);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreObject() {
  const solid = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();

  const isSmall = size.width < 768;
  const detail = isSmall ? 0 : 1;
  const offsetX = isSmall ? 0 : 1.85;
  const scale = isSmall ? 0.85 : 0.92;

  useFrame((state, delta) => {
    if (!group.current) return;
    const px = state.pointer.x;
    const py = state.pointer.y;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      px * 0.55,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -py * 0.4,
      3,
      delta,
    );

    if (solid.current) solid.current.rotation.y += delta * 0.22;
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.12;
      wire.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={group} position={[offsetX, 0.1, 0]} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
        <mesh ref={solid}>
          <icosahedronGeometry args={[1.15, detail]} />
          <meshStandardMaterial
            color="#0b1224"
            metalness={0.85}
            roughness={0.25}
            flatShading
            emissive={BLUE}
            emissiveIntensity={0.12}
          />
        </mesh>
        <mesh ref={wire} scale={1.35}>
          <icosahedronGeometry args={[1.15, detail]} />
          <meshBasicMaterial
            color={VIOLET}
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>
        <mesh scale={1.75}>
          <sphereGeometry args={[1.15, 24, 24]} />
          <meshBasicMaterial
            color={BLUE}
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.18,
      2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * 0.12,
      2,
      delta,
    );
  });

  return <group ref={group}>{null}</group>;
}

export default function HeroScene({ particleCount }: { particleCount: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[3.5, 2, 3]} intensity={28} color="#60a5fa" />
      <pointLight position={[-3.5, -2, 2]} intensity={22} color="#8b5cf6" />
      <directionalLight position={[0, 4, 5]} intensity={0.6} color="#e0e7ff" />
      <ParticleField count={particleCount} />
      <CoreObject />
      <Rig />
    </Canvas>
  );
}
