import React from "react";
import PropTypes from "prop-types";

import successContext from "../../contexts/successContext";
import guessedWordsContext from "../../contexts/guessedWordsContext";
import hookActions from "../../actions/hookActions";
import languageContext from "../../contexts/languageContext";

import stringsModule from "../../helpers/strings";

function NewWordButton(props) {
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWord, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);

  const handleClick = () => {
    setSuccess(false);
    setGuessedWords([]);
    hookActions.getSecretWord(props.setSecretWord);
  };

  if (success) {
    return (
      <button
        data-test="component-new-word-button"
        className="btn btn-primary mb-2"
        onClick={handleClick}
      >
        {stringsModule.getStringByLanguage(language, "newWord")}
      </button>
    );
  } else {
    return <div data-test="component-new-word-button"></div>;
  }
}

NewWordButton.propType = {
  setSecretWord: PropTypes.func.isRequired,
};

export default NewWordButton;
