const languageStrings = {
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
    reveal: "The secret word was",
    giveUp: "Give Up",
    secretWordWas: "The secret word was",
    betterLuck: "Better luck next time!",
    enterSecretWord: "Enter your own secret word",
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
    reveal: "🤫🔤",
    giveUp: "😩",
    secretWordWas: "🤫🔤",
    betterLuck: "🍀✨🔤",
    enterSecretWord: "👩‍💻🤫🔤",
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
