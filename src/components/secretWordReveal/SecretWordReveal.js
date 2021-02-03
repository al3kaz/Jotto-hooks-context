import React from "react";
import languageContext from "../../contexts/languageContext";
import stringsModule from "../../helpers/strings";
import PropsType from "prop-types";

function SecretWordReveal({ secretWord }) {
  const language = React.useContext(languageContext);
  return (
    <div data-test="component-reveal" className="alert alert-danger">
      <p>
        {stringsModule.getStringByLanguage(language, "secretWordWas")} "
        {secretWord}"
      </p>
      <p>{stringsModule.getStringByLanguage(language, "betterLuck")}</p>
    </div>
  );
}

SecretWordReveal.propTypes = {
  secretWord: PropsType.string.isRequired,
};

export default SecretWordReveal;
