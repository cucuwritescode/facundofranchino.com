import React from "react";
import { List } from "@react95/core";
import { Awfxcg321303 } from "@react95/icons";
import * as S from "./layoutStyling";

function CV({ closeCV, isMobile }) {
  return (
    <S.layoutMain
      isMobile={isMobile}
      title={"CV.txt"}
      closeModal={closeCV}
      height="100%"
      icon={<Awfxcg321303 variant="32x32_4" />}
      menu={[
        {
          name: "Options",
          list: (
            <List>
              <List.Item onClick={closeCV}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <S.layoutMainContent bg="white" boxShadow="in">
        <S.textModal>
          <h1>Curriculum Vitae</h1>
          <h2>Contact</h2>
          <p>
            York, UK | facundo@gauchodsp.com | facundofranchino.com
          </p>
          
          <h2>Education</h2>
          <h3>University of York - BEng Electronics Engineering with Music Technology Systems</h3>
          <p>Sept 2023 – June 2026</p>
          <p>
            Predicted First Class Honours, ranked top of cohort in 2nd year. 
            Recipient of the Be Exceptional Scholarship, awarded to top international applicants.
            Highest marks in Programming and Digital Interfaces (C++), Mathematics (Signals and Systems), etc.
          </p>

          <h3>VAIA Workshop - CCRMA, Stanford University</h3>
          <p>July 2025 – August 2025</p>
          <p>
            Awarded full scholarship to attend intensive summer workshop on algorithmic reverberation.
            Supervision by Orchisama Das (Stanford/King's College) and Gloria Dal Santo (EPFL/Aalto University).
          </p>

          <h2>Experience</h2>
          
          <h3>Research Software Developer (Contract) - Google (GSoC), GRAME</h3>
          <p>April 2025 – Sept 2025</p>
          <p>
            Developed an officially supported Faust compiler backend for the CLAP standard under supervision of 
            Stéphane Letz and Jatin Chowdhury. Merged into Faust's latest release (2.81.8). 
            Designed and implemented the faust2clap compiler tool, generating CLAP-compliant 
            real-time plugin binaries and enabling dynamic hot-reloading of DSP code directly in DAWs.
          </p>

          <h3>Composer, Musician & Transcriber - Independent</h3>
          <p>Feb 2016 – Present</p>
          <p>
            Transcribed advanced jazz and orchestral arrangements. Composed and produced original music 
            for films featured in NYU, ENERC, and FAMU productions. Produced and mixed music with 
            30M+ cumulative streams across platforms.
          </p>

          <h2>Research Collaborations</h2>
          
          <h3>Artificial Audio Lab, Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU)</h3>
          <p>Sept 2025 – Present</p>
          <p>
            Researching, implementing and translating fdnToolbox algorithms into pyFDN, 
            a Python library for Feedback Delay Networks. Working with Sebastian J. Schlecht 
            and his research group in Multimedia Communications and Signal Processing.
          </p>

          <h2>Open Source Contributions</h2>
          <p>
            <strong>pybela (Imperial College), FLAMO (Aalto), Faust (GRAME), pyFDN (FAU), amads (University of Cambridge)</strong>
          </p>
          <p>
            Python as scripting language in all except Faust, although wrote all tests in Python for it 
            and the static implementation's automatic build and compile script. Bug fixing, TODOs and 
            optimisations mainly. In FLAMO differentiable DSP library, implemented several DVN algorithm 
            classes and comprehensive tests.
          </p>

          <h2>Technologies</h2>
          <p>
            <strong>Languages:</strong> C/C++, Python, Faust, MATLAB, Rust, Assembly, Swift, PureData, LaTeX, Java, Typescript
          </p>
          <p>
            <strong>Technologies:</strong> JUCE, STM32, CLion, XCode, Git, VS Code
          </p>
          
          <h2>Languages</h2>
          <ul>
            <li>Spanish</li>
            <li>English</li>
          </ul>
        </S.textModal>
      </S.layoutMainContent>
    </S.layoutMain>
  );
}

export default CV;
