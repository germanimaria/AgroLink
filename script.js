
// 1. Controle de Navegação das Telas (SPA)
function mudarPagina(idAlvo, botaoClicado) {
    const telas = document.querySelectorAll('.pagina-tela');
    telas.forEach(tela => tela.classList.remove('ativa'));
    
    const telaDestino = document.getElementById(idAlvo);
    if (telaDestino) {
        telaDestino.classList.add('ativa');
    }

    const botoes = document.querySelectorAll('.btn-menu');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    
    if (botaoClicado) {
        botaoClicado.classList.add('ativo');
    }
}

// 2. Lista Inicial de Produtos (Banco de Dados Simulado)
let produtosLocais = [
    { nome: "Tomate Caipira (Kg)", valor: "R$ 5,90", cidade: "Londrina", numero: "(43) 99999-1122", sustentavel: true },
    { nome: "Maço de Espinafre", valor: "R$ 3,00", cidade: "Marialva", numero: "(43) 98888-3344", sustentavel: false }
];

// Mostra a lista de produtos atualizada na tela
function renderizarListaNaVitrine() {
    const boxLista = document.getElementById('listaDeProdutos');
    if (!boxLista) return; 
    boxLista.innerHTML = ""; 

    produtosLocais.forEach((item) => {
        const card = document.createElement('div');
        
        // Aplica classe especial de destaque se for sustentável
        card.className = item.sustentavel ? "card-item eco-destaque" : "card-item";
        
        // Insere o botão de encomenda direta em cada card
        card.innerHTML = `  
            ${item.sustentavel ? '<span class="selo-eco">🌱 Eco-Sustentável</span><br>' : ''}
            📦 • <strong>${item.nome}</strong><br> 
            ‣ Preço: ${item.valor}<br>
            ‣ Local: ${item.cidade}<br>
            ‣ Contato: ${item.numero}
            <button class="btn-encomenda" onclick="simularEncomenda('${item.nome}', '${item.numero}')">🛒 Encomendar Produto</button>
        `;

        boxLista.appendChild(card);
    });
}

// Cadastra um novo produto vindo do formulário
function cadastrarProdutoSimulado() {
    const inputNome = document.getElementById('nomeAlimento');
    const inputPreco = document.getElementById('precoAlimento');
    const inputCidade = document.getElementById('cidadeProdutor');
    const inputNumero = document.getElementById('numeroProdutor');
    const checkSustentavel = document.getElementById('cultivoSustentavel');

    // Valida se todos os campos estão preenchidos
    if (!inputNome.value.trim() || !inputPreco.value.trim() || !inputCidade.value.trim() || !inputNumero.value.trim()) {
        alert("Preencha todos os campos cadastrais antes de enviar!");
        return;
    }

    const precoNumerico = parseFloat(inputPreco.value);
    if (isNaN(precoNumerico) || precoNumerico <= 0) {
        alert("Por favor, insira um preço válido!");
        return;
    }

    // Formata o preço para o padrão R$
    const precoFormatado = precoNumerico.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Salva o novo objeto no array
    produtosLocais.push({
        nome: inputNome.value.trim(),
        valor: precoFormatado,
        cidade: inputCidade.value.trim(),
        numero: inputNumero.value.trim(),
        sustentavel: checkSustentavel.checked
    });

    // Limpa os campos do formulário
    inputNome.value = "";
    inputPreco.value = "";
    inputCidade.value = "";
    inputNumero.value = "";
    checkSustentavel.checked = false;
    
    renderizarListaNaVitrine();
}


// 3. Cálculos da Calculadora de Carbono 
function calcularPegadaCarbono() {
    const inputDistancia = document.getElementById('distanciaKm');
    const containerResultado = document.getElementById('resultadoCarbono');
    
    const kmLocal = parseFloat(inputDistancia.value);
    
    if (isNaN(kmLocal) || kmLocal <= 0) {
        alert("Por favor, insira uma distância válida em quilômetros!");
        return;
    }

    const kmImportadoPadrao = 650; 
    const emissaoPorKm = 0.12; 

    const co2Local = kmLocal * emissaoPorKm;
    const co2Importado = kmImportadoPadrao * emissaoPorKm;
    
    // Torna o painel visível removendo a classe do CSS
    containerResultado.classList.remove('escondido');

    // Rota local mais curta (Gera economia + impacto positivo)
    if (kmLocal < kmImportadoPadrao) {
        const economia = co2Importado - co2Local;
        containerResultado.innerHTML = `
            <p> O seu produto local emitirá aproximadamente <strong>${co2Local.toFixed(2)} kg</strong> de CO₂.</p>
            <p> Um produto vindo de fora emitiria <strong>${co2Importado.toFixed(2)} kg</strong> de CO₂.</p>
            <p class="sucesso-texto">🎉 <strong>Incrível!</strong> Ao comprar de um produtor mais próximo, você evitou a emissão de <strong>${economia.toFixed(2)} kg</strong> de poluentes na atmosfera!</p>
        `;
    } 
    // Rota excede a média padrão (Gera excesso + impacto negativo)
    else {
        const excesso = co2Local - co2Importado;
        containerResultado.innerHTML = `
            <p> Esse transporte emitirá aproximadamente <strong>${co2Local.toFixed(2)} kg</strong> de CO₂ devido à distância de ${kmLocal} Km.</p>
            <p> A média de distribuição regional padrão é de <strong>${co2Importado.toFixed(2)} kg</strong> de CO₂.</p>
            <p class="erro-texto">
                ⚠️ <strong>Atenção:</strong> Essa rota excede a média regional em <strong>${excesso.toFixed(2)} kg</strong> de CO₂. Para maior sustentabilidade, priorize conexões com produtores mais próximos da sua comunidade!
            </p>
        `;
    }
}

// Janela de simulação de compra direta
function simularEncomenda(nomeProduto, telefone) {
    alert(`🛒 Pedido Simulado!\n\nO AgroLink gerou uma rota de conexão direta.\nVocê está sendo conectado ao produtor através do contato: ${telefone} para fechar a compra do item: "${nomeProduto}".`);
}

// 4. Controle de envio simples da Ouvidoria
function enviarOuvidoriaSimulada() {
    const nome = document.getElementById('nomeUsuario');
    const email = document.getElementById('emailUsuario');
    const mensagem = document.getElementById('mensagemUsuario');

    if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
        alert("Por favor, preencha todos os campos para enviar sua mensagem!");
        return;
    }

    alert(`Obrigado pelo contato, ${nome.value}! Seu feedback foi enviado com sucesso para a equipe AgroLink.`);

    nome.value = "";
    email.value = "";
    mensagem.value = "";
}

    renderizarListaNaVitrine();