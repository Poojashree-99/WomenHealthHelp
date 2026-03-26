// Wellness problems data
const wellnessProblems = [
    {
        id: 'headache',
        emoji: '🤕',
        title: 'Headache',
        description: 'Quick relief for tension headaches',
        solution: {
            title: 'Headache Relief',
            subtitle: 'Follow these gentle steps to ease your headache naturally',
            type: 'steps',
            steps: [
                'Drink a full glass of water slowly - dehydration is a common cause',
                'Find a quiet, dimly lit space to rest your eyes',
                'Apply gentle pressure to your temples using circular motions',
                'Close your eyes and take 10 slow, deep breaths',
                'Place a cool, damp cloth on your forehead for 5 minutes'
            ],
            encouragement: "You're taking wonderful care of yourself! Healing takes time 💙"
        }
    },
    {
        id: 'back-pain',
        emoji: '🫸',
        title: 'Back Pain',
        description: 'Simple stretches for back relief',
        solution: {
            title: 'Back Pain Relief',
            subtitle: 'Gentle movements to release tension and restore comfort',
            type: 'steps',
            steps: [
                'Sit tall and slowly roll your shoulders backward 8 times',
                'Gently twist your torso left, hold for 15 seconds, then right',
                'Stand and reach both arms overhead, then side-bend gently',
                'Do a slow forward fold, letting your arms hang naturally',
                'Lie down and hug your knees to chest for 30 seconds'
            ],
            encouragement: "Your body appreciates this gentle care! You're doing amazing 🌸"
        }
    },
    {
        id: 'period-cramps',
        emoji: '🌸',
        title: 'Period Cramps',
        description: 'Natural comfort for menstrual pain',
        solution: {
            title: 'Period Cramp Relief',
            subtitle: 'Soothing techniques to ease menstrual discomfort naturally',
            type: 'steps',
            steps: [
                'Apply gentle heat to your lower abdomen (heating pad or warm bottle)',
                'Sip warm herbal tea - chamomile, ginger, or peppermint work well',
                'Massage your lower back in slow, circular motions',
                'Try child\'s pose: kneel and fold forward, arms extended',
                'Take a warm bath with Epsom salts if possible'
            ],
            encouragement: "Be extra gentle with yourself during this time. You deserve comfort 💕"
        }
    },
    {
        id: 'anxiety',
        emoji: '😰',
        title: 'Anxiety',
        description: 'Calming techniques for anxious moments',
        solution: {
            title: 'Anxiety Relief',
            subtitle: 'Breathe through anxiety with this guided calming exercise',
            type: 'breathing',
            encouragement: "You are safe. You are strong. This feeling will pass. You've got this! 🌈"
        }
    },
    {
        id: 'stress',
        emoji: '😤',
        title: 'Stress',
        description: 'Quick stress-busting techniques',
        solution: {
            title: 'Stress Relief',
            subtitle: 'Release tension and find your calm with mindful breathing',
            type: 'breathing',
            encouragement: "Take it one breath at a time. You're handling this beautifully ✨"
        }
    },
    {
        id: 'anger',
        emoji: '😡',
        title: 'Anger',
        description: 'Healthy ways to process anger',
        solution: {
            title: 'Anger Management',
            subtitle: 'Cool down and center yourself with this calming practice',
            type: 'breathing',
            encouragement: "It's completely okay to feel angry. Let's work through it together 🕊️"
        }
    },
    {
        id: 'mood-swings',
        emoji: '🎭',
        title: 'Mood Swings',
        description: 'Balance your emotional state',
        solution: {
            title: 'Emotional Balance',
            subtitle: 'Find your center and restore emotional equilibrium',
            type: 'breathing',
            encouragement: "Your feelings are completely valid. Let's find balance together 🌙"
        }
    },
    {
        id: 'fatigue',
        emoji: '😴',
        title: 'Fatigue',
        description: 'Energy-boosting techniques',
        solution: {
            title: 'Energy Revival',
            subtitle: 'Gentle movements and techniques to revitalize your energy',
            type: 'steps',
            steps: [
                'Take 5 deep breaths while stretching your arms overhead',
                'Do 10 gentle neck rolls - 5 clockwise, 5 counter-clockwise',
                'Stretch like you\'re waking up - arms, legs, and back',
                'Drink a full glass of cool water mindfully',
                'Step outside for 3 minutes of fresh air and natural light'
            ],
            encouragement: "Small steps create big energy shifts! You're doing wonderfully ⚡"
        }
    },
    {
        id: 'insomnia',
        emoji: '🌙',
        title: 'Insomnia',
        description: 'Relaxation for better sleep',
        solution: {
            title: 'Sleep Preparation',
            subtitle: 'Calm your mind and body for peaceful, restorative sleep',
            type: 'breathing',
            encouragement: "Rest is not a luxury, it's essential. You deserve peaceful sleep 🌟"
        }
    },
    {
        id: 'overthinking',
        emoji: '🤯',
        title: 'Overthinking',
        description: 'Quiet the mental chatter',
        solution: {
            title: 'Mind Quieting',
            subtitle: 'Ground yourself in the present moment and find mental peace',
            type: 'breathing',
            encouragement: "Your thoughts don't control you. You have the power to find peace 🦋"
        }
    }
];

// Timer class for breathing exercises
class BreathingTimer {
    constructor() {
        this.totalTime = 60; // 1 minute
        this.timeRemaining = this.totalTime;
        this.isActive = false;
        this.timerInterval = null;
        this.breathingPhase = 'ready'; // ready, inhale, hold, exhale
        this.breathingInterval = null;
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.startBreathingPattern();
        
        // Main timer countdown
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.complete();
            }
        }, 1000);
        
        this.updateButtonStates();
    }

    pause() {
        this.isActive = false;
        this.clearIntervals();
        this.breathingPhase = 'ready';
        this.updateBreathingDisplay();
        this.updateButtonStates();
    }

    reset() {
        this.pause();
        this.timeRemaining = this.totalTime;
        this.updateTimerDisplay();
    }

    complete() {
        this.pause();
        this.showCompletionMessage();
    }

    clearIntervals() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        if (this.breathingInterval) {
            clearInterval(this.breathingInterval);
            this.breathingInterval = null;
        }
    }

    startBreathingPattern() {
        let cyclePosition = 0;
        const breathingCycle = [
            { phase: 'inhale', duration: 4000, instruction: 'Breathe in slowly and deeply...' },
            { phase: 'hold', duration: 2000, instruction: 'Hold your breath gently...' },
            { phase: 'exhale', duration: 6000, instruction: 'Breathe out slowly and completely...' }
        ];

        const executeCycle = () => {
            if (!this.isActive) return;
            
            const currentStep = breathingCycle[cyclePosition];
            this.breathingPhase = currentStep.phase;
            this.updateBreathingDisplay();
            
            setTimeout(() => {
                cyclePosition = (cyclePosition + 1) % breathingCycle.length;
                if (this.isActive) {
                    executeCycle();
                }
            }, currentStep.duration);
        };

        executeCycle();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const timerElement = document.querySelector('.timer-text');
        if (timerElement) {
            timerElement.textContent = timeString;
        }
    }

    updateBreathingDisplay() {
        const circle = document.querySelector('.breathing-circle');
        const guide = document.querySelector('.breathing-guide');
        
        if (!circle || !guide) return;

        // Reset classes
        circle.classList.remove('breathing-in', 'breathing-out');
        
        switch (this.breathingPhase) {
            case 'inhale':
                circle.classList.add('breathing-in');
                guide.textContent = 'Breathe in slowly and deeply...';
                break;
            case 'hold':
                guide.textContent = 'Hold your breath gently...';
                break;
            case 'exhale':
                circle.classList.add('breathing-out');
                guide.textContent = 'Breathe out slowly and completely...';
                break;
            default:
                guide.textContent = 'Click Start to begin your breathing exercise';
        }
    }

    updateButtonStates() {
        const startBtn = document.getElementById('startButton');
        const pauseBtn = document.getElementById('pauseButton');
        
        if (startBtn && pauseBtn) {
            if (this.isActive) {
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
            } else {
                startBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            }
        }
    }

    showCompletionMessage() {
        const guide = document.querySelector('.breathing-guide');
        if (guide) {
            guide.textContent = 'Wonderful! You completed the breathing exercise 🌟';
            guide.style.color = '#48bb78';
            guide.style.fontWeight = '600';
        }
    }
}

// Global timer instance
let breathingTimer = new BreathingTimer();

// Application initialization
function initializeApp() {
    createWellnessCards();
    setupEventHandlers();
}

// Create and render wellness cards
function createWellnessCards() {
    const grid = document.getElementById('cardsGrid');
    
    wellnessProblems.forEach(problem => {
        const card = document.createElement('div');
        card.className = 'wellness-card';
        card.dataset.problemId = problem.id;
        
        card.innerHTML = `
            <span class="card-emoji">${problem.emoji}</span>
            <h3 class="card-title">${problem.title}</h3>
            <p class="card-desc">${problem.description}</p>
        `;
        
        card.addEventListener('click', () => openSolutionModal(problem));
        grid.appendChild(card);
    });
}

// Open solution modal
function openSolutionModal(problem) {
    const modal = document.getElementById('modalBackdrop');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = createSolutionContent(problem);
    modal.classList.add('show');
    
    // Initialize breathing timer if needed
    if (problem.solution.type === 'breathing') {
        breathingTimer = new BreathingTimer();
        breathingTimer.updateTimerDisplay();
        breathingTimer.updateBreathingDisplay();
        setupBreathingControls();
    }
}

// Create solution content based on type
function createSolutionContent(problem) {
    const solution = problem.solution;
    
    let content = `
        <div class="solution-header">
            <h2 class="solution-title">${solution.title}</h2>
            <p class="solution-subtitle">${solution.subtitle}</p>
        </div>
    `;
    
    if (solution.type === 'breathing') {
        content += `
            <div class="breathing-container">
                <div class="breathing-circle">
                    <div class="timer-text">01:00</div>
                </div>
                <div class="breathing-guide">Click Start to begin your breathing exercise</div>
                <div class="control-buttons">
                    <button class="btn btn-start" id="startButton">Start</button>
                    <button class="btn btn-pause" id="pauseButton" style="display: none;">Pause</button>
                    <button class="btn btn-reset" id="resetButton">Reset</button>
                </div>
            </div>
        `;
    } else if (solution.type === 'steps') {
        content += '<div class="steps-container">';
        solution.steps.forEach((step, index) => {
            content += `
                <div class="step-item">
                    <div class="step-number">Step ${index + 1}</div>
                    <div class="step-content">${step}</div>
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

// Setup breathing exercise controls
function setupBreathingControls() {
    const startBtn = document.getElementById('startButton');
    const pauseBtn = document.getElementById('pauseButton');
    const resetBtn = document.getElementById('resetButton');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => breathingTimer.start());
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => breathingTimer.pause());
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => breathingTimer.reset());
    }
}

// Setup main event handlers
function setupEventHandlers() {
    const closeBtn = document.getElementById('closeButton');
    const modalBackdrop = document.getElementById('modalBackdrop');
    
    // Close modal handlers
    closeBtn.addEventListener('click', closeModal);
    
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            closeModal();
        }
    });
    
    // Keyboard handler for ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('modalBackdrop');
    modal.classList.remove('show');
    
    // Stop breathing timer if active
    if (breathingTimer) {
        breathingTimer.pause();
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);