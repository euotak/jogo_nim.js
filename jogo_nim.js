const chalk = require('chalk')
const prompt = require('prompt-sync')()

function computador_escolhe_jogada(n, m) {
    return (n <= m) ? Math.min(n, m) : (n % (m + 1) || m)
}

function usuario_escolhe_jogada(n, m) {
    let pecas = parseInt(prompt(chalk.yellow('Quantas peças vai tirar? ')))
    while (!(0 < pecas && pecas <= m) || pecas > n) {
        console.log(chalk.red("Oops! Jogada inválida! Tente de novo."))
        pecas = parseInt(prompt(chalk.yellow('Quantas peças você vai tirar? ')))
    }
    return pecas
}

function partida() {
    let n = parseInt(prompt(chalk.green('Digite o número total de peças: ')))
    let m = parseInt(prompt(chalk.green('Digite o número máximo de peças por jogada: ')))
    
    while (m < 1) {
        console.log(chalk.red('A quantidade de peças por jogadas deve ser menor ou igual ao número total de peças.'))
        m = parseInt(prompt(chalk.green('Digite o número máximo de peças por jogada: ')))
    }

    let pecas = 0
    let jogada = 0

    if (n % (m + 1) === 0) {
        console.log(chalk.blue('Você começa!'))
        jogada = true
    } else {
        console.log(chalk.blue('Computador começa!'))
        jogada = false
    }

    while (n > 0) {
        let jogador = jogada ? 'Você' : 'O computador'
        pecas = jogada ? usuario_escolhe_jogada(n, m) : computador_escolhe_jogada(n, m)
        console.log(`${jogador} tirou ${chalk.yellow(pecas)}.`)
        n -= pecas
        console.log(`Agora restam ${chalk.green(n)}.`)
        jogada = !jogada
    }

    let vencedor = jogada ? 'Computador' : 'Você'
    console.log(chalk.bold(`Fim do jogo! O ${vencedor} ganhou!`))
}

function campeonato() {
    let placarComputador = 0
    let placarUsuario = 0
    
    for (let i = 0; i < 3; i++) {
        console.log(chalk.blue(`Rodada ${i + 1}`))
        let vencedor = partida();
        if (vencedor === 'Você') {
            placarUsuario++
        } else {
            placarComputador++
        }
    }
    
    console.log(chalk.bold('Final do campeonato!'))
    console.log(chalk.bold(`Placar: Você ${placarUsuario} X ${placarComputador} Computador`))
}

function main() {
    console.log(chalk.cyan("Bem-vindo ao jogo do NIM!"))
    console.log(chalk.cyan("1 - para jogar uma partida isolada"))
    console.log(chalk.cyan("2 - para jogar um campeonato"))

    let escolha = parseInt(prompt(chalk.yellow('Escolha: ')))
    switch (escolha) {
        case 1:
            console.log(chalk.green("Você escolheu uma partida isolada!"))
            partida()
            break;
        case 2:
            console.log(chalk.green("Você escolheu um campeonato!"))
            campeonato()
            break
        default:
            console.log(chalk.red("Opção inválida. O jogo será encerrado."))
            break
    }
}

main()
