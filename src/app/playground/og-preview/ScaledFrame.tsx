import { ReactNode } from "react";

const NATIVE_W = 1200;
const NATIVE_H = 630;

export function ScaledFrame({
  targetWidth,
  children,
}: {
  targetWidth: number;
  children: ReactNode;
}) {
  const scale = targetWidth / NATIVE_W;
  const targetHeight = (targetWidth / NATIVE_W) * NATIVE_H;

  return (
    <div
      className="overflow-hidden"
      style={{ width: targetWidth, height: targetHeight }}
    >
      <div
        style={{
          width: NATIVE_W,
          height: NATIVE_H,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const NATIVE_DIMENSIONS = { width: NATIVE_W, height: NATIVE_H };
