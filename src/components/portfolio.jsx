import React from "react";
import { List } from "@react95/core";
import { Explorer103 } from "@react95/icons";
import * as S from "./layoutStyling";

function Portfolio({ closePortfolio, isMobile }) {
  return (
    <S.layoutMain
      isMobile={isMobile}
      title={"Portfolio.txt"}
      closeModal={closePortfolio}
      height="100%"
      icon={<Explorer103 variant="32x32_4" />}
      menu={[
        {
          name: "Options",
          list: (
            <List>
              <List.Item onClick={closePortfolio}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <S.layoutMainContent bg="white" boxShadow="in">
        <S.textModal>
          <h1>Portfolio</h1>
          <p>
            A selection of recent work in computer science, electronics, signal processing, and musical audio.
          </p>
          <hr />
          
          <h2>faust2clap</h2>
          <h3>Google (GSoC) - GRAME</h3>
          <p>
            Developed an officially supported Faust compiler backend for the CLAP (CLever Audio Plugin) standard, 
            merged into Faust's latest release (2.81.8) under the supervision of Jatin Chowdhury (MIT) and Stéphane Letz (GRAME/INRIA).
          </p>
          <p>
            Designed and implemented the faust2clap compiler tool, generating CLAP-compliant real-time plugin binaries 
            and enabling dynamic hot-reloading of DSP code directly in DAWs.
          </p>
          <p>
            Investigated real-time audio challenges including polyphonic voice management, parameter mapping architectures, 
            and event-driven modulation frameworks across macOS, Windows, and Linux.
          </p>
          <hr />
          
          <h2>amadeus</h2>
          <h3>Individual Project</h3>
          <p>
            Real-time multiple F0 (polyphonic pitch) estimation on iOS, individual project.
            First implementation of a computationally efficient and real-time Swift version of the Constant Q Transform algorithm.
          </p>
          <hr />
          
          <h2>Real-time methods for Reverberation and Restoration Algorithms in Audio Signal Processing</h2>
          <h3>BEng Thesis</h3>
          <p>
            Design and implementation of reverberation algorithms, with particular attention to approaches such as 
            velvet-noise-based structures and feedback delay networks. 
            Investigating restoration techniques, such as denoising and audio degradation modelling, to examine both 
            undesired and deliberately aesthetic forms of signal alteration.
          </p>
          <hr />
          
          <h2>Pure Harmony</h2>
          <p>
            Chosen best of my cohort and was presented to the IET in April 2025. Led team, conceptualised, 
            designed, and implemented the entire project, from initial idea to functional prototype.
          </p>
          <p>
            Developed a custom low-level MIDI driver and harmonisation algorithm based on Arvo Pärt's 'Tintinnabuli' 
            composition system, for the STM32F4 microcontroller. This enabled real-time polyphonic processing with 
            efficient buffer management.
          </p>
          <p>
            Engineered the full software and DSP pipeline, including a custom reverb algorithm and dynamic filtering, 
            while also handling firmware integration and user interface design.
          </p>

        </S.textModal>
      </S.layoutMainContent>
    </S.layoutMain>
  );
}

export default Portfolio;