import React from "react";
import PropTypes from "prop-types";

import guessedWordsContext from "../../contexts/guessedWordsContext";
import languageContext from "../../contexts/languageContext";
import stringsModule from "../../helpers/strings";

function EnterSecretWordButton({ setEnterSecretWord }) {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);

  if (guessedWords.length > 0) {
    return <div data-test="component-enter-secret-word-button" />;
  } else {
    return (
      <button
        data-test="component-enter-secret-word-button"
        className="btn btn-primary mb-2"
        onClick={() => setEnterSecretWord(true)}
      >
        {stringsModule.getStringByLanguage(language, "enterSecretWord")}
      </button>
    );
  }
}

EnterSecretWordButton.propTypes = {
  setEnterSecretWord: PropTypes.func.isRequired,
};

export default EnterSecretWordButton;
