// =======================================================
// MÓDULO DE DADOS: CONSTANTES DE TEORIA MUSICAL
// =======================================================

// As 12 notas em notação de Jazz/Cifrada
const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Mapeamento dos Modos: [intervalos em semitons a partir da raiz]
const MODES = {
    // === MODOS DA ESCALA MAIOR (JÔNICA) ===
    'major': { intervals: [0, 2, 4, 5, 7, 9, 11], name: 'Jônio' },
    'dorian': { intervals: [0, 2, 3, 5, 7, 9, 10], name: 'Dórico' },
    'phrygian': { intervals: [0, 1, 3, 5, 7, 8, 10], name: 'Frígio' },
    'lydian': { intervals: [0, 2, 4, 6, 7, 9, 11], name: 'Lídio' },
    'mixolydian': { intervals: [0, 2, 4, 5, 7, 9, 10], name: 'Mixolídio' },
    'aeolian': { intervals: [0, 2, 3, 5, 7, 8, 10], name: 'Eólio' }, // Menor Natural
    'locrian': { intervals: [0, 1, 3, 5, 6, 8, 10], name: 'Lócrio' },
    
    // === MODOS DA ESCALA MENOR HARMÔNICA ===
    'harmonic_minor': { intervals: [0, 2, 3, 5, 7, 8, 11], name: 'Menor Harmônica' },
    'locrian_sharp6': { intervals: [0, 1, 3, 5, 6, 9, 10], name: 'Lócrio #6' },
    'ionian_sharp5': { intervals: [0, 2, 4, 5, 8, 9, 11], name: 'Jônio #5' },
    'phrygian_dominant': { intervals: [0, 1, 4, 5, 7, 8, 10], name: 'Frígio Dominante' }, 
    'lydian_sharp2': { intervals: [0, 3, 4, 6, 7, 9, 11], name: 'Lídio #2' },
    'altered_bb7': { intervals: [0, 1, 3, 4, 6, 8, 9], name: 'Alterada bb7' }, 

    // === MODOS DA ESCALA MENOR MELÓDICA ASCENDENTE (JAZZ) ===
    'melodic_minor': { intervals: [0, 2, 3, 5, 7, 9, 11], name: 'Menor Melódica' },
    'dorian_flat2': { intervals: [0, 1, 3, 5, 7, 9, 10], name: 'Dórico b2' },
    'lydian_sharp5': { intervals: [0, 2, 4, 6, 8, 9, 11], name: 'Lídio #5' },
    'lydian_flat7': { intervals: [0, 2, 4, 6, 7, 9, 10], name: 'Lídio b7' },
    'mixolydian_flat6': { intervals: [0, 2, 4, 5, 7, 8, 10], name: 'Mixolídio b6' },
    'superlocrian': { intervals: [0, 1, 3, 4, 6, 8, 10], name: 'Superlócrio (Alterada)' }, 
};

// Dicionário de Qualidades por Nível de Complexidade (Módulo 2B)
const QUALITIES = {
    'Triade': ['Maj', 'm', 'dim'], 
    'Setima': ['Maj7', 'm7', '7', 'mMaj7'], 
    'Extensao': ['Maj9', 'm9', '9', 'Maj13', 'm13', '13', 'm11'],
    'Suspenso': ['sus2', 'sus4', '7sus4'], 
    'Diminuto': ['dim7', 'm7(b5)'], 
};

// Tensões Alteradas Comuns no Jazz
const ALTERED_TENSIONS = ['b9', '#9', '#11', 'b13', '#5'];

// --- Mapeamento Funcional (para Tonal Fixo) ---
const FUNCTION_MAP = {
    'I': 'T', 'VI': 'T', 'III': 'T', // Tônica
    'II': 'SD', 'IV': 'SD', // Subdominante
    'V': 'D', 'VII': 'D' // Dominante
};

// Regras de Transição (Próximo Grau) - Usadas no Sorteio Ponderado
const FUNCTIONAL_RULES = {
    'T': [
        { dest: 'SD', chance: 50 },
        { dest: 'D', chance: 30 },
        { dest: 'T', chance: 20 }
    ],
    'SD': [
        { dest: 'D', chance: 60 },
        { dest: 'T', chance: 40 }
    ],
    'D': [
        { dest: 'T', chance: 90 },
        { dest: 'SD', chance: 10 }
    ]
};


// =======================================================
// FUNÇÕES AUXILIARES GLOBAIS
// =======================================================

/**
 * Realiza um sorteio ponderado.
 */
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

/**
 * Sorteia um elemento de um array simples.
 */
function getRandomElement(pool) {
    if (pool.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

/**
 * Obtém a nota musical a partir da raiz e do índice de grau.
 */
function getNoteFromDegree(baseRoot, intervalIndex, modeKey = 'major') {
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const modeIntervals = MODES[modeKey].intervals;
    
    const intervalSemitones = modeIntervals[intervalIndex]; 
    const noteIndex = (baseRootIndex + intervalSemitones) % NOTES.length;
    return NOTES[noteIndex];
}

/**
 * Mapeia o intervalo em semitons para a qualidade diatônica base (Jônio).
 */
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
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const transposeButton = document.getElementById('apply-transpose');
    const contextSelect = document.getElementById('tonality-context');
    const verticalitySelect = document.getElementById('verticality-select');

    // Listener para mostrar/esconder opções modais/tonais
    contextSelect.addEventListener('change', () => {
        const isModal = contextSelect.value === 'modal-pura';
        const isAtonal = contextSelect.value === 'atonal';
        
        verticalitySelect.style.display = isModal ? 'block' : 'none';
        document.getElementById('modal-mode-select').style.display = isAtonal ? 'none' : 'block';
    });

    generateButton.addEventListener('click', generateProgression);

    // Listener de Transposição
    transposeButton.addEventListener('click', () => {
        const value = parseInt(document.getElementById('transpose-value').value);
        if (currentProgression.length > 0) {
            const baseRoot = currentSettings.tonality.split('_')[0];
            const newBaseRoot = transposeNote(baseRoot, value);
            
            // Atualiza a progressão e as configurações de tonalidade
            currentProgression = transposeProgression(currentProgression, value);
            currentSettings.tonality = newBaseRoot + '_' + currentSettings.tonality.split('_')[1];

            updateResults(currentProgression);
        }
    });

    // Listener para copiar a cifra
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

let currentProgression = []; 
let currentSettings = {};

// --- Módulo 2A: Determinação da Raiz ---
function determineRootAtonal() {
    const randomIndex = Math.floor(Math.random() * NOTES.length);
    return NOTES[randomIndex];
}

function determineRootModal(baseRoot, modeKey) {
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const modeIntervals = MODES[modeKey].intervals;

    const diatonicNotes = modeIntervals.map(interval => {
        const noteIndex = (baseRootIndex + interval) % NOTES.length;
        return NOTES[noteIndex];
    });

    const randomIndex = Math.floor(Math.random() * diatonicNotes.length);
    return diatonicNotes[randomIndex];
}

function determineRootFunctional(baseRoot, prevRoot) {
    if (!prevRoot) { return baseRoot; }
    
    // Simplificação da conversão Nota -> Grau -> Função:
    const prevRootIndex = NOTES.indexOf(prevRoot);
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const semitonesFromTonic = (prevRootIndex - baseRootIndex + 12) % 12;
    
    // Simplificando: o V grau (7 semitons) é Dominante; outros são Tônica/Subdominante.
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
        // Dominantes Secundários: V/X
        const targetDegrees = [1, 2, 3, 4, 5]; 
        const targetIndex = targetDegrees[Math.floor(Math.random() * targetDegrees.length)];
        const targetRoot = getNoteFromDegree(baseRoot, targetIndex); 
        // V grau (4) do target é a nova raiz (Dominante Secundário)
        return getNoteFromDegree(targetRoot, 4); 
    } else {
        // Substituição Tritonal (SubV)
        if (prevRoot && prevRoot === getNoteFromDegree(baseRoot, 4)) {
             const VIndex = NOTES.indexOf(prevRoot);
             return NOTES[(VIndex + 6) % 12]; // 6 semitons acima
        }
        return determineRootFunctional(baseRoot, prevRoot); 
    }
}

function determineRoot(context, prevRoot, settings) {
    const tonality = settings.tonality.split('_')[0]; 
    const modeKey = settings.tonality.split('_')[1]; 

    switch (context) {
        case 'atonal': return determineRootAtonal();
        case 'modal-pura': return determineRootModal(tonality, modeKey);
        case 'tonal-fixo': return determineRootFunctional(tonality, prevRoot);
        case 'tonal-jazz': return determineRootJazz(tonality, prevRoot);
        default: return NOTES[0];
    }
}

// --- Módulo 2B: Determinação da Qualidade ---
function determineQuality(root, context, settings) {
    const complexityPool = settings.complexityPool;
    const verticality = settings.verticality;
    const baseRoot = settings.tonality.split('_')[0];

    if (context === 'atonal') {
        const allQualities = complexityPool.flatMap(level => QUALITIES[level] || []);
        return getRandomElement(allQualities);
    }

    if (context === 'modal-pura' && verticality !== 'tercas') {
        return verticality === 'quartal' ? 'Quartal' : 'Quintal';
    }

    // Lógica Diatônica: Encontra o intervalo em semitons e a qualidade base
    const rootIndex = NOTES.indexOf(root);
    const baseRootIndex = NOTES.indexOf(baseRoot);
    const intervalFromTonic = (rootIndex - baseRootIndex + 12) % 12;
    let baseQuality = getDiatonicQuality(intervalFromTonic);

    const sortedLevel = getRandomElement(complexityPool);

    if (sortedLevel === 'Triade') {
        if (baseQuality.includes('Maj7')) return 'Maj';
        if (baseQuality.includes('m7')) return 'm';
        return baseQuality;
    }
    
    if (sortedLevel === 'Extensao') {
        const possibleExtensions = ['9', '13']; 
        let extension = getRandomElement(possibleExtensions);

        if (baseQuality.startsWith('m')) { extension = '9'; }
        
        if (baseQuality === '7') { return extension; }
        return baseQuality.replace('7', '') + extension;
    }
    
    if (sortedLevel === 'Suspenso') {
        const susQualities = QUALITIES['Suspenso'];
        if (baseQuality === '7' || baseQuality === 'Maj7') {
            return getRandomElement(susQualities);
        }
    }
    
    return baseQuality; 
}


// --- Módulo 2C: Aplicação de Coloração (Baixos e Tensões) ---
function getFunctionalBass(root, baseRoot) {
    const rootIndex = NOTES.indexOf(root);
    const degrees = [];
    
    degrees.push(root); 
    degrees.push(NOTES[(rootIndex + 4) % 12]);
    degrees.push(NOTES[(rootIndex + 7) % 12]);
    degrees.push(baseRoot); // Ponto de pedal suave
    
    return getRandomElement(degrees);
}

function applyColoring(root, quality, context, settings) {
    const { includeBass, includeTensions, tonality } = settings;
    const baseRoot = tonality.split('_')[0];
    
    let tensions = '';
    let bass = '';

    // Lógica do Baixo Alternativo
    if (includeBass) {
        if (context === 'atonal') {
            bass = NOTES[Math.floor(Math.random() * NOTES.length)];
        } else {
            bass = getFunctionalBass(root, baseRoot);
            if (context === 'modal-pura') bass = baseRoot; // Força Ponto de Pedal
        }
        
        if (bass !== root) { bass = `/${bass}`; } else { bass = ''; }
    }

    // Lógica das Tensões Alteradas
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
            tensions = ''; // Proibido
        }
    }

    return { tensions, bass };
}


// --- Função Principal de Geração ---
function generateProgression() {
    const context = document.getElementById('tonality-context').value;
    const numMeasures = parseInt(document.getElementById('num-measures').value);
    const chordsPerMeasureStr = document.getElementById('chords-per-measure').value;
    const structure = chordsPerMeasureStr.split(',').map(s => parseInt(s.trim()));
    
    const complexityPool = Array.from(document.querySelectorAll('#complexity-settings input:checked')).map(c => c.value);

    currentSettings = {
        context,
        tonality: document.getElementById('modal-mode').value,
        verticality: document.getElementById('modal-verticality').value,
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
            const root = determineRoot(currentSettings.context, prevRoot, currentSettings); 
            let quality = determineQuality(root, currentSettings.context, currentSettings);
            const coloring = applyColoring(root, quality, currentSettings.context, currentSettings);
            let bass = coloring.bass; 
            let tensions = coloring.tensions; 

            // Regra de Verticalidade Quartal/Quintal
            if (quality.includes('Quartal') || quality.includes('Quintal')) {
                 quality = `^${quality}`; 
                 tensions = '';
                 // Garante Ponto de Pedal modal, se aplicável
                 if (currentSettings.context === 'modal-pura') bass = `/${currentSettings.tonality.split('_')[0]}`; 
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

// Transpõe uma nota musical
function transposeNote(note, steps) {
    const index = NOTES.indexOf(note);
    if (index === -1) return note; 
    
    const newIndex = (index + steps + 12) % 12;
    return NOTES[newIndex];
}

// [MÓDULO 3A] Transpõe toda a progressão
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

// [MÓDULO 3B] Analisa e sugere a escala
function getSuggestedScale(baseRoot, modeKey, context) {
    if (context === 'atonal') return 'Escala Cromática (Todas as 12 notas)';

    const modeIntervals = MODES[modeKey].intervals;
    const baseRootIndex = NOTES.indexOf(baseRoot);

    const notes = modeIntervals.map(interval => {
        const noteIndex = (baseRootIndex + interval) % NOTES.length;
        return NOTES[noteIndex];
    }).join(', ');
    
    let scaleName = MODES[modeKey].name;
    if (context === 'tonal-jazz') scaleName = `Escala Jazzística Base (${scaleName})`;

    return `${scaleName} (${baseRoot}): ${notes}`;
}

// Atualiza a interface com os resultados finais
function updateResults(progressionArray) {
    const resultsDiv = document.getElementById('results');
    const progressionPre = document.getElementById('chord-progression');
    
    resultsDiv.style.display = 'block';

    const formattedProgression = progressionArray.map(measure => `| ${measure} `).join('');
    progressionPre.innerText = formattedProgression + '|';

    const [baseRoot, modeKey] = currentSettings.tonality.split('_');
    
    document.getElementById('out-context').innerText = currentSettings.context.replace('-', ' ');
    
    document.getElementById('out-scale').innerText = getSuggestedScale(baseRoot, modeKey, currentSettings.context);
    
    const verticalityP = document.getElementById('out-verticality-p');
    if (currentSettings.context === 'modal-pura' && currentSettings.verticality !== 'tercas') {
        verticalityP.style.display = 'block';
        document.getElementById('out-verticality').innerText = currentSettings.verticality;
    } else {
        verticalityP.style.display = 'none';
    }
}
