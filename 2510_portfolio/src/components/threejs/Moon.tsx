/**
 * components/threejs
 * Moon.tsx
**/

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { useTexture } from "@react-three/drei";

const Moon = () => {
  const moonRef = useRef<Mesh>(null);
  const moonTexture = useTexture("/assets/images/home/moon_bg.jpg");// 달 이미지 씌우기
  const { invalidate } = useThree();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!moonRef.current) return;
      moonRef.current.rotation.y += 0.01;// y축 회전 각도 조금씩 증가
      invalidate(); // 이 순간에만 다시 렌더
    }, 100); // 100ms = 10fps

    return () => clearInterval(interval);
  }, [invalidate]);

  return (
    <mesh ref={moonRef}>
      {/* sphereGeometry: 구체 생성, args: 반지름, 곡선수(높을수록 둥근 구) */}
      <sphereGeometry args={[1.5, 32, 32]} />
      {/* meshStandardMaterial: 빛 반사를 계산하는 빛 반응형 머티리얼 */}
      <meshStandardMaterial
        map={moonTexture}
        roughness={0.5}
        metalness={0.15}
        emissive="#ffffff"
        emissiveIntensity={0.08}
    />
    </mesh>
  );
};

export default Moon;