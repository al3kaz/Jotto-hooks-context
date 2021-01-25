import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";

import GiveUpButton from "./GiveUpButton";

const setup = () => {
  return mount(<GiveUpButton />);
};

describe("render", () => {
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-give-up-button");
    expect(component.length).toBe(1);
  });
});
test("does not throw warning with expected props", () => {
  const expectedProps = { setGiveUp: function () {} };
  checkProps(GiveUpButton, expectedProps);
});

test('calls setGivenUp with the argument "true" on click', () => {});

describe("languagePicker", () => {
  test("correctly renders button text string in english", () => {});
  test("correctly renders button text string in emoji", () => {});
});
