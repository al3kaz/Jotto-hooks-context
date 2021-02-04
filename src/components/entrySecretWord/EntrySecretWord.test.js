import React from "react";
import { mount } from "enzyme";

import { findByTestAttr, checkProps } from "../../../test/testUtils";
import EntrySecretWord from "./EntrySecretWord";

const setup = ({ setEnterSecretWord, setSecretWord }) => {
  setEnterSecretWord = setEnterSecretWord || function () {};
  setSecretWord = setSecretWord || function () {};
  return mount(
    <EntrySecretWord
      setSecretWord={setSecretWord}
      setEnterSecretWord={setEnterSecretWord}
    />
  );
};

test("SecretWordEntry renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-entry-secret-word");
  expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  const expectedProps = {
    setEnterSecretWord: function () {},
    setSecretWord: function () {},
  };
  checkProps(EntrySecretWord, expectedProps);
});

test("state updates with value of secret word input box upon change", () => {
  const mockSetEntryWord = jest.fn();
  React.useState = jest.fn(() => ["", mockSetEntryWord]);
  const wrapper = setup({});
  const mockEvent = { target: { value: "train" } };
  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", mockEvent);
  expect(mockSetEntryWord).toHaveBeenCalledWith("train");
});

describe("submit calls the correct functions", () => {
  const mockSetEnterSecretWord = jest.fn();
  const mockSetSecretWord = jest.fn();
  const mockSetEntryWord = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetEnterSecretWord.mockClear();
    mockSetSecretWord.mockClear();
    React.useState = jest.fn(() => ["train", mockSetEntryWord]);
    wrapper = setup({
      setEnterSecretWord: mockSetEnterSecretWord,
      setSecretWord: mockSetSecretWord,
    });

    //simulate entering word into input
    const secretWordInputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } };
    secretWordInputBox.simulate("change", mockEvent);

    //simulate clicking the button
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click");
  });
  test("expect setSecretWord to be called with 'train'", () => {
    expect(mockSetSecretWord).toHaveBeenCalledWith("train");
  });
  test("expect setEnterSecretWord to be called with false", () => {
    expect(mockSetEnterSecretWord).toHaveBeenCalledWith(false);
  });
  test("expect custom secret word state to be reset to empty string", () => {
    expect(mockSetEntryWord).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  test("correctly renders submit string in english", () => {});
  test("correctly renders congrats string in emoji", () => {});
});
