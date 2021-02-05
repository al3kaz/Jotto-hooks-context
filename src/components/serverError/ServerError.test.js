import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import ServerError from "./ServerError";
import languageContext from "../../contexts/languageContext";

const setup = ({ language }) => {
  language = language || "en";

  return mount(
    <languageContext.Provider value={language}>
      <ServerError />
    </languageContext.Provider>
  );
};

test("renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-server-error");
  expect(component.length).toBe(1);
});

describe("languagePicker", () => {
  test("correctly renders `better luck` string in english", () => {
    const wrapper = setup({ language: "en" });
    const component = findByTestAttr(wrapper, "component-server-error");
    expect(component.text()).toBe(
      "There was an error retrieving the secret word. Please try again later."
    );
  });
  test("correctly renders `better luck` string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const component = findByTestAttr(wrapper, "component-server-error");
    expect(component.text()).toBe("🚨. ⏲.");
  });
  test("correctly renders `better luck` string in pl", () => {
    const wrapper = setup({ language: "pl" });
    const component = findByTestAttr(wrapper, "component-server-error");
    expect(component.text()).toBe("Problem z serwerem. Spróbuj później");
  });
});
