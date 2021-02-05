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

describe("givenUp is false and word not guessed", () => {
  // givenUp should be false by default
  test("Give Up button shows", () => {
    const wrapper = setup();
    const giveUpButtonComponent = findByTestAttr(
      wrapper,
      "component-give-up-button"
    );
    expect(giveUpButtonComponent.length).toBe(1);
  });
  test("secret word is not revealed", () => {
    const wrapper = setup();
    const secretWordReveal = findByTestAttr(wrapper, "component-reveal");
    expect(secretWordReveal.length).toBe(0);
  });
  test("Input component shows", () => {
    const wrapper = setup();
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.length).toBe(1);
  });
  test("New Word button does not show", () => {
    const wrapper = setup();
    const newWordButton = findByTestAttr(wrapper, "component-new-word-button");
    expect(newWordButton.text().length).toBe(0);
  });
});

describe("givenUp is true", () => {
  let wrapper;
  let giveUpButton;
  beforeEach(() => {
    wrapper = setup();
    giveUpButton = findByTestAttr(wrapper, "component-give-up-button");
    giveUpButton.simulate("click");
  });
  test("Give Up button no longer shows", () => {
    giveUpButton = findByTestAttr(wrapper, "component-give-up-button");
    expect(giveUpButton.length).toBe(0);
  });
  test("secret word is revealed", () => {
    const secretWordRevealComponent = findByTestAttr(
      wrapper,
      "component-reveal"
    );
    expect(secretWordRevealComponent.length).toBe(1);
  });
  test("Input component no longer shows", () => {
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.length).toBe(0);
  });
  test("New Word button shows", () => {
    const newWordButtonComponent = findByTestAttr(
      wrapper,
      "component-new-word-button"
    );
    expect(newWordButtonComponent.text().length).not.toBe(0);
  });
  test("Congrats does not show", () => {
    const congratsComponent = findByTestAttr(wrapper, "component-congrats");
    expect(congratsComponent.length).toBe(0);
  });
});
