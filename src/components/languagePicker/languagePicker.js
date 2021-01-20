import React from "react";
import PropTypes from "prop-types";

function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: "en", symbole: "us" },
    { code: "emoji", symbole: "😊" },
  ];

  const languageIcons = languages.map((lang) => (
    <span
      data-test="language-icons"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbole}
    </span>
  ));

  return <div data-test="component-language-picker">{languageIcons}</div>;
}

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default LanguagePicker;
