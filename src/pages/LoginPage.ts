import { Page } from "@playwright/test";
import HomePage from "./HomePage";

export default class LoginPage {
    constructor(private page: Page) {}

    // ===== Locators =====
    private readonly cookieModal = "#cm";
    private readonly acceptCookiesBtn = "#c-p-bn";

    private readonly usernameInput = "input[name='Email']";
    private readonly passwordInput = "input[name='PasswordHash']";

    private get loginButton() {
    return this.page.locator("button:has(span.label:has-text('LOGIN'))");
}

    // ===== Actions =====
    async navigateToLoginPage() {
        await this.page.goto("/");
    }

    async acceptCookiesIfVisible() {
        const isVisible = await this.page.evaluate(() => {
            const el = document.querySelector("#cm");
            return el && window.getComputedStyle(el).visibility === "visible";
        });

        if (isVisible) {
            await this.page.click(this.acceptCookiesBtn);
            await this.page.waitForSelector(this.cookieModal, { state: "hidden" });
        }
    }

    async fillCredentials(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
    }

    async submitLogin(): Promise<HomePage> {
        await this.loginButton.waitFor({ state: "visible" });
        await this.loginButton.click();
        return new HomePage(this.page);
    }

    async loginFlow(username: string, password: string): Promise<HomePage> {
        await this.navigateToLoginPage();
        await this.acceptCookiesIfVisible();
        await this.fillCredentials(username, password);
        return await this.submitLogin();
    }
}
