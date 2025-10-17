const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');

test('successful register with valid data', async ({ page })=> {
  const registerPage = new RegisterPage(page);
  
  await registerPage.open();
  await registerPage.fillCommonFields();
  await registerPage.fillVariableFields({
    dateOfBirth: '2000-10-05',
    email: registerPage._generateUniqueEmail(),
    password: 'StrongPassword01!'
  });
  await registerPage.clickOnRegister();
  
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});