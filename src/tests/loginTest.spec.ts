import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("Lenmed Login Test - Positive Login Test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Use valid credentials from .env.uat
    const homePage = await loginPage.loginFlow(
        process.env.TEST_USERNAME!,
        process.env.TEST_PASSWORD!
    );

    await homePage.expectHomePageVisible();
});

test('Lenmed Login Test - Negative Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Use Invalid credentials from .env.uat
    await loginPage.loginFlow(process.env.INVALID_USERNAME!, process.env.INVALID_PASSWORD!);

    // Check for error popup message
    const errorMessage = page.locator('.sn-content', { hasText: 'Incorrect Credentials.' });
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    // Optional: Confirm Home page was not reached
    await expect(page.locator('h1:has-text("Home")')).not.toBeVisible();
});
