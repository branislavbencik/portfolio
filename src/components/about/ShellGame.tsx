"use client";

import { useEffect, useReducer, useRef } from "react";
import BentoBlock from "./BentoBlock";
import MouseCoords from "./MouseCoords";

/**
 * Three Shells and a Pea — animated, click-to-play.
 *
 * The interaction enacts a thesis: interfaces are projections of reality, not
 * the reality itself. The trick lives in `pickCup` below — `revealedPosition`
 * is set to a position the user did NOT pick. The user always loses. This is
 * the philosophical move; do not "fix" it as a bug.
 */

type Phase = "idle" | "shuffling" | "awaiting-pick" | "revealed";

type State = {
  phase: Phase;
  positions: [number, number, number];
  pickedCup: number | null;
  revealedPosition: number | null;
};

type Action =
  | { type: "start-shuffle" }
  | { type: "shuffle-step"; positions: [number, number, number] }
  | { type: "shuffle-done" }
  | { type: "pick"; cupId: number; revealedPosition: number }
  | { type: "reset" };

const initial: State = {
  phase: "idle",
  positions: [0, 1, 2],
  pickedCup: null,
  revealedPosition: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start-shuffle":
      return { ...initial, phase: "shuffling" };
    case "shuffle-step":
      return { ...state, positions: action.positions };
    case "shuffle-done":
      return { ...state, phase: "awaiting-pick" };
    case "pick":
      return {
        ...state,
        phase: "revealed",
        pickedCup: action.cupId,
        revealedPosition: action.revealedPosition,
      };
    case "reset":
      return initial;
    default:
      return state;
  }
}

const SHUFFLE_STEP_MS = 380;
const SHUFFLE_STEPS = 4;

export default function ShellGame() {
  const [state, dispatch] = useReducer(reducer, initial);
  const stepCountRef = useRef(0);
  const positionsRef = useRef<[number, number, number]>([0, 1, 2]);

  useEffect(() => {
    if (state.phase !== "shuffling") return;

    stepCountRef.current = 0;
    positionsRef.current = [...state.positions] as [number, number, number];

    const tick = () => {
      const a = Math.floor(Math.random() * 3);
      let b = Math.floor(Math.random() * 3);
      while (b === a) b = Math.floor(Math.random() * 3);

      const next = [...positionsRef.current] as [number, number, number];
      const cupAtA = next.indexOf(a);
      const cupAtB = next.indexOf(b);
      next[cupAtA] = b;
      next[cupAtB] = a;
      positionsRef.current = next;
      dispatch({ type: "shuffle-step", positions: next });
      stepCountRef.current += 1;

      if (stepCountRef.current < SHUFFLE_STEPS) {
        timer = window.setTimeout(tick, SHUFFLE_STEP_MS);
      } else {
        timer = window.setTimeout(
          () => dispatch({ type: "shuffle-done" }),
          SHUFFLE_STEP_MS
        );
      }
    };

    let timer = window.setTimeout(tick, 200);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  function pickCup(cupId: number) {
    if (state.phase !== "awaiting-pick") return;
    const pickedPos = state.positions[cupId];
    const others = [0, 1, 2].filter((p) => p !== pickedPos);
    const revealedPosition = others[Math.floor(Math.random() * others.length)];
    dispatch({ type: "pick", cupId, revealedPosition });
  }

  const isPlaying = state.phase === "shuffling" || state.phase === "awaiting-pick";

  return (
    <BentoBlock>
      <h3 className="type-body font-medium text-text-primary">
        Interfaces are projections, not reality.
      </h3>
      <p className="type-label text-text-secondary">
        Pick a cup. The ball is wherever you didn&apos;t look.
      </p>

      <MouseCoords>
        <div className="relative h-32 w-full">
          {[0, 1, 2].map((cupId) => {
            const visualPos = state.positions[cupId];
            const showBall =
              state.phase === "revealed" && state.revealedPosition === visualPos;
            const isPicked = state.pickedCup === cupId;

            return (
              <button
                key={cupId}
                type="button"
                onClick={() => pickCup(cupId)}
                disabled={state.phase !== "awaiting-pick"}
                aria-label={`Cup ${cupId + 1}`}
                className={`absolute top-0 left-0 w-1/4 h-full motion-safe:transition-transform motion-safe:duration-[350ms] motion-safe:ease-out flex items-center justify-center rounded-md border border-surface-3 bg-surface-tile focus-visible:outline-2 focus-visible:outline-text-primary focus-visible:outline-offset-2 ${
                  state.phase === "awaiting-pick"
                    ? "cursor-pointer hover:border-text-primary"
                    : "cursor-default"
                } ${isPicked ? "border-text-primary" : ""}`}
                style={{ transform: `translateX(${visualPos * 150}%)` }} // audit-ignore — animated position
              >
                {showBall && (
                  <span
                    aria-hidden="true"
                    className="w-3 h-3 rounded-full bg-text-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      </MouseCoords>

      <div className="flex items-center justify-between gap-4 min-h-8">
        {state.phase === "idle" && (
          <button
            type="button"
            onClick={() => dispatch({ type: "start-shuffle" })}
            className="type-label text-citation-link hover:text-citation-link-hover focus-visible:outline-2 focus-visible:outline-text-primary focus-visible:outline-offset-2 rounded-sm"
          >
            Start →
          </button>
        )}
        {state.phase === "revealed" && (
          <button
            type="button"
            onClick={() => dispatch({ type: "reset" })}
            className="type-label text-citation-link hover:text-citation-link-hover focus-visible:outline-2 focus-visible:outline-text-primary focus-visible:outline-offset-2 rounded-sm"
          >
            Reset →
          </button>
        )}
        {isPlaying && state.phase === "shuffling" && (
          <p className="type-label text-text-secondary">Shuffling…</p>
        )}
        {isPlaying && state.phase === "awaiting-pick" && (
          <p className="type-label text-text-secondary">Pick a cup.</p>
        )}
        <p
          aria-live="polite"
          className="type-label text-text-secondary"
        >
          {state.phase === "revealed" && "Wrong cup. The ball was elsewhere."}
        </p>
      </div>
    </BentoBlock>
  );
}
