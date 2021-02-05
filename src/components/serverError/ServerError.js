import React from "react";

import stringsModule from "../../helpers/strings";
import languageContext from "../../contexts/languageContext";

function ServerError() {
  const language = React.useContext(languageContext);

  return (
    <div data-test="component-server-error" className="alert alert-danger">
      {stringsModule.getStringByLanguage(language, "serverError")}
    </div>
  );
}

export default ServerError;
