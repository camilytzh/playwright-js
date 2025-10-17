const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');

test('successful register with valid data', async ({ page })=> {
  const registerPage = new RegisterPage(page);
  
  await registerPage.open();
  await registerPage.fillRegisterForm({
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '2000-10-05',
    street: '15th Avenue',
    postalCode: '2020',
    city: 'Bensalem',
    state: 'Pennsylvania',
    country: 'US',
    phone: '0928586950',
    password: 'BreakingBad01!'
  });
  await registerPage.clickOnRegister();
  
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
});