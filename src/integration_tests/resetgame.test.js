import React from "react";
import { mount } from "enzyme";
import hookActions from "../actions/hookActions";

import App from "../App";
import { findByTestAttr } from "../../test/testUtils";

const setup = () => {
  hookActions.getSecretWord = jest.fn((setSecretWord) =>
    setSecretWord("party")
  );
  return mount(<App />);
};

describe("after New Word button is clicked", () => {
  let wrapper;
  let newWordButton;
  let inputBox;
  beforeEach(() => {
    wrapper = setup();
    inputBox = findByTestAttr(wrapper, "input-box");
    const submitButton = findByTestAttr(wrapper, "submit-button");

    // guess the word to display the New Word button
    const mockEvent = { target: { value: "party" } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");

    // find and click the New Word button
    newWordButton = findByTestAttr(wrapper, "component-new-word-button");
    newWordButton.simulate("click");
  });
  test("New Word Button button no longer shows", () => {
    newWordButton = findByTestAttr(wrapper, "component-new-word-button");
    expect(newWordButton.text()).toBe("");
  });
  test("Congrats component no longer shows", () => {
    const congratsComponent = findByTestAttr(wrapper, "component-congrats");
    expect(congratsComponent.text().length).toBe(0);
  });
  test("Input component shows", () => {
    inputBox = findByTestAttr(wrapper, "component-input");
    expect(inputBox.length).toBe(1);
  });
});
