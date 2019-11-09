import { After, Before } from 'cucumber';
import { newDriver, quit, takeScreenshot } from './driver';

Before(async () => {
    await newDriver();
});

After(async function() {
    const screenshot = await takeScreenshot();
    this.attach(screenshot, 'image/png');

    await quit();
});
