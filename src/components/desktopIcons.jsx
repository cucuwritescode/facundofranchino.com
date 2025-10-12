import React from "react";
import { GlobalStyle, ThemeProvider } from "@react95/core";
import IconBox from "./iconBox";
import IconText from "./iconText";
import "./styles.scss";
import { Awfxcg321303, Explorer103, CdMusic, Mshtml32534, Progman8 } from "@react95/icons";

function Shortcuts({ openPortfolio, openCV, openTunes, openBlog, openTranscriptions }) {
  return (
    <div>
      <ThemeProvider>
        <GlobalStyle></GlobalStyle>
        <IconBox className="pointer" onClick={() => openPortfolio()}>
          <Explorer103 className="pointer" variant="32x32_4" />
          <IconText className="pointer">Portfolio.txt</IconText>
        </IconBox>
        <IconBox className="pointer" onClick={() => openCV()}>
          <Awfxcg321303 className="pointer" variant="32x32_4" />
          <IconText className="pointer">CV.txt</IconText>
        </IconBox>
        <IconBox className="pointer" onClick={() => openTunes()}>
          <CdMusic className="pointer" variant="32x32_4" />
          <IconText className="pointer">Tunes</IconText>
        </IconBox>
        <IconBox className="pointer" onClick={() => openBlog()}>
          <Mshtml32534 className="pointer" variant="32x32_4" />
          <IconText className="pointer">Blog.exe</IconText>
        </IconBox>
        <IconBox className="pointer" onClick={() => openTranscriptions()}>
          <Progman8 className="pointer" variant="32x32_4" />
          <IconText className="pointer">Transcriptions</IconText>
        </IconBox>
      </ThemeProvider>
    </div>
  );
}

export default Shortcuts;
