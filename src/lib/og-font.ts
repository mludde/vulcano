import { readFile } from "node:fs/promises";
import { join } from "node:path";

const FONTS_DIR = join(process.cwd(), "src/app/fonts");

async function loadLocalFont(fileName: string): Promise<ArrayBuffer> {
  const buffer = await readFile(join(FONTS_DIR, fileName));
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

export function loadKaushanScript(): Promise<ArrayBuffer> {
  return loadLocalFont("KaushanScript-Regular.ttf");
}

export function loadArimoBold(): Promise<ArrayBuffer> {
  return loadLocalFont("Arimo-Bold.ttf");
}

export function loadArimoRegular(): Promise<ArrayBuffer> {
  return loadLocalFont("Arimo-Regular.ttf");
}
