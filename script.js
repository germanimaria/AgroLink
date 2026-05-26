// 1. FUNÇÃO DE NAVEGAÇÃO INTERNA (Sistema de Abas/Páginas Únicas)
function mudarPagina(idAlvo) {
    // Busca todas as marcas de contêineres principais (nossas "páginas")
    const telas = document.querySelectorAll('.pagina-tela');
    
    // Remove o estado ativo de todas elas para ocultá-las
    telas.forEach(tela => {
        tela.classList.remove('ativa');
    });
    
    // Mostra apenas a tela que bate com o ID clicado no botão
    const telaDestino = document.getElementById(idAlvo);
    if (telaDestino) {
        telaDestino.classList.add('ativa');
    }

    // Atualiza visualmente qual botão do menu está marcado como ativo
    const botoes = document.querySelectorAll('.btn-menu');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    
    // Vincula a classe 'ativo' no botão disparado pelo clique (usando o event global)
    if (window.event && window.event.target) {
        window.event.target.classList.add('ativo');
    }
}

// 2. BANCO DE DADOS LOCAL SIMULADO EM MEMÓRIA
let produtosLocais = [
    { nome: "Tomate Caipira (Kg)", valor: "R$ 5,90" },
    { nome: "Maço de Espinafre", valor: "R$ 3,00" }
];

// Atualiza a visualização gráfica da lista no painel lateral
function renderizarListaNaVitrine() {
    const boxLista = document.getElementById('listaDeProdutos');
    if (!boxLista) return; // Segurança caso a div não exista no DOM
    
    boxLista.innerHTML = ""; // Limpa os itens anteriores da tela

    // Reconstrói a lista mapeando o nosso array
    produtosLocais.forEach(item => {
        const card = document.createElement('div');
        card.className = "card-item";
        card.innerHTML = `📦 • <strong>${item.nome}</strong><br> ‣ Preço: ${item.valor}`;
        boxLista.appendChild(card);
    });
}

// Executado quando o produtor clica em "Publicar Oferta"
function cadastrarProdutoSimulado() {
    const inputNome = document.getElementById('nomeAlimento');
    const inputPreco = document.getElementById('precoAlimento');

    // Validação de entrada básica
    if (inputNome.value.trim() === "" || inputPreco.value.trim() === "") {
        alert("Preencha todos os campos cadastrais antes de enviar!");
        return;
    }

    // Cria o objeto na estrutura chave-valor e insere no array principal
    produtosLocais.push({
        nome: inputNome.value,
        valor: inputPreco.value
    });

    // Reseta as caixas de texto para novas entradas
    inputNome.value = "";
    inputPreco.value = "";

    // Força o redesenho imediato do componente visual
    renderizarListaNaVitrine();
}

// 3. ENVIAR FEEDBACK/OUVIDORIA (NOVA FUNÇÃO)
function enviarOuvidoriaSimulada() {
    const nome = document.getElementById('nomeUsuario');
    const email = document.getElementById('emailUsuario');
    const mensagem = document.getElementById('mensagemUsuario');

    if (nome.value.trim() === "" || email.value.trim() === "" || mensagem.value.trim() === "") {
        alert("Por favor, preencha todos os campos para enviar sua mensagem!");
        return;
    }

    // Exibe mensagem de sucesso simulada
    alert(`Obrigado pelo contato, ${nome.value}! Seu feedback foi enviado com sucesso para a equipe AgroLink.`);

    // Limpa o formulário após o envio
    nome.value = "";
    email.value = "";
    mensagem.value = "";
}

// Aciona a renderização inicial dos itens assim que o script carregar
renderizarListaNaVitrine();