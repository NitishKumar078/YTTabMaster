import { useState } from "react";
import { useGetwincrrWidth } from "../Hooks/useGetwincrrWidth";
import Search from "../Components/UI/Search";

export default function Youtube() {
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  const { width } = useGetwincrrWidth();
  const [searchqury, setSearchQuery] = useState<string>("");

  return (
    <div>
      <Search setSearchQuery={setSearchQuery} />

      {/* {searchqury && (/ */}
      <div
        className="iframe"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {searchqury ? (
          <iframe
            style={{ padding: "10px", marginTop: "10px" }}
            width={width - 70}
            height="400"
            src={searchqury}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src="https://art.pixilart.com/dde6db71a9ddc50.gif"
            alt="YouTube placeholder"
            width={width - 70}
            height="400"
            style={{ objectFit: "contain", marginTop: "10px" }}
          />
        )}
      </div>
    </div>
  );
}
