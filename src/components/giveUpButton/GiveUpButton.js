import React from "react";
import PropsType from "prop-types";

import languageContext from "../../contexts/languageContext";
import successContext from "../../contexts/successContext";
import stringsModule from "../../helpers/strings";

const GiveUpButton = ({ setGiveUp }) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();

  if (success) {
    return <div data-test="component-give-up-button" />;
  }
  return (
    <button
      data-test="component-give-up-button"
      className="btn btn-danger mb-2"
      onClick={() => {
        setGiveUp(true);
        setSuccess(true);
      }}
    >
      {stringsModule.getStringByLanguage(language, "giveUp")}
    </button>
  );
};

GiveUpButton.propTypes = {
  setGiveUp: PropsType.func.isRequired,
};

export default GiveUpButton;
