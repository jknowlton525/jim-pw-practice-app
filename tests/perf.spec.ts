import {test as base} from '@playwright/test';
import type { PerformanceOptions, PlaywrightPerformance, PerformanceWorker } from "playwright-performance";
import { playwrightPerformance } from "playwright-performance";

const test = base.extend<PlaywrightPerformance, PerformanceOptions & PerformanceWorker>({
  performance: playwrightPerformance.performance,
  performanceOptions: [{
  }, { scope: 'worker' }],
  worker: [playwrightPerformance.worker, { scope: 'worker', auto: true }]
});

test('startup performance', async ({ page, performance }) => {
    performance.sampleStart("GH-startup");
    await page.goto('http://github.com/');
    performance.sampleEnd("GH-startup");

    performance.sampleStart("SF-startup");
    await page.goto('https://sourceforge.net/');
    performance.sampleEnd("SF-startup");
  });