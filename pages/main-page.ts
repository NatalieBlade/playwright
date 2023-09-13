import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly mainPage: Page;
    readonly _productsButton: Locator;
    readonly _menuDropdown: Locator;
    readonly _questionsTab: Locator;

    constructor(page) {
        this.mainPage = page;
        this._productsButton = page.locator('[aria-controls="products-popover"]');
        this._menuDropdown = page.locator('[class*="list-reset"]');
        this._questionsTab = page.getByText('Public questions & answers');
    }

    async open() {
        await this.mainPage.goto('https://stackoverflow.com/')
    }

    async awaitProductsTabIsExist() {
        await expect(this._productsButton).toBeVisible();
        await expect(this._productsButton).toBeDefined();
    }

    async clickOnProductsButton() {
        await this._productsButton.click()
        await expect(this._menuDropdown).toBeVisible();
    }

    async clickQuestionsTab() {
        await this._questionsTab.click();
    }
}
