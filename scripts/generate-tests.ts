#!/usr/bin/env ts-node
/**
 * =============================================================
 *  HUMBLE HUMAN - Playwright Test Generator
 *  Đọc file scenario JSON → Tự động generate file test .spec.ts
 * =============================================================
 *
 *  Cách dùng:
 *    npx ts-node scripts/generate-tests.ts
 *    npx ts-node scripts/generate-tests.ts --file scenarios/home.scenarios.json
 *    npx ts-node scripts/generate-tests.ts --tag smoke
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Step {
  action: string;
  url?: string;
  selector?: string;
  text?: string;
  value?: string;
  value_contains?: string;
  value_gte?: number;
  key?: string;
  ms?: number;
  count?: number;
  operator?: 'eq' | 'gte' | 'lte' | 'gt' | 'lt';
  // viewport
  width?: number;
  height?: number;
  // scroll
  x?: number;
  y?: number;
  // css / menu
  property?: string;
  items?: string[];
  _comment?: string;
  _doc?: string;
}

interface Scenario {
  id: string;
  name: string;
  tags?: string[];
  steps: Step[];
}

interface ScenarioFile {
  suiteName: string;
  baseUrl: string;
  scenarios: Scenario[];
}

// ─── CLI Args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const fileArg = args.find((a) => a.startsWith('--file='))?.replace('--file=', '')
  || (args[args.indexOf('--file') + 1]);
const tagArg = args.find((a) => a.startsWith('--tag='))?.replace('--tag=', '')
  || (args[args.indexOf('--tag') + 1] !== '--file' ? args[args.indexOf('--tag') + 1] : undefined);

// ─── Step code generator ─────────────────────────────────────────────────────

let _varCounter = 0;
function varId(): string {
  return `v${++_varCounter}`;
}

function generateStep(step: Step, indent = '    '): string {
  const { action, url, selector, text, value, key, ms, count, operator,
          width, height, x, y, property, value_contains, value_gte, items } = step;

  // Use backtick template literals for selectors to sidestep quote conflicts
  const sel = selector ? `\`${selector}\`` : '';
  const val = value ? `'${value.replace(/'/g, "\\'")}'` : '';

  switch (action) {
    case 'navigate':
      if (url?.startsWith('http')) {
        return `${indent}await page.goto('${url}');`;
      }
      return `${indent}await page.goto(BASE_URL + '${url ?? '/'}');`;

    case 'click':
      return `${indent}await page.locator(${sel}).first().click();`;

    case 'click_text':
      return `${indent}await page.getByText('${text?.replace(/'/g, "\\'")}', { exact: false }).first().click();`;

    case 'fill':
      return `${indent}await page.locator(${sel}).fill(${val});`;

    case 'press_key':
      return `${indent}await page.locator(${sel}).press('${key}');`;

    case 'select_option':
      return `${indent}await page.locator(${sel}).selectOption(${val});`;

    case 'hover':
      return `${indent}await page.locator(${sel}).first().hover();`;

    case 'scroll_to':
      return `${indent}await page.locator(${sel}).scrollIntoViewIfNeeded();`;

    case 'wait':
      return `${indent}await page.waitForTimeout(${ms ?? 1000});`;

    case 'wait_for_url':
      return `${indent}await page.waitForURL(/${url?.replace(/\//g, '\\/')}/);`;

    case 'wait_for_selector':
      return `${indent}await page.locator(${sel}).waitFor({ state: 'visible' });`;

    case 'expect_url':
      return `${indent}await expect(page).toHaveURL('${url}');`;

    case 'expect_url_contains':
      return `${indent}await expect(page).toHaveURL(/${url?.replace(/\//g, '\\/')}/, { timeout: 15000 });`;

    case 'expect_title_contains':
      return `${indent}await expect(page).toHaveTitle(/${val.replace(/'/g, '')}/, { timeout: 15000 });`;

    case 'expect_visible':
      return `${indent}await expect(page.locator(${sel}).first()).toBeVisible();`;

    case 'expect_not_visible':
      return `${indent}await expect(page.locator(${sel}).first()).not.toBeVisible();`;

    case 'expect_text':
      return `${indent}await expect(page.locator(${sel}).first()).toContainText(${val});`;

    case 'expect_text_visible':
      return `${indent}await expect(page.getByText(${val}, { exact: false }).first()).toBeVisible();`;

    case 'expect_count': {
      const op = operator ?? 'gte';
      const opMap: Record<string, string> = {
        eq: `toBe(${count})`,
        gte: `toBeGreaterThanOrEqual(${count})`,
        lte: `toBeLessThanOrEqual(${count})`,
        gt: `toBeGreaterThan(${count})`,
        lt: `toBeLessThan(${count})`,
      };
      return (
        `${indent}const count_${Math.random().toString(36).slice(2, 6)} = await page.locator(${sel}).count();\n` +
        `${indent}expect(count_${Math.random().toString(36).slice(2, 6)}).${opMap[op]};`
      );
    }

    case 'expect_enabled':
      return `${indent}await expect(page.locator(${sel}).first()).toBeEnabled();`;

    case 'expect_disabled':
      return `${indent}await expect(page.locator(${sel}).first()).toBeDisabled();`;

    // ─── Header-specific actions ──────────────────────────────────────────

    case 'set_viewport':
      return `${indent}await page.setViewportSize({ width: ${width ?? 1280}, height: ${height ?? 720} });`;

    case 'scroll_by':
      return `${indent}await page.evaluate(() => window.scrollBy(${x ?? 0}, ${y ?? 0}));\n${indent}await page.waitForTimeout(500);`;

    case 'expect_in_viewport': {
      const vid = varId();
      return (
        `${indent}const box_${vid} = await page.locator(${sel}).first().boundingBox();\n` +
        `${indent}expect(box_${vid}?.y).toBeLessThan(${height ?? 720});`
      );
    }

    case 'expect_css_property': {
      const vid = varId();
      if (value_gte !== undefined) {
        return (
          `${indent}const cssVal_${vid} = await page.locator(${sel}).first().evaluate(\n` +
          `${indent}  (el) => parseInt(getComputedStyle(el).getPropertyValue('${property}') || '0', 10)\n` +
          `${indent});\n` +
          `${indent}expect(cssVal_${vid}).toBeGreaterThanOrEqual(${value_gte});`
        );
      }
      const pattern = value_contains ?? '';
      return (
        `${indent}const cssStr_${vid} = await page.locator(${sel}).first().evaluate(\n` +
        `${indent}  (el) => getComputedStyle(el).getPropertyValue('${property}')\n` +
        `${indent});\n` +
        `${indent}expect(cssStr_${vid}).toMatch(/${pattern}/);`
      );
    }

    case 'expect_center_aligned': {
      const vid = varId();
      const vpId = varId();
      return (
        `${indent}const rect_${vid} = await page.locator(${sel}).first().boundingBox();\n` +
        `${indent}const vp_${vpId} = page.viewportSize();\n` +
        `${indent}if (rect_${vid} && vp_${vpId}) {\n` +
        `${indent}  const center = rect_${vid}.x + rect_${vid}.width / 2;\n` +
        `${indent}  expect(Math.abs(center - vp_${vpId}.width / 2)).toBeLessThan(30);\n` +
        `${indent}}`
      );
    }

    case 'expect_no_overflow': {
      const vid = varId();
      return (
        `${indent}const overflow_${vid} = await page.locator(${sel}).first().evaluate(\n` +
        `${indent}  (el) => {\n` +
        `${indent}    const s = getComputedStyle(el);\n` +
        `${indent}    return s.overflow === 'hidden' || el.scrollWidth <= el.clientWidth;\n` +
        `${indent}  }\n` +
        `${indent});\n` +
        `${indent}expect(overflow_${vid}).toBeTruthy();`
      );
    }

    case 'expect_no_reload_on_click': {
      const vid = varId();
      return (
        `${indent}let reloaded_${vid} = false;\n` +
        `${indent}page.on('load', () => { reloaded_${vid} = true; });\n` +
        `${indent}await page.locator(${sel}).first().click();\n` +
        `${indent}await page.waitForTimeout(1000);\n` +
        `${indent}// Soft check: same URL after clicking current page\n` +
        `${indent}expect(page.url()).toMatch(/humblehuman\\.vn/);`
      );
    }

    case 'expect_menu_order': {
      if (!items || items.length === 0) return `${indent}// [expect_menu_order] no items specified`;
      const vid = varId();
      const lines: string[] = [];
      lines.push(`${indent}const menuLinks_${vid} = await page.locator('nav a, header nav a, [class*=\\'menu\\'] a').allTextContents();`);
      items.forEach((item) => {
        const ivid = varId();
        lines.push(`${indent}{ const idx_${ivid} = menuLinks_${vid}.findIndex((t: string) => t.includes('${item}')); expect(idx_${ivid}).toBeGreaterThanOrEqual(0); }`);
      });
      return lines.join('\n');
    }

    default:
      return `${indent}// [UNKNOWN ACTION: ${action}] — thêm logic xử lý nếu cần`;
  }
}

// ─── File generator ───────────────────────────────────────────────────────────

function generateTestFile(scenarioFile: ScenarioFile, outputPath: string, filterTag?: string): void {
  _varCounter = 0; // reset per file
  const scenarios = filterTag
    ? scenarioFile.scenarios.filter((s) => s.tags?.includes(filterTag))
    : scenarioFile.scenarios;

  if (scenarios.length === 0) {
    console.log(`⚠️  Không có scenario nào khớp với tag: ${filterTag}`);
    return;
  }

  const lines: string[] = [];

  lines.push(`// AUTO-GENERATED — ${new Date().toISOString()}`);
  lines.push(`// Suite: ${scenarioFile.suiteName}`);
  lines.push(`// Source: ${path.basename(outputPath.replace('.spec.ts', '.scenarios.json'))}`);
  lines.push(`// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.`);
  lines.push('');
  lines.push(`import { test, expect } from '@playwright/test';`);
  lines.push('');
  lines.push(`const BASE_URL = '${scenarioFile.baseUrl}';`);
  lines.push('');
  lines.push(`test.describe('${scenarioFile.suiteName}', () => {`);
  lines.push('');

  for (const scenario of scenarios) {
    const tags = scenario.tags ? scenario.tags.map((t) => `[${t}]`).join(' ') : '';
    const testName = `${scenario.id} — ${scenario.name}${tags ? ' ' + tags : ''}`;

    lines.push(`  test('${testName.replace(/'/g, "\\'")}', async ({ page }) => {`);

    for (const step of scenario.steps) {
      if (step._comment || step._doc) continue; // skip documentation-only steps
      const code = generateStep(step);
      lines.push(code);
    }

    lines.push(`  });`);
    lines.push('');
  }

  lines.push(`});`);
  lines.push('');

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`✅ Generated: ${outputPath} (${scenarios.length} tests)`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const scenariosDir = path.join(__dirname, '..', 'scenarios');
  const testsDir = path.join(__dirname, '..', 'tests', 'generated');

  // Ensure output directory exists
  if (!fs.existsSync(testsDir)) {
    fs.mkdirSync(testsDir, { recursive: true });
  }

  // Collect scenario files
  let scenarioFiles: string[] = [];

  if (fileArg) {
    const absPath = path.isAbsolute(fileArg) ? fileArg : path.join(process.cwd(), fileArg);
    if (!fs.existsSync(absPath)) {
      console.error(`❌ File không tồn tại: ${absPath}`);
      process.exit(1);
    }
    scenarioFiles = [absPath];
  } else {
    scenarioFiles = fs
      .readdirSync(scenariosDir)
      .filter((f) => f.endsWith('.scenarios.json'))
      .map((f) => path.join(scenariosDir, f));
  }

  if (scenarioFiles.length === 0) {
    console.log('⚠️  Không tìm thấy file scenario nào trong thư mục scenarios/');
    return;
  }

  console.log(`\n🎭 Humble Human - Playwright Test Generator`);
  console.log(`📂 Scenario files: ${scenarioFiles.length}`);
  if (tagArg) console.log(`🏷️  Filter tag: ${tagArg}`);
  console.log('');

  for (const filePath of scenarioFiles) {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const scenarioFile: ScenarioFile = JSON.parse(raw);

      const baseName = path.basename(filePath, '.scenarios.json');
      const outputPath = path.join(testsDir, `${baseName}.spec.ts`);

      generateTestFile(scenarioFile, outputPath, tagArg);
    } catch (err) {
      console.error(`❌ Lỗi xử lý file ${filePath}:`, err);
    }
  }

  console.log('\n✨ Hoàn thành! Chạy tests bằng:');
  console.log('   npx playwright test tests/generated/');
  console.log('   npx playwright test tests/generated/ --reporter=html\n');
}

main();
