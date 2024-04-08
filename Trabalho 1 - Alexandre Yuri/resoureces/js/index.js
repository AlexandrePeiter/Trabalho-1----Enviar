const mask = () => {
    $('#CPF').mask('000.000.000-00');
    $('#cep').mask('00000-000');
    $('#telefone').mask('00000-0000');
}

window.onload = function () {
    mask();
};


const addTelefone = document.querySelector("#addTelefone");
const tagForm = document.querySelector(".form");

let vetTelefones = [];
let vetEmails = [];
let vetAlunos = [];


addTelefone.addEventListener("click", function (e) {
    e.preventDefault();
    const telefones = document.querySelector("#telefones");
    const option = document.createElement("option");
    const ddd = document.querySelector("#ddd").value;
    const telefone = document.querySelector("#telefone").value;
    option.innerText = `(${ddd}) ${telefone}`;
    option.selected = true;
    vetTelefones.push(`(${ddd}) ${telefone}`);
    telefones.appendChild(option);
});

addEmail.addEventListener("click", function (e) {
    e.preventDefault();
    const telefones = document.querySelector("#emails");
    const option = document.createElement("option");
    const email = document.querySelector("#email").value;
    option.innerText = email;
    option.selected = true;
    vetEmails.push(email);
    telefones.appendChild(option);
});

const criarAlunoSimples = function criaAluno(nome, data, CPF, CEP, telefones, emails) {
    let aluno = {
        nome: nome,
        data: data,
        CPF: CPF,
        CEP: CEP,
        telefones: telefones,
        emails: emails
    }
    return aluno;
}

addAluno.addEventListener("click", function (e) {
    e.preventDefault();
    const nome = document.querySelector("#nome").value;
    const data = document.querySelector("#dataCargo").value;
    const CPF = document.querySelector("#CPF").value;
    const CEP = document.querySelector("#cep").value;
    if(nome && data && CPF && CEP){
    vetAlunos.push(criarAlunoSimples(nome, data, CPF, CEP, vetTelefones, vetEmails));
    apresentaAlunos();

    const informacao = document.querySelector(".informacao");
    informacao.style.display = 'block';
    apagarCampos();

    const meuModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    meuModal.show();
    }
    else{
        const meuModalErro = new bootstrap.Modal(document.getElementById('exampleModalErro'));
        meuModalErro.show();
    }
    
   

});

function apagarCampos(){
    document.querySelector("#nome").value = "";
    document.querySelector("#dataCargo").value = "";
    document.querySelector("#CPF").value = "";
    document.querySelector("#cep").value = "";
    document.querySelector("#complemento").value = "";
    document.querySelector("#numero").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#telefone").value = "";
    document.querySelector("#telefones").innerHTML = "";
    document.querySelector("#emails").innerHTML = "";
    vetTelefones = [];
    vetEmails = [];
}

function apresentaAlunos() {
    const table = document.querySelector("#table");
    table.innerHTML = "";
    for (n of vetAlunos) {

        const linha = document.createElement("tr");
        linha.className = "linhasTabela";

        const nome = document.createElement('td');
        nome.textContent = n.nome;
        linha.appendChild(nome);

        const data = document.createElement('td');
        data.textContent = n.data;
        linha.appendChild(data);

        const CPF = document.createElement('td');
        CPF.textContent = n.CPF;
        linha.appendChild(CPF);

        const CEP = document.createElement('td');
        CEP.textContent = n.CEP;
        linha.appendChild(CEP);

        const telefones = document.createElement('td');
        const telSelecet = document.createElement('select');
        telSelecet.className = 'form-control';
        for (i of n.telefones) {
            const tel = document.createElement('option');
            tel.innerText = i;
            telSelecet.appendChild(tel);
        }
        telefones.appendChild(telSelecet);
        linha.appendChild(telefones);

        const emails = document.createElement('td');
        const emailSelecet = document.createElement('select');
        emailSelecet.className = 'form-control';
        for (i of n.emails) {
            const email = document.createElement('option');
            email.innerText = i;
            emailSelecet.appendChild(email);
        }
        emails.appendChild(emailSelecet);
        linha.appendChild(emails);


        

        const celulaBotao = document.createElement('td');
        const botao = document.createElement('td');
        botao.addEventListener("click", function(){
            excluirLinha(this);
        });
        botao.textContent = "Excluir";
        botao.className = "botoesADD btn btn-secondary"
        
        celulaBotao.appendChild(botao);

        linha.appendChild(celulaBotao);


        table.appendChild(linha);
    }
}
function excluirLinha(button) {
    var row = button.parentNode.parentNode;
    var index = row.rowIndex - 1; 
    row.parentNode.removeChild(row);

    vetAlunos.splice(index, 1);

    if(vetAlunos.length == 0){
        const informacao = document.querySelector(".informacao");
        informacao.style.display = 'none';
    }
}
document.addEventListener('keydown', function (event) {
    // Verifica se a tecla pressionada é 'S' e se a tecla 'Ctrl' (ou 'Command') também está pressionada
    if ((event.ctrlKey || event.metaKey) && event.key === 's' && vetAlunos.length > 0) {
        event.preventDefault(); // Evita o comportamento padrão do navegador (salvar a página)
        let titulo = "Alunos Cadastrados";

        let conteudo_arquivo = JSON.stringify(vetAlunos, null, 2);

        let blob = new Blob([conteudo_arquivo], { type: "text/plain;charset=utf-8" });
        saveAs(blob, titulo + ".json");
    }
});

