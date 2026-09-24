'use client';

import type { CSSProperties, ReactNode } from "react";

/*
 * Mesmo componente da tela de carregamento (projeto "loading"),
 * preservado e integrado ao site. Fonte original:
 * loading/src/components/TruckLoader.tsx
 */

type BoxProps = {
  w: number;
  h: number;
  d: number;
  x?: number;
  y?: number;
  z?: number;
  color: string;
  top?: string;
  front?: string;
  side?: string;
  radius?: number;
  className?: string;
  children?: ReactNode;
};

/** A shaded 3D box built from six transformed faces. */
function Box3D({
  w,
  h,
  d,
  x = 0,
  y = 0,
  z = 0,
  color,
  top,
  front,
  side,
  radius = 2,
  className = "",
  children,
}: BoxProps) {
  const faces: Array<{ t: string; w: number; h: number; c: string; b: number }> = [
    { t: `translateZ(${d / 2}px)`, w, h, c: front ?? color, b: 1 },
    { t: `rotateY(180deg) translateZ(${d / 2}px)`, w, h, c: front ?? color, b: 0.6 },
    { t: `rotateY(90deg) translateZ(${w / 2}px)`, w: d, h, c: side ?? color, b: 1.12 },
    { t: `rotateY(-90deg) translateZ(${w / 2}px)`, w: d, h, c: side ?? color, b: 0.55 },
    { t: `rotateX(90deg) translateZ(${h / 2}px)`, w, h: d, c: top ?? color, b: 1.3 },
    { t: `rotateX(-90deg) translateZ(${h / 2}px)`, w, h: d, c: color, b: 0.4 },
  ];

  return (
    <div
      className={`box3d ${className}`}
      style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
    >
      {faces.map((f, i) => (
        <i
          key={i}
          style={
            {
              width: f.w,
              height: f.h,
              marginLeft: -f.w / 2,
              marginTop: -f.h / 2,
              borderRadius: radius,
              transform: f.t,
              filter: `brightness(${f.b})`,
              "--face": f.c,
            } as CSSProperties
          }
        />
      ))}
      {children}
    </div>
  );
}

function Wheel({ x, z }: { x: number; z: number }) {
  const r = 30;
  const depth = 26;
  const segments = 18;
  const seg = (2 * Math.PI * r) / segments + 1.5;

  return (
    <div className="wheel-anchor" style={{ transform: `translate3d(${x}px, 88px, ${z}px)` }}>
      <div className="wheel">
      {[depth / 2, -depth / 2].map((dz) => (
        <div
          key={dz}
          className="wheel-disc"
          style={{
            width: r * 2,
            height: r * 2,
            marginLeft: -r,
            marginTop: -r,
            transform: `translateZ(${dz}px)`,
          }}
        />
      ))}
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="wheel-tread"
          style={{
            width: seg,
            height: depth,
            marginLeft: -seg / 2,
            marginTop: -depth / 2,
            transform: `rotateZ(${(360 / segments) * i}deg) translateY(${-r}px) rotateX(90deg)`,
            filter: `brightness(${i % 2 ? 1.35 : 1})`,
          }}
        />
      ))}
      </div>
    </div>
  );
}

function CargoStripes() {
  return (
    <>
      {[-38, -8, 22].map((y) => (
        <Box3D
          key={y}
          w={182}
          h={12}
          d={2}
          x={0}
          y={y}
          z={60}
          color="var(--truck-gold)"
          front="var(--truck-gold)"
        />
      ))}
      <Box3D
        w={182}
        h={12}
        d={2}
        y={-8}
        z={-60}
        color="var(--truck-gold)"
        front="var(--truck-gold)"
      />
    </>
  );
}

function Truck() {
  return (
    <div className="truck">
      {/* chassis */}
      <Box3D w={310} h={16} d={104} x={0} y={68} color="var(--truck-black-deep)" />
      {/* cargo body */}
      <Box3D
        w={200}
        h={120}
        d={116}
        x={-55}
        y={0}
        color="var(--truck-orange-deep)"
        top="var(--truck-gold)"
        side="var(--truck-orange)"
      >
        <CargoStripes />
      </Box3D>
      {/* cargo roof rail */}
      <Box3D
        w={206}
        h={10}
        d={122}
        x={-55}
        y={-62}
        color="var(--truck-black)"
        top="var(--truck-gold-soft)"
      />
      {/* cab */}
      <Box3D
        w={92}
        h={86}
        d={116}
        x={91}
        y={17}
        color="var(--truck-orange)"
        top="var(--truck-orange-deep)"
        side="var(--truck-orange)"
      />
      {/* windshield + side window */}
      <Box3D w={8} h={44} d={104} x={138} y={-8} color="var(--truck-gold-soft)" radius={4} />
      <Box3D w={62} h={40} d={4} x={95} y={-10} z={59} color="var(--truck-gold)" radius={4} />
      <Box3D w={62} h={40} d={4} x={95} y={-10} z={-59} color="var(--truck-gold)" radius={4} />
      {/* hood */}
      <Box3D
        w={46}
        h={44}
        d={110}
        x={160}
        y={38}
        color="var(--truck-orange-deep)"
        top="var(--truck-gold)"
      />
      {/* bumper + grille */}
      <Box3D w={12} h={22} d={116} x={186} y={58} color="var(--truck-black)" />
      <Box3D w={6} h={16} d={86} x={188} y={34} color="var(--truck-black-deep)" />
      {/* headlights */}
      <Box3D
        className="loader-headlight"
        w={6}
        h={14}
        d={22}
        x={187}
        y={38}
        z={42}
        color="var(--truck-gold-soft)"
      />
      <Box3D
        className="loader-headlight"
        w={6}
        h={14}
        d={22}
        x={187}
        y={38}
        z={-42}
        color="var(--truck-gold-soft)"
      />
      {/* exhaust stack */}
      <Box3D w={12} h={96} d={12} x={52} y={-32} z={54} color="var(--truck-black)" radius={6} />
      {/* wheels */}
      <Wheel x={-120} z={70} />
      <Wheel x={-120} z={-70} />
      <Wheel x={-46} z={70} />
      <Wheel x={-46} z={-70} />
      <Wheel x={128} z={70} />
      <Wheel x={128} z={-70} />
    </div>
  );
}

function Post({ delay }: { delay: string }) {
  return (
    <div className="loader-post" style={{ animationDelay: delay }}>
      <Box3D w={8} h={190} d={8} y={20} z={-190} color="var(--truck-black)" />
      <Box3D w={54} h={10} d={10} x={22} y={-72} z={-190} color="var(--truck-black)" />
      <Box3D w={34} h={12} d={22} x={44} y={-62} z={-190} color="var(--truck-gold)" radius={6} />
    </div>
  );
}

export function TruckLoader({
  title = "Carregando",
  message = "Estamos carregando o site. Isso leva apenas alguns segundos.",
  footer,
}: {
  title?: string;
  message?: string;
  footer?: ReactNode;
}) {
  return (
    <div className="loader-screen">
      <div className="loader-stage">
        <div className="loader-world">
          <div className="loader-road" />
          <div className="loader-shadow" />
          <Post delay="0s" />
          <Post delay="1.2s" />
          <Truck />
        </div>
      </div>

      <div className="loader-title flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight loader-heading sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-md text-sm loader-copy sm:text-base">{message}</p>
        <div className="loader-bar" />
        {footer}
      </div>
    </div>
  );
}

export default TruckLoader;