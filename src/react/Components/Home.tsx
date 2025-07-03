import { useState } from "react";
import { useGetwincrrWidth } from "../Hooks/useGetwincrrWidth";
import Search from "./UI/Search";
import React from "react";
import StickyNotesBoard from "./UI/StickyNotesBoard";

const Home = () => {
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  const { width } = useGetwincrrWidth();
  const [searchqury, setSearchQuery] = useState<string>("");

  return (
    <div>
      <div className="home">
        <h1>welcome</h1>

        <Search setSearchQuery={setSearchQuery} />

        {/* add the option for menu expad and colaps  */}

        {/* {searchqury && (/ */}
        <div className="iframe">
          <iframe
            width={width - 50}
            height="400"
            src={searchqury} //"https://www.youtube-nocookie.com/embed/P4yw6V8FLNY?playlist=P4yw6V8FLNY&autoplay=1&iv_load_policy=3&loop=1&start="
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* )} */}

        <StickyNotesBoard />
      </div>
    </div>
  );
};

export default Home;
