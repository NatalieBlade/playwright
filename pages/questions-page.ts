import { expect, type Locator, type Page } from '@playwright/test';

export class QuestionsPage {
    readonly questionPage: Page;
    readonly locator: Locator;
    readonly getByRole: Locator;
    readonly first: Locator;
    readonly _pageHeader: Locator;
    readonly _questions: Locator;
    readonly _firstQuestion: Locator;

    constructor(page) {
        this.questionPage = page;
        this._pageHeader = page.getByRole('heading', { name: 'All Questions' });
        this._questions = page.locator('[id*="question-summary-"]');
        this._firstQuestion = page.locator('[class="s-link"]').first();
    }

    async open() {
        await this.questionPage.goto('https://stackoverflow.com/questions')
    }

    async expectHeaderIsDisplayed() {
        await expect(this._pageHeader).toBeVisible();
        await expect((await this._pageHeader.textContent()).toString()).toBe('All Questions');
    }

    async expectQuestionsAreDisplayed() {
        await expect(this._questions).toHaveCount(15);
    }

    async clickQuestion() {
        const question =  this._firstQuestion.textContent();
        await this._firstQuestion.click();
        return question;
    }
}
