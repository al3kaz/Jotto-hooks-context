import React from "react";
import languageContext from "../../contexts/languageContext";
import stringsModule from "../../helpers/strings";
import successContext from "../../contexts/successContext";

const Congrats = () => {
  const [success] = successContext.useSuccess();
  const language = React.useContext(languageContext);

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;
