/* Guia de execução por família de movimento.
   O conteúdo é escrito para o movimento base — supino com barra, com
   halteres ou no Smith compartilham a mesma mecânica — e o equipamento
   de cada exercício entra no texto. Assim os 78 exercícios do app têm
   orientação sem repetir texto genérico. */
const Guia = (() => {
  const familias = {
    /* ── Peito ─────────────────────────────────────────── */
    'supino-reto': {
      musculos: ['Peitoral maior', 'Tríceps', 'Deltoide anterior'],
      inicial: 'Deitado no banco, pés firmes no chão e escápulas apertadas uma contra a outra. Pegada um pouco mais aberta que os ombros.',
      movimento: 'Desça até a barra tocar de leve o meio do peito, cotovelos a cerca de 45° do tronco. Empurre de volta sem travar os cotovelos.',
      final: 'Braços estendidos acima do peito, ombros ainda colados no banco.',
      instrucoes: [
        'Mantenha os pés apoiados e o quadril no banco o tempo todo.',
        'Desça em 2 segundos, suba com controle.',
        'Respire soltando o ar na subida.'
      ],
      erros: [
        'Abrir os cotovelos a 90°, o que sobrecarrega o ombro.',
        'Quicar a barra no peito para ganhar impulso.',
        'Levantar o quadril do banco no esforço.'
      ]
    },

    'supino-inclinado': {
      musculos: ['Peitoral superior', 'Deltoide anterior', 'Tríceps'],
      inicial: 'Banco entre 30° e 45°, costas apoiadas, escápulas retraídas. {equipamento} na linha da parte alta do peito.',
      movimento: 'Desça até a altura das clavículas e empurre em diagonal, na direção dos olhos.',
      final: 'Braços estendidos acima da parte alta do peito, sem travar os cotovelos.',
      instrucoes: [
        'Não passe de 45° no encosto: acima disso vira desenvolvimento de ombro.',
        'Mantenha os punhos alinhados com os antebraços.',
        'Controle a descida; a subida pode ser mais rápida.'
      ],
      erros: [
        'Inclinar demais o banco e tirar o peito do movimento.',
        'Descer a barra no pescoço em vez das clavículas.',
        'Perder a retração das escápulas no meio da série.'
      ]
    },

    'crucifixo': {
      musculos: ['Peitoral maior', 'Deltoide anterior'],
      inicial: 'Deitado no banco, braços estendidos acima do peito com uma leve flexão fixa nos cotovelos.',
      movimento: 'Abra os braços em arco até sentir o alongamento do peitoral, mantendo o ângulo do cotovelo. Feche pelo mesmo caminho.',
      final: 'Halteres de volta acima do peito, quase se tocando, peitoral contraído.',
      instrucoes: [
        'O cotovelo abre e fecha em arco, ele não estende.',
        'Use carga menor que no supino: o braço de alavanca é maior.',
        'Pare de abrir quando o cotovelo chegar à linha do ombro.'
      ],
      erros: [
        'Transformar em supino, dobrando e estendendo os cotovelos.',
        'Descer demais e forçar a cápsula do ombro.',
        'Bater os halteres um no outro no fim.'
      ]
    },

    'crossover': {
      musculos: ['Peitoral maior', 'Deltoide anterior'],
      inicial: 'Em pé entre as polias, um pé à frente, tronco levemente inclinado. Braços abertos na altura dos ombros.',
      movimento: 'Traga as mãos para a frente do corpo em arco, até elas se cruzarem, apertando o peito. Volte controlando a tensão.',
      final: 'Mãos à frente do tronco, peitoral contraído, cotovelos ainda levemente flexionados.',
      instrucoes: [
        'O cabo mantém tensão até o fim: aproveite a contração.',
        'Mantenha o tronco parado; quem trabalha é o peito.',
        'Varie a altura da polia para mudar a parte do peito.'
      ],
      erros: [
        'Usar o tronco para empurrar o peso.',
        'Estender e flexionar os cotovelos como num tríceps.',
        'Carga alta demais, que puxa os ombros para a frente.'
      ]
    },

    'chest-press': {
      musculos: ['Peitoral maior', 'Tríceps', 'Deltoide anterior'],
      inicial: 'Sentado, costas apoiadas no encosto, pegadores na linha do meio do peito.',
      movimento: 'Empurre à frente até quase estender os braços e volte devagar até os pegadores chegarem à linha do peito.',
      final: 'Braços quase estendidos à frente, sem travar os cotovelos.',
      instrucoes: [
        'Ajuste o banco para os pegadores ficarem na altura do peito.',
        'Mantenha os ombros para trás e para baixo.',
        'Boa opção quando não há alguém para segurança no supino livre.'
      ],
      erros: [
        'Banco alto demais, jogando o esforço para o ombro.',
        'Soltar as costas do encosto para empurrar mais.',
        'Voltar rápido demais, batendo as placas.'
      ]
    },

    'crucifixo-maquina': {
      musculos: ['Peitoral maior', 'Deltoide anterior'],
      inicial: 'Sentado, costas no encosto, braços abertos com os cotovelos apoiados nos pads na linha dos ombros.',
      movimento: 'Feche os braços à frente do peito num arco e volte devagar até sentir o alongamento.',
      final: 'Pads quase se tocando à frente do peito, peitoral apertado.',
      instrucoes: [
        'Regule o banco para o cotovelo ficar na altura do ombro.',
        'Segure meio segundo no fechamento.',
        'Volte só até onde o ombro fica confortável.'
      ],
      erros: [
        'Abrir além da linha do corpo e forçar o ombro.',
        'Empurrar com as mãos em vez dos cotovelos.',
        'Soltar o peso de volta sem controle.'
      ]
    },

    /* ── Tríceps ───────────────────────────────────────── */
    'triceps-pulley': {
      musculos: ['Tríceps braquial'],
      inicial: 'Em pé de frente para a polia alta, tronco firme, cotovelos colados ao lado do corpo e antebraços na horizontal.',
      movimento: 'Estenda os cotovelos empurrando para baixo até os braços ficarem retos. Volte controlando, sem deixar o cotovelo abrir.',
      final: 'Braços estendidos junto ao corpo, tríceps contraído.',
      instrucoes: [
        'Só o antebraço se move; o cotovelo fica travado no lugar.',
        'Incline o tronco alguns graus à frente para estabilizar.',
        'Segure a contração por um instante embaixo.'
      ],
      erros: [
        'Afastar os cotovelos do corpo e virar um empurrão de peito.',
        'Balançar o tronco para vencer a carga.',
        'Subir o peso rápido demais, perdendo a fase negativa.'
      ]
    },

    'triceps-frances': {
      musculos: ['Tríceps braquial', 'cabeça longa'],
      inicial: 'Sentado ou em pé, tronco ereto. {equipamento} acima da cabeça com os braços estendidos.',
      movimento: 'Desça atrás da cabeça flexionando só os cotovelos, até sentir o alongamento do tríceps. Estenda de volta.',
      final: 'Braços estendidos acima da cabeça, cotovelos apontando para cima e para a frente.',
      instrucoes: [
        'Mantenha os cotovelos apontados para cima e próximos.',
        'Desça devagar: é onde o alongamento acontece.',
        'Contraia o abdômen para não arquear as costas.'
      ],
      erros: [
        'Abrir os cotovelos para os lados.',
        'Arquear a lombar para compensar a carga.',
        'Descer além do confortável e forçar a articulação.'
      ]
    },

    'triceps-testa': {
      musculos: ['Tríceps braquial'],
      inicial: 'Deitado no banco, braços estendidos na vertical, {equipamento} acima da linha dos olhos.',
      movimento: 'Flexione só os cotovelos, levando o peso na direção da testa. Estenda de volta sem mover os braços.',
      final: 'Braços estendidos na vertical, cotovelos travados no lugar.',
      instrucoes: [
        'O braço fica parado; o antebraço faz todo o percurso.',
        'Barra W poupa os punhos em relação à barra reta.',
        'Comece com carga leve: o cotovelo sente bastante.'
      ],
      erros: [
        'Deixar os braços caírem para trás e virar pullover.',
        'Bater a barra na testa por falta de controle.',
        'Abrir os cotovelos na subida.'
      ]
    },

    /* ── Dorsais ───────────────────────────────────────── */
    'puxada-frontal': {
      musculos: ['Grande dorsal', 'Bíceps', 'Romboides'],
      inicial: 'Sentado com as coxas presas no apoio, tronco levemente inclinado para trás, braços estendidos segurando a barra.',
      movimento: 'Puxe a barra até a parte alta do peito, levando os cotovelos para baixo e para trás. Suba controlando.',
      final: 'Barra na altura das clavículas, escápulas apertadas, peito aberto.',
      instrucoes: [
        'Pense em puxar com os cotovelos, não com as mãos.',
        'Mantenha o peito estufado durante toda a puxada.',
        'Estenda os braços por completo no topo para alongar o dorsal.'
      ],
      erros: [
        'Puxar a barra atrás da nuca, o que estressa o ombro.',
        'Jogar o tronco para trás para vencer a carga.',
        'Encolher os ombros em vez de baixar as escápulas.'
      ]
    },

    'pulldown': {
      musculos: ['Grande dorsal', 'Redondo maior'],
      inicial: 'Em pé de frente para a polia alta, tronco inclinado à frente, braços estendidos segurando a corda.',
      movimento: 'Com os braços quase retos, leve as mãos até as coxas em arco, empurrando o dorsal. Volte controlando.',
      final: 'Mãos junto às coxas, dorsal contraído, cotovelos ainda quase estendidos.',
      instrucoes: [
        'O cotovelo mantém o mesmo ângulo do começo ao fim.',
        'É um exercício de isolamento: use carga moderada.',
        'Ótimo para sentir o dorsal antes das puxadas pesadas.'
      ],
      erros: [
        'Flexionar os cotovelos e transformar em tríceps.',
        'Usar o tronco como alavanca.',
        'Encolher os ombros durante a descida.'
      ]
    },

    'remada-baixa': {
      musculos: ['Grande dorsal', 'Romboides', 'Bíceps'],
      inicial: 'Sentado, pés apoiados na plataforma, joelhos levemente flexionados, tronco ereto e braços estendidos.',
      movimento: 'Puxe o pegador até a barriga levando os cotovelos rente ao corpo. Volte estendendo os braços sem curvar a lombar.',
      final: 'Pegador junto ao abdômen, escápulas apertadas, peito aberto.',
      instrucoes: [
        'Mantenha o tronco quase parado; ele não balança.',
        'Aperte as escápulas no fim de cada puxada.',
        'Deixe o dorsal alongar na volta, sem soltar a lombar.'
      ],
      erros: [
        'Balançar o tronco para frente e para trás.',
        'Curvar a lombar na fase de volta.',
        'Puxar só com os braços, sem mover as escápulas.'
      ]
    },

    'remada-articulada': {
      musculos: ['Grande dorsal', 'Romboides', 'Bíceps'],
      inicial: 'Sentado com o peito apoiado no pad, braços estendidos segurando os pegadores.',
      movimento: 'Puxe os pegadores para trás até a mão passar da linha do tronco. Volte controlando até estender.',
      final: 'Cotovelos atrás do tronco, escápulas apertadas, peito ainda apoiado.',
      instrucoes: [
        'O apoio no peito tira a lombar da jogada: bom para dias pesados.',
        'Regule o assento para o pegador ficar na linha do peito.',
        'Segure um instante no fim da puxada.'
      ],
      erros: [
        'Descolar o peito do apoio para puxar mais carga.',
        'Encolher os ombros durante a puxada.',
        'Soltar o peso de volta de uma vez.'
      ]
    },

    'remada': {
      musculos: ['Grande dorsal', 'Romboides', 'Lombar'],
      inicial: 'Em pé, joelhos semiflexionados, tronco inclinado a cerca de 45°, coluna neutra e braços estendidos.',
      movimento: 'Puxe {equipamento} até o umbigo, cotovelos rente ao corpo. Desça controlando sem mudar a inclinação do tronco.',
      final: 'Peso junto ao abdômen, escápulas apertadas, tronco na mesma inclinação do início.',
      instrucoes: [
        'Trave a coluna neutra antes de começar a puxar.',
        'O tronco não sobe e desce junto com o peso.',
        'Olhe para um ponto no chão à frente para manter o pescoço alinhado.'
      ],
      erros: [
        'Arredondar a lombar, o erro mais perigoso do exercício.',
        'Levantar o tronco a cada repetição para ajudar.',
        'Puxar com os braços e esquecer as escápulas.'
      ]
    },

    'barra-fixa': {
      musculos: ['Grande dorsal', 'Bíceps', 'Core'],
      inicial: 'Pendurado na barra com os braços estendidos, ombros ativos e pernas cruzadas atrás.',
      movimento: 'Puxe o corpo para cima até o queixo passar da barra, levando os cotovelos para baixo. Desça controlando até estender.',
      final: 'Queixo acima da barra, peito próximo dela, escápulas apertadas.',
      instrucoes: [
        'Comece cada repetição com o ombro encaixado, não solto.',
        'Se ainda não consegue, use elástico ou a máquina assistida.',
        'Desça devagar: a fase negativa é o que constrói força.'
      ],
      erros: [
        'Balançar as pernas para ganhar impulso.',
        'Descer só metade do caminho.',
        'Estender o pescoço para o queixo passar sem o corpo subir.'
      ]
    },

    /* ── Bíceps ────────────────────────────────────────── */
    'rosca-direta': {
      musculos: ['Bíceps braquial', 'Braquial'],
      inicial: 'Em pé, pés na largura do quadril, {equipamento} nas coxas com os braços estendidos e cotovelos junto ao corpo.',
      movimento: 'Flexione os cotovelos levando o peso até a altura do peito. Desça controlando até estender.',
      final: 'Peso na altura do peito, cotovelos ainda colados ao tronco.',
      instrucoes: [
        'O cotovelo fica parado ao lado do corpo o tempo todo.',
        'Estenda por completo embaixo, sem soltar a tensão.',
        'Barra W poupa o punho de quem sente desconforto.'
      ],
      erros: [
        'Balançar o tronco para jogar o peso para cima.',
        'Levar os cotovelos à frente no fim da subida.',
        'Parar no meio do caminho na descida.'
      ]
    },

    'rosca-alternada': {
      musculos: ['Bíceps braquial', 'Braquial'],
      inicial: 'Em pé, um halter em cada mão, braços estendidos ao lado do corpo, palmas voltadas para dentro.',
      movimento: 'Suba um braço girando a palma para cima durante o percurso. Desça e repita com o outro.',
      final: 'Halter na altura do ombro com a palma voltada para o corpo, o outro braço estendido.',
      instrucoes: [
        'Alternar dá descanso a um lado enquanto o outro trabalha.',
        'A rotação do punho recruta melhor o bíceps.',
        'Mantenha o tronco imóvel entre as trocas.'
      ],
      erros: [
        'Girar o tronco a cada repetição.',
        'Subir os dois braços ao mesmo tempo, perdendo o propósito.',
        'Deixar o cotovelo escapar para trás.'
      ]
    },

    'rosca-martelo': {
      musculos: ['Braquial', 'Braquiorradial', 'Bíceps'],
      inicial: 'Em pé, halteres ao lado do corpo com as palmas voltadas para dentro, como quem segura um martelo.',
      movimento: 'Flexione os cotovelos mantendo a pegada neutra o tempo todo. Desça controlando.',
      final: 'Halteres na altura dos ombros, polegares apontando para cima.',
      instrucoes: [
        'A pegada neutra dá mais ênfase ao braquial e ao antebraço.',
        'Use nos dias em que o punho incomoda na rosca comum.',
        'Não gire o punho em momento nenhum.'
      ],
      erros: [
        'Girar a palma para cima e virar rosca comum.',
        'Usar impulso de ombro para subir.',
        'Abrir os cotovelos para os lados.'
      ]
    },

    /* ── Perna ─────────────────────────────────────────── */
    'agachamento': {
      musculos: ['Quadríceps', 'Glúteos', 'Posteriores', 'Core'],
      inicial: 'Barra apoiada no trapézio, pés na largura dos ombros com as pontas levemente para fora, coluna neutra.',
      movimento: 'Desça empurrando o quadril para trás e dobrando os joelhos, até as coxas ficarem paralelas ao chão. Suba empurrando o chão.',
      final: 'Em pé, quadril estendido, joelhos destravados, coluna ainda neutra.',
      instrucoes: [
        'Joelhos acompanham a direção das pontas dos pés.',
        'Mantenha o peso no meio do pé, nunca só na ponta.',
        'Respire fundo e trave o abdômen antes de descer.'
      ],
      erros: [
        'Deixar os joelhos caírem para dentro.',
        'Arredondar a lombar no fundo do movimento.',
        'Levantar os calcanhares do chão.'
      ]
    },

    'leg-press': {
      musculos: ['Quadríceps', 'Glúteos', 'Posteriores'],
      inicial: 'Sentado no aparelho, costas e quadril bem apoiados, pés na plataforma na largura dos ombros.',
      movimento: 'Desça a plataforma flexionando os joelhos até cerca de 90°. Empurre de volta sem travar os joelhos no fim.',
      final: 'Pernas quase estendidas, quadril ainda colado no encosto.',
      instrucoes: [
        'Pés mais altos na plataforma pegam mais glúteo e posterior.',
        'Não deixe o quadril descolar do apoio na descida.',
        'Empurre com o pé inteiro, não só com a ponta.'
      ],
      erros: [
        'Descer demais e soltar a lombar do encosto.',
        'Travar os joelhos com força no fim.',
        'Segurar nos joelhos com as mãos.'
      ]
    },

    'hack-squat': {
      musculos: ['Quadríceps', 'Glúteos'],
      inicial: 'Costas apoiadas no encosto do aparelho, ombros sob os pads, pés na plataforma à frente do quadril.',
      movimento: 'Desça flexionando os joelhos até as coxas ficarem paralelas, mantendo as costas coladas. Suba empurrando.',
      final: 'Pernas estendidas sem travar, costas ainda apoiadas.',
      instrucoes: [
        'O encosto tira a lombar da equação: bom para focar no quadríceps.',
        'Pés mais à frente aliviam o joelho.',
        'Desça devagar até onde o joelho fica confortável.'
      ],
      erros: [
        'Descolar a lombar do encosto no fundo.',
        'Deixar os joelhos entrarem para dentro.',
        'Amplitude curta demais por excesso de carga.'
      ]
    },

    'cadeira-extensora': {
      musculos: ['Quadríceps'],
      inicial: 'Sentado com as costas no encosto, rolo apoiado logo acima dos tornozelos, joelhos alinhados com o eixo da máquina.',
      movimento: 'Estenda os joelhos até as pernas ficarem retas, segure um instante e desça controlando.',
      final: 'Pernas estendidas à frente, quadríceps contraído.',
      instrucoes: [
        'Alinhe o joelho com o eixo de giro do aparelho.',
        'Segure meio segundo no topo: é onde o quadríceps mais trabalha.',
        'Desça devagar em vez de deixar o peso cair.'
      ],
      erros: [
        'Jogar o tronco para trás para ajudar na subida.',
        'Bater as placas na volta.',
        'Carga alta demais, que force o joelho no fim da extensão.'
      ]
    },

    'mesa-flexora': {
      musculos: ['Posteriores da coxa', 'Panturrilha'],
      inicial: 'Deitado de bruços na mesa, quadril apoiado, rolo logo acima dos calcanhares e pernas estendidas.',
      movimento: 'Flexione os joelhos levando os calcanhares na direção dos glúteos. Volte controlando até quase estender.',
      final: 'Joelhos flexionados, calcanhares próximos aos glúteos, quadril ainda na mesa.',
      instrucoes: [
        'Mantenha o quadril colado: ele tende a subir no esforço.',
        'Segure a contração no fim da flexão.',
        'Aponte os pés para variar a ênfase na panturrilha.'
      ],
      erros: [
        'Levantar o quadril da mesa para puxar mais peso.',
        'Fazer meia amplitude.',
        'Soltar o peso de volta sem controle.'
      ]
    },

    'cadeira-flexora': {
      musculos: ['Posteriores da coxa'],
      inicial: 'Sentado com as costas no encosto, coxas presas pelo pad e rolo sobre a parte de trás dos tornozelos.',
      movimento: 'Flexione os joelhos empurrando o rolo para baixo e para trás. Volte devagar até quase estender.',
      final: 'Joelhos flexionados sob o assento, posteriores contraídos.',
      instrucoes: [
        'Prenda bem o pad das coxas antes de começar.',
        'Mantenha as costas apoiadas o tempo todo.',
        'Segure a contração por um instante embaixo.'
      ],
      erros: [
        'Deslizar o quadril para a frente no esforço.',
        'Usar impulso do tronco.',
        'Voltar rápido e perder a fase negativa.'
      ]
    },

    'afundo': {
      musculos: ['Quadríceps', 'Glúteos', 'Posteriores'],
      inicial: 'Em pé com um halter em cada mão, tronco ereto, um pé à frente e outro atrás na largura do quadril.',
      movimento: 'Desça flexionando os dois joelhos até o de trás quase tocar o chão. Empurre com o pé da frente para voltar.',
      final: 'De pé de novo, tronco ereto, peso distribuído no pé da frente.',
      instrucoes: [
        'O joelho da frente acompanha a linha do pé, sem passar muito da ponta.',
        'Tronco fica na vertical; não incline para a frente.',
        'Comece sem carga até dominar o equilíbrio.'
      ],
      erros: [
        'Passo curto demais, que joga tudo no joelho.',
        'Deixar o joelho de trás bater no chão.',
        'Inclinar o tronco para compensar a falta de equilíbrio.'
      ]
    },

    'stiff': {
      musculos: ['Posteriores da coxa', 'Glúteos', 'Lombar'],
      inicial: 'Em pé, pés na largura do quadril, joelhos levemente flexionados e fixos, {equipamento} à frente das coxas.',
      movimento: 'Empurre o quadril para trás descendo o peso rente às pernas, até sentir o alongamento do posterior. Volte estendendo o quadril.',
      final: 'Em pé, quadril estendido, glúteos contraídos, coluna neutra.',
      instrucoes: [
        'Quem desce é o quadril, não a coluna.',
        'O joelho mantém a mesma flexão do início ao fim.',
        'Desça só até onde a lombar consegue ficar neutra.'
      ],
      erros: [
        'Arredondar a lombar para descer mais.',
        'Afastar a barra do corpo durante a descida.',
        'Estender demais no topo, jogando o quadril à frente.'
      ]
    },

    'panturrilha': {
      musculos: ['Gastrocnêmio', 'Sóleo'],
      inicial: 'Em pé com a ponta dos pés na plataforma e os calcanhares livres, pernas estendidas e tronco ereto.',
      movimento: 'Suba na ponta dos pés até o máximo, segure um instante e desça devagar até alongar a panturrilha.',
      final: 'Na ponta dos pés, panturrilha contraída, corpo alinhado.',
      instrucoes: [
        'A amplitude completa é o que faz o exercício funcionar.',
        'Segure um segundo em cima e um embaixo.',
        'Perna estendida pega mais o gastrocnêmio; sentado, mais o sóleo.'
      ],
      erros: [
        'Fazer repetições rápidas e curtas, quicando.',
        'Dobrar os joelhos para ajudar a subir.',
        'Pular o alongamento embaixo.'
      ]
    },

    /* ── Ombros ────────────────────────────────────────── */
    'desenvolvimento': {
      musculos: ['Deltoide anterior', 'Deltoide lateral', 'Tríceps'],
      inicial: 'Sentado ou em pé, tronco ereto e abdômen firme. {equipamento} na altura dos ombros, palmas para a frente.',
      movimento: 'Empurre para cima até quase estender os braços e desça controlando até os cotovelos passarem da linha dos ombros.',
      final: 'Braços estendidos acima da cabeça, sem travar os cotovelos.',
      instrucoes: [
        'Contraia o abdômen para não arquear a lombar.',
        'Não deixe os cotovelos irem muito para trás na descida.',
        'Sentado com encosto é mais seguro para cargas altas.'
      ],
      erros: [
        'Arquear as costas para empurrar mais peso.',
        'Descer os halteres abaixo da linha do queixo, forçando o ombro.',
        'Bater os pesos no topo.'
      ]
    },

    'elevacao-lateral': {
      musculos: ['Deltoide lateral'],
      inicial: 'Em pé, halteres ao lado do corpo, cotovelos com uma leve flexão fixa e tronco ereto.',
      movimento: 'Suba os braços pelos lados até a altura dos ombros, liderando com os cotovelos. Desça devagar.',
      final: 'Braços na horizontal, cotovelos na altura dos ombros, palmas para baixo.',
      instrucoes: [
        'Suba com os cotovelos, não com as mãos.',
        'Pare na altura do ombro: acima disso entra trapézio.',
        'Carga leve e execução limpa valem mais aqui.'
      ],
      erros: [
        'Balançar o tronco para jogar os pesos para cima.',
        'Encolher os ombros durante a subida.',
        'Passar da linha dos ombros.'
      ]
    }
  };

  const PADRAO = {
    musculos: ['Grupo principal do exercício'],
    inicial: 'Posicione-se no aparelho com a coluna apoiada e a articulação alinhada ao eixo do movimento.',
    movimento: 'Faça a fase de esforço com controle e volte devagar, sem soltar o peso.',
    final: 'Volte à posição de início mantendo a tensão no músculo trabalhado.',
    instrucoes: [
      'Ajuste o aparelho ao seu tamanho antes da primeira série.',
      'Prefira amplitude completa a carga alta.',
      'Respire soltando o ar na fase de esforço.'
    ],
    erros: [
      'Usar impulso do tronco para vencer a carga.',
      'Reduzir a amplitude para colocar mais peso.',
      'Soltar o peso de volta sem controle.'
    ]
  };

  /** Guia do exercício, com o equipamento dele no texto. */
  function para(exercicio) {
    if (!exercicio) return PADRAO;
    const base = IconesExercicios.baseDe(exercicio.id);
    const familia = (base && familias[base]) || PADRAO;
    const equipamento = (exercicio.equipamento || 'o equipamento').toLowerCase();
    const trocar = (texto) => texto.replace('{equipamento}', equipamento);

    return {
      musculos: familia.musculos,
      inicial: trocar(familia.inicial),
      movimento: trocar(familia.movimento),
      final: trocar(familia.final),
      instrucoes: familia.instrucoes,
      erros: familia.erros
    };
  }

  return { para };
})();
