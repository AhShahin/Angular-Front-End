import { JMIRTestPage } from './app.po';

describe('jmir-test App', () => {
  let page: JMIRTestPage;

  beforeEach(() => {
    page = new JMIRTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
