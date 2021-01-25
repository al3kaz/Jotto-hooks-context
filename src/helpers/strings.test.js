import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  droidSpeak: {},
};

describe("language string testing", () => {
  const mockWarn = jest.fn();
  let originalWarn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  test("returns correct submit string for english", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns correct submit string for emoji", () => {
    const string = getStringByLanguage("emoji", "submit", strings);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns english submit string when language does not exist", () => {
    const string = getStringByLanguage("notAlanguage", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [notAlanguage]"
    );
  });
  test("returns english submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage("droidSpeak", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [droidSpeak]"
    );
  });
});
