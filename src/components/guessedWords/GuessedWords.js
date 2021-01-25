import React from "react";
import languageContext from "../../contexts/languageContext";
import stringsModule from "../../helpers/strings";
import guessedWordsContext from "../../contexts/guessedWordsContext";

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const laguange = React.useContext(languageContext);

  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(laguange, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(laguange, "guessedWords")}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringsModule.getStringByLanguage(
                  laguange,
                  "guessColumnHeader"
                )}
              </th>
              <th>
                {stringsModule.getStringByLanguage(
                  laguange,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
        <div>
          {stringsModule.getStringByLanguage(laguange, "totalCount")}:
          {guessedWordsRows.length}
        </div>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
};

export default GuessedWords;
