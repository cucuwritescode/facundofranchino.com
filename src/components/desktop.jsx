import React, { useState, useCallback } from "react";
import GR001393 from '../GR001393.JPG';
import GR001551 from '../GR001551.JPG';
import {
  GlobalStyle,
  ThemeProvider,
  List,
  Frame,
  ProgressBar,
  TaskBar,
} from "@react95/core";
import socialMedia from "./socialMedia";
import Shortcuts from "./desktopIcons";
import * as S from "./layoutStyling";
import "./styles.scss";
import {
  Progman37,
  Mspaint,
  User,
  CdMusic,
  Progman34,
  Mail,
  Progman1,
  Progman11,
  Progman15,
  Progman36,
  Progman35,
  Progman33,
  Progman32,
  Progman31,
  Progman30,
  Progman29,
  Progman28,
  Progman27,
  Progman26,
  Progman25,
  Progman24,
  Progman23,
  Progman22,
  Progman21,
  Progman20,
  Progman19,
  Progman18,
  Progman17,
  Progman16,
  Progman14,
  Progman13,
  Progman8,
  Progman12,
  Progman10,
  Progman5,
} from "@react95/icons";
import Portfolio from "./portfolio";
import CV from "./cv";
import Tunes from "./tunes";
import Blog from "./blog";

function Desktop() {
  /* Mobile detection */
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const [items] = useState([]);

  /* About Modal */
  const [showAboutModal, setShowAboutModal] = useState(true);
  const handleOpenAboutModal = useCallback(() => {
    setShowAboutModal(true);
  }, []);
  const handleCloseAboutModal = useCallback(() => {
    setShowAboutModal(false);
  }, []);

  /* Skills Modal */
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const handleOpenSkillsModal = useCallback(() => {
    setShowSkillsModal(true);
  }, []);
  const handleCloseSkillsModal = useCallback(() => {
    setShowSkillsModal(false);
  }, []);

  /* Photo Modal */
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const handleOpenPhotoModal = useCallback(() => {
    setShowPhotoModal(true);
  }, []);
  const handleClosePhotoModal = useCallback(() => {
    setShowPhotoModal(false);
  }, []);

  /* Photography collection Modal  */
  const [showPhotographyModal, setShowPhotographyModal] = useState(false);
  const handleOpenPhotographyModal = useCallback(() => {
    setShowPhotographyModal(true);
  }, []);
  const handleClosePhotographyModal = useCallback(() => {
    setShowPhotographyModal(false);
  }, []);

  /* Album modal */
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState('');

  const openAlbum = useCallback((albumName) => {
    setCurrentAlbum(albumName);
    setShowAlbumModal(true);
  }, []);

const handleCloseAlbumModal = useCallback(() => {
  setShowAlbumModal(false);
  setCurrentAlbum('');
}, []);
  /* Vaporwave Modal 1 */
  const [showVaporwaveModal1, setShowVaporwaveModal1] = useState(false);
  const handleOpenVaporwaveModal1 = useCallback(() => {
    setShowVaporwaveModal1(true);
  }, []);
  const handleCloseVaporwaveModal1 = useCallback(() => {
    setShowVaporwaveModal1(false);
  }, []);

  /* Portfolio Shortcut */
  const closePortfolio = () => {
    togglePortfolio(false);
  };

  const openPortfolio = () => {
    togglePortfolio(true);
  };
  const [explorerOpened, togglePortfolio] = useState(false);

  /* CV Shortcut */

  const closeCV = () => {
    toggleCV(false);
  };

  const openCV = () => {
    toggleCV(true);
  };

  const [cvOpened, toggleCV] = useState(false);

  /* Tunes Shortcut */

  const closeTunes = () => {
    toggleTunes(false);
  };

  const openTunes = () => {
    toggleTunes(true);
  };

  const [tunesOpened, toggleTunes] = useState(false);

  /* Blog Shortcut */

  const closeBlog = () => {
    toggleBlog(false);
    // Clear the hash from URL when closing blog
    window.history.pushState({}, '', window.location.pathname);
  };

  const openBlog = () => {
    toggleBlog(true);
    // Update URL to show blog is open
    window.history.pushState({}, '', '#blog');
  };

  const [blogOpened, toggleBlog] = useState(false);

  // Check for blog hash URLs on page load
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#blog')) {
      toggleBlog(true);
    }
  }, []);


  return (
    <ThemeProvider theme="millenium">
      <GlobalStyle></GlobalStyle>
      {showAboutModal && (
        <S.layoutMain
          isMobile={isMobile}
          icon={<Progman37 variant="32x32_4" />}
          title={"About.txt"}
          closeModal={handleCloseAboutModal}
          menu={[
            {
              name: "Options",
              list: (
                <List>
                  <List.Item onClick={handleCloseAboutModal}>Close</List.Item>
                </List>
              ),
            },
          ]}
        >
          <S.layoutMainContent bg="white" boxShadow="out">
            <S.textModal>
              <h1>About</h1>
              <p>
                I'm Facundo, a programmer, multi-instrumentalist and composer from Buenos Aires, currently reading my final year of Electronics Engineering with Music Technology Systems at the University of York.
              </p>
              <p>
                My work focuses on digital signal processing, real-time systems, and music information retrieval.
              </p>
              <br />
              <p style={{ fontStyle: 'italic', textAlign: 'center' }}>
                "Do only what only you can do"
                <br />
                <span style={{ fontSize: '12px' }}>— Edsger W. Dijkstra</span>
              </p>
            </S.textModal>
          </S.layoutMainContent>
        </S.layoutMain>
      )}
      {showSkillsModal && (
        <S.layoutMain
          isMobile={isMobile}
          title={"Skills.txt"}
          closeModal={handleCloseSkillsModal}
          icon={<Mspaint variant="32x32_4" />}
          menu={[
            {
              name: "Options",
              list: (
                <List>
                  <List.Item onClick={handleCloseSkillsModal}>Close</List.Item>
                </List>
              ),
            },
          ]}
        >
          <S.layoutMainContent bg="white" boxShadow="in">
            <S.textModal>
              <p>
                {" "}
                <h1>Some of my skills</h1>Here are some of my most used skills, knowledge
                and aptitudes - Some of these skills are used on a daily basis and in a 
                interdisciplinary manner.
                
                <br />
                <hr /> 
                
                <h2> Engineering </h2>  <ProgressBar width={250} percent={50} />
                <h3>Algorithms</h3>
                <h3>Digital Signal Processing</h3>
                <h3>Python</h3>
                
               
                
        
                <h3>Rust</h3>
               
                <h3>Faust</h3>
                <h3>Pure Data </h3>
                <h3>JUCE</h3>
                
                <h3>C</h3>
               
              
                <h3>C++</h3>
                <h3>Typescript</h3>
                <h3>CSS</h3>
                <h3>HTML</h3>
                <h3>Javascript</h3>
                <h3>React</h3>
                <h3>Git</h3>
                <h3>Matlab</h3>
                <h3>Analogue Electronics</h3>
                <h3>Physical Modeling</h3>
                <h3>Digital Electronics</h3>
                <h3>Microcontrollers</h3>
                
                <br />
                <hr />
                <h2>Music</h2><ProgressBar width={250} percent={50} />
                <h3>Composition & arranging</h3>
                <h3>Piano</h3>
                
                
                <h3>Tuned percussion-Vibraphone & Marimba</h3>
                
                
                
                
                <h3>Trumpet</h3>
                
                <h3>Guitar</h3>
                
                <h3>Electric bass</h3>
                <h3>Musescore</h3>
                <h3>Sibelius</h3>
                <h3>Logic Pro X</h3>
                <h3>Ableton Live </h3>
                <h3>Fl Studio</h3>
                <h3>Pro Tools</h3>
                
                <br />
                <hr />
                <h2>Other Skills</h2>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </p>
            </S.textModal>
          </S.layoutMainContent>
        </S.layoutMain>
      )}
      {showPhotoModal && (
        <S.layoutMain
          isMobile={isMobile}
          title={"cucu_playing_the_trumpet.jpeg"}
          closeModal={handleClosePhotoModal}
          icon={<User variant="32x32_4" />}
          menu={[
            {
              name: "Options",
              list: (
                <List>
                  <List.Item onClick={handleClosePhotoModal}>Close</List.Item>
                </List>
              ),
            },
          ]}
        >
          <Frame
            boxShadow="none"
            style={{
              margin: "auto",
            }}
          >
            <img
              src={GR001551}
              aria-hidden
              alt="cucu playing the trumpet"
              class="full-width-image"
            ></img>
          </Frame>
          <div class="image-text">
            <p>cucu_plays_the_trumpet.jpeg</p>
          </div>
        </S.layoutMain>
      )}
      {showPhotographyModal && (
  <S.layoutMain
    isMobile={isMobile}
    closeModal={handleClosePhotographyModal}
    height="100%"
    icon={<Progman13 variant="32x32_4" />}
    width={340}
    menu={[
      {
        name: "Options",
        list: (
          <List>
            <List.Item onClick={handleClosePhotographyModal}>Close</List.Item>
          </List>
        ),
      },
    ]}
    title="Photography"
  >
    <S.textModal>
      <h1>Photography</h1>
      <p>Select an album to view the photos:</p>
      <List>
        <List.Item onClick={() => openAlbum('Album 1')}>Jan 24'-July 24'</List.Item>
        <List.Item onClick={() => openAlbum('Album 2')}>July 24'-Jan 25'</List.Item>
        
        {/* Add more albums as needed */}
      </List>
    </S.textModal>
  </S.layoutMain>
)}

      {showVaporwaveModal1 && (
        <S.layoutMain
          isMobile={isMobile}
          closeModal={handleCloseVaporwaveModal1}
          height="100%"
          icon={<CdMusic variant="32x32_4" />}
          width={340}
          menu={[
            {
              name: "Options",
              list: (
                <List>
                  <List.Item onClick={handleCloseVaporwaveModal1}>
                    Close
                  </List.Item>
                </List>
              ),
            },
          ]}
          title="Jazz_Trio.doc"
        >
          <S.textModal>
            <h1>Nude Ants Trio</h1>
            <p>
              Nude Ants Trio is: Facundo Franchino, piano, (born 2002, Argentina),
              Oscar Kyle , double- bass, (born 2005, Scotland) and Evan Hudson (born 2003, England) playing drums.

              The band combines the grand tradition of the challenging piano trio tenet and creates their own distinct sound in doing so.
              It is also one of the most consistently developing bands of the Yorkshire music scene,
              and one that is very open to inspiration from the surrounding environment.
            </p>
            <p>
            </p>
            <a href="https://nudeantstrio.bandcamp.com/">
      Bandcamp
      
    </a>
    <br /><br />
    <img src={GR001393} alt="GR001393" width="100%" />
    <div>
      <iframe
        src=""
        frameborder="0"
        width="100%"
        title="GR001393.JPG"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </S.textModal>
        </S.layoutMain>
      )}
      <TaskBar
        list={
          <List>
            <List.Item
              as="a"
              href="mailto:jbv513@york.ac.uk"
              icon={<Mail variant="32x32_4" />}
              target="_blank"
            >
              Email me
            </List.Item>
            <List.Divider />
            <List.Item icon={<Progman34 variant="32x32_4" />}>
              Socials
              <List>
                {socialMedia.map(({ icon, name, url }) => (
                  <List.Item
                    as="a"
                    href={url}
                    icon={icon}
                    key={name}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {name}
                  </List.Item>
                ))}
              </List>
            </List.Item>
            <List.Item icon={<CdMusic variant="32x32_4" />}>
              Tunes
              <List>
                <List.Item
                  onClick={handleOpenVaporwaveModal1}
                  icon={<CdMusic variant="32x32_4" />}
                >
                  Nude Ants Trio
                </List.Item>
              </List>
            </List.Item>
            <List.Item
              icon={<User variant="32x32_4" />}
              onClick={handleOpenPhotoModal}
            >
              Facundo
            </List.Item>
            <List.Item
              icon={<Mspaint variant="32x32_4" />}
              onClick={handleOpenSkillsModal}
              >
              Skills
            </List.Item>
            <List.Divider />
            <List.Item
              icon={<Progman5 variant="32x32_4" />}
              onClick={handleOpenAboutModal}
            >
              About
            </List.Item>
            <List.Divider />
            <List.Item
              icon={<Progman13 variant="32x32_4" />}
              onClick={handleOpenPhotographyModal}
            >
              Photography
            </List.Item>
            <List.Divider />
          </List>
        }
      />
      <React.Fragment>
        <Shortcuts
          openPortfolio={openPortfolio}
          openCV={openCV}
          openTunes={openTunes}
          openBlog={openBlog}
        />
        {explorerOpened && (
          <Portfolio
            items={items}
            closePortfolio={closePortfolio}
            isMobile={isMobile}
          />
        )}
        {cvOpened && <CV items={items} closeCV={closeCV} isMobile={isMobile} />}
        {tunesOpened && (
          <Tunes items={items} closeTunes={closeTunes} isMobile={isMobile} />
        )}
        {blogOpened && (
          <Blog closeBlog={closeBlog} isMobile={isMobile} />
        )}
      </React.Fragment>
    </ThemeProvider>
  );
}

export default Desktop;
