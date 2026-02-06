import { BasePage } from "./BasePage";

class HomePage extends BasePage{
    constructor(page){
        super(page);
        this.path = '/';
    }
    async open() {
    await this.navigateTo(this.path);
  }
}
export { HomePage };