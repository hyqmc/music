// =======================================================
// MÓDULO DE DADOS: CONSTANTES DE TEORIA MUSICAL
// =======================================================

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Estrutura que agrupa os modos por sua "Família"
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

// Mapeamento COMPLETO dos modos com seus INTERVALOS
const ALL_MODES_INTERVALS = {
    'major': [0, 2, 4, 5, 7, 9, 11], 'dorian': [0, 2, 3, 5, 7, 9, 10], 'phrygian': [0, 1, 3, 5, 7, 8, 10],
    'lydian': [0, 2, 4, 6, 7, 9, 11], 'mixolydian': [0, 2, 4, 5, 7, 9, 10], 'aeolian': [0, 2, 3, 5, 7, 8, 10],
    'locrian': [0, 1, 3, 5, 6, 8, 10],
    'harmonic_minor': [0, 2, 3, 5, 7, 8, 11], 'phrygian_dominant': [0, 1, 4, 5, 7, 8, 10], 
    'ionian_sharp5': [0, 2, 4, 5, 8, 9, 11],
    'melodic_minor': [0, 2, 3, 5, 7, 9, 11], 'lydian_flat7': [0, 2, 4, 6, 7, 9, 10],
    'superlocrian': [0, 1, 3, 4, 6, 8, 10], 
};

// [O restante das constantes QUALITIES, FUNCTION_MAP, FUNCTIONAL_RULES é mantido, omitido por brevidade]
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
// MÓDULO DE INICIALIZAÇÃO E LISTENERS (CORRIGIDO)
// =======================================================

let currentProgression = []; 
let currentSettings = {}; 

function populateSelect(selectId, optionsMap) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    
    // Adiciona uma opção de placeholder ou padrão
    if (selectId !== 'modal-mode') {
         const defaultOption = document.createElement('option');
         defaultOption.value = '';
         defaultOption.textContent = `-- Selecione --`;
         select.appendChild(defaultOption);
    }
    
    for (const value in optionsMap) {
        const option = document.createElement('option');
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

// Inicializa o seletor de Família de Escala
function populateFamilySelect() {
    const families = {};
    for (const key in SCALE_FAMILIES) {
        families[key] = SCALE_FAMILIES[key].name;
    }
    populateSelect('scale-family', families);
}

// Atualiza o seletor de Modos com base na Família de Escala selecionada
function updateModeSelect() {
    const familyKey = document.getElementById('scale-family').value;
    const modalModeSelect = document.getElementById('modal-mode');
    
    modalModeSelect.innerHTML = ''; // Limpa antes de preencher

    if (familyKey && SCALE_FAMILIES[familyKey]) {
        const modesMap = SCALE_FAMILIES[familyKey].modes;
        populateSelect('modal-mode', modesMap);
    }
    // Se nenhum 'familyKey' for selecionado, o select 'modal-mode' estará vazio, forçando a seleção.
}


document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa os selects da hierarquia
    populateRootSelect();
    populateFamilySelect();
    updateModeSelect(); // Popula o modo inicial (vazio)
    
    // 2. Listeners de Hierarquia (O CORRIGIDO)
    document.getElementById('scale-family').addEventListener('change', updateModeSelect);

    const contextSelect = document.getElementById('tonality-context');
    const tonalSelectsDiv = document.getElementById('tonal-selects');
    const userNotesInputDiv = document.getElementById('user-notes-input');
    const verticalitySelectDiv = document.getElementById('verticality-select');

    contextSelect.addEventListener('change', () => {
        const context = contextSelect.value;
        const isModal = context === 'modal-pura';
        const isUserNotes = context === 'user-notes';
        const isAtonal = context === 'atonal';
        
        verticalitySelectDiv.style.display = isModal ? 'block' : 'none';
        tonalSelectsDiv.style.display = (isUserNotes || isAtonal) ? 'none' : 'block';
        userNotesInputDiv.style.display = isUserNotes ? 'block' : 'none';

        // O seletor de modo é sempre visível quando não é Atonal ou Customizado.
        document.getElementById('modal-mode-select').style.display = 
            (isUserNotes || isAtonal) ? 'none' : 'block';
    });

    // 3. Listeners de Ação
    document.getElementById('generate-button').addEventListener('click', generateProgression);
    document.getElementById('apply-transpose').addEventListener('click', () => {
        const value = parseInt(document.getElementById('transpose-value').value);
        if (currentProgression.length > 0 && value !== 0) {
            const baseRoot = document.getElementById('root-note').value;
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
// [O código deste módulo permanece com a lógica completa do passo anterior]
// =======================================================

function determineRootAtonal() { /* ... */ }
function determineRootCustom(customNotes) { /* ... */ }
function determineRootModal(baseRoot, modeKey) { /* ... */ }
function determineRootFunctional(baseRoot, prevRoot) { /* ... */ }
function determineRootJazz(baseRoot, prevRoot) { /* ... */ }

function determineRoot(context, prevRoot, settings) {
    const rootNote = settings.rootNote; 
    const modeKey = settings.modeKey; 

    switch (context) {
        case 'atonal': return determineRootAtonal();
        case 'user-notes': return determineRootCustom(settings.customNotes);
        case 'modal-pura': return determineRootModal(rootNote, modeKey);
        case 'tonal-fixo': return determineRootFunctional(rootNote, prevRoot);
        case 'tonal-jazz': return determineRootJazz(rootNote, prevRoot);
        default: return NOTES[0];
    }
}

function determineQuality(root, context, settings) {
    const complexityPool = settings.complexityPool;
    const verticality = settings.verticality;
    const baseRoot = settings.rootNote;

    if (context === 'atonal') {
        const allQualities = complexityPool.flatMap(level => QUALITIES[level] || []);
        return getRandomElement(allQualities);
    }

    if (context === 'modal-pura' && verticality !== 'tercas') {
        return verticality === 'quartal' ? 'Quartal' : 'Quintal';
    }

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

    // Coleta as configurações do menu suspenso hierárquico
    currentSettings = {
        context,
        rootNote: document.getElementById('root-note').value,
        modeKey: document.getElementById('modal-mode').value,
        verticality: document.getElementById('modal-verticality').value,
        customNotes: document.getElementById('custom-notes').value,
        complexityPool,
        includeBass: document.getElementById('c-bass').checked,
        includeTensions: document.getElementById('c-tensions').checked,
    };
    
    if (structure.length !== numMeasures || structure.some(isNaN)) {
        alert('Erro: A estrutura rítmica deve ter o mesmo número de entradas que o número de compassos.');
        return;
    }

    // Validação básica para contextos tonais/modais:
    if ((context !== 'atonal' && context !== 'user-notes') && (!currentSettings.rootNote || !currentSettings.modeKey)) {
        alert('Erro: Por favor, selecione a Tonalidade Base e o Modo Específico.');
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
    if (context === 'user-notes') return `Notas Customizadas: ${customNotes.toUpperCase()}`;

    const modeIntervals = ALL_MODES_INTERVALS[modeKey];
    const baseRootIndex = NOTES.indexOf(baseRoot);

    const notes = modeIntervals.map(interval => {
        const noteIndex = (baseRootIndex + interval) % NOTES.length;
        return NOTES[noteIndex];
    }).join(', ');
    
    const familyKey = document.getElementById('scale-family').value;
    const family = SCALE_FAMILIES[familyKey];
    
    let scaleName = family.modes[modeKey];
    if (context === 'tonal-jazz') scaleName = `Base Jazz (${scaleName})`;

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
