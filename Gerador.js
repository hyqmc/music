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

    // --- LÓGICA DE COMPLEXIDADE E CIFRAGEM ---

    getComplexidadeAtiva() {
        const tipos_marcados = this.config.complexidade;
        let pesos_filtrados = {};
        const niveis_base = ['triade', 'setima', 'extensao'];
        
        if (!tipos_marcados.some(t => niveis_base.includes(t))) {
            pesos_filtrados['triade'] = 100;
        } else {
             for (const key of niveis_base) {
                 if (tipos_marcados.includes(key)) {
                     pesos_filtrados[key] = this.pesos.complexidade[key];
                 }
             }
        }
        return {
            niveis: pesos_filtrados,
            tipos_especiais: tipos_marcados.filter(t => !niveis_base.includes(t))
        };
    }

    montarSufixo(funcao_base, tipo_complexidade) {
        const qualidade = funcao_base.qualidade;
        let sufixo = (qualidade === "m" || qualidade === "dom" || qualidade === "dim") ? qualidade : "";
        const tipos_especiais = this.config.complexidade;
        
        let extensoes_cifradas = '';

        // 1. Aplica o nível de complexidade (triade, setima, extensão)
        if (tipo_complexidade === "setima" || tipo_complexidade === "extensao") {
            if (qualidade === "maj") sufixo = "maj7";
            else if (qualidade === "dom") sufixo = "7";
            else if (qualidade === "m") sufixo += "7";
            else if (qualidade === "m7(b5)") sufixo = "m7(b5)";
            
            // Lógica de Extensões
            if (tipo_complexidade === "extensao") {
                let tensoes = ['9'];
                if (Math.random() > 0.4) tensoes.push('13'); 
                if (Math.random() < 0.3 && sufixo.includes('maj')) tensoes.push('#11'); 
                extensoes_cifradas = `(${tensoes.join(',')})`;
            }
        } 
        
        // 2. Aplica TIPOS ESPECIAIS
        if (tipos_especiais.includes('aumentado') && qualidade !== "m" && Math.random() < 0.15) {
             return "+";
        }
        if (tipos_especiais.includes('diminuto') && qualidade !== "m7(b5)" && Math.random() < 0.1) {
             return "dim";
        }
        if (tipos_especiais.includes('sus4') && (qualidade === "dom" || qualidade === "maj") && Math.random() < 0.2) {
             return "sus4";
        }
        if (tipos_especiais.includes('powerchord') && Math.random() < 0.1) {
             return "5";
        }
        if (tipos_especiais.includes('quartal') && Math.random() < 0.08) {
            return "Quartal"; 
        }
        if (tipos_especiais.includes('quintal') && Math.random() < 0.08) {
            return "Quintal"; 
        }
        
        return sufixo.replace('dom', '') + extensoes_cifradas;
    }

    aplicarBaixoAlternativo(cifra_base, raiz_acorde_cifra) {
        if (this.config.complexidade.includes('slash_chords') && Math.random() < 0.2) {
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
        
        const complexidade_ativa = this.getComplexidadeAtiva();
        const tipo_complexidade = this.escolherComPeso(Object.keys(complexidade_ativa.niveis), complexidade_ativa.niveis);
        
        let sufixo = this.montarSufixo(funcao_base, tipo_complexidade);
        let tensoes = ""; 

        let cifra_final = raiz_cifra + sufixo + tensoes;
        
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

    // --- FUNÇÕES DE SUBSTITUIÇÃO ---
    
    substituirPorRelativo(acorde_objeto, grau_alvo) {
        const tonalidade_index = this.notas.indexOf(this.config.tonalidade);
        const grau_alvo_obj = FUNCOES_HARMONICAS.find(f => f.grau === grau_alvo);
        
        if (!grau_alvo_obj) return acorde_objeto.cifra;
        
        const raiz_index_absoluto = (tonalidade_index + grau_alvo_obj.semitons) % 12;
        const raiz_cifra = this.cifrarNota(raiz_index_absoluto);
        
        const sufixo = acorde_objeto.cifra.substring(acorde_objeto.raiz.length);
        
        return raiz_cifra + sufixo;
    }

    substituirPorTritono(acorde_objeto) {
        const raiz_original_index = this.notas.indexOf(acorde_objeto.raiz);
        const subV_index = (raiz_original_index + 6) % 12;
        const subV_cifra = this.cifrarNota(subV_index);
        
        return `${subV_cifra}7(b9, #11)`;
    }

    calcularHarmoniaNegativa(acorde_objeto, eixo_valor) {
        const raiz_index = this.notas.indexOf(acorde_objeto.raiz);
        const neg_raiz_index = (2 * eixo_valor - raiz_index);
        const neg_raiz_index_ajustado = Math.round((neg_raiz_index % 12 + 12) % 12);
        const neg_raiz_cifra = this.cifrarNota(neg_raiz_index_ajustado);

        let neg_sufixo = acorde_objeto.cifra.includes("m") ? "maj7" : "m7";
        if (acorde_objeto.cifra.includes("7")) neg_sufixo = "m7";
        
        return `${neg_raiz_cifra}${neg_sufixo}`;
    }

    gerarSugestoesDeEmprestimoModal(acorde_objeto) {
        const raiz = acorde_objeto.raiz;
        return [
            { modo: 'Dórico', cifra: `${raiz}m7` },
            { modo: 'Frígio', cifra: `${raiz}m7(b9)` },
            { modo: 'M. Harmônica', cifra: `${raiz}maj7(#5)` }
        ];
    }
    
    gerarSugestoesDeSubstituicao(acorde_objeto) {
        const substituicoes = [];
        const funcao_original = acorde_objeto.funcao_tipo;
        const tonalidade_index = this.notas.indexOf(this.config.tonalidade); 
        
        // Relativos
        if (funcao_original === "Tônica") {
            substituicoes.push({ tipo: "Relativo", acoes: [{ grau: "III", label: "III (Mediante)" }, { grau: "VI", label: "VI (Relativo Menor)" }] });
        } else if (funcao_original === "Subdominante") {
             substituicoes.push({ tipo: "Relativo", acoes: [{ grau: "II", label: "II (Supertônica)" }, { grau: "IV", label: "IV (Subdominante)" }] });
        } else if (funcao_original === "Dominante") {
             substituicoes.push({ tipo: "Relativo", acoes: [{ grau: "VII", label: "VII (Sensível)" }, { grau: "V", label: "V (Dominante)" }] });
        }

        // SubV7/V7
        if (acorde_objeto.cifra.includes("7") && !acorde_objeto.cifra.includes("maj")) { 
            substituicoes.push({ tipo: "Trítono", acoes: [{ label: "SubV7", cifra_calc: this.substituirPorTritono(acorde_objeto) }] }); 
        }

        // Harmonia Negativa
        const eixo_tonico_index = (tonalidade_index + 3.5); 
        const eixo_dominante_index = (tonalidade_index + 11);
        
        substituicoes.push({ 
            tipo: "Neg. Harm.",
            eixos: [
                { nome: "Eixo Tônico", eixo_valor: eixo_tonico_index, cifra_calc: this.calcularHarmoniaNegativa(acorde_objeto, eixo_tonico_index) },
                { nome: "Eixo Dominante", eixo_valor: eixo_dominante_index, cifra_calc: this.calcularHarmoniaNegativa(acorde_objeto, eixo_dominante_index) }
            ]
        });

        // AEM
        substituicoes.push({ tipo: "AEM", sugestoes: this.gerarSugestoesDeEmprestimoModal(acorde_objeto) });
        return substituicoes;
    }

    // --- FUNÇÕES PRINCIPAIS (COMPLETAS) ---

    gerarProgressao() {
        // Lógica para tratar entradas "Aleatório"
        
        // 1. Tonalidade Aleatória
        let tonalidade_base = this.config.tonalidade;
        if (tonalidade_base === 'Aleatório') {
            tonalidade_base = this.notas[Math.floor(Math.random() * this.notas.length)];
            this.config.tonalidade = tonalidade_base;
        }
        const tonalidade_index = this.notas.indexOf(tonalidade_base);
        
        // 2. Escala e Modo Aleatórios
        let modo_obj = this.config.escala_ativa;
        if (this.config.escala === 'Aleatório' || this.config.modo === 'Aleatório' || !modo_obj) {
            const escalas_chaves = Object.keys(ESCALAS);
            const escala_chave = escalas_chaves[Math.floor(Math.random() * escalas_chaves.length)];
            const modos_disponiveis = ESCALAS[escala_chave].modos;
            
            modo_obj = modos_disponiveis[Math.floor(Math.random() * modos_disponiveis.length)];
            
            this.config.escala_ativa = modo_obj;
            this.config.escala = escala_chave;
            this.config.modo = modo_obj.nome;
        }
        
        this.escala_ativa = modo_obj; 
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

    transporProgressao(progressao_original, nova_tonalidade) {
        const tonalidade_original = this.config.tonalidade;
        const diferenca_semitons = (this.notas.indexOf(nova_tonalidade) - this.notas.indexOf(tonalidade_original) + 12) % 12;

        this.gerarMapaDiatonico(this.notas.indexOf(nova_tonalidade), this.escala_ativa.estrutura); 
        
        const progressao_transposta = progressao_original.map(acorde_original => {
            let cifra = acorde_original.cifra;
            const raiz_original_index = this.notas.indexOf(acorde_original.raiz);
            const nova_raiz_index = (raiz_original_index + diferenca_semitons) % 12;
            const nova_raiz_cifra = this.cifrarNota(nova_raiz_index);
            
            const nova_cifra_completa = nova_raiz_cifra + cifra.substring(acorde_original.raiz.length); 

            return { ...acorde_original, cifra: nova_cifra_completa, raiz: nova_raiz_cifra };
        });

        return progressao_transposta;
    }
    
    exportarHistorico() {
        const json_string = JSON.stringify(this.progressoes_historico, null, 2);
        const blob = new Blob([json_string], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'historico_progressao_harmonica.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    importarHistorico(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.progressoes_historico = JSON.parse(e.target.result);
                console.log("Histórico de progressões importado com sucesso.");
            } catch (error) {
                console.error("Erro ao importar histórico:", error);
                alert("Falha ao carregar o arquivo. Certifique-se de que é um JSON válido.");
            }
        };
        reader.readAsText(file);
    }
}
