// @ts-check
import { test, expect } from '@playwright/test';
import { MainPage } from 'pages/main-page';
import { QuestionsPage } from 'pages/questions-page.ts';

test('Check products tab exists', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.awaitProductsTabIsExist();
});

test('Go to questions page', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.clickOnProductsButton();
    await mainPage.clickQuestionsTab();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('questions');
});

test('Check questions page heading', async ({ page }) => {
    const questionPage = new QuestionsPage(page);
    await questionPage.open();
    await questionPage.expectHeaderIsDisplayed();
});

test('Check questions are displayed', async ({ page }) => {
    const questionPage = new QuestionsPage(page);
    await questionPage.open();
    await questionPage.expectQuestionsAreDisplayed();
});

test('Go to first question page', async ({ page }) => {
    const questionPage = new QuestionsPage(page);
    await questionPage.open();
    const question = await questionPage.clickQuestion();
    let textForUrl = question.toLowerCase().replace(/'?\(\)#/, '').split(' ').join('-')
    expect(page.url()).toContain(`${textForUrl}`);
});
