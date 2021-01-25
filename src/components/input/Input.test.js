import React from "react";
import { mount } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import Input from "./Input";
import LanguageContext from "../../contexts/languageContext";
import successContext from "../../contexts/successContext";
import guessedWordsContext from "../../contexts/guessedWordsContext";

const setup = ({ secretWord, language, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;
  return mount(
    <LanguageContext.Provider value={language}>
      <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
          <Input secretWord={secretWord} />
        </successContext.SuccessProvider>
      </guessedWordsContext.GuessedWordsProvider>
    </LanguageContext.Provider>
  );
};

describe("language picker", () => {
  test("correctly renders button string in English", () => {
    const wrapper = setup({ language: "en" });
    const component = findByTestAttr(wrapper, "submit-button");
    expect(component.text()).toBe("Submit");
  });
  test("correctly renders button string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const component = findByTestAttr(wrapper, "submit-button");
    expect(component.text()).toBe("🚀");
  });
});

test("Input render without error", () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});

test("does not throw worning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  test("state update with value of input box upon change", () => {
    const mockEvent = { target: { value: "train" } };
    const inputBox = findByTestAttr(wrapper, "input-box");

    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("field is cleard upon submit button click", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

test("input component does not show when success is true", () => {
  const wrapper = setup({ secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
