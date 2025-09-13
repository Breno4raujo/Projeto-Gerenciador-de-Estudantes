import { question } from "readline-sync";

// Array principal
let estudantes = [
  // Exemplo de estudantes
 { nome: "Breno Araujo Melo", idade: 23, notas: [10, 10, 10, 10] },

 { nome: "aluno2", idade: 23, notas: [6, 6, 6, 6] },

 { nome: "aluno3", idade: 23, notas: [5, 5, 5, 5] },
 
 { nome: "aluno4", idade: 23, notas: [0, 0, 0, 0] }
 
];

// Função para calcular média
function calcularMedia(notas) {
  return notas.reduce((acc, n) => acc + n, 0) / notas.length;
}

// 1. Cadastro de estudante
function cadastrarEstudante() {
  const nome = question("Nome do estudante: ").trim();
  if (!nome) return console.log(" Nome não pode ser vazio.");

  const idade = Number(question("Idade: "));
  if (isNaN(idade) || idade <= 0) return console.log(" Idade inválida.");

  console.log("Digite as 4 notas dos bimestres (máx. 10 cada):");
  let notas = [];
  for (let i = 1; i <= 4; i++) {
    const nota = Number(question(`Nota do ${i}º bimestre: `));
    if (isNaN(nota) || nota < 0 || nota > 10) {
      return console.log(" Cada nota deve estar entre 0 e 10.");
    }
    notas.push(nota);
  }

  estudantes.push({ nome, idade, notas });
  console.log(" Estudante cadastrado com sucesso!");
}

// 2. Editar estudante
function editarEstudante() {
  if (estudantes.length === 0) return console.log("Nenhum estudante cadastrado.");

  listarEstudantes();
  const indice = Number(question("Digite o número do estudante para editar: ")) - 1;
  if (indice < 0 || indice >= estudantes.length) return console.log(" Estudante inválido.");

  let estudante = estudantes[indice];
  console.log(`\nEditando: ${estudante.nome}`);

  const novoNome = question(`Novo nome (ou enter para manter "${estudante.nome}"): `).trim();
  if (novoNome) estudante.nome = novoNome;

  const novaIdade = question(`Nova idade (ou enter para manter "${estudante.idade}"): `).trim();
  if (novaIdade && !isNaN(novaIdade) && Number(novaIdade) > 0) estudante.idade = Number(novaIdade);

  console.log("Digite as novas notas (ou enter para manter a atual):");
  estudante.notas = estudante.notas.map((nota, i) => {
    const novaNota = question(`Nota do ${i + 1}º bimestre (atual: ${nota}): `).trim();
    return novaNota ? Number(novaNota) : nota;
  });

  console.log(" Estudante atualizado com sucesso!");
}

// 3. Excluir estudante
function excluirEstudante() {
  if (estudantes.length === 0) return console.log("Nenhum estudante cadastrado.");

  listarEstudantes();
  const indice = Number(question("Digite o número do estudante para excluir: ")) - 1;
  if (indice < 0 || indice >= estudantes.length) return console.log(" Estudante inválido.");

  const removido = estudantes.splice(indice, 1);
  console.log(` Estudante "${removido[0].nome}" excluído com sucesso!`);
}

// 4. Listagem
function listarEstudantes() {
  if (estudantes.length === 0) return console.log("Nenhum estudante cadastrado.");
  estudantes.forEach((e, i) => {
    console.log(`\n${i + 1}. ${e.nome} (${e.idade} anos)`);
    e.notas.forEach((nota, idx) => {
      console.log(`   ${idx + 1}º bimestre: ${nota}`);
    });
    console.log(`   Média: ${calcularMedia(e.notas).toFixed(2)}`);
  });
}

// 5. Busca por nome
function buscarEstudante() {
  const termo = question("Digite o nome para busca: ").toLowerCase();
  const encontrado = estudantes.find(e => e.nome.toLowerCase().includes(termo));
  if (encontrado) {
    console.log(`\n Encontrado: ${encontrado.nome} (${encontrado.idade} anos)`);
    encontrado.notas.forEach((nota, idx) => {
      console.log(`   ${idx + 1}º bimestre: ${nota}`);
    });
    console.log(`   Média: ${calcularMedia(encontrado.notas).toFixed(2)}`);
  } else {
    console.log(" Nenhum estudante encontrado.");
  }
}

// 6. Média geral
function mediaGeral() {
  if (estudantes.length === 0) return console.log("Nenhum estudante cadastrado.");
  const medias = estudantes.map(e => calcularMedia(e.notas));
  const media = medias.reduce((acc, m) => acc + m, 0) / medias.length;
  console.log(` Média geral da turma: ${media.toFixed(2)}`);
}

// 7. Melhor estudante
function melhorEstudante() {
  if (estudantes.length === 0) return console.log("Nenhum estudante cadastrado.");
  const comMedia = estudantes.map(e => ({ ...e, media: calcularMedia(e.notas) }));
  const melhor = comMedia.reduce((prev, curr) => (curr.media > prev.media ? curr : prev));
  console.log(` Melhor estudante: ${melhor.nome} (Média: ${melhor.media.toFixed(2)})`);
}

// 8. Relatórios
function relatorios() {
  const comMedia = estudantes.map(e => ({ ...e, media: calcularMedia(e.notas) }));

  const aprovados = comMedia.filter(e => e.media >= 7);
  const recuperacao = comMedia.filter(e => e.media >= 5 && e.media < 7);
  const reprovados = comMedia.filter(e => e.media < 5);

// Função para formatar "Nome (Média)"
  const formatar = (lista) => lista.map(e => `${e.nome} (${e.media.toFixed(2)})`).join(", ") || "Nenhum";

  console.log("\n Relatórios:");
  console.log("✅ Aprovados:", formatar(aprovados));
  console.log("⚠️ Recuperação:", formatar(recuperacao));
  console.log("❌ Reprovados:", formatar(reprovados));
}

// ===== MENU INTERATIVO =====
function menu() {
  while (true) {
    console.log("\n================ MENU ================ ");
    console.log("1. Cadastrar estudante");
    console.log("2. Editar estudante");
    console.log("3. Excluir estudante");
    console.log("4. Listar estudantes");
    console.log("5. Buscar estudante");
    console.log("6. Média geral da turma");
    console.log("7. Melhor estudante");
    console.log("8. Relatórios de aprovados");
    console.log("0. Sair");
    console.log("====================================== ");
    const opcao = question("Escolha uma opção: ");

    switch (opcao) {
      case "1": cadastrarEstudante(); break;
      case "2": editarEstudante(); break;
      case "3": excluirEstudante(); break;
      case "4": listarEstudantes(); break;
      case "5": buscarEstudante(); break;
      case "6": mediaGeral(); break;
      case "7": melhorEstudante(); break;
      case "8": relatorios(); break;
      case "0": return console.log("fechando programa      Saindo...");
      default: console.log(" Opção inválida.");
    }
  }
}

menu();