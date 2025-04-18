// script.js (com alterações)
// Configurações globais
const CONFIG = {
    duration: 20 * 60 * 60, // 20 horas em segundos
    inactivityTimeout: 8 * 60 * 60 * 1000 // 8 horas em milissegundos
};

// Dados dos bosses
const BOSSES = {
    solo: [
        'Yselda', 'Drume', 'Cults Edron', 'Boss Edron', 'Kusuma (Marapur)', 'Cult Dara', 
        'Bosses Darasha', 'Scarlet', 'Alminha (Port Hope)', 'Asura (Bosses)', 'Ahau', 
        'Raxias (Shortcut Port Hope)', 'MiniBoss Issavi', 'Tentugly', 'Cults Carlin', 
        'Cult Thais Mino', 'Cult Thais Mendigo'
    ],
    tres: ['Oberon', 'Timira', 'Lulu', 'Leiden', 'Faceles', 'Cerebro', 'Mini DC', 'The Monster'],
    cinco: ['GT', 'GD', 'Vengoth', 'Magma'],
    dez: ['Zelos', 'Last DC', 'Last Vengoth', 'WZ 123', 'WZ 456']
};

// Níveis mínimos para os bosses solo
const BOSS_LEVELS = {
    'Yselda': 350,
    'Drume': 250,
    'Cults Edron': 500,
    'Boss Edron': 250,
    'Kusuma (Marapur)': 250,
    'Cult Dara': 500,
    'Bosses Darasha': 250,
    'Scarlet': 350,
    'Alminha (Port Hope)': 450,
    'Asura (Bosses)': 350,
    'Ahau': 450,
    'Raxias (Shortcut Port Hope)': 250,
    'MiniBoss Issavi': 250,
    'Tentugly': 450,
    'Cults Carlin': 500,
    'Cult Thais Mino': 500,
    'Cult Thais Mendigo': 500
};

// Estado da aplicação
const state = {
    timers: {},
    lastActivityTime: Date.now(),
    inactivityWarningTimeout: null,
    currentUser: localStorage.getItem('currentUser') || null,
    currentLevelFilter: 600 // Padrão: mostrar todos
};

function setPodiumGif(gifUrl) {
    const gifOverlay = document.querySelector('.gif-overlay');
    if (gifUrl) {
        gifOverlay.innerHTML = `<img src="${gifUrl}" alt="Boss GIF">`;
    } else {
        gifOverlay.innerHTML = '';
    }
}

// Funções de manipulação do DOM
const DOM = {
    toggleElement: (id, display = 'block') => {
        const el = document.getElementById(id);
        if (el) el.style.display = el.style.display === 'none' ? display : 'none';
    },
    
    showElement: (id, display = 'block') => {
        const el = document.getElementById(id);
        if (el) el.style.display = display;
    },
    
    hideElement: (id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    },
    
    resetAllButtons: () => {
        document.querySelectorAll('.boss-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.boss-timer').forEach(timer => {
            timer.textContent = '';
        });
    }
};

// Funções de timer
const Timer = {
    start: (user, bossName, timerEl, btn, endTime = null) => {
        // Se já existe um timer para este boss, não crie outro
        if (state.timers[user]?.[bossName]?.interval) {
            return;
        }
        
        btn.classList.add('active');
        
        // Calcula o tempo final baseado no horário atual + duração
        const now = Math.floor(Date.now() / 1000);
        const end = endTime || (now + CONFIG.duration);
        
        const update = () => {
            const now = Math.floor(Date.now() / 1000);
            let remaining = end - now;
            
            if (remaining <= 0) {
                Timer.clear(user, bossName, btn, timerEl);
                delete state.timers[user][bossName];
                return;
            }
            
            const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
            const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
            const s = String(remaining % 60).padStart(2, '0');
            timerEl.textContent = `${h}:${m}:${s}`;
        };

        update();
        const interval = setInterval(update, 1000);
        
        state.timers[user] = state.timers[user] || {};
        state.timers[user][bossName] = { interval, endTime: end };
        
        // Armazena o horário de término exato no localStorage
        localStorage.setItem(`${user}_timer_${bossName}`, end);
    },
    
    clear: (user, bossName, btn, timerEl) => {
        if (!user || !bossName) return;
        
        // Limpe o intervalo se existir
        if (state.timers[user]?.[bossName]?.interval) {
            clearInterval(state.timers[user][bossName].interval);
        }
        
        // Limpe o estado
        if (state.timers[user]) {
            delete state.timers[user][bossName];
        }
        
        // Atualize a UI
        if (btn) btn.classList.remove('active');
        if (timerEl) timerEl.textContent = '';
        
        // Limpe o localStorage
        localStorage.removeItem(`${user}_timer_${bossName}`);
    },
    
    clearAll: (user) => {
        if (!user || !confirm('Deseja realmente resetar TODOS os timers?')) return;
        
        let timersResetados = 0;
        
        // Primeiro, limpe todos os intervalos
        if (state.timers[user]) {
            for (const bossName in state.timers[user]) {
                if (state.timers[user][bossName]?.interval) {
                    clearInterval(state.timers[user][bossName].interval);
                    timersResetados++;
                }
            }
        }
        
        // Depois, limpe o estado
        state.timers[user] = {};
        
        // Limpe a interface
        document.querySelectorAll('.boss-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.boss-timer').forEach(timer => {
            timer.textContent = '';
        });
        
        // Remova todos os itens do localStorage para este usuário
        for (const group in BOSSES) {
            BOSSES[group].forEach(bossName => {
                localStorage.removeItem(`${user}_timer_${bossName}`);
            });
        }
        
        alert(`${timersResetados} timers resetados com sucesso!`);
    },
    
    loadSavedTimers: (user) => {
        for (const group in BOSSES) {
            BOSSES[group].forEach(bossName => {
                const savedEndTime = localStorage.getItem(`${user}_timer_${bossName}`);
                if (savedEndTime) {
                    const endTime = parseInt(savedEndTime, 10);
                    const now = Math.floor(Date.now() / 1000);
                    const remaining = endTime - now;
                    
                    if (remaining > 0) {
                        const bossCard = document.getElementById(`boss-${bossName}`);
                        if (bossCard) {
                            const btn = bossCard.querySelector('.boss-btn');
                            const timerEl = bossCard.querySelector('.boss-timer');
                            Timer.start(user, bossName, timerEl, btn, endTime);
                        }
                    } else {
                        // Se o timer já expirou, limpe do localStorage
                        localStorage.removeItem(`${user}_timer_${bossName}`);
                    }
                }
            });
        }
    }
};

// Funções de autenticação
const Auth = {
    login: (username, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const admin = { username: 'admin', password: 'mortadela1' };

        if ((username === admin.username && password === admin.password) ||
            users.some(user => user.username === username && user.password === password)) {
            
            localStorage.setItem('token', 'valid-token');
            localStorage.setItem('currentUser', username);
            state.currentUser = username;
            
            DOM.hideElement('loginScreen');
            DOM.showElement('mainScreen');
            
            Boss.createAll(username);
            Timer.loadSavedTimers(username);
            
            Activity.startMonitoring();
            return true;
        }
        return false;
    },
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        state.currentUser = null;
        
        DOM.hideElement('mainScreen');
        DOM.showElement('loginScreen');
    },
    
    register: (username, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.username === username)) {
            return false;
        }
        
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
};

// Funções de atividade
const Activity = {
    startMonitoring: () => {
        state.lastActivityTime = Date.now();
        clearTimeout(state.inactivityWarningTimeout);
        state.inactivityWarningTimeout = setTimeout(Activity.checkInactivity, CONFIG.inactivityTimeout);
    },
    
    checkInactivity: () => {
        if (Date.now() - state.lastActivityTime >= CONFIG.inactivityTimeout) {
            alert('Há 8 horas sem atividade. Por favor, responda se você ainda está aqui!');
            setTimeout(Auth.logout, 10000);
        }
    },
    
    resetTimer: () => {
        state.lastActivityTime = Date.now();
        Activity.startMonitoring();
    }
};

// Funções dos bosses
const Boss = {
    create: (group, bossName, user) => {
        if (document.getElementById(`boss-${bossName}`)) return;

        const card = document.createElement('div');
        card.className = 'boss-card';
        card.id = `boss-${bossName}`;

        card.innerHTML = `
            <div class="boss-gif">
                <img src="gifs/${bossName.toLowerCase().replace(/\s+/g, '_')}.gif" alt="${bossName}">
            </div>
            <button class="boss-btn">${bossName}</button>
            <div class="boss-timer"></div>
            <button class="reset-btn">Resetar</button>
        `;

        const btn = card.querySelector('.boss-btn');
        const timerEl = card.querySelector('.boss-timer');
        const resetBtn = card.querySelector('.reset-btn');

        btn.addEventListener('click', () => {
            if (!state.timers[user]?.[bossName]) {
                Timer.start(user, bossName, timerEl, btn);
            }
            Activity.resetTimer();
        });

        resetBtn.addEventListener('click', () => {
            Activity.resetTimer();
            if (confirm(`Deseja resetar ${bossName}?`)) {
                Timer.clear(user, bossName, btn, timerEl);
            }
        });

        document.getElementById(group).appendChild(card);
    },
    
    createAll: (user) => {
        for (const group in BOSSES) {
            BOSSES[group].forEach(bossName => Boss.create(group, bossName, user));
        }
    },
    
    toggleGroup: (group, button) => {
        document.querySelectorAll('.group').forEach(g => g.style.display = 'none');
        document.getElementById(group).style.display = 'flex';
        
        document.querySelectorAll('.menu button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        button.classList.add('active');
        Activity.resetTimer();
        
        // Mostra os filtros de nível apenas para o grupo solo
        const levelFilters = document.getElementById('levelFilters');
        if (group === 'solo') {
            levelFilters.style.display = 'flex';
            // Aplica o filtro atual
            Boss.filterByLevel(state.currentLevelFilter);
        } else {
            levelFilters.style.display = 'none';
        }
    },
    
    filterByLevel: (level) => {
        state.currentLevelFilter = level;
        const soloGroup = document.getElementById('solo');
        const allBossCards = soloGroup.querySelectorAll('.boss-card');
        
        allBossCards.forEach(card => {
            const bossName = card.querySelector('.boss-btn').textContent;
            const bossLevel = BOSS_LEVELS[bossName] || 0;
            
            if (level === 600) {
                card.style.display = 'block'; // Mostra todos para 600+
            } else if (bossLevel <= level) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Atualiza a classe active nos botões de nível
        document.querySelectorAll('#levelFilters button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes(level)) {
                btn.classList.add('active');
            }
        });
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!Auth.login(username, password)) {
            alert('Credenciais inválidas');
        }
    });
    
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        
        if (Auth.register(username, password)) {
            alert('Cadastro realizado!');
            DOM.hideElement('registerScreen');
            DOM.showElement('loginScreen');
        } else {
            alert('Usuário já existe!');
        }
    });
    
    // Verifica login persistente
    if (localStorage.getItem('token') && state.currentUser) {
        DOM.hideElement('loginScreen');
        DOM.showElement('mainScreen');
        Boss.createAll(state.currentUser);
        Timer.loadSavedTimers(state.currentUser);
        Activity.startMonitoring();
    }
});

// Funções globais (para chamadas via HTML)
window.toggleGroup = Boss.toggleGroup;
window.showRotationSuggestion = (type = 'pt') => {
    const rotationDiv = document.getElementById('rotationSuggestion');
    const textPT = document.getElementById('rotationTextPT');
    const textSolo = document.getElementById('rotationTextSolo');
    const btnPT = document.getElementById('suggestionButtonPT');
    const btnSolo = document.getElementById('suggestionButtonSolo');

    const isVisible = rotationDiv.style.display === 'block';
    const isSameTypeVisible = (type === 'pt' && textPT.style.display === 'block') || (type === 'solo' && textSolo.style.display === 'block');

    // Se já está visível e clicou no mesmo botão, esconde tudo
    if (isVisible && isSameTypeVisible) {
        rotationDiv.style.display = 'none';
        textPT.style.display = 'none';
        textSolo.style.display = 'none';
        btnPT.classList.remove('active');
        btnSolo.classList.remove('active');
    } else {
        rotationDiv.style.display = 'block';
        if (type === 'pt') {
            textPT.style.display = 'block';
            textSolo.style.display = 'none';
            btnPT.classList.add('active');
            btnSolo.classList.remove('active');
        } else {
            textPT.style.display = 'none';
            textSolo.style.display = 'block';
            btnPT.classList.remove('active');
            btnSolo.classList.add('active');
        }
    }
    Activity.resetTimer();
};

window.filterBossesByLevel = (level) => Boss.filterByLevel(level);
window.resetAllTimers = () => Timer.clearAll(state.currentUser);
window.logout = Auth.logout;
window.showRegisterForm = () => {
    DOM.hideElement('loginScreen');
    DOM.showElement('registerScreen');
};
window.hideRegisterForm = () => {
    DOM.hideElement('registerScreen');
    DOM.showElement('loginScreen');
};