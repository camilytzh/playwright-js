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
    }

    async open() {
    await this.navigateTo(this.path);
  }

  async fillRegisterForm({firstName, lastName, dateOfBirth, street, postalCode, city, state, country, phone, email, password}){
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.dateOfBirth.fill(dateOfBirth);
    await this.street.fill(street);
    await this.postalCode.fill(postalCode);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.country.selectOption(country);
    await this.phone.fill(phone);
    await this.email.fill(this._generateUniqueEmail('test_user'));
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