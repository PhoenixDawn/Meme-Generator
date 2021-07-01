import React, { useState, useEffect } from "react";
import Meme from "./Meme";

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
  const [templates, setTemplates] = useState([]);
  const [meme, setMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [finMeme, setFinMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data.memes.filter((meme) => meme.box_count <= 2)));
  }, []);

  const backToStart = () => {
    setMeme(null);
    setTopText("");
    setBottomText("");
    setFinMeme(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Show meme they made */}
      {finMeme && (
        <>
          <button
            onClick={() => {
              setFinMeme(null);
            }}
          >
            Back to start
          </button>{" "}
          <button onClick={backToStart}>Back to start</button>
          <img src={finMeme} alt={meme.name}></img>)
        </>
      )}
      {/*Show Meme Editor*/}
      {meme && !finMeme && (
        <>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const params = {
                template_id: meme.id,
                text0: topText,
                text1: bottomText,
                username: "phoenixdawn123", //process.env.REACT_APP_USERNAME,
                password: "LoL1535!", //process.env.REACT_APP_PASSWORD,
              };
              const res = await fetch(
                `https://api.imgflip.com/caption_image${objectToQueryParam(
                  params
                )}`,
                { method: "POST" }
              );
              const data = await res.json();
              setFinMeme(data.data.url);
            }}
          >
            <Meme stylePass={{width: 350}} template={meme} />

            <input
              type="text"
              placeholder="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={backToStart}>Back to start</button>
        </>
      )}
      {/*Show All Meme*/}
      {!meme && (
        <>
          <h1>Pick a Template</h1>
          {templates.map((template) => (
            <Meme stylePass={{cursor: "pointer", width: 200}} template={template} onClick={() => setMeme(template)} />
          ))}
        </>
      )}
      ;
    </div>
  );
}

export default App;
