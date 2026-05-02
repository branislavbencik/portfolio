import Image from "next/image";

export type V1Size = 40 | 48 | 56 | 64 | 80;
export type V1AlignX = "left" | "center" | "right";
export type V1AlignY = "top" | "center" | "bottom";
export type V1Avatar =
  | "none"
  | "top-right"
  | "bottom-right"
  | "top-left"
  | "bottom-left";
export type V1AvatarSize = 64 | 96 | 128;

export type V1Props = {
  size: V1Size;
  alignX: V1AlignX;
  alignY: V1AlignY;
  avatar: V1Avatar;
  avatarSize: V1AvatarSize;
};

const PADDING = 64;

const justifyClass: Record<V1AlignY, string> = {
  top: "justify-start",
  center: "justify-center",
  bottom: "justify-end",
};
const itemsClass: Record<V1AlignX, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};
const textAlignClass: Record<V1AlignX, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function avatarPositionStyle(pos: V1Avatar): React.CSSProperties {
  switch (pos) {
    case "top-left":
      return { top: PADDING, left: PADDING };
    case "top-right":
      return { top: PADDING, right: PADDING };
    case "bottom-left":
      return { bottom: PADDING, left: PADDING };
    case "bottom-right":
      return { bottom: PADDING, right: PADDING };
    case "none":
      return { display: "none" };
  }
}

export function V1Wordmark({
  size,
  alignX,
  alignY,
  avatar,
  avatarSize,
}: V1Props) {
  return (
    <div
      className="bg-canvas relative overflow-hidden"
      style={{ width: 1200, height: 630 }}
    >
      <div
        className={`absolute inset-0 flex flex-col ${justifyClass[alignY]} ${itemsClass[alignX]} ${textAlignClass[alignX]}`}
        style={{ padding: PADDING }}
      >
        <h1
          className="text-text-primary"
          style={{
            fontSize: size,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          Branislav Benčík
        </h1>
      </div>

      {avatar !== "none" && (
        <div
          className="absolute overflow-hidden rounded-full"
          style={{
            width: avatarSize,
            height: avatarSize,
            ...avatarPositionStyle(avatar),
          }}
        >
          <Image
            src="/images/avatar.jpg"
            alt=""
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
