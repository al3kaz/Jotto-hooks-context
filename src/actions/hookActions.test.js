import moxios from "moxios";
import hookActions from "./hookActions";

describe("moxios tests", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("calls the getSecretWord callback on axios response", async () => {
    const secretWord = "party";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    const mockSetSecretWord = jest.fn();

    await hookActions.getSecretWord(mockSetSecretWord);
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
