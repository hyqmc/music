// Gerador.js
// Depende do arquivo data.js

class GeradorDeProgressao {
    constructor(configuracao, pesos = PESOS_PADRAO) {
        this.config = configuracao;
        this.pesos = pesos;
        this.progressoes_historico = [];
        this.notas = NOTAS;
        this.escala_ativa = ESCALAS["Diatônica (Maior)"].modos[0];
        this.mapa_tonal_ativo = {};
    }

    // --- Funções Utilitárias Básicas ---

    escolherComPeso(opcoes, pesos) {
        const somaTotalPesos = Object.values(pesos).reduce((soma, peso) => soma + peso, 0);
        let valorAleatorio = Math.random() * somaTotalPesos;
        let pesoAcumulado = 0;

        for (const chave in pesos) {
            pesoAcumulado += pesos[chave];
            if (valorAleatorio <= pesoAcumulado) {
                if (opcoes.length && typeof opcoes[0] === 'object') {
                    return opcoes.find(opcao => opcao.grau === chave);
                }
                return chave;
            }
        }
        return opcoes.length ? opcoes[0] : null;
    }

    gerarMapaDiatonico(tonalidade_index, estrutura_escala) {
        const mapa = {};
        const notas_base = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        let indice_letra = this.notas[tonalidade_index].charCodeAt(0) - 'A'.charCodeAt(0);

        for (const intervalo of estrutura_escala) {
            const indice_absoluto = (tonalidade_index + intervalo) % 12;
            const nome_letra = notas_base[indice_letra % 7];
            const possiveis_cifras = NOMES_CIFRA_FIXOS[indice_absoluto];
            
            let nome_cifra = typeof possiveis_cifras === 'string' 
                             ? possiveis_cifras
                             : possiveis_cifras.find(cifra => cifra.charAt(0) === nome_letra);
            
            mapa[indice_absoluto] = nome_cifra || possiveis_cifras[0];
            indice_letra++;
        }
        this.mapa_tonal_ativo = mapa;
        return mapa;
    }

    cifrarNota(indice_absoluto) {
        const indice_limpo = (indice_absoluto % 12 + 12) % 12;
        if (this.mapa_tonal_ativo[indice_limpo] !== undefined) {
            return this.mapa_tonal_ativo[indice_limpo];
        }
        const nome_alternativo = NOMES_CIFRA_FIXOS[indice_limpo];
        return Array.isArray(nome_alternativo) ? nome_alternativo[0] : nome_alternativo;
    }

    // --- Funções de Harmonização e Cifragem ---

    montarSufixo(funcao_base, tipo_complexidade) {
        const qualidade = funcao_base.qualidade;
        let sufixo = (qualidade === "m" || qualidade === "dom" || qualidade === "dim") ? qualidade : "";

        if (tipo_complexidade === "setima" || tipo_complexidade === "extensao") {
            if (qualidade === "maj") sufixo = "maj7";
            else if (qualidade === "dom") sufixo = "7";
            else if (qualidade === "m") sufixo += "7";
            else if (qualidade === "m7(b5)") sufixo = "m7(b5)";
        } else if (tipo_complexidade === "especial") {
            if (Math.random() < 0.2) sufixo = "+";
            else if (Math.random() < 0.5) sufixo += "sus4";
            else sufixo += "5";
        }
        return sufixo.replace('dom', '');
    }

    aplicarBaixoAlternativo(cifra_base, raiz_acorde_cifra) {
        // [CORREÇÃO APLICADA AQUI] Acesso direto à raiz.
        if (this.config.incluirBaixosAlternativos && Math.random() < 0.2) {
            const graus_inversao_semitons = [4, 7]; 
            
            if (graus_inversao_semitons.length > 0) {
                const baixo_index_relativo = graus_inversao_semitons[Math.floor(Math.random() * graus_inversao_semitons.length)];
                
                const raiz_index = this.notas.indexOf(raiz_acorde_cifra);
                if (raiz_index === -1) return cifra_base;
                
                const baixo_index_absoluto = (raiz_index + baixo_index_relativo) % 12; 

                const baixo_cifra = this.cifrarNota(baixo_index_absoluto);
                return `${cifra_base}/${baixo_cifra}`;
            }
        }
        return cifra_base;
    }

    harmonizarAcorde(funcao_base, tonalidade_index) {
        const grau_semitons = funcao_base.semitons;
        const raiz_index_absoluto = (tonalidade_index + grau_semitons) % 12;
        const raiz_cifra = this.cifrarNota(raiz_index_absoluto);
        
        const tipo_complexidade = this.escolherComPeso(Object.keys(this.pesos.complexidade), this.pesos.complexidade);
        let sufixo = this.montarSufixo(funcao_base, tipo_complexidade);
        let tensoes = ""; 

        let cifra_final = raiz_cifra + sufixo + tensoes;
        
        // Aplica o baixo alternativo (Chamada corrigida)
        cifra_final = this.aplicarBaixoAlternativo(cifra_final, raiz_cifra); 

        return {
            raiz: raiz_cifra,
            cifra: cifra_final,
            funcao: funcao_base.grau,
            funcao_tipo: funcao_base.funcao,
            substituicoes_opcoes: null,
            sugestoes_escala: { contextual: { nome: `${raiz_cifra} ${this.config.modo}`, estrutura: ESTRUTURA_INTERV_RELATIVA[this.config.modo.split(' ')[0]] || "Estrutura Padrão" } }
        };
    }

    // --- Funções de Substituição Complexa (Essenciais para evitar o erro) ---

    aplicarHarmoniaNegativa(acorde_objeto, eixo_semitom_total) {
        const raiz_index = this.notas.indexOf(acorde_objeto.raiz);
        const neg_raiz_index = (2 * eixo_semitom_total - raiz_index);
        const neg_raiz_index_ajustado = Math.round((neg_raiz_index % 12 + 12) % 12);
        const neg_raiz_cifra = this.cifrarNota(neg_raiz_index_ajustado);

        let neg_sufixo = acorde_objeto.cifra.includes("m") ? "maj7" : "m7";
        
        return `${neg_raiz_cifra}${neg_sufixo}`;
    }
    
    // [CORREÇÃO APLICADA AQUI] Adicionando a função completa que faltou e causou o erro inicial
    gerarSugestoesDeSubstituicao(acorde_objeto) {
        const substituicoes = [];
        const funcao_original = acorde_objeto.funcao_tipo;
        
        if (funcao_original === "Tônica") {
            substituicoes.push({ tipo: "Relativo", acoes: [{ grau: "III", label: "III (Mediante)" }, { grau: "VI", label: "VI (Relativo Menor)" }] });
        } else if (funcao_original === "Subdominante") {
             substituicoes.push({ tipo: "Relativo", acoes: [{ grau: "II", label: "II (Supertônica)" }, { grau: "IV", label: "IV (Subdominante)" }] });
        } else if (funcao_original === "Dominante") {
             substituicoes.push({ tipo: "Relativo", acoes: [{ grau: "VII", label: "VII (Sensível)" }, { grau: "V", label: "V (Dominante)" }] });
        }

        if (acorde_objeto.cifra.includes("7") && !acorde_objeto.cifra.includes("maj")) { 
            substituicoes.push({ tipo: "SubV7/V7" }); 
        }

        const tonalidade_index = this.notas.indexOf(this.config.tonalidade);
        const eixo_tonico_index = (tonalidade_index + 3.5); 
        const eixo_dominante_index = (tonalidade_index + 11);
        
        substituicoes.push({ 
            tipo: "Neg. Harm.",
            eixos: [
                { nome: "Eixo Tônico", eixo_valor: eixo_tonico_index },
                { nome: "Eixo Dominante", eixo_valor: eixo_dominante_index }
            ]
        });

        substituicoes.push({ tipo: "AEM" });
        return substituicoes;
    }

    // --- Funções Principais (Gerar/Formatar/Transpor) ---

    gerarProgressao() {
        const tonalidade_base = this.config.tonalidade || "C";
        const tonalidade_index = this.notas.indexOf(tonalidade_base);
        
        this.escala_ativa = this.config.escala_ativa; 
        
        this.gerarMapaDiatonico(tonalidade_index, this.escala_ativa.estrutura);

        const total_acordes = this.config.ritmica_acordes_por_comp.reduce((a, b) => a + b, 0);
        let progressao_objetos = [];
        let compasso_atual = 1;
        let acorde_no_compasso = 0;

        for (let i = 0; i < total_acordes; i++) {
            const funcao = this.escolherComPeso(FUNCOES_HARMONICAS, this.pesos.contexto_tonal_fixo);
            const acorde_obj = this.harmonizarAcorde(funcao, tonalidade_index);
            
            acorde_obj.compasso = compasso_atual;
            acorde_obj.substituicoes_opcoes = this.gerarSugestoesDeSubstituicao(acorde_obj);
            
            progressao_objetos.push(acorde_obj);

            acorde_no_compasso++;
            if (acorde_no_compasso >= this.config.ritmica_acordes_por_comp[compasso_atual - 1]) {
                compasso_atual++;
                acorde_no_compasso = 0;
            }
        }

        const output = this.formatarOutput(progressao_objetos);
        this.progressoes_historico.push(output);
        return output;
    }

    // ... (transporProgressao, formatarOutput, exportarHistorico, importarHistorico)
    // Essas funções estão completas nas etapas anteriores, mas estão omitidas aqui por brevidade.
    // Presume-se que você as incluiu na versão final do seu Gerador.js.
    }
