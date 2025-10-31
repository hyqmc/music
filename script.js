// =======================================================
// MÓDULO DE DADOS: CONSTANTES DE TEORIA MUSICAL (FINAL)
// =======================================================

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const BASE_NOTE_MAP = ['C', 'D', 'E', 'F', 'G', 'A', 'B']; 
const BLACK_KEYS_CHROMA = [1, 3, 6, 8, 10]; // Índices cromáticos (C=0)

const MODE_NAMES = {
    'major': 'Jônio (Maior)', 'dorian': 'Dórico', 'phrygian': 'Frígio', 'lydian': 'Lídio',
    'mixolydian': 'Mixolídio', 'aeolian': 'Eólio (Menor Natural)', 'locrian': 'Lócrio',
    'harmonic_minor': 'Menor Harmônica', 'locrian_sharp6': 'Lócrio ♯6',
    'ionian_sharp5': 'Jônio ♯5', 'dorian_sharp4': 'Dórico ♯4 (Ukrainiana)',
    'phrygian_dominant': 'Frígio Dominante', 'lydian_sharp2': 'Lídio ♯2',
    'superlocrian_bb7': 'Superlócrio ♭♭7',
    'melodic_minor': 'Menor Melódica (Jazz)', 'dorian_flat2': 'Dórico ♭2',
    'lydian_sharp5': 'Lídio ♯5', 'lydian_flat7': 'Lídio ♭7',
    'mixolydian_flat6': 'Mixolídio ♭6', 'locrian_sharp2': 'Lócrio ♯2',
    'superlocrian': 'Superlócrio (Alterada)',
};

const ALL_MODES_INTERVALS = {
    'major': [0, 2, 4, 5, 7, 9, 11], 'dorian': [0, 2, 3, 5, 7, 9, 10], 'phrygian': [0, 1, 3, 5, 7, 8, 10],
    'lydian': [0, 2, 4, 6, 7, 9, 11], 'mixolydian': [0, 2, 4, 5, 7, 9, 10], 'aeolian': [0, 2, 3, 5, 7, 8, 10],
    'locrian': [0, 1, 3, 5, 6, 8, 10],
    'harmonic_minor': [0, 2, 3, 5, 7, 8, 11], 'locrian_sharp6': [0, 1, 3, 5, 6, 9, 10],
    'ionian_sharp5': [0, 2, 4, 5, 8, 9, 11], 'dorian_sharp4': [0, 2, 3, 6, 7, 9, 10], 
    'phrygian_dominant': [0, 1, 4, 5, 7, 8, 10], 'lydian_sharp2': [0, 3, 4, 6, 7, 9, 11],
    'superlocrian_bb7': [0, 1, 3, 4, 6, 8, 9], 
    'melodic_minor': [0, 2, 3, 5, 7, 9, 11], 'dorian_flat2': [0, 1, 3, 5, 7, 9, 10],
    'lydian_sharp5': [0, 2, 4, 6, 8, 9, 11], 'lydian_flat7': [0, 2, 4, 6, 7, 9, 10],
    'mixolydian_flat6': [0, 2, 4, 5, 7, 8, 10], 'locrian_sharp2': [0, 2, 3, 5, 6, 8, 10],
    'superlocrian': [0, 1, 3, 4, 6, 8, 10], 
};

const QUALITIES = {
    'Triade': ['Maj', 'm', 'dim'], 'Setima': ['Maj7', 'm7', '7', 'mMaj7'], 
    'Extensao': ['Maj9', 'm9', '9', 'Maj13', 'm13', '13', 'm11'],
    'Suspenso': ['sus2', 'sus4', '7sus4'], 'Diminuto': ['dim7', 'm7(b5)'], 
};
const ALTERED_TENSIONS = ['b9', '#9', '#11', 'b13', '#5'];
const FUNCTION_MAP = { 'I': 'T', 'VI': 'T', 'III': 'T', 'II': 'SD', 'IV': 'SD', 'V': 'D', 'VII': 'D' };
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
        if (randomNum < rule.chance) { return rule.dest; }
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
        case 0: case 5: return 'Maj7'; case 2: case 4: case 9: return 'm7';
        case 7: return '7'; case 11: return 'm7(b5)';
        default: return 'Maj7';
    }
}


// =======================================================
// MÓDULO DE INICIALIZAÇÃO E LISTENERS
// =======================================================

let currentProgression = []; 
let currentSettings = {}; 

function populateSelect(selectId, optionsMap) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    
    let randomOption = document.createElement('option');
    randomOption.value = 'Aleatorio';
    randomOption.textContent = 'Aleatório';
    select.appendChild(randomOption);
    
    for (const value in optionsMap) {
        let option = document.createElement('option');
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

function populateModeSelect() {
    const modes = {};
    for (const key in MODE_NAMES) {
        modes[key] = MODE_NAMES[key];
    }
    populateSelect('modal-mode', modes);
}

document.addEventListener('DOMContentLoaded', () => {
    populateRootSelect();
    populateModeSelect(); 
    
    const contextSelect = document.getElementById('tonality-context');
    const tonalSelectsDiv = document.getElementById('tonal-selects');
    const verticalitySelectDiv = document.getElementById('verticality-select');

    contextSelect.addEventListener('change', () => {
        const context = contextSelect.value;
        const isModal = context === 'modal-pura';
        const isAtonal = context === 'atonal';
        
        verticalitySelectDiv.style.display = isModal ? 'block' : 'none';
        tonalSelectsDiv.style.display = isAtonal ? 'none' : 'block';
        
        document.getElementById('modal-mode-select').style.display = isAtonal ? 'none' : 'block';
    });

    document.getElementById('generate-button').addEventListener('click', generateProgression);
    document.getElementById('apply-transpose').addEventListener('click', () => {
        const value = parseInt(document.getElementById('transpose-value').value);
        if (currentProgression.length > 0 && value !== 0) {
            const baseRoot = currentSettings.rootNote; 
            const newBaseRoot = transposeNote(baseRoot, value);
            
            currentProgression = transposeProgression(currentProgression, value);
            
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

function determineRootAtonal() {
    return getRandomElement(NOTES);
}

function determineRootModal(baseRoot, prevRoot, modeKey) {
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const modeIntervals = ALL_MODES_INTERVALS[modeKey];

    const diatonicNotes = modeIntervals.map(interval => {
        const noteIndex = (baseRootIndex + interval) % NOTES.length;
        return NOTES[noteIndex];
    });

    if (!prevRoot) { return baseRoot; }
    
    if (Math.random() < 0.5) {
        if (Math.random() < 0.4) {
            return baseRoot;
        }
        return getRandomElement(diatonicNotes);
    }
    return prevRoot;
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
        case 'atonal': return determineRootAtonal();
        case 'modal-pura': return determineRootModal(rootNote, prevRoot, modeKey);
        case 'tonal-fixo': return determineRootFunctional(rootNote, prevRoot);
        case 'tonal-jazz': return determineRootJazz(rootNote, prevRoot);
        default: return NOTES[0];
    }
}

// --- Módulo 2B: Determinação da Qualidade (Lógica Diatônica) ---

function constructDiatonicQuality(modeKey, rootIntervalIndex) {
    const modeIntervals = ALL_MODES_INTERVALS[modeKey];
    
    const getChromaticInterval = (degreeIndex) => {
        const indexInMode = (rootIntervalIndex + degreeIndex) % 7;
        const interval = modeIntervals[indexInMode];
        const rootInterval = modeIntervals[rootIntervalIndex];
        return (interval - rootInterval + 12) % 12;
    };

    const third = getChromaticInterval(2); 
    const fifth = getChromaticInterval(4); 
    const seventh = getChromaticInterval(6); 

    let quality = '';

    if (third === 3) { quality = 'm'; } 
    else if (third === 4) { quality = 'Maj'; } 
    else { return 'sus'; } 

    if (fifth === 6) { quality += '(b5)'; } 
    else if (fifth === 8) { quality += '(#5)'; } 

    if (seventh === 10) { quality += '7'; } 
    else if (seventh === 11) { quality += 'Maj7'; } 
    
    if (quality.includes('7') || quality.includes('Maj7')) {
        return quality.replace('Maj', ''); 
    }
    
    return quality.replace('Maj', ''); 
}


function determineQuality(root, context, settings) {
    const complexityPool = settings.complexityPool;
    const verticality = settings.verticality;
    const baseRoot = settings.rootNote;
    const modeKey = settings.modeKey; 

    if (context === 'atonal') {
        const allQualities = complexityPool.flatMap(level => QUALITIES[level] || []);
        return getRandomElement(allQualities);
    }

    if (context === 'modal-pura' && verticality !== 'tercas') {
        return verticality === 'quartal' ? 'Quartal' : 'Quintal';
    }

    const rootIndex = NOTES.indexOf(root);
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const semitonesFromRoot = (rootIndex - baseRootIndex + 12) % 12;
    
    let rootIntervalIndex = ALL_MODES_INTERVALS[modeKey].indexOf(semitonesFromRoot);

    let baseQuality = '7'; 
    if (rootIntervalIndex !== -1) {
        baseQuality = constructDiatonicQuality(modeKey, rootIntervalIndex);
    }

    const sortedLevel = getRandomElement(complexityPool);

    if (sortedLevel === 'Triade') {
        if (baseQuality.includes('Maj7') || baseQuality === 'Maj') return 'Maj';
        if (baseQuality.includes('m7') || baseQuality === 'm') return 'm';
        if (baseQuality.includes('(b5)')) return 'dim'; 
        return baseQuality.replace('7', '');
    }
    
    if (sortedLevel === 'Extensao') {
        const possibleExtensions = ['9', '13']; 
        let extension = getRandomElement(possibleExtensions);

        if (baseQuality.startsWith('m')) { extension = '9'; }
        
        if (baseQuality === '7' || baseQuality.includes('Maj7')) { return baseQuality.replace('7', extension).replace('Maj', 'Maj'); }
        return baseQuality.replace('7', '') + extension;
    }
    
    if (sortedLevel === 'Suspenso') {
        const susQualities = QUALITIES['Suspenso'];
        if (baseQuality.includes('7') || baseQuality.includes('Maj')) {
            return getRandomElement(susQualities);
        }
    }
    
    return baseQuality; 
}


function getFunctionalBass(root, baseRoot) {
    const rootIndex = NOTES.indexOf(root);
    const degrees = [];
    
    degrees.push(root); 
    degrees.push(NOTES[(rootIndex + 4) % 12]);
    degrees.push(NOTES[(rootIndex + 7) % 12]);
    degrees.push(baseRoot);
    
    return getRandomElement(degrees);
}

function applyColoring(root, quality, context, settings) {
    const { includeBass, includeTensions, rootNote } = settings;
    const baseRoot = rootNote; 
    
    let tensions = '';
    let bass = '';

    if (includeBass) {
        if (context === 'atonal') {
            bass = NOTES[Math.floor(Math.random() * NOTES.length)];
        } else {
            bass = getFunctionalBass(root, baseRoot);
            if (context === 'modal-pura') bass = baseRoot; 
        }
        
        if (bass !== root) { bass = `/${bass}`; } else { bass = ''; }
    }

    if (includeTensions) {
        if (context === 'atonal') {
            tensions = `(${getRandomElement(ALTERED_TENSIONS)})`;
        } else if (context === 'tonal-jazz' || context === 'tonal-fixo') {
            if (quality.includes('7') || quality.includes('9') || quality.includes('13')) {
                const alterationChance = (context === 'tonal-jazz') ? 0.6 : 0.3;
                
                if (Math.random() < alterationChance) {
                    let tension = getRandomElement(ALTERED_TENSIONS);
                    if (Math.random() < 0.3 && context === 'tonal-jazz') {
                        let tension2 = getRandomElement(ALTERED_TENSIONS.filter(t => t !== tension));
                        tension = tension + ', ' + tension2;
                    }
                    tensions = `(${tension})`; 
                }
            }
        } else if (context === 'modal-pura') {
            tensions = '';
        }
    }

    return { tensions, bass };
}

function generateProgression() {
    const context = document.getElementById('tonality-context').value;
    const numMeasures = parseInt(document.getElementById('num-measures').value);
    const chordsPerMeasureStr = document.getElementById('chords-per-measure').value;
    const structure = chordsPerMeasureStr.split(',').map(s => parseInt(s.trim()));
    
    const complexityPool = Array.from(document.querySelectorAll('#complexity-settings input:checked')).map(c => c.value);

    let baseRoot = document.getElementById('root-note').value;
    let modeKey = document.getElementById('modal-mode').value;

    if (modeKey === 'Aleatorio') {
        const allModes = Object.keys(ALL_MODES_INTERVALS);
        modeKey = getRandomElement(allModes);
    }
    
    if (baseRoot === 'Aleatorio') {
        baseRoot = getRandomElement(NOTES);
    }
    
    if (context !== 'atonal' && (baseRoot === '' || modeKey === '')) {
        alert('Erro: Por favor, selecione a Tonalidade Base e o Modo Específico (ou "Aleatório").');
        return;
    }

    currentSettings = {
        context,
        rootNote: baseRoot,
        modeKey: modeKey,
        verticality: document.getElementById('modal-verticality').value,
        customNotes: '',
        complexityPool,
        includeBass: document.getElementById('c-bass').checked,
        includeTensions: document.getElementById('c-tensions').checked,
    };
    
    if (structure.length !== numMeasures || structure.some(isNaN)) {
        alert('Erro: A estrutura rítmica deve ter o mesmo número de entradas que o número de compassos.');
        return;
    }

    const progression = [];
    let prevRoot = null; 

    for (let i = 0; i < numMeasures; i++) {
        const numChords = structure[i];
        let measure = '';

        for (let j = 0; j < numChords; j++) {
            const root = determineRoot(context, prevRoot, currentSettings); 
            let quality = determineQuality(root, context, currentSettings);
            const coloring = applyColoring(root, quality, context, currentSettings);
            let bass = coloring.bass; 
            let tensions = coloring.tensions; 

            if (quality.includes('Quartal') || quality.includes('Quintal')) {
                 quality = `^${quality}`; 
                 tensions = '';
                 if (context === 'modal-pura') bass = `/${currentSettings.rootNote}`; 
            }
            
            const chord = `${root}${quality}${tensions}${bass}`;
            measure += (j > 0 ? ' ' : '') + chord;
            
            prevRoot = root; 
        }
        progression.push(measure); 
    }

    currentProgression = progression;
    updateResults(currentProgression);
}


// =======================================================
// MÓDULO 3: PÓS-PROCESSAMENTO E SAÍDA
// =======================================================

function transposeNote(note, steps) {
    const index = NOTES.indexOf(note);
    if (index === -1) return note; 
    
    const newIndex = (index + steps + 12) % 12;
    return NOTES[newIndex];
}

function transposeProgression(progressionArray, semitones) {
    if (semitones === 0) return progressionArray;
    const newProgression = [];
    const chordRegex = /([A-G][#b]?)([^/]*)(?:\/([A-G][#b]?))?/g;

    for (const measure of progressionArray) {
        const transposedMeasure = measure.replace(chordRegex, (match, root, qualityTension, bass) => {
            
            const newRoot = transposeNote(root, semitones);
            
            let newBass = '';
            if (bass) {
                newBass = '/' + transposeNote(bass, semitones);
            }

            return `${newRoot}${qualityTension}${newBass}`;
        });

        newProgression.push(transposedMeasure);
    }
    return newProgression;
}

/**
 * CORREÇÃO ENHARMÔNICA: Garante 7 letras únicas (C, D, E, F, G, A, B).
 */
function standardizeScaleSpelling(baseRoot, modeKey) {
    const rootChromaIndex = NOTES.indexOf(baseRoot);
    const modeIntervals = ALL_MODES_INTERVALS[modeKey];
    
    const chromaIndices = modeIntervals.map(interval => (rootChromaIndex + interval) % 12);
    
    const rootLetter = baseRoot.charAt(0);
    const rootLetterIndex = BASE_NOTE_MAP.indexOf(rootLetter);
    
    const finalNotes = [];

    for (let i = 0; i < 7; i++) {
        const targetChromaIndex = chromaIndices[i];
        const expectedLetter = BASE_NOTE_MAP[(rootLetterIndex + i) % 7];
        
        let naturalIndex = NOTES.indexOf(expectedLetter);
        
        let diff = (targetChromaIndex - naturalIndex + 12) % 12;
        
        if (diff > 6) diff -= 12;

        let spelledNote = expectedLetter;

        if (diff === 1) spelledNote += '#';
        else if (diff === 2) spelledNote += '##';
        else if (diff === -1) spelledNote += 'b';
        else if (diff === -2) spelledNote += 'bb';

        finalNotes.push(spelledNote);
    }

    return finalNotes.join(', ');
}


function getSuggestedScale(baseRoot, modeKey, context, customNotes) {
    if (context === 'atonal') return 'Escala Cromática (Todas as 12 notas)';

    const notes = standardizeScaleSpelling(baseRoot, modeKey);
    
    let scaleName = MODE_NAMES[modeKey];
    if (context === 'tonal-jazz') scaleName = `Base Jazz: ${scaleName}`;

    return `${scaleName} (${baseRoot}): ${notes}`;
}

/**
 * Renderiza o teclado de piano com as notas destacadas.
 */
function renderPianoKeyboard(baseRoot, modeKey) {
    const keyboardContainer = document.getElementById('piano-keyboard');
    keyboardContainer.innerHTML = '';
    
    if (currentSettings.context === 'atonal') {
         keyboardContainer.textContent = "Teclado não disponível para contexto Atonal";
         return;
    }

    const modeIntervals = ALL_MODES_INTERVALS[modeKey];
    const rootChromaIndex = NOTES.indexOf(baseRoot);

    const scaleChromaIndices = modeIntervals.map(interval => (rootChromaIndex + interval) % 12);

    let keyOffset = 0; // Posição X da tecla branca

    for (let i = 0; i < 21; i++) { // Renderiza 3 oitavas (para cobrir todas as notas)
        const chromaIndex = i % 12;
        const note = NOTES[chromaIndex];
        const isBlackKey = BLACK_KEYS_CHROMA.includes(chromaIndex);
        const isHighlighted = scaleChromaIndices.includes(chromaIndex);
        
        const key = document.createElement('div');
        key.textContent = note.replace('b', '♭').replace('#', '♯');
        key.classList.add('key');

        const octaveOffset = Math.floor(i / 7) * 50 * 7; // Múltiplo de 350px por oitava

        if (!isBlackKey) {
            key.classList.add('white-key');
            key.style.left = `${keyOffset * 50}px`;
            keyOffset++;
        } else {
            key.classList.add('black-key');
            // Mapeamento preciso das posições das teclas pretas
            let relativeOffset = 0;
            if (chromaIndex === 1) relativeOffset = 33; 
            else if (chromaIndex === 3) relativeOffset = 83; 
            else if (chromaIndex === 6) relativeOffset = 183; 
            else if (chromaIndex === 8) relativeOffset = 233; 
            else if (chromaIndex === 10) relativeOffset = 283; 
            
            key.style.left = `${relativeOffset + octaveOffset}px`;
        }
        
        if (isHighlighted) {
            key.classList.add(isBlackKey ? 'highlighted-black' : 'highlighted-white');
        }
        
        keyboardContainer.appendChild(key);
    }
}


/**
 * Cria o bloco de texto unificado para cópia (Cifra + Geradores).
 */
function createUnifiedOutput(progressionArray, settings) {
    const { context, rootNote, modeKey, verticality } = settings;
    
    // 1. Progressão Cifrada Formatada
    const formattedProgression = progressionArray.map(measure => `| ${measure} `).join('') + '|';

    // 2. Geração da Análise
    const suggestedScaleText = getSuggestedScale(rootNote, modeKey, context, settings.customNotes);
    
    let output = '';
    
    // --- PROGRESSÃO (Primeiro bloco de cópia) ---
    output += `// PROGRESSÃO\n`;
    output += formattedProgression;
    
    // --- GERADORES (Segundo bloco de cópia) ---
    output += `\n// GERADORES\n`;
    output += `Contexto: ${context.replace('-', ' ')}\n`;
    
    if (context !== 'atonal') {
        output += `Tonalidade Raiz: ${rootNote}\n`;
        output += `Modo: ${MODE_NAMES[modeKey]}\n`;
        
        if (context === 'modal-pura' && verticality !== 'tercas') {
            output += `Verticalidade: ${verticality}\n`;
        }
        
        // Inclui a escala sugerida (apenas as notas)
        output += `Escala Sugerida: ${suggestedScaleText.split(': ')[1]}\n`;
    } else {
         output += `Escala Sugerida: ${suggestedScaleText}\n`;
    }
    
    return output;
}


function updateResults(progressionArray) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'flex';

    const baseRoot = currentSettings.rootNote;
    const modeKey = currentSettings.modeKey;
    const verticality = currentSettings.verticality;

    // 1. Atualiza a Saída de Cópia (Bloco 3)
    const unifiedOutput = createUnifiedOutput(progressionArray, currentSettings);
    document.getElementById('chord-progression').innerText = unifiedOutput;

    // 2. Atualiza a Progressão Visível (Bloco 1)
    const formattedProgression = currentProgression.map(measure => `| ${measure} `).join('') + '|';
    document.getElementById('visual-progression').innerText = formattedProgression;

    // 3. Renderiza o Teclado (Visual)
    renderPianoKeyboard(baseRoot, modeKey);
    
    // 4. Atualiza o Sumário (Visual)
    const suggestedScaleName = getSuggestedScale(baseRoot, modeKey, currentSettings.context).split('(')[0].trim();
    document.getElementById('out-scale-name').innerText = `${suggestedScaleName} (${baseRoot})`;
    document.getElementById('out-context').innerText = currentSettings.context.replace('-', ' ');
    document.getElementById('out-root').innerText = baseRoot;
    document.getElementById('out-mode').innerText = MODE_NAMES[modeKey];

    const verticalityP = document.getElementById('out-verticality-p');
    const isModalVertical = currentSettings.context === 'modal-pura' && verticality !== 'tercas';
    
    if (isModalVertical) {
        verticalityP.style.display = 'block';
        document.getElementById('out-verticality').innerText = verticality;
    } else {
        verticalityP.style.display = 'none';
    }
}
