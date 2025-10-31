// =======================================================
// MÓDULO DE DADOS: CONSTANTES DE TEORIA MUSICAL (REFATORADO)
// =======================================================

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Estrutura que agrupa os modos por sua "Família" (Maior/Menor/Melódica)
const SCALE_FAMILIES = {
    'Diatonica_Maior': { name: 'Diatônica Maior', modes: {
        'major': 'Jônio',
        'lydian': 'Lídio',
        'mixolydian': 'Mixolídio',
    }},
    'Diatonica_Menor': { name: 'Diatônica Menor', modes: {
        'aeolian': 'Eólio',
        'dorian': 'Dórico',
        'phrygian': 'Frígio',
        'locrian': 'Lócrio',
    }},
    'Harmonica_Menor': { name: 'Harmônica Menor', modes: {
        'harmonic_minor': 'Menor Harmônica',
        'phrygian_dominant': 'Frígio Dominante',
        'ionian_sharp5': 'Jônio #5',
    }},
    'Melodica_Menor': { name: 'Melódica Menor', modes: {
        'melodic_minor': 'Menor Melódica',
        'lydian_flat7': 'Lídio b7',
        'superlocrian': 'Superlócrio (Alterada)',
    }},
};

// Mapeamento COMPLETO dos modos com seus INTERVALOS (semitons)
const ALL_MODES_INTERVALS = {
    'major': [0, 2, 4, 5, 7, 9, 11],
    'dorian': [0, 2, 3, 5, 7, 9, 10],
    'phrygian': [0, 1, 3, 5, 7, 8, 10],
    'lydian': [0, 2, 4, 6, 7, 9, 11],
    'mixolydian': [0, 2, 4, 5, 7, 9, 10],
    'aeolian': [0, 2, 3, 5, 7, 8, 10],
    'locrian': [0, 1, 3, 5, 6, 8, 10],
    
    'harmonic_minor': [0, 2, 3, 5, 7, 8, 11],
    'phrygian_dominant': [0, 1, 4, 5, 7, 8, 10], 
    'ionian_sharp5': [0, 2, 4, 5, 8, 9, 11],
    
    'melodic_minor': [0, 2, 3, 5, 7, 9, 11],
    'lydian_flat7': [0, 2, 4, 6, 7, 9, 10],
    'superlocrian': [0, 1, 3, 4, 6, 8, 10], 
};

// Qualidades
const QUALITIES = {
    'Triade': ['Maj', 'm', 'dim'], 
    'Setima': ['Maj7', 'm7', '7', 'mMaj7'], 
    'Extensao': ['Maj9', 'm9', '9', 'Maj13', 'm13', '13', 'm11'],
    'Suspenso': ['sus2', 'sus4', '7sus4'], 
    'Diminuto': ['dim7', 'm7(b5)'], 
};

// Tensões Alteradas
const ALTERED_TENSIONS = ['b9', '#9', '#11', 'b13', '#5'];

// Mapeamento Funcional
const FUNCTION_MAP = {
    'I': 'T', 'VI': 'T', 'III': 'T',
    'II': 'SD', 'IV': 'SD',
    'V': 'D', 'VII': 'D'
};

// Regras de Transição (Sorteio Ponderado)
const FUNCTIONAL_RULES = {
    'T': [ { dest: 'SD', chance: 50 }, { dest: 'D', chance: 30 }, { dest: 'T', chance: 20 } ],
    'SD': [ { dest: 'D', chance: 60 }, { dest: 'T', chance: 40 } ],
    'D': [ { dest: 'T', chance: 90 }, { dest: 'SD', chance: 10 } ]
};


// =======================================================
// FUNÇÕES AUXILIARES GLOBAIS
// =======================================================

function weightedRandomSelection(rules) {
    const totalWeight = rules.reduce((sum, rule) => sum + rule.chance, 0);
    let randomNum = Math.random() * totalWeight; 

    for (const rule of rules) {
        if (randomNum < rule.chance) {
            return rule.dest; 
        }
        randomNum -= rule.chance;
    }
    return rules[rules.length - 1].dest; 
}

function getRandomElement(pool) {
    if (pool.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

function getNoteFromDegree(baseRoot, intervalIndex, modeKey = 'major') {
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const modeIntervals = ALL_MODES_INTERVALS[modeKey] || ALL_MODES_INTERVALS['major'];
    
    const intervalSemitones = modeIntervals[intervalIndex]; 
    const noteIndex = (baseRootIndex + intervalSemitones) % NOTES.length;
    return NOTES[noteIndex];
}

function getDiatonicQuality(interval) {
    switch (interval) {
        case 0: case 5: return 'Maj7';
        case 2: case 4: case 9: return 'm7';
        case 7: return '7';
        case 11: return 'm7(b5)';
        default: return 'Maj7';
    }
}


// =======================================================
// MÓDULO DE CONTROLE DE INTERFACE (Listeners)
// =======================================================

let currentProgression = []; 
let currentSettings = {}; 

function populateSelect(selectId, optionsMap) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    
    for (const value in optionsMap) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = optionsMap[value];
        select.appendChild(option);
    }
}

function populateRootSelect() {
    const roots = {};
    NOTES.forEach(note => { roots[note] = note; });
    populateSelect('root-note', roots);
}

function populateFamilySelect() {
    const families = {};
    for (const key in SCALE_FAMILIES) {
        families[key] = SCALE_FAMILIES[key].name;
    }
    populateSelect('scale-family', families);
}

function updateModeSelect() {
    const familyKey = document.getElementById('scale-family').value;
    const modesMap = SCALE_FAMILIES[familyKey].modes;
    populateSelect('modal-mode', modesMap);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa os selects da hierarquia
    populateRootSelect();
    populateFamilySelect();
    updateModeSelect(); 
    
    // 2. Listeners
    document.getElementById('scale-family').addEventListener('change', updateModeSelect);

    const contextSelect = document.getElementById('tonality-context');
    const tonalSelectsDiv = document.getElementById('tonal-selects');
    const userNotesInputDiv = document.getElementById('user-notes-input');
    const verticalitySelectDiv = document.getElementById('verticality-select');
    const generateButton = document.getElementById('generate-button');
    const transposeButton = document.getElementById('apply-transpose');

    contextSelect.addEventListener('change', () => {
        const context = contextSelect.value;
        const isModal = context === 'modal-pura';
        const isUserNotes = context === 'user-notes';
        const isAtonal = context === 'atonal';
        
        verticalitySelectDiv.style.display = isModal ? 'block' : 'none';
        tonalSelectsDiv.style.display = (isUserNotes || isAtonal) ? 'none' : 'block';
        userNotesInputDiv.style.display = isUserNotes ? 'block' : 'none';

        document.getElementById('modal-mode-select').style.display = 
            (isModal || context === 'tonal-jazz' || context === 'tonal-fixo') ? 'block' : 'none';
    });

    generateButton.addEventListener('click', generateProgression);

    transposeButton.addEventListener('click', () => {
        const value = parseInt(document.getElementById('transpose-value').value);
        if (currentProgression.length > 0 && value !== 0) {
            const baseRoot = document.getElementById('root-note').value;
            
            currentProgression = transposeProgression(currentProgression, value);
            
            // Simulação de atualização da raiz (o usuário precisaria atualizar o select)
            // Para simplificar, armazenamos a nova raiz nos settings para a análise de saída
            const newBaseRoot = transposeNote(baseRoot, value);
            currentSettings.rootNote = newBaseRoot; 
            updateResults(currentProgression);
        }
    });

    document.getElementById('copy-button').addEventListener('click', () => {
        const progressionText = document.getElementById('chord-progression').innerText;
        navigator.clipboard.writeText(progressionText).then(() => {
            alert('Progressão copiada!');
        });
    });
});


// =======================================================
// MÓDULO PRINCIPAL DE GERAÇÃO (Módulo 2)
// =======================================================

// --- Módulo 2A: Determinação da Raiz ---
function determineRootAtonal() {
    const randomIndex = Math.floor(Math.random() * NOTES.length);
    return NOTES[randomIndex];
}

function determineRootCustom(customNotes) {
    const noteArray = customNotes.toUpperCase().split(',').map(n => n.trim()).filter(n => NOTES.includes(n));
    if (noteArray.length === 0) return NOTES[0];

    return getRandomElement(noteArray);
}

function determineRootModal(baseRoot, modeKey) {
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const modeIntervals = ALL_MODES_INTERVALS[modeKey];

    const diatonicNotes = modeIntervals.map(interval => {
        const noteIndex = (baseRootIndex + interval) % NOTES.length;
        return NOTES[noteIndex];
    });

    const randomIndex = Math.floor(Math.random() * diatonicNotes.length);
    return diatonicNotes[randomIndex];
}

function determineRootFunctional(baseRoot, prevRoot) {
    if (!prevRoot) { return baseRoot; }
    
    const prevRootIndex = NOTES.indexOf(prevRoot);
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const semitonesFromTonic = (prevRootIndex - baseRootIndex + 12) % 12;
    
    let prevFunction = (semitonesFromTonic === 7) ? 'D' : 'T'; 

    const nextFunction = weightedRandomSelection(FUNCTIONAL_RULES[prevFunction]);

    const possibleDegreesRoman = Object.keys(FUNCTION_MAP).filter(degree => FUNCTION_MAP[degree] === nextFunction);
    const degreeMap = { 'I': 0, 'II': 1, 'III': 2, 'IV': 3, 'V': 4, 'VI': 5, 'VII': 6 };
    
    const randomDegreeRoman = possibleDegreesRoman[Math.floor(Math.random() * possibleDegreesRoman.length)];
    const nextDegreeIntervalIndex = degreeMap[randomDegreeRoman];
    
    return getNoteFromDegree(baseRoot, nextDegreeIntervalIndex); 
}

function determineRootJazz(baseRoot, prevRoot) {
    const randomChance = Math.random();

    if (randomChance < 0.6) {
        return determineRootFunctional(baseRoot, prevRoot);
    } else if (randomChance < 0.8) {
        const targetDegrees = [1, 2, 3, 4, 5]; 
        const targetIndex = targetDegrees[Math.floor(Math.random() * targetDegrees.length)];
        const targetRoot = getNoteFromDegree(baseRoot, targetIndex); 
        return getNoteFromDegree(targetRoot, 4); 
    } else {
        if (prevRoot && prevRoot === getNoteFromDegree(baseRoot, 4)) {
             const VIndex = NOTES.indexOf(prevRoot);
             return NOTES[(VIndex + 6) % 12];
        }
        return determineRootFunctional(baseRoot, prevRoot); 
    }
}

function determineRoot(context, prevRoot, settings) {
    const rootNote = settings.rootNote; 
    const modeKey = settings.modeKey; 

    switch (context) {
        case 'atonal': return determineRootAtonal
