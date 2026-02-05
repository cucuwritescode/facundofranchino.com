import React, { useState, useCallback, useEffect } from "react";
import GR001393 from '../GR001393.JPG';
import GR001551 from '../GR001551.JPG';
import {
  GlobalStyle,
  ThemeProvider,
  List,
  Frame,
  Button,
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
import Reader from "./reader";
import Transcriptions from "./transcriptions";

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
    window.history.pushState({}, '', window.location.pathname);
  };

  const openPortfolio = () => {
    togglePortfolio(true);
    window.history.pushState({}, '', '#portfolio');
  };
  const [explorerOpened, togglePortfolio] = useState(false);

  /* CV Shortcut */

  const closeCV = () => {
    toggleCV(false);
    window.history.pushState({}, '', window.location.pathname);
  };

  const openCV = () => {
    toggleCV(true);
    window.history.pushState({}, '', '#cv');
  };

  const [cvOpened, toggleCV] = useState(false);

  /* Tunes Shortcut */

  const closeTunes = () => {
    toggleTunes(false);
    window.history.pushState({}, '', window.location.pathname);
  };

  const openTunes = () => {
    toggleTunes(true);
    window.history.pushState({}, '', '#tunes');
  };

  const [tunesOpened, toggleTunes] = useState(false);

  /* Reader Shortcut */

  const closeReader = () => {
    toggleReader(false);
    // Clear the hash from URL when closing reader
    window.history.pushState({}, '', window.location.pathname);
  };

  const openReader = () => {
    toggleReader(true);
    // Update URL to show reader is open
    window.history.pushState({}, '', '#reader');
  };

  const [readerOpened, toggleReader] = useState(false);

  /* Transcriptions Shortcut */

  const closeTranscriptions = () => {
    toggleTranscriptions(false);
    // Clear the hash from URL when closing transcriptions
    window.history.pushState({}, '', window.location.pathname);
  };

  const openTranscriptions = () => {
    toggleTranscriptions(true);
    // Update URL to show transcriptions is open
    window.history.pushState({}, '', '#transcriptions');
  };

  const [transcriptionsOpened, toggleTranscriptions] = useState(false);

  /* Context Menu */
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const handleContextMenu = useCallback((e) => {
    // Only show on the desktop background, not on windows/modals
    const target = e.target;
    const isDesktopBg = target.classList.contains('background') ||
      target.closest('.desktop-area') === target ||
      target.classList.contains('desktop-area');
    if (!isDesktopBg) return;

    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }, []);

  // Close context menu on any left click
  useEffect(() => {
    const handleClick = () => closeContextMenu();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [closeContextMenu]);

  // Check for hash URLs on page load
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#reader')) {
      toggleReader(true);
    } else if (hash.startsWith('#transcriptions')) {
      toggleTranscriptions(true);
    } else if (hash.startsWith('#portfolio')) {
      togglePortfolio(true);
    } else if (hash.startsWith('#cv')) {
      toggleCV(true);
    } else if (hash.startsWith('#tunes')) {
      toggleTunes(true);
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
          style={{
            position: 'fixed',
            top: '10%',
            left: isMobile ? '5%' : '20%',
            margin: '0',
            width: isMobile ? '90vw' : '60vw',
            maxWidth: '600px'
          }}
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
                I'm Facundo, a programmer, multi-instrumentalist and composer from Buenos Aires, currently reading Electronic Engineering at the University of York and writing my final-year thesis.
              </p>
              <p>
                My work focuses on signal processing, real-time systems, and music information retrieval.
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
              <h1>Skills & Technologies</h1>
              <p>
                Current technical toolkit and musical capabilities, continuously evolving.
              </p>

              <br />
              <hr />

              <h2>Programming & DSP</h2>
              <h3>C/C++</h3>
              <h3>Python</h3>
              <h3>Rust</h3>
              <h3>Faust</h3>
              <h3>JUCE Framework</h3>
              <h3>Real-time Audio Processing</h3>
              <h3>Digital Signal Processing</h3>
              <h3>Machine Learning (PyTorch)</h3>
              <h3>Pure Data</h3>
              <h3>MATLAB/Octave</h3>

              <br />
              <hr />

              <h2>Web Development</h2>
              <h3>TypeScript/JavaScript</h3>
              <h3>React</h3>
              <h3>Node.js</h3>
              <h3>HTML/CSS</h3>
              <h3>Git</h3>

              <br />
              <hr />

              <h2>Electronics & Hardware</h2>
              <h3>Analog Circuit Design</h3>
              <h3>Digital Electronics</h3>
              <h3>Microcontrollers (STM32, Arduino)</h3>
              <h3>PCB Design</h3>
              <h3>Audio Hardware Development</h3>

              <br />
              <hr />

              <h2>Musical Performance</h2>
              <h3>Piano (Primary)</h3>
              <h3>Trumpet</h3>
              <h3>Vibraphone & Marimba</h3>
              <h3>Guitar & Bass</h3>
              <h3>Music Composition & Arrangement</h3>
              <h3>Jazz Performance</h3>
              <h3>Music Transcription & Analysis</h3>

              <br />
              <hr />

              <h2>Audio Production</h2>
              <h3>Logic Pro X</h3>
              <h3>Ableton Live</h3>
              <h3>Pro Tools</h3>
              <h3>Music Notation (Sibelius, MuseScore)</h3>
              <h3>Audio Plugin Development</h3>
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
      <div
        className="desktop-area"
        onContextMenu={handleContextMenu}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 28, zIndex: 0 }}
      >
        <Shortcuts
          openPortfolio={openPortfolio}
          openCV={openCV}
          openTunes={openTunes}
          openReader={openReader}
          openTranscriptions={openTranscriptions}
        />
      </div>
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
      {readerOpened && (
        <Reader closeReader={closeReader} isMobile={isMobile} />
      )}
      {transcriptionsOpened && (
        <Transcriptions closeTranscriptions={closeTranscriptions} isMobile={isMobile} />
      )}

      {/* Right-click context menu */}
      {contextMenu.visible && (
        <div style={{
          position: 'fixed',
          left: contextMenu.x,
          top: contextMenu.y,
          zIndex: 9999,
        }}>
          <Frame
            bg="#c0c0c0"
            boxShadow="out"
            style={{ padding: '2px' }}
          >
            <List>
              <List.Item style={{ fontSize: '11px' }} onClick={() => {}}>
                Arrange Icons
              </List.Item>
              <List.Divider />
              <List.Item style={{ fontSize: '11px' }} onClick={() => {
                closeContextMenu();
                setShowAccessDenied(true);
              }}>
                New Folder
              </List.Item>
              <List.Divider />
              <List.Item style={{ fontSize: '11px' }} onClick={() => {
                closeContextMenu();
                handleOpenAboutModal();
              }}>
                Properties
              </List.Item>
              <List.Item style={{ fontSize: '11px' }} onClick={() => {
                closeContextMenu();
                window.location.reload();
              }}>
                Refresh
              </List.Item>
            </List>
          </Frame>
        </div>
      )}

      {/* Access Denied error dialog */}
      {showAccessDenied && (
        <S.layoutMain
          isMobile={isMobile}
          title="Error"
          closeModal={() => setShowAccessDenied(false)}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0,
            width: isMobile ? '85vw' : '380px',
            zIndex: 10000,
          }}
          menu={[]}
        >
          <S.layoutMainContent bg="#c0c0c0" boxShadow="none">
            <div style={{
              display: 'flex',
              padding: '20px 15px 10px 15px',
              gap: '15px',
              alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '32px', lineHeight: 1 }}>&#10060;</span>
              <div style={{ fontSize: '11px' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Access Denied</p>
                <p style={{ margin: 0 }}>
                  You do not have permission to create items on this desktop. Please contact the system administrator.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 15px 15px' }}>
              <Button onClick={() => setShowAccessDenied(false)} style={{ minWidth: '75px' }}>
                OK
              </Button>
            </div>
          </S.layoutMainContent>
        </S.layoutMain>
      )}
    </ThemeProvider>
  );
}

export default Desktop;
