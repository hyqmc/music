// Gerador.js

class GeradorDeProgressao {
    constructor(configuracao, pesos = PESOS_PADRAO) {
        this.config = configuracao;
        this.pesos = pesos;
        this.progressoes_historico = [];
        this.notas = NOTAS;
        // Assume escala e modo iniciais com base na config, para demonstração:
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
        // [Implementação Simplificada]
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
        // Retorna a primeira opção se for acidental e não estiver no mapa (prioriza a primeira cifragem)
        const nome_alternativo = NOMES_CIFRA_FIXOS[indice_limpo];
        return Array.isArray(nome_alternativo) ? nome_alternativo[0] : nome_alternativo;
    }

    // --- Funções de Harmonização e Cifragem ---

    montarSufixo(funcao_base, tipo_complexidade) {
        // [Implementação detalhada da função montarSufixo da etapa anterior]
        const qualidade = funcao_base.qualidade;
        let sufixo = (qualidade === "m" || qualidade === "dom" || qualidade === "dim") ? qualidade : "";

        if (tipo_complexidade === "setima" || tipo_complexidade === "extensao") {
            if (qualidade === "maj") sufixo = "maj7";
            else if (qualidade === "dom") sufixo = "7";
            else if (qualidade === "m") sufixo += "7";
            else if (qualidade === "m7(b5)") sufixo = "m7(b5)";
        } else if (tipo_complexidade === "especial") {
            if (Math.random() < 0.2) sufixo = "+"; // Acorde Aumentado
            else if (Math.random() < 0.5) sufixo += "sus4";
            else sufixo += "5";
        }
        return sufixo.replace('dom', ''); // Limpa dominante padrão
    }

    aplicarBaixoAlternativo(cifra_base, notas_acorde) {
        if (this.config.incluirBaixosAlternativos && Math.random() < 0.2) {
            // Lógica simplificada: usa a 3ª ou a 5ª como baixo
            const graus_inversao = [notas_acorde[1], notas_acorde[2]];
            if (graus_inversao.length > 1) {
                const baixo_index_relativo = graus_inversao[Math.floor(Math.random() * graus_inversao.length)];
                const baixo_index_absoluto = (this.notas.indexOf(acorde_objeto.raiz) + baixo_index_relativo) % 12; // Necessita da Raiz original
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
        let tensoes = ""; // Lógica de tensões omitida por brevidade

        let cifra_final = raiz_cifra + sufixo + tensoes;
        
        // Aplica o baixo alternativo
        cifra_final = this.aplicarBaixoAlternativo(cifra_final, [0, 4, 7]); // Notas 0, 4, 7 (R, 3, 5)

        return {
            raiz: raiz_cifra,
            cifra: cifra_final,
            funcao: funcao_base.grau,
            funcao_tipo: funcao_base.funcao,
            substituicoes_opcoes: null, // Preenchido no gerarProgressao
            sugestoes_escala: { contextual: { nome: `${raiz_cifra} Jônio`, estrutura: ESTRUTURA_INTERV_RELATIVA["Jônio"] } } // Simplificado
        };
    }

    // --- Funções de Substituição Complexa ---

    aplicarHarmoniaNegativa(acorde_objeto, eixo_semitom_total) {
        const raiz_index = this.notas.indexOf(acorde_objeto.raiz);
        // Neg(n) = (2 * Eixo - n) mod 12
        const neg_raiz_index_ajustado = Math.round((2 * eixo_semitom_total - raiz_index) % 12 + 12) % 12;
        const neg_raiz_cifra = this.cifrarNota(neg_raiz_index_ajustado);

        // Regra Negativa Simplificada: I Maj -> IV/V Menor; V Dom -> I/IV Maj; etc.
        let neg_sufixo = acorde_objeto.cifra.includes("m") ? "maj7" : "m7";
        
        return `${neg_raiz_cifra}${neg_sufixo}`;
    }

    // --- Função Principal e Output ---

    gerarProgressao() {
        // Simulação de inputs (substituir pelos valores da UI)
        const tonalidade_base = this.config.tonalidade || "C";
        const tonalidade_index = this.notas.indexOf(tonalidade_base);
        this.config.ritmica_acordes_por_comp = this.config.ritmica_acordes_por_comp || [1, 1, 1, 1];
        this.config.incluirBaixosAlternativos = true;
        
        this.gerarMapaDiatonico(tonalidade_index, this.escala_ativa.estrutura);

        const total_acordes = this.config.ritmica_acordes_por_comp.reduce((a, b) => a + b, 0);
        let progressao_objetos = [];
        let compasso_atual = 1;
        let acorde_no_compasso = 0;

        // Lógica de Geração Simplificada (Apenas Tonal Fixo)
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

    formatarOutput(progressao_objetos) {
        let cifra_formatada = "";
        let compasso_atual = 0;

        progressao_objetos.forEach(acorde => {
            if (acorde.compasso > compasso_atual) {
                cifra_formatada += (compasso_atual > 0 ? " \n" : "") + "| ";
                compasso_atual = acorde.compasso;
            }
            cifra_formatada += `${acorde.cifra} `;
        });
        cifra_formatada += "|";
        
        return {
            contexto_geracao: this.config,
            progressao: progressao_objetos,
            progressao_cifrada_formatada: cifra_formatada,
            timestamp: new Date().toLocaleString()
        };
    }
}
