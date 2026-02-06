// Portfolio JavaScript - Facundo Franchino
// Animations and filtering with priority ordering

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Pause animations initially until in view
document.querySelectorAll('.project-card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

// Filter functionality with priority ordering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectsGrid = document.querySelector('.projects-grid');
const projectCards = Array.from(document.querySelectorAll('.project-card'));

// Store original order
const originalOrder = [...projectCards];

// Priority orders for specific filters (project indices, 0-based)
// Original order: faust2clap(0), amadeus(1), DeepCassette(2), ushuaiaVerb(3), DeepLearningACR(4), EmulatingSpace(5), PureHarmony(6), Auralisation(7)
const filterPriorities = {
    'dsp': [5, 2, 3, 4, 6, 1, 0], // Emulating first, DeepCassette, ushuaia, DeepACR, PureHarmony, amadeus, faust2clap last
};

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Determine which cards to show
        let visibleCards = [];
        projectCards.forEach((card, index) => {
            const tags = card.dataset.tags || '';
            if (filter === 'all' || tags.includes(filter)) {
                card.classList.remove('hidden');
                visibleCards.push({ card, originalIndex: index });
            } else {
                card.classList.add('hidden');
            }
        });

        // Reorder if there's a priority for this filter
        if (filterPriorities[filter]) {
            const priority = filterPriorities[filter];
            visibleCards.sort((a, b) => {
                const aPos = priority.indexOf(a.originalIndex);
                const bPos = priority.indexOf(b.originalIndex);
                // If not in priority list, put at end
                const aPriority = aPos === -1 ? 999 : aPos;
                const bPriority = bPos === -1 ? 999 : bPos;
                return aPriority - bPriority;
            });
        }

        // Reorder DOM
        visibleCards.forEach(({ card }) => {
            projectsGrid.appendChild(card);
        });

        // Re-trigger animations
        visibleCards.forEach(({ card }, i) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = '';
            card.style.animationDelay = `${i * 0.05}s`;
            card.style.animationPlayState = 'running';
        });

        // If showing all, restore original order
        if (filter === 'all') {
            originalOrder.forEach(card => {
                projectsGrid.appendChild(card);
            });
            originalOrder.forEach((card, i) => {
                card.style.animationDelay = `${i * 0.05}s`;
            });
        }
    });
});

// Magnetic cursor effect on buttons
const magneticStrength = 0.3; // How much the button moves (0-1)

document.querySelectorAll('.link-btn, .filter-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Micro-interaction: button press feedback
document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95)';
    });

    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
    });
});
