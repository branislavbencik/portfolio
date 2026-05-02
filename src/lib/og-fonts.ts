import { readFile } from "node:fs/promises";
import path from "node:path";

const GEIST_BOLD_PATH = path.join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf"
);

export async function loadGeistBold(): Promise<ArrayBuffer> {
  const buffer = await readFile(GEIST_BOLD_PATH);
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}
