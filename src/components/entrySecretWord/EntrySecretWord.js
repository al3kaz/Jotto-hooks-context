import React from "react";
import PropTypes from "prop-types";

import languageContext from "../../contexts/languageContext";
import stringsModule from "../../helpers/strings";

function EntrySecretWord({ setEnterSecretWord, setSecretWord, giveUp }) {
  const [entryWord, setEntryWord] = React.useState("");
  const language = React.useContext(languageContext);

  return (
    <div data-test="component-entry-secret-word">
      <form>
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          value={entryWord}
          onChange={(e) => {
            setEntryWord(e.target.value.toLowerCase());
          }}
        />
        <button
          data-test="submit-button"
          type="submit"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            if (!entryWord) return alert("put secret word");
            setSecretWord(entryWord);
            setEnterSecretWord(false);
            setEntryWord("");
            giveUp(false);
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
}

EntrySecretWord.propTypes = {
  giveUp: PropTypes.func.isRequired,
  setEnterSecretWord: PropTypes.func.isRequired,
  setSecretWord: PropTypes.func.isRequired,
};

export default EntrySecretWord;
