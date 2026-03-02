# ELE00189M: Modelling and Analysing Sound and Music Signals

---

### Project Overview
this repo contains the final project for the "MASMS" module. It explores the topological evolution of recursive reverberation algorithms, from Schroeder's early designs to modern Eno-Lanois "Shimmer" sound.

### Submission Contents
- `index.html`: the main website article (interactive, for offline reading)
- `MASMS_Facundo_Franchino.pdf`: a PDF export of the article for backup
- `app.js` & `style.css`: supporting scripts and styles for the web article
- `audio/`: all sound examples referenced in the article (WAV/MP3)
- `latex_diagrams/`: high-res block diagrams and figures
- `video/`: interactive animations (e.g., FDN build-up)
- `*.dsp`: source code for the four implemented models (Faust)
- `lib/prism/` & `mathjax/`: localised libraries for offline syntax highlighting and mathematical typesetting

---

### How to Run the Models (Faust)
The sound models are written in the **Faust** programming language. To explore the sounds and parameters described in the report:

1.  **Online IDE**: go to the [Faust Online IDE](https://faustide.grame.fr/).
2.  **Load Code**: copy and paste the code from the `.dsp` files in the root directory into the IDE editor:
    - `modern_moorer.dsp` (modern Moorer reverb)
    - `generalised_FDN.dsp` (Model A: switchable FDN)
    - `barrImplementation.dsp` (Model B: nested allpass loop)
    - `casc_SDN.dsp` (Model C: cascaded scattering delay network)
    - `casc_fb_shimmer.dsp` (Model D: shimmer algorithm)
3.  **Interact**: the online Faust IDE will automatically compile the code when ypu press run and present a UI with the sliders (T60, feedback, wet/dry, etc.) discussed in the report technical tables.

---

### Navigation
- open `index.html` in any modern web browser.
- the article contains **interactive audio players**, **code snippets with syntax highlighting**, and **dynamic word-count** (located at the bottom of the page).
- all media assets have been localised to guarantee the report works without an internet connection.

---

### Word Count Note
the dynamic word-count at the bottom of the article programmatically excludes:
- code blocks and titles.
- table of contents.
- figure captions and image metadata.
- bibliography/references.
- technical preset tables.

the current word count is within the **2000-word limit** as specified in the assignment brief.
