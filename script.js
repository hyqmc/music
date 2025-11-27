// =======================================================
// MÓDULO DE DADOS: CONSTANTES DE TEORIA MUSICAL (FINAL)
// =======================================================

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const BASE_NOTE_MAP = ['C', 'D', 'E', 'F', 'G', 'A', 'B']; 
const BLACK_KEYS_CHROMA = [1, 3, 6, 8, 10]; 

const SCALES_DATA = {
    'major_diatonic': {
        name: 'Maior (Diatônica)',
        modes: [
            { key: 'major', name: 'Jônio (Maior)', intervals: [0, 2, 4, 5, 7, 9, 11] },
            { key: 'dorian', name: 'Dórico', intervals: [0, 2, 3, 5, 7, 9, 10] },
            { key: 'phrygian', name: 'Frígio', intervals: [0, 1, 3, 5, 7, 8, 10] },
            { key: 'lydian', name: 'Lídio', intervals: [0, 2, 4, 6, 7, 9, 11] },
            { key: 'mixolydian', name: 'Mixolídio', intervals: [0, 2, 4, 5, 7, 9, 10] },
            { key: 'aeolian', name: 'Eólio (Menor Natural)', intervals: [0, 2, 3, 5, 7, 8, 10] },
            { key: 'locrian', name: 'Lócrio', intervals: [0, 1, 3, 5, 6, 8, 10] },
        ]
    },
    'harmonic_minor': {
        name: 'Menor Harmônica',
        modes: [
            { key: 'harmonic_minor', name: 'Menor Harmônica', intervals: [0, 2, 3, 5, 7, 8, 11] },
            { key: 'locrian_sharp6', name: 'Lócrio ♯6', intervals: [0, 1, 3, 5, 6, 9, 10] },
            { key: 'ionian_sharp5', name: 'Jônio ♯5', intervals: [0, 2, 4, 5, 8, 9, 11] },
            { key: 'dorian_sharp4', name: 'Dórico ♯4 (Ukrainiana)', intervals: [0, 2, 3, 6, 7, 9, 10] },
            { key: 'phrygian_dominant', name: 'Frígio Dominante', intervals: [0, 1, 4, 5, 7, 8, 10] },
            { key: 'lydian_sharp2', name: 'Lídio ♯2', intervals: [0, 3, 4, 6, 7, 9, 11] },
            { key: 'superlocrian_bb7', name: 'Superlócrio ♭♭7', intervals: [0, 1, 3, 4, 6, 8, 9] }, 
        ]
    },
    'melodic_minor': {
        name: 'Menor Melódica (Jazz)',
        modes: [
            { key: 'melodic_minor', name: 'Menor Melódica (Jazz)', intervals: [0, 2, 3, 5, 7, 9, 11] },
            { key: 'dorian_flat2', name: 'Dórico ♭2', intervals: [0, 1, 3, 5, 7, 9, 10] },
            { key: 'lydian_sharp5', name: 'Lídio ♯5', intervals: [0, 2, 4, 6, 8, 9, 11] },
            { key: 'lydian_flat7', name: 'Lídio ♭7', intervals: [0, 2, 4, 6, 7, 9, 10] },
            { key: 'mixolydian_flat6', name: 'Mixolídio ♭6', intervals: [0, 2, 4, 5, 7, 8, 10] },
            { key: 'locrian_sharp2', name: 'Lócrio ♯2', intervals: [0, 2, 3, 5, 6, 8, 10] },
            { key: 'superlocrian', name: 'Superlócrio (Alterada)', intervals: [0, 1, 3, 4, 6, 8, 10] }, 
        ]
    },
    'harmonic_major': { 
        name: 'Maior Harmônica',
        modes: [
            { key: 'harmonic_major', name: 'Jônio ♭6', intervals: [0, 2, 4, 5, 7, 8, 11] },
            { key: 'dorian_flat5', name: 'Dórico ♭5', intervals: [0, 2, 3, 5, 6, 9, 10] },
            { key: 'phrygian_flat4', name: 'Frígio ♭4', intervals: [0, 1, 3, 4, 7, 8, 10] },
            { key: 'lydian_flat3', name: 'Lídio ♭3', intervals: [0, 2, 3, 6, 7, 9, 11] },
            { key: 'mixolydian_flat2', name: 'Mixolídio ♭2', intervals: [0, 1, 4, 5, 7, 9, 10] },
            { key: 'lydian_augmented_sharp2', name: 'Lídio ♯2 ♯5', intervals: [0, 3, 4, 6, 8, 9, 11] },
            { key: 'locrian_flat7', name: 'Lócrio ♭♭7', intervals: [0, 1, 3, 5, 6, 8, 9] }, 
        ]
    },
    'bebop': {
        name: 'Bebop (8 Notas)',
        modes: [
            { key: 'bebop_major', name: 'Bebop Maior', intervals: [0, 2, 4, 5, 7, 8, 9, 11] }, 
            { key: 'bebop_dominant', name: 'Bebop Dominante', intervals: [0, 2, 4, 5, 7, 9, 10, 11] }, 
        ]
    },
    'diminished': {
        name: 'Diminuta (Octatônica)',
        modes: [
            { key: 'diminished_w_h', name: 'Tom-Semitom', intervals: [0, 2, 3, 5, 6, 8, 9, 11] },
            { key: 'diminished_h_w', name: 'Semitom-Tom', intervals: [0, 1, 3, 4, 6, 7, 9, 10] },
        ]
    },
    'whole_tone': {
        name: 'Tons Inteiros (Hexatônica)',
        modes: [
            { key: 'whole_tone', name: 'Tons Inteiros', intervals: [0, 2, 4, 6, 8, 10] },
        ]
    },
    'pentatonic': {
        name: 'Pentatônica (5 Notas)',
        modes: [
            { key: 'penta_major', name: 'Pentatônica Maior', intervals: [0, 2, 4, 7, 9] },
            { key: 'penta_minor', name: 'Pentatônica Menor', intervals: [0, 3, 5, 7, 10] },
        ]
    }
};

const ENHARMONIC_MAP = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
    'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
};

const QUALITIES = {
    'Triade': ['Maj', 'm', 'dim'], 
    'Setima': ['Maj7', 'm7', '7', 'mMaj7'], 
    'Extensao': ['Maj9', 'm9', '9', 'Maj13', 'm13', '13', 'm11'],
    'Suspenso': ['sus2', 'sus4', '7sus4'], 
    'Diminuto': ['dim7', 'm7(b5)'],
    'Aumentado': ['Aug', 'Maj7(#5)'], 
    'Power': ['5'], 
};
const ALTERED_TENSIONS = ['b9', '#9', '#11', 'b13', '#5'];
const FUNCTION_MAP = { 'I': 'T', 'VI': 'T', 'III': 'T', 'II': 'SD', 'IV': 'SD', 'V': 'D', 'VII': 'D' };
const FUNCTIONAL_RULES = {
    'T': [ { dest: 'SD', chance: 50 }, { dest: 'D', chance: 30 }, { dest: 'T', chance: 20 } ],
    'SD': [ { dest: 'D', chance: 60 }, { dest: 'T', chance: 40 } ],
    'D': [ { dest: 'T', chance: 90 }, { dest: 'SD', chance: 10 } ]
};


// =======================================================
// FUNÇÕES AUXILIARES E LÓGICA DE IMPROVISO 
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

function getModeIntervals(modeKey) {
    for (const scaleKey in SCALES_DATA) {
        const modes = SCALES_DATA[scaleKey].modes;
        const foundMode = modes.find(m => m.key === modeKey);
        if (foundMode) return foundMode.intervals;
    }
    return SCALES_DATA.major_diatonic.modes[0].intervals; 
}

function getModeName(modeKey) {
    for (const scaleKey in SCALES_DATA) {
        const modes = SCALES_DATA[scaleKey].modes;
        const foundMode = modes.find(m => m.key === modeKey);
        if (foundMode) return foundMode.name;
    }
    return 'Modo Desconhecido';
}

function getNoteFromDegree(baseRoot, intervalIndex, modeKey = 'major') {
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const modeIntervals = getModeIntervals(modeKey) || SCALES_DATA.major_diatonic.modes[0].intervals;
    const intervalSemitones = modeIntervals[intervalIndex]; 
    const noteIndex = (baseRootIndex + intervalSemitones) % NOTES.length;
    return NOTES[noteIndex];
}

function standardizeAccidentals(note, accidentalsType) {
    const isSharp = note.includes('#');
    const isFlat = note.includes('b');

    if (accidentalsType === 'sharp' && isFlat) {
        return ENHARMONIC_MAP[note] || note;
    }
    if (accidentalsType === 'flat' && isSharp) {
        return ENHARMONIC_MAP[note] || note;
    }
    return note;
}

function getChordIntervals(quality) {
    if (quality.includes('Maj7') || quality.includes('Maj9') || quality.includes('Maj13')) {
        return { essential: [0, 4, 7], full: [0, 4, 7, 11] }; 
    }
    if (quality.includes('mMaj7')) {
        return { essential: [0, 3, 7], full: [0, 3, 7, 11] }; 
    }
    if (quality.includes('m7') || quality.includes('m9') || quality.includes('m11') || quality.includes('m13')) {
        return { essential: [0, 3, 7], full: [0, 3, 7, 10] }; 
    }
    if (quality.includes('7') || quality.includes('9') || quality.includes('13')) {
        return { essential: [0, 4, 7], full: [0, 4, 7, 10] }; 
    }
    if (quality.includes('m7(b5)')) {
        return { essential: [0, 3, 6], full: [0, 3, 6, 10] }; 
    }
    if (quality.includes('dim7')) {
        return { essential: [0, 3, 6], full: [0, 3, 6, 9] }; 
    }
    if (quality.includes('Aug') || quality.includes('(#5)')) {
        return { essential: [0, 4, 8], full: [0, 4, 8, 11] }; 
    }
    if (quality.includes('sus')) {
        return { essential: [0, 7], full: [0, 5, 7, 10] }; 
    }
    if (quality === 'Maj' || quality === '') {
        return { essential: [0, 4, 7], full: [0, 4, 7] }; 
    }
    if (quality === 'm') {
        return { essential: [0, 3, 7], full: [0, 3, 7] }; 
    }
    return { essential: [0, 4, 7], full: [0, 4, 7] }; 
}

function getSuggestedImproScales(fullChord, baseModeKey, baseRoot) {
    const chordMatch = fullChord.match(/([A-G][#b]?)([A-Za-z0-9()#b]*)/);
    if (!chordMatch) return [];

    const chordRoot = chordMatch[1];
    const rawQuality = chordMatch[2].replace(/[()]/g, '').split('/')[0]; 
    
    let analyzedQuality = rawQuality;
    if (analyzedQuality === 'Maj' || analyzedQuality === '') analyzedQuality = 'Maj7';
    if (analyzedQuality === 'm') analyzedQuality = 'm7';
    
    if (rawQuality.includes('Quartal') || rawQuality.includes('Quintal')) {
        return [{ 
            name: getModeName(baseModeKey), 
            note: baseRoot, 
            contextual: true, 
            color: 'Siga o Modo Gerador', 
            modeKey: baseModeKey 
        }];
    }

    const targetIntervals = getChordIntervals(analyzedQuality).full;
    const rootIndex = NOTES.indexOf(chordRoot);
    const compatibleScales = [];

    for (const scaleType in SCALES_DATA) {
        for (const mode of SCALES_DATA[scaleType].modes) {
            const modeIntervals = mode.intervals;
            let isCompatible = true;
            let tensionText = [];

            for (const interval of targetIntervals) {
                const requiredChromaticIndex = (rootIndex + interval) % 12;
                
                const modeTones = modeIntervals.map(i => (rootIndex + i) % 12);

                if (!modeTones.includes(requiredChromaticIndex)) {
                    isCompatible = false;
                    break;
                }
            }
            
            if (isCompatible) {
                const modeTones = modeIntervals.map(i => (rootIndex + i) % 12);
                const tensionMap = { 1: 'b9', 2: '9', 3: '#9', 5: '11', 6: '#11', 8: 'b13', 9: '13' };
                
                for (let i = 1; i <= 11; i++) { 
                    if (!targetIntervals.includes(i)) {
                        const requiredChromaticIndex = (rootIndex + i) % 12;
                        if (modeTones.includes(requiredChromaticIndex)) {
                            let tensionInterval = (requiredChromaticIndex - rootIndex + 12) % 12;
                            if (tensionMap[tensionInterval]) {
                                tensionText.push(tensionMap[tensionInterval]);
                            }
                        }
                    }
                }
                
                let color = tensionText.length > 0 ? `T: ${tensionText.join(', ')}` : 'Padrão Diatônico';
                let contextual = false;
                
                if (analyzedQuality.includes('Maj') && (mode.key === 'major' || mode.key === 'lydian')) { contextual = true; }
                else if (analyzedQuality.includes('m') && (mode.key === 'dorian' || mode.key === 'aeolian')) { contextual = true; }
                else if (analyzedQuality.includes('7') && (mode.key === 'mixolydian' || mode.key === 'lydian_flat7' || mode.key === 'superlocrian')) { contextual = true; }
                else if (analyzedQuality.includes('m7(b5)') && (mode.key === 'locrian' || mode.key === 'locrian_sharp2')) { contextual = true; }

                compatibleScales.push({
                    name: mode.name,
                    note: chordRoot,
                    color: color,
                    contextual: contextual 
                });
            }
        }
    }
    
    compatibleScales.sort((a, b) => {
        if (a.contextual !== b.contextual) {
            return b.contextual - a.contextual; 
        }
        return a.name.localeCompare(b.name);
    });

    return compatibleScales;
}

function analyzeProgression(progressionArray, settings) {
    const allChords = progressionArray.flatMap(measure => measure.split(/\s+/).filter(c => c.length > 0));
    const uniqueChords = [...new Set(allChords)];
    
    const analysis = {};
    
    uniqueChords.forEach(chord => {
        analysis[chord] = getSuggestedImproScales(chord, settings.modeKey, settings.rootNote);
    });
    
    return analysis;
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

function populateScaleSelect() {
    const scaleSelect = document.getElementById('scale-type');
    scaleSelect.innerHTML = '';

    let randomOption = document.createElement('option');
    randomOption.value = 'Aleatorio';
    randomOption.textContent = 'Aleatório';
    scaleSelect.appendChild(randomOption);
    
    for (const key in SCALES_DATA) {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = SCALES_DATA[key].name;
        scaleSelect.appendChild(option);
    }
    updateModeSelect(Object.keys(SCALES_DATA)[0]); 
}

function updateModeSelect(selectedScaleKey) {
    const modeSelect = document.getElementById('modal-mode');
    modeSelect.innerHTML = '';
    
    let randomOption = document.createElement('option');
    randomOption.value = 'Aleatorio';
    randomOption.textContent = 'Aleatório';
    modeSelect.appendChild(randomOption);

    if (selectedScaleKey === 'Aleatorio') {
        return;
    }

    if (!SCALES_DATA[selectedScaleKey]) {
        selectedScaleKey = 'major_diatonic'; 
    }
    
    const modes = SCALES_DATA[selectedScaleKey].modes;
    
    modes.forEach(mode => {
        let option = document.createElement('option');
        option.value = mode.key;
        option.textContent = mode.name;
        modeSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ESTABILIZAÇÃO: Chama as funções de povoamento
    populateRootSelect();
    populateScaleSelect(); 
    
    const contextSelect = document.getElementById('tonality-context');
    const scaleSelect = document.getElementById('scale-type'); 
    const tonalSelectsDiv = document.getElementById('tonal-selects');
    const verticalitySelectDiv = document.getElementById('verticality-select');

    scaleSelect.addEventListener('change', (event) => {
        updateModeSelect(event.target.value);
    });

    contextSelect.addEventListener('change', () => {
        const context = contextSelect.value;
        const isModal = context === 'modal-pura';
        const isAtonal = context === 'atonal';
        
        verticalitySelectDiv.style.display = isModal ? 'block' : 'none';
        tonalSelectsDiv.style.display = isAtonal ? 'none' : 'block';
        
        document.getElementById('modal-mode-select').style.display = isAtonal ? 'none' : 'block';
        document.getElementById('scale-type-select').style.display = isAtonal ? 'none' : 'block'; 
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
    const modeIntervals = getModeIntervals(modeKey);

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

// --- Módulo 2B: Determinação da Qualidade ---

function constructDiatonicQuality(modeKey, rootIntervalIndex) {
    const modeIntervals = getModeIntervals(modeKey); 

    const getChromaticInterval = (degreeIndex) => {
        const targetDegreeIntervals = [0, 2, 4, 5, 7, 9, 11]; 
        const targetSemitone = targetDegreeIntervals[degreeIndex * 2]; 
        
        const rootChromaIndex = getModeIntervals(modeKey)[rootIntervalIndex];
        const targetChromaIndex = (rootChromaIndex + targetSemitone) % 12;

        let foundInterval = -1;
        
        for (let i = 0; i < modeIntervals.length; i++) {
             if (modeIntervals[i] === targetChromaIndex) {
                 foundInterval = (modeIntervals[i] - rootChromaIndex + 12) % 12;
                 break;
             }
        }
        
        return foundInterval; 
    };

    const third = getChromaticInterval(1); // 3ª
    const fifth = getChromaticInterval(2); // 5ª
    const seventh = getChromaticInterval(3); // 7ª
    
    let quality = '';

    // 1. Determinação da Terça (Maior/Menor/Sus)
    if (third === 3) { quality = 'm'; } 
    else if (third === 4) { quality = 'Maj'; } 
    else if (third === -1 || third !== 3 && third !== 4) { quality = 'sus'; } 

    // 2. Determinação da Quinta (Perfeita/Aumentada/Diminuta)
    if (fifth === 6) { quality += '(b5)'; } 
    else if (fifth === 8) { quality += '(#5)'; } 
    
    // 3. Determinação da Sétima (Maj7/7/Dim)
    if (seventh === 10) { quality += '7'; } 
    else if (seventh === 11) { quality += 'Maj7'; } 
    else if (seventh === 9) { quality += 'dim7'; } 
    
    // Ajustes finais para tríades puras
    if (seventh === -1) { 
        if (quality === 'Maj') return ''; // Tríade Maior Pura (Ex: C)
        if (quality === 'm') return 'm'; // Tríade Menor Pura (Ex: Cm)
    }

    if (quality.includes('sus')) {
        if (quality.includes('7')) return '7sus4';
        if (fifth === -1) return '5'; 
        return 'sus'; 
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

    const sortedLevel = getRandomElement(complexityPool);

    if (sortedLevel === 'Power') {
        return '5'; 
    }
    if (sortedLevel === 'Aumentado') {
        return getRandomElement(QUALITIES['Aumentado']);
    }
    
    const rootIndex = NOTES.indexOf(root);
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const semitonesFromRoot = (rootIndex - baseRootIndex + 12) % 12;
    
    const modeIntervals = getModeIntervals(modeKey);
    let rootIntervalIndex = modeIntervals.indexOf(semitonesFromRoot);

    let baseQuality = '7'; 
    if (rootIntervalIndex !== -1) {
        baseQuality = constructDiatonicQuality(modeKey, rootIntervalIndex);
    }

    if (sortedLevel === 'Triade') {
        // --- CORREÇÃO DE BUG: PRIORIZAR MENORES/DIMINUTOS ---
        
        // 1. Mantém qualidades não-triádicas que não são Maj/m (sus, 5, dim)
        if (baseQuality.includes('sus') || baseQuality === '5') {
            return baseQuality;
        }

        // 2. VERIFICA QUALIDADE MENOR/DIMINUTA
        if (baseQuality.includes('m') || baseQuality.includes('(b5)') || baseQuality.includes('dim')) {
             if (baseQuality.includes('dim')) return 'dim'; 
             // Se for m, m7, mMaj7, m7(b5), retorna 'm'.
             return 'm'; 
        }
        
        // 3. VERIFICA QUALIDADE MAIOR (Garante que só Majors sejam retornados)
        // A chave aqui é que agora sabemos que o acorde NÃO é menor.
        if (baseQuality === '' || baseQuality.includes('Maj7') || baseQuality.includes('7')) {
             return ''; 
        }
        
        return baseQuality; 
    }
    
    if (sortedLevel === 'Extensao') {
        const possibleExtensions = ['9', '13']; 
        let extension = getRandomElement(possibleExtensions);

        if (baseQuality.includes('sus') || baseQuality === '5' || baseQuality === '') return baseQuality;
        
        if (baseQuality.startsWith('m')) { extension = '9'; }
        
        if (baseQuality === '7' || baseQuality.includes('Maj7')) { return baseQuality.replace('7', extension).replace('Maj', 'Maj'); }
        return baseQuality.replace('7', '') + extension;
    }
    
    if (sortedLevel === 'Suspenso') {
        const susQualities = QUALITIES['Suspenso'];
        if (baseQuality.includes('7') || baseQuality === '' || baseQuality.includes('Maj')) {
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

    if (quality === '5' || quality.includes('Quartal') || quality.includes('Quintal')) {
        return { tensions: '', bass: '' };
    }

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
    
    let scaleType = document.getElementById('scale-type').value || 'major_diatonic'; 
    let modeKey = document.getElementById('modal-mode').value || 'major';
    

    if (scaleType === 'Aleatorio') { 
        const scaleKeys = Object.keys(SCALES_DATA);
        scaleType = getRandomElement(scaleKeys) || 'major_diatonic';
        
        const modesInScale = SCALES_DATA[scaleType].modes;
        modeKey = getRandomElement(modesInScale).key;
    } else if (modeKey === 'Aleatorio') {
        const modesInScale = SCALES_DATA[scaleType].modes;
        modeKey = getRandomElement(modesInScale).key;
    }
    
    if (baseRoot === 'Aleatorio') {
        baseRoot = getRandomElement(NOTES);
    }
    
    if (context !== 'atonal' && (baseRoot === '' || modeKey === '' || scaleType === '')) {
        alert('Erro: Por favor, selecione a Tonalidade Base e o Modo Específico (ou "Aleatório").');
        return;
    }
    
    if (complexityPool.length === 0) {
        alert('Erro: Por favor, selecione pelo menos um Tipo de Acorde Permitido.');
        return;
    }

    currentSettings = {
        context,
        rootNote: baseRoot,
        modeKey: modeKey,
        scaleType: scaleType, 
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

    let accidentalsType = baseRoot.includes('b') ? 'flat' : 'sharp';

    const progression = [];
    let prevRoot = null; 

    for (let i = 0; i < numMeasures; i++) {
        const numChords = structure[i];
        let measure = '';

        for (let j = 0; j < numChords; j++) {
            let root = determineRoot(context, prevRoot, currentSettings); 
            let quality = determineQuality(root, context, currentSettings);
            const coloring = applyColoring(root, quality, context, currentSettings);
            let bass = coloring.bass; 
            let tensions = coloring.tensions; 
            
            root = standardizeAccidentals(root, accidentalsType);
            if (bass.includes('/')) {
                const bassNote = bass.split('/')[1];
                bass = '/' + standardizeAccidentals(bassNote, accidentalsType);
            }

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

function standardizeScaleSpelling(baseRoot, modeKey) {
    const modeIntervals = getModeIntervals(modeKey); 
    const rootChromaIndex = NOTES.indexOf(baseRoot);
    const rootLetter = baseRoot.charAt(0);
    const rootLetterIndex = BASE_NOTE_MAP.indexOf(rootLetter);
    
    const finalNotes = [];
    
    for (let i = 0; i < modeIntervals.length; i++) {
        const intervalSemitones = modeIntervals[i];
        const targetChromaIndex = (rootChromaIndex + intervalSemitones) % 12;
        
        let bestLetter = null;
        let minDiff = 12;

        for (let j = 0; j < 7; j++) {
            const letter = BASE_NOTE_MAP[(rootLetterIndex + j) % 7];
            const letterChromaIndex = NOTES.indexOf(letter.length === 1 ? letter : letter.charAt(0));

            const diff = (targetChromaIndex - letterChromaIndex + 12) % 12;
            const absoluteDiff = Math.min(diff, 12 - diff);

            if (absoluteDiff < minDiff) {
                minDiff = absoluteDiff;
                bestLetter = letter;
            }
        }
        
        let expectedLetter = bestLetter;
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
    
    let scaleName = getModeName(modeKey); 
    if (context === 'tonal-jazz') scaleName = `Base Jazz: ${scaleName}`;

    return `${scaleName} (${baseRoot}): ${notes}`;
}

function createUnifiedOutput(progressionArray, settings, analysis) {
    const { context, rootNote, modeKey, verticality, scaleType } = settings;
    
    const formattedProgression = progressionArray.map(measure => `| ${measure} `).join('') + '|';
    const suggestedScaleText = getSuggestedScale(rootNote, modeKey, context, settings.customNotes);
    
    let output = '';
    
    // --- PROGRESSÃO ---
    output += `// PROGRESSÃO\n`;
    output += formattedProgression;
    
    // --- GERADORES ---
    output += `\n// GERADORES\n`;
    output += `Contexto: ${context.replace('-', ' ')}\n`;
    
    if (context !== 'atonal') {
        output += `Escala Base: ${SCALES_DATA[scaleType].name}\n`;
        output += `Tonalidade Raiz: ${rootNote}\n`;
        output += `Modo: ${getModeName(modeKey)}\n`;
        
        if (context === 'modal-pura' && verticality !== 'tercas') {
            output += `Verticalidade: ${verticality}\n`;
        }
        
        output += `Notas da Escala Geradora: ${suggestedScaleText.split(': ')[1]}\n`;
    } else {
         output += `Notas da Escala Geradora: ${suggestedScaleText}\n`;
    }
    
    // --- SUGESTÕES DE IMPROVISO (Novo) ---
    output += `\n// SUGESTÕES DE IMPROVISO\n`;
    for (const chord in analysis) {
        const scales = analysis[chord];
        if (scales.length > 0) {
            output += `\n- ${chord}:\n`;
            scales.forEach(scale => {
                output += `  * ${scale.note} ${scale.name} (${scale.color})\n`;
            });
        }
    }
    
    return output;
}


function updateResults(progressionArray) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'flex';

    const baseRoot = currentSettings.rootNote;
    const modeKey = currentSettings.modeKey;
    const verticality = currentSettings.verticality;

    const formattedProgression = currentProgression.map(measure => `| ${measure} `).join('') + '|';
    document.getElementById('visual-progression').innerText = formattedProgression;
    
    const suggestedScaleName = getSuggestedScale(baseRoot, modeKey, currentSettings.context).split('(')[0].trim();
    document.getElementById('out-scale-name').innerText = `Escala Geradora: ${suggestedScaleName} (${baseRoot})`;
    document.getElementById('out-context').innerText = currentSettings.context.replace('-', ' ');
    document.getElementById('out-root').innerText = baseRoot; 
    document.getElementById('out-mode').innerText = getModeName(modeKey);

    const verticalityP = document.getElementById('out-verticality-p');
    const isModalVertical = currentSettings.context === 'modal-pura' && verticality !== 'tercas';
    
    if (isModalVertical) {
        verticalityP.style.display = 'block';
        document.getElementById('out-verticality').innerText = verticality;
    } else {
        verticalityP.style.display = 'none';
    }

    const analysis = analyzeProgression(progressionArray, currentSettings);
    
    let improOutput = '';
    for (const chord in analysis) {
        const contextualScales = analysis[chord].filter(s => s.contextual);
        const otherScales = analysis[chord].filter(s => !s.contextual);
        
        improOutput += `${chord}:\n`;
        
        if (contextualScales.length > 0) {
             improOutput += `  > PRIORIDADES:\n`;
             contextualScales.forEach(scale => {
                 improOutput += `  - ${scale.note} ${scale.name} (${scale.color})\n`;
             });
        }
        
        if (otherScales.length > 0) {
             improOutput += `  > OUTRAS OPÇÕES:\n`;
             otherScales.forEach(scale => {
                 improOutput += `  - ${scale.note} ${scale.name} (${scale.color})\n`;
             });
        }
        improOutput += '\n'; 
    }
    document.getElementById('impro-suggestions').innerText = improOutput.trim();

    const unifiedOutput = createUnifiedOutput(progressionArray, currentSettings, analysis);
    document.getElementById('chord-progression').innerText = unifiedOutput;
}
