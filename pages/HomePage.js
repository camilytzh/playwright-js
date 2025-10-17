const { BasePage } = require("./BasePage");

class HomePage extends BasePage{
    constructor(page){
        super(page);
        this.path = '/';
    }
    async open() {
    await this.navigateTo(this.path);
  }
}
module.exports = { HomePage };