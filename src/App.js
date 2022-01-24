import { useEffect } from "react";
import Mic from "./microphone.svg";
import useVoice from "./useVoice";
import useBookFetch from "./useBookFetch";

function App() {
  const { text, isListening, listen, voiceSupported } = useVoice();
  const { authorBooks, isFetchingBooks, fetchBooksByAuthor } = useBookFetch();

  useEffect(() => {
    if (text !== "") {
      fetchBooksByAuthor(text);
    }
  }, [text, fetchBooksByAuthor]);

  if (!voiceSupported) {
    return (
      <div className="app">
        <h1>
          Voice recognition is not supported by your browser, please retry with
          a supported browser e.g. Chrome
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="app">
        <h2>Book Voice Search</h2>
        <h3>Click the Mic and say an author's name</h3>
        <div>
          <img
            className={`microphone ${isListening && "isListening"}`}
            src={Mic}
            alt="microphone"
            onClick={listen}
          />
        </div>
        <p>{text}</p>
        {isFetchingBooks ? (
          "fetching books...."
        ) : (
          <ul>
            {authorBooks.map((book, index) => {
              return (
                <li key={index}>
                  <span>{book.title}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="icon-reg">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/dave-gandy"
          title="Dave Gandy"
        >
          Dave Gandy
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}

export default App;
