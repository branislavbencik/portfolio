"use client";

import { useState } from "react";
import {
  V1Wordmark,
  type V1Size,
  type V1AlignX,
  type V1AlignY,
  type V1Avatar,
  type V1AvatarSize,
} from "./variants/V1Wordmark";
import {
  SlackChrome,
  LinkedInChrome,
  XChrome,
  IMessageChrome,
} from "./chrome";
import type { ProjectData, Route } from "./types";

function cellMeta(route: Route, project: ProjectData) {
  const domain = "branislavbencik.com";
  const url = route === "root" ? domain : `${domain}/${project.slug}`;
  const title =
    route === "root"
      ? "Branislav Benčík — Product Designer"
      : project.title;
  const description =
    route === "root"
      ? "I design complex systems and ship code."
      : project.description;
  return { domain: url, title, description };
}

type ToggleOption<T extends string | number> = { value: T; label: string };

function ToggleGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="type-allcaps text-text-secondary">{label}</span>
      <div className="flex border border-surface-2 rounded-md overflow-hidden">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={`type-caption font-mono px-3 py-1.5 transition-colors ${
                active
                  ? "bg-surface-2 text-text-primary font-medium"
                  : "bg-canvas text-text-secondary hover:text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const SIZE_OPTIONS: ToggleOption<V1Size>[] = [
  { value: 40, label: "40" },
  { value: 48, label: "48" },
  { value: 56, label: "56" },
  { value: 64, label: "64" },
  { value: 80, label: "80" },
];

// Locked per user direction (2026-05-02): text x = left, text y = middle, no avatar.
// Only size remains as an exploration axis.
const LOCKED_ALIGN_X: V1AlignX = "left";
const LOCKED_ALIGN_Y: V1AlignY = "center";
const LOCKED_AVATAR: V1Avatar = "none";
const LOCKED_AVATAR_SIZE: V1AvatarSize = 96;

export function PreviewMatrix({ projects }: { projects: ProjectData[] }) {
  const [projectSlug, setProjectSlug] = useState<string>(
    projects[0]?.slug ?? ""
  );
  const [route, setRoute] = useState<Route>("project");

  const [size, setSize] = useState<V1Size>(40);

  const project = projects.find((p) => p.slug === projectSlug) ?? projects[0];
  if (!project) return null;
  const meta = cellMeta(route, project);

  const projectOptions: ToggleOption<string>[] = projects.map((p) => ({
    value: p.slug,
    label: p.company,
  }));
  const routeOptions: ToggleOption<Route>[] = [
    { value: "project", label: "/[slug]" },
    { value: "root", label: "/" },
  ];

  const variantNode = (
    <V1Wordmark
      size={size}
      alignX={LOCKED_ALIGN_X}
      alignY={LOCKED_ALIGN_Y}
      avatar={LOCKED_AVATAR}
      avatarSize={LOCKED_AVATAR_SIZE}
    />
  );

  return (
    <>
      <div className="sticky top-0 z-40 bg-canvas border-b border-surface-2">
        <div className="max-w-frame mx-center max-lg:px-content-x py-4 flex flex-wrap gap-x-6 gap-y-3 items-end">
          <ToggleGroup
            label="Wordmark size"
            options={SIZE_OPTIONS}
            value={size}
            onChange={setSize}
          />
          <div className="w-px self-stretch bg-surface-2 mx-1" />
          <ToggleGroup
            label="Project"
            options={projectOptions}
            value={projectSlug}
            onChange={setProjectSlug}
          />
          <ToggleGroup
            label="Route"
            options={routeOptions}
            value={route}
            onChange={setRoute}
          />
          <div className="ml-auto flex flex-col gap-0.5">
            <span className="type-allcaps text-text-secondary">Sharing</span>
            <span className="type-caption font-mono text-text-primary">
              {meta.domain}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-frame mx-center max-lg:px-content-x py-section flex flex-col gap-12 items-start">
        <div className="flex flex-col gap-3">
          <p className="type-allcaps text-text-tertiary">
            Slack <span className="normal-case">(summary_large_image)</span>
          </p>
          <SlackChrome
            domain={meta.domain}
            title={meta.title}
            description={meta.description}
            cardSize="large"
          >
            {variantNode}
          </SlackChrome>
        </div>

        <div className="flex flex-col gap-3">
          <p className="type-allcaps text-text-tertiary">LinkedIn</p>
          <LinkedInChrome domain={meta.domain} title={meta.title}>
            {variantNode}
          </LinkedInChrome>
        </div>

        <div className="flex flex-col gap-3">
          <p className="type-allcaps text-text-tertiary">X (Twitter)</p>
          <XChrome domain={meta.domain} title={meta.title}>
            {variantNode}
          </XChrome>
        </div>

        <div className="flex flex-col gap-3">
          <p className="type-allcaps text-text-tertiary">iMessage</p>
          <IMessageChrome domain={meta.domain} title={meta.title}>
            {variantNode}
          </IMessageChrome>
        </div>
      </div>
    </>
  );
}
