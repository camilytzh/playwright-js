const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');

let registerPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  
  await registerPage.open();
  await registerPage.fillCommonFields();
});

test('successful register with valid data', async ({ page })=> {
  await registerPage.fillVariableFields({
    dateOfBirth: '2000-10-05',
    email: registerPage._generateUniqueEmail(),
    password: registerPage._generateRandomPassword()
  });
  await registerPage.clickOnRegister();
  
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});

test('unsucessful register with age under 18', async ({page}) => {
  await registerPage.fillVariableFields({
    dateOfBirth: '2023-01-21',
    email: registerPage._generateUniqueEmail(),
    password: registerPage._generateRandomPassword()
  });
  await registerPage.clickOnRegister();

  await expect(registerPage.ageErrorMessage).toHaveText('Customer must be 18 years old.', 
    { timeout: 2000 });
});

test.skip('unsucessful register with age over 75', async ({page}) => {
  await registerPage.fillVariableFields({
    dateOfBirth: '1935-01-21',
    email: registerPage._generateUniqueEmail(),
    password: registerPage._generateRandomPassword()
  });
  await registerPage.clickOnRegister();

  await expect(registerPage.ageErrorMessage).toHaveText('Customer must be younger than 75 years old.', 
    { timeout: 2000 });
});

test('sucessful register with lower age limit allowed', async ({page}) => {
  await registerPage.fillVariableFields({
    dateOfBirth: '2007-01-01',
    email: registerPage._generateUniqueEmail(),
    password: registerPage._generateRandomPassword()
  });
  await registerPage.clickOnRegister();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});

test('sucessful register with upper age limit allowed', async ({page}) => {
  await registerPage.fillVariableFields({
    dateOfBirth: '1950-01-01',
    email: registerPage._generateUniqueEmail(),
    password: registerPage._generateRandomPassword()
  });
  await registerPage.clickOnRegister();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});