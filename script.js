// =======================================================
// MÓDULO DE DADOS: CONSTANTES DE TEORIA MUSICAL (FINAL)
// =======================================================

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Mapeamento de nomes de modos para exibição (Completo com 7 graus por escala)
const MODE_NAMES = {
    // Diatônica Maior (7 Modos)
    'major': 'Jônio (Maior)',
    'dorian': 'Dórico',
    'phrygian': 'Frígio',
    'lydian': 'Lídio',
    'mixolydian': 'Mixolídio',
    'aeolian': 'Eólio (Menor Natural)',
    'locrian': 'Lócrio',

    // Menor Harmônica (7 Modos)
    'harmonic_minor': 'Menor Harmônica',
    'locrian_sharp6': 'Lócrio ♯6',
    'ionian_sharp5': 'Jônio ♯5',
    'dorian_sharp4': 'Dórico ♯4 (Ukrainiana)',
    'phrygian_dominant': 'Frígio Dominante',
    'lydian_sharp2': 'Lídio ♯2',
    'superlocrian_bb7': 'Superlócrio ♭♭7',

    // Menor Melódica Ascendente (Jazz) (7 Modos)
    'melodic_minor': 'Menor Melódica (Jazz)',
    'dorian_flat2': 'Dórico ♭2',
    'lydian_sharp5': 'Lídio ♯5',
    'lydian_flat7': 'Lídio ♭7',
    'mixolydian_flat6': 'Mixolídio ♭6',
    'locrian_sharp2': 'Lócrio ♯2',
    'superlocrian': 'Superlócrio (Alterada)',
};

// Mapeamento COMPLETO dos modos com seus INTERVALOS (semitons)
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
    'Triade': ['Maj', 'm', 'dim'], 
    'Setima': ['Maj7', 'm7', '7', 'mMaj7'], 
    'Extensao': ['Maj9', 'm9', '9', 'Maj13', 'm13', '13', 'm11'],
    'Suspenso': ['sus2', 'sus4', '7sus4'], 
    'Diminuto': ['dim7', 'm7(b5)'], 
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
    
    // Adiciona a opção "Aleatório" no topo
    let randomOption = document.createElement('option');
    randomOption.value = 'Aleatorio';
    randomOption.textContent = 'Aleatório';
    select.appendChild(randomOption);
    
    // Adiciona as opções de notas/modos
    for (const value in optionsMap) {
        let option = document.createElement('option');
        option.value = value;
        option.textContent = optionsMap[value];
        select.appendChild(option);
    }
}

// Inicializa o seletor de Tonalidade Base (Raiz)
function populateRootSelect() {
    const roots = {};
    NOTES.forEach(note => { roots[note] = note; });
    populateSelect('root-note', roots);
}

// Popula o seletor de Modos - Inclui Todos os Modos (21)
function populateModeSelect() {
    const modes = {};
    for (const key in MODE_NAMES) {
        modes[key] = MODE_NAMES[key];
    }
    populateSelect('modal-mode', modes);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa os selects
    populateRootSelect();
    populateModeSelect(); 
    
    // 2. Listeners
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

    // 3. Listeners de Ação
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

// --- Módulo 2A: Determinação da Raiz ---
function determineRootAtonal() {
    return getRandomElement(NOTES);
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
        case 'atonal': return determineRootAtonal();
        case 'modal-pura': return determineRootModal(rootNote, modeKey);
        case 'tonal-fixo': return determineRootFunctional(rootNote, prevRoot);
        case 'tonal-jazz': return determineRootJazz(rootNote, prevRoot);
        default: return NOTES[0];
    }
}

// --- Módulo 2B: Determinação da Qualidade (Corrigido para Coerência Diatônica) ---

/**
 * Constrói a qualidade diatônica base (Maj7, m7, 7, etc.) do acorde
 * usando os intervalos DO MODO ESPECÍFICO (a correção central).
 */
function constructDiatonicQuality(modeKey, rootIntervalIndex) {
    const modeIntervals = ALL_MODES_INTERVALS[modeKey];
    
    // Obter o intervalo cromático (0-11) para 3ª, 5ª e 7ª do acorde (em relação à raiz do acorde)
    const getChromaticInterval = (degreeIndex) => {
        const indexInMode = (rootIntervalIndex + degreeIndex) % 7;
        const interval = modeIntervals[indexInMode];
        const rootInterval = modeIntervals[rootIntervalIndex];
        return (interval - rootInterval + 12) % 12; // Transpõe para que a raiz do acorde seja 0
    };

    const third = getChromaticInterval(2); // 3ª
    const fifth = getChromaticInterval(4); // 5ª
    const seventh = getChromaticInterval(6); // 7ª

    let quality = '';

    // 1. Determina a Terça
    if (third === 3) { quality = 'm'; } // menor
    else if (third === 4) { quality = 'Maj'; } // maior
    else { return 'sus'; } // Deveria ser tratado pelo pool de complexidade

    // 2. Determina a Quinta
    if (fifth === 6) { quality += '(b5)'; } // diminuta
    else if (fifth === 8) { quality += '(#5)'; } // aumentada

    // 3. Determina a Sétima
    if (seventh === 10) { quality += '7'; } // menor
    else if (seventh === 11) { quality += 'Maj7'; } // maior
    
    // 4. Pós-processamento e limpeza para notação padrão
    
    // Se a qualidade já tem 7 ou Maj7, remove o Maj da tríade, senão mantém
    if (quality.includes('7') || quality.includes('Maj7')) {
        // Ex: mMaj7 (como na Melódica)
        return quality.replace('Maj', ''); 
    }
    
    // Tríade
    return quality.replace('Maj', ''); 
}


function determineQuality(root, context, settings) {
    const complexityPool = settings.complexityPool;
    const verticality = settings.verticality;
    const baseRoot = settings.rootNote;
    const modeKey = settings.modeKey; // Modo específico

    if (context === 'atonal') {
        const allQualities = complexityPool.flatMap(level => QUALITIES[level] || []);
        return getRandomElement(allQualities);
    }

    if (context === 'modal-pura' && verticality !== 'tercas') {
        return verticality === 'quartal' ? 'Quartal' : 'Quintal';
    }

    // --- Usa o Modo para garantir Coerência Diatônica ---
    const rootIndex = NOTES.indexOf(root);
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const semitonesFromRoot = (rootIndex - baseRootIndex + 12) % 12;
    
    let rootIntervalIndex = ALL_MODES_INTERVALS[modeKey].indexOf(semitonesFromRoot);

    let baseQuality = '7'; // Fallback para substituições não diatônicas (Jazz)
    if (rootIntervalIndex !== -1) {
        // Usa a lógica CORRIGIDA: constrói a qualidade baseada na escala do modo
        baseQuality = constructDiatonicQuality(modeKey, rootIntervalIndex);
    }

    const sortedLevel = getRandomElement(complexityPool);

    // [Restante da lógica de Complexidade é mantida, usando baseQuality]
    
    if (sortedLevel === 'Triade') {
        if (baseQuality.includes('Maj7') || baseQuality === 'Maj') return 'Maj';
        if (baseQuality.includes('m7') || baseQuality === 'm') return 'm';
        if (baseQuality.includes('(b5)')) return 'dim'; // Ex: m7(b5) -> dim
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

    // 1. Resolve o modo aleatório (se selecionado)
    if (modeKey === 'Aleatorio') {
        const allModes = Object.keys(ALL_MODES_INTERVALS);
        modeKey = getRandomElement(allModes);
    }
    
    // 2. Resolve a tonalidade base aleatória (se selecionada)
    if (baseRoot === 'Aleatorio') {
        baseRoot = getRandomElement(NOTES);
    }
    
    // Validação para evitar a geração se não houver modos/raiz selecionados
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

function getSuggestedScale(baseRoot, modeKey, context, customNotes) {
    if (context === 'atonal') return 'Escala Cromática (Todas as 12 notas)';

    const modeIntervals = ALL_MODES_INTERVALS[modeKey];
    const baseRootIndex = NOTES.indexOf(baseRoot);

    const notes = modeIntervals.map(interval => {
        const noteIndex = (baseRootIndex + interval) % NOTES.length;
        return NOTES[noteIndex];
    }).join(', ');
    
    let scaleName = MODE_NAMES[modeKey];
    if (context === 'tonal-jazz') scaleName = `Base Jazz: ${scaleName}`;

    return `${scaleName} (${baseRoot}): ${notes}`;
}

function updateResults(progressionArray) {
    const resultsDiv = document.getElementById('results');
    const progressionPre = document.getElementById('chord-progression');
    
    resultsDiv.style.display = 'block';

    const formattedProgression = progressionArray.map(measure => `| ${measure} `).join('');
    progressionPre.innerText = formattedProgression + '|';

    const baseRoot = currentSettings.rootNote;
    const modeKey = currentSettings.modeKey;
    
    document.getElementById('out-context').innerText = currentSettings.context.replace('-', ' ');
    
    document.getElementById('out-scale').innerText = getSuggestedScale(
        baseRoot, 
        modeKey, 
        currentSettings.context, 
        currentSettings.customNotes
    );
    
    const verticalityP = document.getElementById('out-verticality-p');
    if (currentSettings.context === 'modal-pura' && currentSettings.verticality !== 'tercas') {
        verticalityP.style.display = 'block';
        document.getElementById('out-verticality').innerText = currentSettings.verticality;
    } else {
        verticalityP.style.display = 'none';
    }
}
