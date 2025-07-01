import "./Search.css";
import React, { useRef } from "react";

const Search = ({
  setSearchQuery,
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const searchInputref = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchInputref.current?.value
      .replace("youtube", "yout-ube")
      .trim();
    if (query && searchInputref.current) {
      setSearchQuery(query);
      searchInputref.current.value = "";
    }
  };

  // Add a function to check clipboard for YouTube links and set search query if found
  const handlePasteFromClipboard = async () => {
    // console.log("im here");
    const text = await navigator.clipboard.readText();
    console.log(text);
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/i;
    const match = text.match(youtubeRegex);
    if (match && searchInputref.current) {
      searchInputref.current.value = text;
      // setSearchQuery(text);
    }
  };
  // Optionally, trigger on component mount or via a button
  // Here, we add a double-click on the input to trigger paste from clipboard
  React.useEffect(() => {
    const input = searchInputref.current;
    if (!input) return;

    input.addEventListener("focusin", handlePasteFromClipboard);

    return () => {
      input.removeEventListener("focusin", handlePasteFromClipboard);
    };
  }, []);

  return (
    <div>
      <form
        className="searchform"
        style={{ display: "flex", margin: "10px", justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <input
          name="searchBar"
          ref={searchInputref}
          className="SeachQuary"
          placeholder="Paste YouTube link"
          type="search"
          autoComplete="off"
        />
        <button type="submit" id="SeachQuary">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "0.3rem" }}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
