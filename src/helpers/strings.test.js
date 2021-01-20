import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  droidSpeak: {},
};

test("returns correct submit string for english", () => {
  const string = getStringByLanguage("en", "submit", strings);
  expect(string).toBe("submit");
});
test("returns correct submit string for emoji", () => {
  const string = getStringByLanguage("emoji", "submit", strings);
  expect(string).toBe("🚀");
});
test("returns english submit string when language does not exist", () => {
  const string = getStringByLanguage("notAlanguage ", "submit", strings);
  expect(string).toBe("submit");
});
test("returns english submit string when submit key does not exist for language", () => {
  const string = getStringByLanguage("droidSpeak ", "submit", strings);
  expect(string).toBe("submit");
});
