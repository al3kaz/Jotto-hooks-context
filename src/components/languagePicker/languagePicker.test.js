import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import LanguagePicker from "./languagePicker";

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("render without errors", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-language-picker");
  expect(component.exists()).toBe(true);
});
test("does not throw warning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});
test("render non-zero language icons", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icons");
  expect(languageIcons.length).toBeGreaterThan(0);
});
test("calls setLanguage props upon click", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icons");

  const firstIcon = languageIcons.first();
  firstIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
