"use client";

import { useMemo, useState } from "react";

export interface ImageEntry {
  project: string;
  src: string;
  label: string;
  defaultBg: boolean;
  defaultBorder: boolean;
}

type State = Record<string, { bg: boolean; border: boolean }>;

export function LightboxBgClient({ entries }: { entries: ImageEntry[] }) {
  const [state, setState] = useState<State>(() =>
    Object.fromEntries(
      entries.map((e) => [e.src, { bg: e.defaultBg, border: e.defaultBorder }])
    )
  );

  const toggle = (src: string, key: "bg" | "border") => {
    setState((prev) => ({
      ...prev,
      [src]: { ...prev[src], [key]: !prev[src][key] },
    }));
  };

  const resetAll = () => {
    setState(
      Object.fromEntries(
        entries.map((e) => [
          e.src,
          { bg: e.defaultBg, border: e.defaultBorder },
        ])
      )
    );
  };

  const byProject = useMemo(() => {
    return entries.reduce<Record<string, ImageEntry[]>>((acc, e) => {
      (acc[e.project] ||= []).push(e);
      return acc;
    }, {});
  }, [entries]);

  const outputText = useMemo(() => {
    return Object.entries(byProject)
      .map(([project, items]) => {
        const lines = items.map((e) => {
          const s = state[e.src];
          const drift =
            s.bg !== e.defaultBg || s.border !== e.defaultBorder ? " ←" : "";
          return `  ${e.src}: bg=${s.bg}, border=${s.border}${drift}`;
        });
        return `${project}:\n${lines.join("\n")}`;
      })
      .join("\n\n");
  }, [byProject, state]);

  return (
    <main className="bg-text-primary min-h-screen text-text-inverse">
      <div className="max-w-frame mx-auto px-content-x py-section flex flex-col gap-16">
        <header className="flex flex-col gap-3 max-w-column">
          <p className="type-allcaps text-text-inverse opacity-60">
            Playground
          </p>
          <h1 className="type-page-title">Lightbox bg/border audit</h1>
          <p className="type-body opacity-80">
            Toggle <code>bg</code> and <code>border</code> per image to find the
            ideal lightbox treatment. Each preview shows the image as it would
            render on the dark lightbox backdrop with the chosen options. The
            <span> </span>← marker on the right of the output flags drift from
            the YAML default. Copy the output block at the bottom and send it
            back.
          </p>
        </header>

        <div className="flex flex-col gap-16">
          {Object.entries(byProject).map(([project, items]) => (
            <section key={project} className="flex flex-col gap-6">
              <h2 className="type-h1 capitalize">{project}</h2>
              <div className="flex flex-col gap-12">
                {items.map((e) => {
                  const s = state[e.src];
                  return (
                    <div key={e.src} className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-6 flex-wrap">
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="type-label text-text-inverse break-all">
                            {e.src}
                          </span>
                          <span className="type-caption text-text-inverse opacity-60">
                            {e.label} · default: bg=
                            {String(e.defaultBg)} border=
                            {String(e.defaultBorder)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Toggle
                            label="bg"
                            checked={s.bg}
                            onChange={() => toggle(e.src, "bg")}
                          />
                          <Toggle
                            label="border"
                            checked={s.border}
                            onChange={() => toggle(e.src, "border")}
                          />
                        </div>
                      </div>

                      <div className="bg-text-primary border border-surface-2/30 rounded-sm flex justify-center items-center py-12 px-8">
                        <div
                          className={[
                            "max-w-full",
                            s.bg ? "bg-surface-1 p-6" : "",
                            s.border ? "border border-surface-2 rounded-sm" : "",
                            "overflow-hidden box-border",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={e.src}
                            alt=""
                            className="max-w-full max-h-[480px] w-auto h-auto object-contain block"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="type-h1">Output</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetAll}
                className="type-label px-4 py-2 border border-surface-2 rounded-sm hover:bg-surface-1 hover:text-text-primary transition-colors"
              >
                Reset to YAML defaults
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(outputText);
                }}
                className="type-label px-4 py-2 bg-surface-1 text-text-primary rounded-sm hover:opacity-90 transition-opacity"
              >
                Copy
              </button>
            </div>
          </div>
          <pre className="bg-surface-1 text-text-primary p-6 rounded-sm overflow-x-auto text-sm whitespace-pre-wrap font-mono">
            {outputText}
          </pre>
        </section>
      </div>
    </main>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={[
        "type-label px-3 py-1.5 rounded-sm border transition-colors",
        checked
          ? "bg-surface-1 text-text-primary border-surface-1"
          : "bg-transparent text-text-inverse border-surface-2/40 hover:border-surface-2",
      ].join(" ")}
    >
      {label} {checked ? "on" : "off"}
    </button>
  );
}
