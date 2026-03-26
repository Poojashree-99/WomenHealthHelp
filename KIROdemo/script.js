// Problem data with solutions
const problems = [
    {
        id: 'headache',
        icon: '🤕',
        title: 'Headache',
        description: 'Quick relief for tension headaches',
        solution: {
            title: 'Headache Relief',
            description: 'Follow these steps to ease your headache naturally',
            type: 'steps',
            steps: [
                'Drink a full glass of water slowly',
                'Find a quiet, dimly lit space',
                'Apply gentle pressure to your temples in circular motions',
                'Close your eyes and breathe deeply for 2 minutes',
                'Place a cool compress on your forehead'
            ],
            encouragement: "You're taking great care of yourself! 💙"
        }
    },
    {
        id: 'back-pain',
        icon: '🫸',
        title: 'Back Pain',
        description: 'Simple stretches for back relief',
        solution: {
            title: 'Back Pain Relief',
            description: 'Gentle stretches to ease back tension',
            type: 'steps',
            steps: [
                'Sit up straight and roll your shoulders back 5 times',
                'Gently twist your torso left and right, holding for 10 seconds each',
                'Stand up and reach your arms overhead, then bend gently to each side',
                'Do a gentle forward fold, letting your arms hang loose',
                'Lie down and bring your knees to your chest for 30 seconds'
            ],
            encouragement: "Your body will thank you for this care! 🌸"
        }
    },
    {
        id: 'period-cramps',
        icon: '🌸',
        title: 'Period Cramps',
        description: 'Natural comfort for menstrual pain',
        solution: {
            title: 'Period Cramp Relief',
            description: 'Soothing techniques for menstrual discomfort',
            type: 'steps',
            steps: [
                'Apply heat to your lower abdomen (heating pad or warm water bottle)',
                'Drink warm herbal tea (chamomile or ginger)',
                'Gently massage your lower back in circular motions',
                'Try gentle yoga poses like child\'s pose',
                'Take slow, deep breaths and rest when needed'
            ],
            encouragement: "Be gentle with yourself during this time 💕"
        }
    },
    {
        id: 'anxiety',
        icon: '😰',
        title: 'Anxiety',
        description: 'Calming techniques for anxious moments',
        solution: {
            title: 'Anxiety Relief',
            description: 'Breathe through anxiety with this guided exercise',
            type: 'breathing',
            encouragement: "You are safe. You are strong. You've got this! 🌈"
        }
    },
    {
        id: 'stress',
        icon: '😤',
        title: 'Stress',
        description: 'Quick stress-busting techniques',
        solution: {
            title: 'Stress Relief',
            description: 'Let go of tension with mindful breathing',
            type: 'breathing',
            encouragement: "Take it one breath at a time. You're doing amazing! ✨"
        }
    },
    {
        id: 'anger',
        icon: '😡',
        title: 'Anger',
        description: 'Healthy ways to process anger',
        solution: {
            title: 'Anger Management',
            description: 'Cool down and center yourself with breathing',
            type: 'breathing',
            encouragement: "It's okay to feel angry. Let's work through it together 🕊️"
        }
    },
    {
        id: 'mood-swings',
        icon: '🎭',
        title: 'Mood Swings',
        description: 'Balance your emotional state',
        solution: {
            title: 'Mood Balance',
            description: 'Find your center with calming breaths',
            type: 'breathing',
            encouragement: "Your feelings are valid. Let's find balance together 🌙"
        }
    },
    {
        id: 'fatigue',
        icon: '😴',
        title: 'Fatigue',
        description: 'Energy-boosting techniques',
        solution: {
            title: 'Energy Boost',
            description: 'Gentle movements to revitalize your energy',
            type: 'steps',
            steps: [
                'Take 5 deep breaths with arms raised overhead',
                'Do 10 gentle neck rolls (5 each direction)',
                'Stretch your arms and legs like you\'re waking up',
                'Drink a glass of cold water',
                'Step outside for 2 minutes of fresh air if possible'
            ],
            encouragement: "Small steps lead to big energy! You're doing great! ⚡"
        }
    },
    {
        id: 'insomnia',
        icon: '🌙',
        title: 'Insomnia',
        description: 'Relaxation for better sleep',
        solution: {
            title: 'Sleep Preparation',
            description: 'Calm your mind and body for restful sleep',
            type: 'breathing',
            encouragement: "Rest is not a luxury, it's a necessity. Sweet dreams! 🌟"
        }
    },
    {
        id: 'overthinking',
        icon: '🤯',
        title: 'Overthinking',
        description: 'Quiet the mental chatter',
        solution: {
            title: 'Mind Quieting',
            description: 'Ground yourself in the present moment',
            type: 'breathing',
            encouragement: "Your thoughts don't control you. You are in charge! 🦋"
        }
    }
];

// Timer class for breathing exercises
class Timer {
    constructor() {
        this.timeLeft = 60;
        this.isRunning = false;
        this.interval = null;
        this.breathingPhase = 'ready'; // ready, inhale, hold, exhale
        this.breathingInterval = null;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startBreathingCycle();
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.stop();
            }
        }, 1000);
        
        this.updateControls();
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
        clearInterval(this.breathingInterval);
        this.breathingPhase = 'ready';
        this.updateControls();
        this.updateBreathingDisplay();
    }

    reset() {
        this.pause();
        this.timeLeft = 60;
        this.updateDisplay();
    }

    stop() {
        this.pause();
        this.showCompletionMessage();
    }

    startBreathingCycle() {
        let cycleStep = 0;
        const phases = [
            { phase: 'inhale', duration: 4000, instruction: 'Breathe in slowly...' },
            { phase: 'hold', duration: 2000, instruction: 'Hold your breath...' },
            { phase: 'exhale', duration: 6000, instruction: 'Breathe out slowly...' }
        ];

        const runCycle = () => {
            if (!this.isRunning) return;
            
            const currentPhase = phases[cycleStep];
            this.breathingPhase = currentPhase.phase;
            this.updateBreathingDisplay();
            
            setTimeout(() => {
                cycleStep = (cycleStep + 1) % phases.length;
                if (this.isRunning) {
                    runCycle();
                }
            }, currentPhase.duration);
        };

        runCycle();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const timerDisplay = document.querySelector('.timer-display');
        if (timerDisplay) {
            timerDisplay.textContent = display;
        }
    }

    updateBreathingDisplay() {
        const circle = document.querySelector('.breathing-circle');
        const instruction = document.querySelector('.breathing-instruction');
        
        if (!circle || !instruction) return;

        // Remove all phase classes
        circle.classList.remove('inhale', 'exhale');
        
        switch (this.breathingPhase) {
            case 'inhale':
                circle.classList.add('inhale');
                instruction.textContent = 'Breathe in slowly...';
                break;
            case 'hold':
                instruction.textContent = 'Hold your breath...';
                break;
            case 'exhale':
                circle.classList.add('exhale');
                instruction.textContent = 'Breathe out slowly...';
                break;
            default:
                instruction.textContent = 'Click Start to begin';
        }
    }

    updateControls() {
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (startBtn && pauseBtn) {
            if (this.isRunning) {
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
            } else {
                startBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            }
        }
    }

    showCompletionMessage() {
        const instruction = document.querySelector('.breathing-instruction');
        if (instruction) {
            instruction.textContent = 'Great job! You completed the exercise 🌟';
            instruction.style.color = '#48bb78';
        }
    }
}

// Global timer instance
let timer = new Timer();

// Initialize the app
function init() {
    renderProblemGrid();
    setupEventListeners();
}

// Render problem cards
function renderProblemGrid() {
    const grid = document.getElementById('problemGrid');
    
    problems.forEach(problem => {
        const card = document.createElement('div');
        card.className = 'problem-card';
        card.dataset.problemId = problem.id;
        
        card.innerHTML = `
            <span class="card-icon">${problem.icon}</span>
            <h3 class="card-title">${problem.title}</h3>
            <p class="card-description">${problem.description}</p>
        `;
        
        card.addEventListener('click', () => openSolution(problem));
        grid.appendChild(card);
    });
}

// Open solution modal
function openSolution(problem) {
    const modal = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = generateSolutionContent(problem);
    modal.classList.add('active');
    
    // Initialize timer if it's a breathing exercise
    if (problem.solution.type === 'breathing') {
        timer = new Timer();
        timer.updateDisplay();
        timer.updateBreathingDisplay();
        setupTimerControls();
    }
}

// Generate solution content based on type
function generateSolutionContent(problem) {
    const solution = problem.solution;
    
    let content = `
        <div class="solution-header">
            <h2 class="solution-title">${solution.title}</h2>
            <p class="solution-description">${solution.description}</p>
        </div>
    `;
    
    if (solution.type === 'breathing') {
        content += `
            <div class="timer-container">
                <div class="breathing-circle">
                    <div class="timer-display">01:00</div>
                </div>
                <div class="breathing-instruction">Click Start to begin</div>
                <div class="timer-controls">
                    <button class="btn btn-primary" id="startBtn">Start</button>
                    <button class="btn btn-primary" id="pauseBtn" style="display: none;">Pause</button>
                    <button class="btn btn-secondary" id="resetBtn">Reset</button>
                </div>
            </div>
        `;
    } else if (solution.type === 'steps') {
        content += '<div class="solution-steps">';
        solution.steps.forEach((step, index) => {
            content += `
                <div class="step">
                    <div class="step-number">Step ${index + 1}</div>
                    <div class="step-text">${step}</div>
                </div>
            `;
        });
        content += '</div>';
    }
    
    content += `
        <div class="encouragement">
            ${solution.encouragement}
        </div>
    `;
    
    return content;
}

// Setup timer controls
function setupTimerControls() {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => timer.start());
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => timer.pause());
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => timer.reset());
    }
}

// Setup event listeners
function setupEventListeners() {
    const closeBtn = document.getElementById('closeBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    
    // Stop timer if running
    if (timer) {
        timer.pause();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);