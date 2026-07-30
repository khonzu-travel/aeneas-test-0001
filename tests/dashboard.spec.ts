import { expect, test, type Page } from '@playwright/test';

const BREAKPOINTS = [
  { name: 'desktop', width: 1402, height: 1122 },
  { name: 'tablet', width: 900, height: 1200 },
  { name: 'phone', width: 390, height: 1400 },
] as const;

/** Wait for webfonts so glyph metrics are stable before any capture. */
async function settle(page: Page) {
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await expect(page.getByRole('heading', { level: 2, name: 'Dashboard', exact: true })).toBeVisible();
}

for (const bp of BREAKPOINTS) {
  test.describe(bp.name, () => {
    test.use({ viewport: { width: bp.width, height: bp.height } });

    test('renders the dashboard', async ({ page }) => {
      await page.goto('/');
      await settle(page);
      await expect(page).toHaveScreenshot(`dashboard-${bp.name}.png`, { fullPage: true });
    });
  });
}

test.describe('content', () => {
  test.use({ viewport: { width: 1402, height: 1122 } });

  test('shows the wordmark, nav, stats and every feature card', async ({ page }) => {
    await page.goto('/');
    await settle(page);

    await expect(page.getByRole('heading', { level: 1, name: 'AENEAS' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('listitem')).toHaveCount(5);
    await expect(page.getByRole('link', { name: /Dashboard/ })).toHaveAttribute('aria-current', 'page');

    const summary = page.getByRole('region', { name: 'Delivery summary' });
    await expect(summary.getByRole('article')).toHaveCount(4);
    await expect(summary.getByRole('article')).toHaveText([
      /6\s*Active Features/,
      /8\s*Pending Actions/,
      /9\s*Agents Working/,
      /1\s*Features Blocked/,
    ]);

    await expect(page.getByRole('region', { name: 'Active features' }).getByRole('article')).toHaveCount(6);
    await expect(page.getByRole('heading', { name: 'User Authentication & SSO' })).toBeVisible();
  });

  test('renders the blocked feature with its ribbon, and only that one', async ({ page }) => {
    await page.goto('/');
    await settle(page);

    const blocked = page.locator('[data-blocked="true"]');
    await expect(blocked).toHaveCount(1);
    await expect(blocked).toContainText('Mobile Push Notifications');
    await expect(blocked).toContainText('Awaiting third-party API credentials');
  });

  test('reports phase progress to assistive technology', async ({ page }) => {
    await page.goto('/');
    await settle(page);

    const bars = page.getByRole('progressbar');
    await expect(bars).toHaveCount(6);
    await expect(bars.first()).toHaveAttribute('aria-valuetext', 'Phase 4 of 6');
  });
});

test.describe('phone navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('sidebar opens as a drawer and closes on selection', async ({ page }) => {
    await page.goto('/');
    await settle(page);

    const wordmark = page.getByRole('heading', { level: 1, name: 'AENEAS' });
    const toggle = page.getByRole('button', { name: 'Open navigation' });

    // The drawer is translated off-canvas, so it starts outside the viewport.
    await expect(await isOnScreen(page, wordmark)).toBe(false);

    await toggle.click();
    await expect(page.getByRole('button', { name: 'Close navigation' }).first()).toBeVisible();
    await expect.poll(() => isOnScreen(page, wordmark)).toBe(true);

    await page.getByRole('link', { name: /Features/ }).click();
    await expect.poll(() => isOnScreen(page, wordmark)).toBe(false);
  });
});

async function isOnScreen(page: Page, locator: ReturnType<Page['getByRole']>) {
  const box = await locator.boundingBox();
  if (!box) return false;
  const width = page.viewportSize()?.width ?? 0;
  return box.x >= 0 && box.x < width;
}
