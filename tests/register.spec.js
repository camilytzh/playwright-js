import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

let registerPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  
  await registerPage.open();
});

test('successful register with valid data', async ({ page })=> {
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '2000-10-05',
    email: registerPage.generateUniqueEmail()
  });
  await registerPage.clickOnRegister();
  
  await expect(page).toHaveURL(/\/auth\/login$/);
});

test('unsuccessful register with age under 18', async ({page}) => {
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '2023-01-21',
    email: registerPage.generateUniqueEmail()
  });
  await registerPage.clickOnRegister();

  await expect(registerPage.registerErrorMessage).toContainText('be 18 years old.');
});

test.skip('unsuccessful register with age over 75', async ({page}) => {
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '1935-01-21',
    email: registerPage.generateUniqueEmail()
  });
  await registerPage.clickOnRegister();

  await expect(registerPage.registerErrorMessage).toContainText('younger than 75 years old.');
});

test('successful register with lower age limit allowed', async ({page}) => {
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '2007-01-01',
    email: registerPage.generateUniqueEmail()
  });
  await registerPage.clickOnRegister();

  await expect(page).toHaveURL(/\/auth\/login$/);
});

test('successful register with upper age limit allowed', async ({page}) => {
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '1950-01-01',
    email: registerPage.generateUniqueEmail()
  });
  await registerPage.clickOnRegister();

  await expect(page).toHaveURL(/\/auth\/login$/);
});

test('unsuccessful register with invalid email format', async ({page}) => {
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '2000-01-01',
    email: 'email'
  });
  await registerPage.clickOnRegister();

  await expect(registerPage.invalidEmail).toBeVisible();
});

test('unsuccessful register with repeated email', async ({page}) => {
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '2000-01-01',
    email: 'johndoe@mail.com'
  });
  await registerPage.clickOnRegister();

  await expect(registerPage.registerErrorMessage).toContainText('already exists');
});