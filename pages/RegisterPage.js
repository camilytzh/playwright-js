const { BasePage } = require("./BasePage");

class RegisterPage extends BasePage{
    constructor(page){
        super(page);
        this.path = '/auth/register';
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.dateOfBirth = page.locator('#dob');
        this.street = page.locator('#street');
        this.postalCode = page.locator('#postal_code');
        this.city = page.locator('#city');
        this.state = page.locator('#state');
        this.country = page.locator('#country');
        this.phone = page.locator('#phone');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.registerBtn = page.locator('button[type="submit"]');
        this.ageErrorMessage = page.locator('.help-block');
    }

    async open() {
    await this.navigateTo(this.path);
  }

  async fillCommonFields(){
    await this.firstName.fill('User');
    await this.lastName.fill('LastNameUser');
    await this.street.fill('15th Avenue');
    await this.postalCode.fill('2020');
    await this.city.fill('Bensalem');
    await this.state.fill('Pennsylvania');
    await this.country.selectOption('US');
    await this.phone.fill('0999999999');
  }

  async fillVariableFields({ dateOfBirth, email, password } = {}) {
    if (dateOfBirth !== undefined)
      await this.dateOfBirth.fill(dateOfBirth);

    if (email !== undefined)
      await this.email.fill(email);

    if (password !== undefined)
      await this.password.fill(password);
  }

  async clickOnRegister(){
    await this.registerBtn.click();
  }

  _generateUniqueEmail(prefix = 'user') {
  return `${prefix}_${Date.now()}@example.com`;
}

}
module.exports = { RegisterPage };