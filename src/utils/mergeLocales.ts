import { globSync } from 'glob';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../../src');
const OUTPUT_DIR = path.resolve(__dirname, '../../public/locales');

const SUPPORTED_LOCALES = ['en', 'fr'];

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else {
      result[newKey] = value as string;
    }
  }

  return result;
}

function getNamespaceFromPath(filePath: string, locale: string): string {
  const relative = path.relative(SRC_DIR, filePath);
  // e.g. "pages/Home/locales/en.json" → "pages.Home"
  return relative.replace(`/locales/${locale}.json`, '').replace(/\//g, '.');
}

function mergeLocales() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const locale of SUPPORTED_LOCALES) {
    const merged: Record<string, string> = {};

    const files = globSync(`${SRC_DIR}/**/locales/${locale}.json`);

    for (const file of files) {
      const namespace = getNamespaceFromPath(file, locale);
      const content = JSON.parse(readFileSync(file, 'utf-8'));
      const flattened = flattenObject(content, namespace);

      Object.assign(merged, flattened);
    }

    // Sort keys for consistency
    const sorted = Object.fromEntries(
      Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)),
    );

    const outputPath = path.join(OUTPUT_DIR, `${locale}.json`);
    writeFileSync(outputPath, JSON.stringify(sorted, null, 2));

    console.log(`✅ Generated ${outputPath} (${Object.keys(sorted).length} keys)`);
  }
}

mergeLocales();
