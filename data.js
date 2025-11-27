// data.js

const NOTAS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const NOMES_CIFRA_FIXOS = ["C", ["C#", "Db"], "D", ["D#", "Eb"], "E", "F", ["F#", "Gb"], "G", ["G#", "Ab"], "A", ["A#", "Bb"], "B"];

const FUNCOES_HARMONICAS = [
    { "grau": "I", "qualidade": "maj", "semitons": 0, "funcao": "Tônica" },
    { "grau": "II", "qualidade": "m", "semitons": 2, "funcao": "Subdominante" },
    { "grau": "III", "qualidade": "m", "semitons": 4, "funcao": "Tônica" },
    { "grau": "IV", "qualidade": "maj", "semitons": 5, "funcao": "Subdominante" },
    { "grau": "V", "qualidade": "dom", "semitons": 7, "funcao": "Dominante" },
    { "grau": "VI", "qualidade": "m", "semitons": 9, "funcao": "Tônica" },
    { "grau": "VII", "qualidade": "m7(b5)", "semitons": 11, "funcao": "Dominante" }
];

const ESCALAS = {
    "Diatônica (Maior)": {
        "estrutura": [0, 2, 4, 5, 7, 9, 11],
        "modos": [
            { "nome": "Jônio", "estrutura": [0, 2, 4, 5, 7, 9, 11], "qualidade_I": "maj" },
            { "nome": "Dórico", "estrutura": [0, 2, 3, 5, 7, 9, 10], "qualidade_I": "m" },
            { "nome": "Lídio", "estrutura": [0, 2, 4, 6, 7, 9, 11], "qualidade_I": "maj" },
            { "nome": "Mixolídio", "estrutura": [0, 2, 4, 5, 7, 9, 10], "qualidade_I": "dom" },
            { "nome": "Eólio", "estrutura": [0, 2, 3, 5, 7, 8, 10], "qualidade_I": "m" },
            // Simplificado, incluir outras escalas (Menor Harmônica, Bebop, etc.)
        ]
    }
    // Incluir outras escalas (Bebop, Diminutas, etc.) aqui
};

const PESOS_PADRAO = {
    "contexto_tonal_fixo": { "I": 35, "V": 30, "IV": 25, "II": 5, "VI": 5 },
    "complexidade": { "triade": 20, "setima": 30, "extensao": 30, "especial": 20 },
    "jazz": { "ii_V_I_chance": 0.40, "subV7_chance": 0.20 }
};

const ESTRUTURA_INTERV_RELATIVA = {
    "Jônio": "1, 2, 3, 4, 5, 6, 7",
    "Dórico": "1, 2, b3, 4, 5, 6, b7",
    "Lídio": "1, 2, 3, #4, 5, 6, 7",
    "Mixolídio": "1, 2, 3, 4, 5, 6, b7",
    "Eólio": "1, 2, b3, 4, 5, b6, b7",
    // ...
};
