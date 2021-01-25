import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import NewWordButton from "./NewWordButton";

import hookActions from "../../actions/hookActions";

import successContext from "../../contexts/successContext";
import guessedWordsContext from "../../contexts/guessedWordsContext";
import languageContext from "../../contexts/languageContext";

const mockSetSuccess = jest.fn();

const setup = ({ success, language, setSecretWord }) => {
  success = success || false;
  language = language || "en";

  return mount(
    <languageContext.Provider value={language}>
      <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider value={[success, mockSetSuccess]}>
          <NewWordButton setSecretWord={setSecretWord} />
        </successContext.SuccessProvider>
      </guessedWordsContext.GuessedWordsProvider>
    </languageContext.Provider>
  );
};

describe("render", () => {
  test("renders without error", () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.exists()).toBe(true);
  });
  test("renders no text when `success` context is false", () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.text().length).toBe(0);
  });
  test("renders non-empty text when `success` context is true", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.text().length).not.toBe(0);
  });
});
test("does not throw warning with expected props", () => {
  const expectedProps = { setSecretWord: function () {} };
  checkProps(NewWordButton, expectedProps);
});

describe("actions on click", () => {
  const mockGetSecretWord = jest.fn();

  beforeEach(() => {
    hookActions.getSecretWord = mockGetSecretWord;

    const wrapper = setup({ success: true, setSecretWord: jest.fn() });
    const component = findByTestAttr(wrapper, "component-new-word-button");
    component.simulate("click");
  });
  test("calls getSecretWord on click", () => {
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test("resets success to false on click", () => {
    expect(mockSetSuccess).toHaveBeenCalledWith(false);
  });
  // test("resets givenUp to false on click", () => {});
});

describe("languagePicker", () => {
  test("correctly renders button text string in english", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.text()).toBe("New Word");
  });
  test("correctly renders button text string in emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    const component = findByTestAttr(wrapper, "component-new-word-button");
    expect(component.text()).toBe("✨🔤");
  });
});
