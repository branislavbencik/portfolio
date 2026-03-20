"use client";

import * as Dialog from "@radix-ui/react-dialog";
import SelectedProjectCard, { SelectedProjectCardProps } from "./SelectedProjectCard";
import { SelectedProjectContent, SelectedProjectProps } from "./SelectedProjectContent";

type ProjectOverlayProps = {
  card: Omit<SelectedProjectCardProps, "href" | "onClick">;
  content: SelectedProjectProps;
};

export function ProjectOverlay({ card, content }: ProjectOverlayProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <SelectedProjectCard {...card} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.4)]" />
        <Dialog.Content className="fixed inset-12 left-1/2 -translate-x-1/2 w-full max-w-[1224px] z-50 bg-white overflow-hidden flex flex-col focus:outline-none">
          <Dialog.Title className="sr-only">{content.headline}</Dialog.Title>
          <Dialog.Description className="sr-only">{content.description}</Dialog.Description>

          {/* Close button row — sits above scroll area, never scrolls away */}
          <div className="shrink-0 flex justify-end px-8 pt-6">
            <Dialog.Close className="text-foreground opacity-50 hover:opacity-100 transition-opacity text-xl leading-none cursor-pointer">
              ✕
            </Dialog.Close>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1">
            <div className="px-[48px] pb-[100px] pt-[60px]">
              <SelectedProjectContent {...content} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
