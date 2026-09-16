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

export function loadKarlaBold(): Promise<ArrayBuffer> {
  return loadLocalFont("Karla-Bold.ttf");
}

export function loadKarlaRegular(): Promise<ArrayBuffer> {
  return loadLocalFont("Karla-Regular.ttf");
}
