const languageStrings = {
  pl: {
    congrats: "Gratulacje! Zgadłeś słowo",
    submit: "Potwierdź",
    guessPrompt: "Spróbuj odgadnąć tajne słowo!",
    guessInputPlaceholder: "zgadnij",
    guessColumnHeader: "Słowa, które próbowałeś",
    guessedWords: "Domysły",
    matchingLettersColumnHeader: "Pasujące litery",
    newWord: "Nowe słowo",
    totalCount: "Liczba prób",
    giveUp: "Poddaje się",
    secretWordWas: "Szukanym słowem było",
    betterLuck: "Następnym razem Ci się uda!",
    enterSecretWord: "Dodaj swoje tajne słowo",
    serverError: "Problem z serwerem. Spróbuj później",
  },
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters",
    newWord: "New Word",
    totalCount: "Total Guesses ",
    giveUp: "Give Up",
    secretWordWas: "The secret word was",
    betterLuck: "Better luck next time!",
    enterSecretWord: "Enter your own secret word",
    serverError:
      "There was an error retrieving the secret word. Please try again later.",
  },
  emoji: {
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "⌨️🤔",
    guessedWords: "🤷‍🔤",
    guessColumnHeader: "🤷‍",
    matchingLettersColumnHeader: "✅",
    newWord: "✨🔤",
    totalCount: "🧮",
    giveUp: "😩",
    secretWordWas: "🤫🔤",
    betterLuck: "🍀✨🔤",
    enterSecretWord: "👩‍💻🤫🔤",
    serverError: "🚨. ⏲.",
  },
};

function getStringByLanguage(
  languageCode,
  stringKey,
  strings = languageStrings
) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
    return strings.en[stringKey];
  }
  return strings[languageCode][stringKey];
}

export default { getStringByLanguage };
