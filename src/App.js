import React from "react";
import hookActions from "./actions/hookActions";
import languageContext from "./contexts/languageContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import successContext from "./contexts/successContext";

import Input from "./components/input/Input";
import LanguagePicker from "./components/languagePicker/languagePicker";
import Congrats from "./components/congrats/Congrats";
import GuessedWords from "./components/guessedWords/GuessedWords";
import NewWordButton from "./components/newWordButton/NewWordButton";
import GiveUpButton from "./components/giveUpButton/GiveUpButton";
import SecretWordReveal from "./components/secretWordReveal/SecretWordReveal";

import "./App.css";
import EnterSecretWordButton from "./components/enterSecretWordButton/EnterSecretWordButton";
import EntrySecretWord from "./components/entrySecretWord/EntrySecretWord";

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    case "setGiveUp":
      return { ...state, giveUp: action.payload };
    case "setEnterSecretWord":
      return { ...state, enterSecretWord: action.payload };
    default:
      throw new Error(`invalid aciotn type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
  });

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  const setLanguage = (language) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  const setGiveUp = (giveUp) => {
    dispatch({ type: "setGiveUp", payload: giveUp });
  };

  const setEnterSecretWord = (enterSecretWord) => {
    dispatch({ type: "setEnterSecretWord", payload: enterSecretWord });
  };

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);
  if (!state.secretWord) {
    return (
      <div className="container" data-test="component-spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <p>{state.secretWord}</p>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          {state.enterSecretWord ? (
            <EntrySecretWord
              giveUp={setGiveUp}
              setEnterSecretWord={setEnterSecretWord}
              setSecretWord={setSecretWord}
            />
          ) : (
            <div>
              <successContext.SuccessProvider>
                {state.giveUp ? (
                  <SecretWordReveal secretWord={state.secretWord} />
                ) : (
                  <Congrats />
                )}
                <NewWordButton
                  setSecretWord={setSecretWord}
                  setGiveUp={setGiveUp}
                />
                <Input secretWord={state.secretWord} />
                {!state.giveUp ? <GiveUpButton setGiveUp={setGiveUp} /> : ""}
              </successContext.SuccessProvider>
              <GuessedWords />
              <EnterSecretWordButton setEnterSecretWord={setEnterSecretWord} />
            </div>
          )}
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
