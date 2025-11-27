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
            { "nome": "Frígio", "estrutura": [0, 1, 3, 5, 7, 8, 10], "qualidade_I": "m" },
            { "nome": "Lídio", "estrutura": [0, 2, 4, 6, 7, 9, 11], "qualidade_I": "maj" },
            { "nome": "Mixolídio", "estrutura": [0, 2, 4, 5, 7, 9, 10], "qualidade_I": "dom" },
            { "nome": "Eólio", "estrutura": [0, 2, 3, 5, 7, 8, 10], "qualidade_I": "m" },
            { "nome": "Lócrio", "estrutura": [0, 1, 3, 5, 6, 8, 10], "qualidade_I": "m7(b5)" }
        ]
    },
    "Maior Harmônica": {
        "estrutura": [0, 2, 4, 5, 7, 8, 11],
        "modos": [
            { "nome": "M. Harmônica (I)", "estrutura": [0, 2, 4, 5, 7, 8, 11], "qualidade_I": "maj" },
            { "nome": "Dórico b5", "estrutura": [0, 2, 3, 5, 6, 9, 10], "qualidade_I": "m7(b5)" },
            { "nome": "Frígio b4", "estrutura": [0, 1, 3, 4, 7, 8, 10], "qualidade_I": "m" },
            { "nome": "Lídio b3", "estrutura": [0, 2, 4, 6, 7, 9, 11], "qualidade_I": "maj" }, // Reutilização do Lídio Diatônico para simplificar o array
            { "nome": "Mixolídio b2", "estrutura": [0, 1, 4, 5, 7, 9, 10], "qualidade_I": "dom" },
            { "nome": "Lídio #2 (Lídio Aumentado)", "estrutura": [0, 3, 4, 6, 8, 9, 11], "qualidade_I": "maj+" },
            { "nome": "Lócrio bb7", "estrutura": [0, 1, 3, 5, 6, 8, 9], "qualidade_I": "m7(b5)" }
        ]
    },
    "Menor Melódica": {
        "estrutura": [0, 2, 3, 5, 7, 9, 11], 
        "modos": [
            { "nome": "M. Melódica (I)", "estrutura": [0, 2, 3, 5, 7, 9, 11], "qualidade_I": "m" },
            { "nome": "Dórico b2", "estrutura": [0, 1, 3, 5, 7, 9, 10], "qualidade_I": "m" },
            { "nome": "Lídio Aumentado", "estrutura": [0, 2, 4, 6, 8, 9, 11], "qualidade_I": "maj+" },
            { "nome": "Lídio b7", "estrutura": [0, 2, 4, 6, 7, 9, 10], "qualidade_I": "dom" },
            { "nome": "Mixolídio b6", "estrutura": [0, 2, 4, 5, 7, 8, 10], "qualidade_I": "dom" },
            { "nome": "Lócrio #2", "estrutura": [0, 2, 3, 5, 6, 8, 10], "qualidade_I": "m7(b5)" },
            { "nome": "Super Lócrio/Alterada", "estrutura": [0, 1, 3, 4, 6, 8, 10], "qualidade_I": "dom" }
        ]
    },
    "Menor Harmônica": {
        "estrutura": [0, 2, 3, 5, 7, 8, 11], 
        "modos": [
            { "nome": "M. Harmônica (I)", "estrutura": [0, 2, 3, 5, 7, 8, 11], "qualidade_I": "m" },
            { "nome": "Lócrio #6", "estrutura": [0, 1, 3, 5, 6, 9, 10], "qualidade_I": "m7(b5)" },
            { "nome": "Jônio #5 (I#5)", "estrutura": [0, 2, 4, 5, 8, 9, 11], "qualidade_I": "maj+" },
            { "nome": "Dórico b4", "estrutura": [0, 2, 3, 4, 7, 9, 10], "qualidade_I": "m" },
            { "nome": "Frígio Dominante", "estrutura": [0, 1, 4, 5, 7, 8, 10], "qualidade_I": "dom" },
            { "nome": "Lídio #2", "estrutura": [0, 3, 4, 6, 7, 9, 11], "qualidade_I": "maj" },
            { "nome": "Super Lócrio bb7", "estrutura": [0, 1, 3, 4, 6, 8, 9], "qualidade_I": "dim" }
        ]
    },
    "Pentatônica": {
        "estrutura": [0, 2, 4, 7, 9],
        "modos": [
            { "nome": "Pentatônica Maior", "estrutura": [0, 2, 4, 7, 9], "qualidade_I": "maj" },
            { "nome": "Pentatônica Menor", "estrutura": [0, 3, 5, 7, 10], "qualidade_I": "m" }
        ]
    },
    "Bebop (Dominante)": {
        "estrutura": [0, 2, 4, 5, 7, 9, 10, 11],
        "modos": [
            { "nome": "Bebop Dominante", "estrutura": [0, 2, 4, 5, 7, 9, 10, 11], "qualidade_I": "dom" },
        ]
    },
    "Octatônica (HW)": {
        "estrutura": [0, 1, 3, 4, 6, 7, 9, 10], // H-W
        "modos": [
            { "nome": "Diminuta (H/W)", "estrutura": [0, 1, 3, 4, 6, 7, 9, 10], "qualidade_I": "dim" }
        ]
    },
    "Tons Inteiros": {
        "estrutura": [0, 2, 4, 6, 8, 10],
        "modos": [
            { "nome": "Tons Inteiros", "estrutura": [0, 2, 4, 6, 8, 10], "qualidade_I": "aug" },
        ]
    }
};

const CONTEXTOS_GERADORES = [
    { value: "tonal_fixo", text: "1) Tonal Fixo (Funcional Clássica)" },
    { value: "tonal_aleatorio", text: "2) Tonal Aleatório (Jazzístico/Empréstimos)" },
    { value: "modal_pura", text: "3) Música Modal Pura" },
    { value: "completamente_aleatorio", text: "4) Completamente Aleatório" }
];

const PESOS_PADRAO = {
    // Pesos iniciais para a lógica de 'escolherComPeso'
    "contexto_tonal_fixo": { "I": 35, "V": 30, "IV": 25, "II": 5, "VI": 5 },
    "complexidade": { "triade": 30, "setima": 40, "extensao": 30 }, // Níveis base de probabilidade
    "jazz": { "ii_V_I_chance": 0.40, "subV7_chance": 0.20 }
};

const ESTRUTURA_INTERV_RELATIVA = {
    // Estruturas interválicas para Sugestões de Escala
    "Jônio": "1, 2, 3, 4, 5, 6, 7", "Dórico": "1, 2, b3, 4, 5, 6, b7", 
    "Lídio": "1, 2, 3, #4, 5, 6, 7", "Mixolídio": "1, 2, 3, 4, 5, 6, b7", 
    "M. Melódica": "1, 2, b3, 4, 5, 6, 7", "M. Harmônica": "1, 2, b3, 4, 5, b6, 7",
    // Adicionar as demais estruturas conforme a necessidade
};
