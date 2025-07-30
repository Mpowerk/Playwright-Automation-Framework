import { Page, expect } from "@playwright/test";

export default class HomePage {
    constructor(private page: Page) {}

    private get homeHeader() {
        return this.page.locator("h1", { hasText: "Home" });
    }

    async expectHomePageVisible() {
        await expect(this.homeHeader).toBeVisible({ timeout: 30000 });
    }
}
