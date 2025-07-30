import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("Positive Login Test - Lenmed Web System", async ({ page }) => {
    const loginPage = new LoginPage(page);

    const homePage = await loginPage.loginFlow("deonva@spesnet.co.za", "Xander!2");

    await homePage.expectHomePageVisible();
});

test('Lenmed Login Test - Negative Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginFlow('invalid@spesnet.co.za', 'WrongPassword');

    // Check for error popup message
    const errorMessage = page.locator('.sn-content', { hasText: 'Incorrect Credentials.' });
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    // Optional: Confirm Home page was not reached
    await expect(page.locator('h1:has-text("Home")')).not.toBeVisible();
});
