import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

const setup = (secretWord) => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);

  React.useReducer = mockUseReducer;
  return mount(<App />);
};

test("App render without error", () => {
  const wrapper = setup("party");
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test("secretWord does not update on App update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.update();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });
  test("render app when secretWord is not null", () => {
    const AppComponent = findByTestAttr(wrapper, "component-app");
    expect(AppComponent.exists()).toBe(true);
  });
  test("does not render spinner when secretWord is not null", () => {
    const SpinnerComponent = findByTestAttr(wrapper, "component-spinner");
    expect(SpinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test("does not render app when secretWord is 'null'", () => {
    const AppComponent = findByTestAttr(wrapper, "component-app");
    expect(AppComponent.exists()).toBe(false);
  });
  test("render spinner when secretWord is null'", () => {
    const SpinnerComponent = findByTestAttr(wrapper, "component-spinner");
    expect(SpinnerComponent.exists()).toBe(true);
  });
});
