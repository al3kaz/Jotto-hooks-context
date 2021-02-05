import axios from "axios";

const getSecretWord = async (setSecretWord, setServerError) => {
  try {
    const response = await axios.get("http://localhost:3030");
    setSecretWord(response.data);
  } catch {
    setServerError(true);
  }
};

export default { getSecretWord };
