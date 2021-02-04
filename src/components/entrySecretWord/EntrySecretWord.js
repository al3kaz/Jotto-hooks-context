import React from "react";
import PropTypes from "prop-types";

function EntrySecretWord({ setEnterSecretWord, setSecretWord }) {
  const [entryWord, setEntryWord] = React.useState("");
  return (
    <div data-test="component-entry-secret-word">
      <form>
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          value={entryWord}
          onChange={(e) => {
            setEntryWord(e.target.value);
          }}
        />
        <button
          data-test="submit-button"
          type="submit"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            setEnterSecretWord(false);
            setSecretWord(entryWord);
            setEntryWord("");
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}

EntrySecretWord.propTypes = {
  setEnterSecretWord: PropTypes.func.isRequired,
  setSecretWord: PropTypes.func.isRequired,
};

export default EntrySecretWord;
