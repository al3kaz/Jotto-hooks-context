import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";

import languageContext from "../../contexts/languageContext";
import EnterSecretWordButton from "./EnterSecretWordButton";
import guessedWordsContext from "../../contexts/guessedWordsContext";

const mockSetEnterSecretWord = jest.fn();

const setup = ({ language }) => {
  language = language || "en";
  return mount(
    <guessedWordsContext.GuessedWordsProvider>
      <languageContext.Provider value={language}>
        <EnterSecretWordButton setEnterSecretWord={mockSetEnterSecretWord} />
      </languageContext.Provider>
    </guessedWordsContext.GuessedWordsProvider>
  );
};

describe("render", () => {
  test("renders without error", () => {
    const wrapper = setup({});
    const component = findByTestAttr(
      wrapper,
      "component-enter-secret-word-button"
    );
    expect(component.length).toBe(1);
  });
});

test("does not throw warning with expected props", () => {
  const expectedProps = { setEnterSecretWord: function () {} };
  checkProps(EnterSecretWordButton, expectedProps);
});

test(`calls setEnterSecretWord with the argument "true" on click`, () => {
  const wrapper = setup({});
  const component = findByTestAttr(
    wrapper,
    "component-enter-secret-word-button"
  );
  component.simulate("click");
  expect(mockSetEnterSecretWord).toHaveBeenCalledWith(true);
});

describe("languagePicker", () => {
  test("correctly renders button text string in english", () => {
    const wrapper = setup({ language: "en" });
    const component = findByTestAttr(
      wrapper,
      "component-enter-secret-word-button"
    );
    expect(component.text()).toBe("Enter your own secret word");
  });
  test("correctly renders button text string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const component = findByTestAttr(
      wrapper,
      "component-enter-secret-word-button"
    );
    expect(component.text()).toBe("👩‍💻🤫🔤");
  });
});
