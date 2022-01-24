import { useState, useCallback } from "react";

const useBookFetch = () => {
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isFetchingBooks, setIsFetchingBooks] = useState(false);

  const fetchBooksByAuthor = useCallback((author) => {
    setIsFetchingBooks(true);
    fetch(`https://openlibrary.org/search.json?author=${author}`)
      .then((res) => res.json())
      .then((res) => {
        setAuthorBooks(
          res.docs.map((book) => {
            return {
              title: book.title,
            };
          })
        );
        setIsFetchingBooks(false);
      });
  }, []);

  return {
    authorBooks,
    fetchBooksByAuthor,
    isFetchingBooks,
  };
};

export default useBookFetch;
