import React from "react";
import PropsType from "prop-types";

const GiveUpButton = (props) => {
  return <button data-test="component-give-up-button"></button>;
};

GiveUpButton.propTypes = {
  setGiveUp: PropsType.func.isRequired,
};

export default GiveUpButton;
