// theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

//check for saved theme preference or default to light mode (framed white content)
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

//dynamic word count
function updateWordCount() {
    const main = document.querySelector('main').cloneNode(true);

    //remove elements we don't want to count
    const excludeSelectors = [
        'pre', 'code',           //code blocks
        '.toc',                  //table of contents
        '.theme-toggle',         //UI elements
        '.progress-bar',
        'figcaption',            //NOT counted
        '.caption',              //NOT counted
        '.author',               //usually not counted? lol
        '.meta',                 //metadata/word count display
        '.missing-asset-placeholder',
        '#references',           //exclude reference list
        '#acknowledgements',     //usually not counted
        '.code-details summary', //don't count the titles of expandable blocks? 
        '.preset-table'
    ];

    excludeSelectors.forEach(selector => {
        main.querySelectorAll(selector).forEach(el => el.remove());
    });

    //get the text content and count words
    const text = main.textContent || main.innerText;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    //update the display (at the bottom)
    const bottomCounter = document.getElementById('final-word-count');
    if (bottomCounter) {
        bottomCounter.textContent = `Total Word Count: ${wordCount} words.`;
    }

    return wordCount;
}

//run on page load
document.addEventListener('DOMContentLoaded', updateWordCount);

//reading progress bar
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
});

//table of contents active section highlighting
const sections = document.querySelectorAll('section');
const tocLinks = document.querySelectorAll('.toc a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

//smooth scrolling for TOC links
tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

//intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

//delay observer to prevent initial scroll jump
setTimeout(() => {
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}, 100);

//prevent scroll on page load
if (window.location.hash === '') {
    window.scrollTo(0, 0);
}

//expandable references
document.querySelectorAll('.ref-expand').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.nextElementSibling;
        const isExpanded = button.classList.contains('expanded');

        if (isExpanded) {
            button.classList.remove('expanded');
            details.classList.remove('show');
        } else {
            button.classList.add('expanded');
            details.classList.add('show');
        }
    });
});

//a/b audio comparison tool
const abButtons = document.querySelectorAll('.ab-button');
const playPauseBtn = document.querySelector('.ab-play-pause');
const audioA = document.getElementById('audio-a');
const audioB = document.getElementById('audio-b');

let currentAudio = audioB;
let isPlaying = false;

//synchronise audio times
audioA?.addEventListener('timeupdate', () => {
    if (audioB && Math.abs(audioA.currentTime - audioB.currentTime) > 0.1) {
        audioB.currentTime = audioA.currentTime;
    }
});

audioB?.addEventListener('timeupdate', () => {
    if (audioA && Math.abs(audioB.currentTime - audioA.currentTime) > 0.1) {
        audioA.currentTime = audioB.currentTime;
    }
});

//a/b switching
abButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.dataset.mode;

        //update active state
        abButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        //switch audio
        if (mode === 'a') {
            if (audioA) audioA.volume = 1;
            if (audioB) audioB.volume = 0;
            currentAudio = audioA;
        } else {
            if (audioA) audioA.volume = 0;
            if (audioB) audioB.volume = 1;
            currentAudio = audioB;
        }
    });
});

//play/pause functionality
playPauseBtn?.addEventListener('click', () => {
    if (isPlaying) {
        audioA?.pause();
        audioB?.pause();
        playPauseBtn.textContent = '▶️ Play';
        isPlaying = false;
    } else {
        audioA?.play();
        audioB?.play();
        playPauseBtn.textContent = '⏸️ Pause';
        isPlaying = true;
    }
});

//initialise with B (wet) active
if (audioA && audioB) {
    audioA.volume = 0;
    audioB.volume = 1;
}

//handle audio ended
audioA?.addEventListener('ended', () => {
    audioB?.pause();
    if (playPauseBtn) playPauseBtn.textContent = '▶️ Play';
    isPlaying = false;
    if (audioA) audioA.currentTime = 0;
    if (audioB) audioB.currentTime = 0;
});

audioB?.addEventListener('ended', () => {
    audioA?.pause();
    if (playPauseBtn) playPauseBtn.textContent = '▶️ Play';
    isPlaying = false;
    if (audioA) audioA.currentTime = 0;
    if (audioB) audioB.currentTime = 0;
});

//add custom syntax highlighting class for Faust
if (typeof Prism !== 'undefined') {
    Prism.languages.faust = Prism.languages.extend('clike', {
        'keyword': /\b(?:process|import|declare|with|letrec|environment|component|library|effect|instrument)\b/,
        'builtin': /\b(?:hslider|vslider|button|checkbox|nentry|hgroup|vgroup|tgroup)\b/,
        'function': /\b(?:sin|cos|tan|exp|log|sqrt|abs|min|max|select2|par|seq|sum|prod)\b/,
        'operator': /[~:,<>]/,
        'number': /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/
    });
}