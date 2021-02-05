import React from "react";
import { mount } from "enzyme";

import App from "../App";
import { findByTestAttr } from "../../test/testUtils";
import hookActions from "../actions/hookActions";

const setup = () => {
  hookActions.getSecretWord = jest.fn((setSecretWord) =>
    setSecretWord("party")
  );
  return mount(<App />);
};

describe("zero guessed words and Enter Secret Word not clicked", () => {
  test("Enter Secret Word button shows", () => {
    const wrapper = setup();
    const enterSecretWordButton = findByTestAttr(
      wrapper,
      "component-enter-secret-word-button"
    );
    expect(enterSecretWordButton.length).toBe(1);
  });
  test("Secret word entry does not show", () => {});
});

describe("enterSecretWord is true", () => {
  let wrapper;
  let enterSecretWordButton;
  beforeEach(() => {
    wrapper = setup();
    enterSecretWordButton = findByTestAttr(
      wrapper,
      "component-enter-secret-word-button"
    );
    enterSecretWordButton.simulate("click");
  });
  test("Secret word entry shows", () => {
    const entrySecretWord = findByTestAttr(
      wrapper,
      "component-entry-secret-word"
    );
    expect(entrySecretWord.length).toBe(1);
  });
  test("no other components show", () => {
    expect(wrapper.children.length).toBe(1);
  });
});
