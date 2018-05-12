import { WolfTaskPage } from './app.po';

describe('wolf-task App', () => {
  let page: WolfTaskPage;

  beforeEach(() => {
    page = new WolfTaskPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
