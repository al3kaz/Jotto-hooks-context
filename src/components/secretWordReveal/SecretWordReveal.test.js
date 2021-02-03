import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";

import SecretWordReveal from "./SecretWordReveal";
import languageContext from "../../contexts/languageContext";

const setup = ({ language, secretWord }) => {
  language = language || "en";
  secretWord = secretWord || "party";

  return mount(
    <languageContext.Provider value={language}>
      <SecretWordReveal secretWord={secretWord} />
    </languageContext.Provider>
  );
};

test("renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-reveal");
  expect(component.length).toBe(1);
});

test("secret word is included in text", () => {
  const wrapper = setup({ secretWord: "party" });
  const component = findByTestAttr(wrapper, "component-reveal");
  expect(component.text()).toContain("party");
});

test("does not throw warning with expected props", () => {
  const expectedProps = { secretWord: "party" };
  checkProps(SecretWordReveal, expectedProps);
});

describe("languagePicker", () => {
  test("correctly renders `better luck` string in english", () => {
    const wrapper = setup({ secretWord: "party" });
    const component = findByTestAttr(wrapper, "component-reveal");
    expect(component.text()).toContain("Better luck next time!");
  });
  test("correctly renders `better luck` string in emoji", () => {
    const wrapper = setup({ setGiveUp: true, language: "emoji" });
    const component = findByTestAttr(wrapper, "component-reveal");
    expect(component.text()).toContain("🍀✨🔤");
  });
});
