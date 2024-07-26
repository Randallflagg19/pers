import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../App";

const Inputs = ({
  onAdd,
}: {
  onAdd: (word: string, translation: string) => void;
}) => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const wordInputRef = useRef<HTMLInputElement>(null);

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleAddClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (word && translation) {
      await onAdd(word, translation);
      setWord("");
      setTranslation("");
      wordInputRef.current?.focus();
    } else {
      console.log("Input is empty");
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="wrapper">
          <div className="input-wrapper">
            <input
              placeholder="word"
              className="global-input word"
              type="text"
              value={word}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWord(e.target.value)
              }
              onKeyDown={handleEnterPress}
              ref={wordInputRef}
            />
            <div className="some"></div>
            <input
              placeholder="перевод"
              className="global-input translation"
              type="text"
              value={translation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTranslation(e.target.value)
              }
              onKeyDown={handleEnterPress}
            />
            <button className="add" onClick={handleAddClick}>
              add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inputs;
