import React from "react";
import { GlobalStyle, ThemeProvider } from "@react95/core";
import IconBox from "./iconBox";
import IconText from "./iconText";
import "./styles.scss";
import { Awfxcg321303, Explorer103, CdMusic, Mshtml32534, Progman32 } from "@react95/icons";

function Shortcuts({ openPortfolio, openCV, openTunes, openReader, openTranscriptions }) {
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
        <IconBox className="pointer" onClick={() => openReader()}>
          <Mshtml32534 className="pointer" variant="32x32_4" />
          <IconText className="pointer">Blog.exe</IconText>
        </IconBox>
        <IconBox className="pointer" onClick={() => openTranscriptions()}>
          <Progman32 className="pointer" variant="32x32_4" />
          <IconText className="pointer">Transcriptions</IconText>
        </IconBox>
      </ThemeProvider>
    </div>
  );
}

export default Shortcuts;
