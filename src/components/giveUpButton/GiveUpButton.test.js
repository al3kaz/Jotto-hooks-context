import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";

import GiveUpButton from "./GiveUpButton";
import languageContext from "../../contexts/languageContext";
import successContext from "../../contexts/successContext";

const mockSetGiveUp = jest.fn();

const setup = ({ language }) => {
  language = language || "en";
  return mount(
    <successContext.SuccessProvider>
      <languageContext.Provider value={language}>
        <GiveUpButton setGiveUp={mockSetGiveUp} />
      </languageContext.Provider>
    </successContext.SuccessProvider>
  );
};

describe("render", () => {
  test("renders without error", () => {
    const wrapper = setup({ setGiveUp: jest.fn() });
    const component = findByTestAttr(wrapper, "component-give-up-button");
    expect(component.length).toBe(1);
  });
});

test("does not throw warning with expected props", () => {
  const expectedProps = { setGiveUp: function () {} };
  checkProps(GiveUpButton, expectedProps);
});

test('calls setGiveUp with the argument "true" on click', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-give-up-button");
  component.simulate("click");
  expect(mockSetGiveUp).toHaveBeenCalledWith(true);
});

describe("languagePicker", () => {
  test("correctly renders button text string in english", () => {
    const wrapper = setup({ setGiveUp: true });
    const component = findByTestAttr(wrapper, "component-give-up-button");
    expect(component.text()).toBe("Give Up");
  });
  test("correctly renders button text string in emoji", () => {
    const wrapper = setup({ setGiveUp: true, language: "emoji" });
    const component = findByTestAttr(wrapper, "component-give-up-button");
    expect(component.text()).toBe("😩");
  });
  test("correctly renders button text string in pl", () => {
    const wrapper = setup({ setGiveUp: true, language: "pl" });
    const component = findByTestAttr(wrapper, "component-give-up-button");
    expect(component.text()).toBe("Poddaje się");
  });
});
