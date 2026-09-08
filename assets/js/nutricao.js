/* Tabela nutricional e busca de alimentos.

   De onde vêm os números: TACO (Tabela Brasileira de Composição de
   Alimentos, Unicamp) para o que é comum na mesa brasileira, e USDA
   FoodData Central para o que a TACO não cobre. Tudo normalizado para
   100 g ou 100 ml, que é a única forma de somar prato composto sem
   misturar unidade.

   Os valores são de referência, não medição do que está no seu prato:
   corte da carne, óleo da panela e ponto do cozimento mudam o
   resultado. A interface diz isso em vez de fingir precisão.

   Sem servidor, como o resto do app: a tabela viaja junto e a busca
   funciona sem sinal, o que importa para quem consulta no mercado ou
   no restaurante. */
const Nutricao = (() => {

  /* Categorias servem para navegar sem digitar — quem não sabe o que
     procurar prefere olhar uma lista curta a encarar um campo vazio. */
  const categorias = [
    { id: 'proteina',  nome: 'Proteínas',   cor: '#FF3D81', emoji: '🍗' },
    { id: 'carbo',     nome: 'Carboidratos', cor: '#FF7A00', emoji: '🍚' },
    { id: 'legume',    nome: 'Legumes e verduras', cor: '#8AC926', emoji: '🥦' },
    { id: 'fruta',     nome: 'Frutas',      cor: '#B5179E', emoji: '🍌' },
    { id: 'laticinio', nome: 'Laticínios',  cor: '#00B0F0', emoji: '🥛' },
    { id: 'gordura',   nome: 'Gorduras e castanhas', cor: '#9B5CFF', emoji: '🥜' },
    { id: 'bebida',    nome: 'Bebidas',     cor: '#00E5A0', emoji: '🥤' },
    { id: 'lanche',    nome: 'Lanches e doces', cor: '#E63946', emoji: '🍕' }
  ];

  /* Cada alimento traz os macros por 100 g/ml e as porções em que ele
     costuma ser servido. A porção caseira é o que a pessoa reconhece —
     ninguém pensa em "180 g de arroz", pensa em "duas escumadeiras". */
  const alimentos = [
    /* ── Proteínas ─────────────────────────────────────── */
    { id: 'frango-peito', nome: 'Peito de frango grelhado', cat: 'proteina',
      busca: 'frango peito file grelhado ave',
      kcal: 165, prot: 31.0, carb: 0, gord: 3.6,
      porcoes: [{ nome: '1 filé médio', g: 120 }, { nome: '1 filé grande', g: 180 }] },

    { id: 'frango-coxa', nome: 'Coxa de frango assada (sem pele)', cat: 'proteina',
      busca: 'frango coxa sobrecoxa assada ave',
      kcal: 187, prot: 26.9, carb: 0, gord: 8.1,
      porcoes: [{ nome: '1 coxa', g: 90 }, { nome: '1 sobrecoxa', g: 110 }] },

    { id: 'carne-patinho', nome: 'Patinho bovino grelhado', cat: 'proteina',
      busca: 'carne bovina boi patinho bife grelhado vermelha',
      kcal: 219, prot: 35.9, carb: 0, gord: 7.3,
      porcoes: [{ nome: '1 bife médio', g: 100 }, { nome: '1 bife grande', g: 150 }] },

    { id: 'carne-moida', nome: 'Carne moída refogada (acém)', cat: 'proteina',
      busca: 'carne moida bovina refogada acem',
      kcal: 212, prot: 26.7, carb: 0, gord: 11.4,
      porcoes: [{ nome: '1 colher de servir', g: 60 }, { nome: '1 concha', g: 100 }] },

    { id: 'picanha', nome: 'Picanha grelhada (com gordura)', cat: 'proteina',
      busca: 'picanha churrasco carne bovina gorda',
      kcal: 289, prot: 26.0, carb: 0, gord: 20.4,
      porcoes: [{ nome: '1 fatia', g: 100 }, { nome: '1 porção de churrasco', g: 200 }] },

    { id: 'ovo-cozido', nome: 'Ovo de galinha cozido', cat: 'proteina',
      busca: 'ovo cozido galinha inteiro',
      kcal: 146, prot: 13.3, carb: 0.6, gord: 9.5,
      porcoes: [{ nome: '1 ovo', g: 50 }, { nome: '2 ovos', g: 100 }] },

    { id: 'ovo-frito', nome: 'Ovo frito', cat: 'proteina',
      busca: 'ovo frito galinha',
      kcal: 240, prot: 15.6, carb: 1.2, gord: 18.6,
      porcoes: [{ nome: '1 ovo', g: 50 }, { nome: '2 ovos', g: 100 }] },

    { id: 'tilapia', nome: 'Tilápia grelhada', cat: 'proteina',
      busca: 'tilapia peixe filé grelhado branco',
      kcal: 128, prot: 26.2, carb: 0, gord: 2.7,
      porcoes: [{ nome: '1 filé', g: 120 }] },

    { id: 'salmao', nome: 'Salmão grelhado', cat: 'proteina',
      busca: 'salmao peixe grelhado gordo omega',
      kcal: 231, prot: 25.4, carb: 0, gord: 14.0,
      porcoes: [{ nome: '1 posta', g: 130 }] },

    { id: 'atum-lata', nome: 'Atum em conserva (ao natural)', cat: 'proteina',
      busca: 'atum lata conserva natural peixe',
      kcal: 116, prot: 26.0, carb: 0, gord: 1.0,
      porcoes: [{ nome: '1 lata escorrida', g: 120 }] },

    { id: 'porco-lombo', nome: 'Lombo suíno assado', cat: 'proteina',
      busca: 'porco suino lombo assado carne',
      kcal: 210, prot: 30.3, carb: 0, gord: 9.3,
      porcoes: [{ nome: '2 fatias', g: 100 }] },

    { id: 'whey', nome: 'Whey protein concentrado (pó)', cat: 'proteina',
      busca: 'whey protein suplemento po proteina',
      kcal: 400, prot: 80.0, carb: 8.0, gord: 6.0,
      porcoes: [{ nome: '1 scoop', g: 30 }, { nome: '2 scoops', g: 60 }],
      nota: 'Varia muito entre marcas — confira o rótulo do seu.' },

    /* ── Carboidratos ──────────────────────────────────── */
    { id: 'arroz-branco', nome: 'Arroz branco cozido', cat: 'carbo',
      busca: 'arroz branco cozido polido',
      kcal: 128, prot: 2.5, carb: 28.1, gord: 0.2,
      porcoes: [{ nome: '1 escumadeira', g: 100 }, { nome: '2 escumadeiras', g: 200 }] },

    { id: 'arroz-integral', nome: 'Arroz integral cozido', cat: 'carbo',
      busca: 'arroz integral cozido',
      kcal: 124, prot: 2.6, carb: 25.8, gord: 1.0,
      porcoes: [{ nome: '1 escumadeira', g: 100 }] },

    { id: 'feijao-carioca', nome: 'Feijão carioca cozido', cat: 'carbo',
      busca: 'feijao carioca cozido caldo',
      kcal: 76, prot: 4.8, carb: 13.6, gord: 0.5,
      porcoes: [{ nome: '1 concha média', g: 80 }, { nome: '1 concha cheia', g: 140 }] },

    { id: 'feijao-preto', nome: 'Feijão preto cozido', cat: 'carbo',
      busca: 'feijao preto cozido tropeiro',
      kcal: 77, prot: 4.5, carb: 14.0, gord: 0.5,
      porcoes: [{ nome: '1 concha média', g: 80 }] },

    { id: 'macarrao', nome: 'Macarrão cozido', cat: 'carbo',
      busca: 'macarrao espaguete massa cozido talharim penne',
      kcal: 111, prot: 3.5, carb: 23.1, gord: 0.6,
      porcoes: [{ nome: '1 pegador', g: 100 }, { nome: '1 prato', g: 200 }] },

    { id: 'batata-cozida', nome: 'Batata inglesa cozida', cat: 'carbo',
      busca: 'batata inglesa cozida',
      kcal: 52, prot: 1.2, carb: 11.9, gord: 0.1,
      porcoes: [{ nome: '1 unidade média', g: 120 }] },

    { id: 'batata-frita', nome: 'Batata frita', cat: 'carbo',
      busca: 'batata frita fritas',
      kcal: 312, prot: 3.6, carb: 41.0, gord: 14.6,
      porcoes: [{ nome: '1 porção pequena', g: 100 }, { nome: '1 porção grande', g: 200 }] },

    { id: 'batata-doce', nome: 'Batata doce cozida', cat: 'carbo',
      busca: 'batata doce cozida',
      kcal: 77, prot: 0.6, carb: 18.4, gord: 0.1,
      porcoes: [{ nome: '1 unidade média', g: 150 }] },

    { id: 'mandioca', nome: 'Mandioca cozida', cat: 'carbo',
      busca: 'mandioca aipim macaxeira cozida',
      kcal: 125, prot: 0.6, carb: 30.1, gord: 0.3,
      porcoes: [{ nome: '1 pedaço médio', g: 100 }] },

    { id: 'pao-frances', nome: 'Pão francês', cat: 'carbo',
      busca: 'pao frances padaria sal',
      kcal: 300, prot: 8.0, carb: 58.6, gord: 3.1,
      porcoes: [{ nome: '1 unidade', g: 50 }] },

    { id: 'pao-forma', nome: 'Pão de forma integral', cat: 'carbo',
      busca: 'pao forma integral fatia',
      kcal: 253, prot: 9.4, carb: 43.9, gord: 3.9,
      porcoes: [{ nome: '1 fatia', g: 25 }, { nome: '2 fatias', g: 50 }] },

    { id: 'tapioca', nome: 'Tapioca (goma hidratada)', cat: 'carbo',
      busca: 'tapioca goma beiju',
      kcal: 240, prot: 0.1, carb: 59.5, gord: 0,
      porcoes: [{ nome: '1 unidade média', g: 60 }] },

    { id: 'aveia', nome: 'Aveia em flocos', cat: 'carbo',
      busca: 'aveia flocos farelo mingau',
      kcal: 394, prot: 13.9, carb: 66.6, gord: 8.5,
      porcoes: [{ nome: '2 colheres de sopa', g: 30 }] },

    { id: 'cuscuz', nome: 'Cuscuz de milho cozido', cat: 'carbo',
      busca: 'cuscuz milho flocao nordestino',
      kcal: 113, prot: 2.2, carb: 25.3, gord: 0.5,
      porcoes: [{ nome: '1 fatia', g: 100 }] },

    /* ── Legumes e verduras ────────────────────────────── */
    { id: 'alface', nome: 'Alface', cat: 'legume',
      busca: 'alface verdura folha salada',
      kcal: 15, prot: 1.4, carb: 2.4, gord: 0.2,
      porcoes: [{ nome: '3 folhas', g: 30 }, { nome: '1 prato', g: 80 }] },

    { id: 'tomate', nome: 'Tomate', cat: 'legume',
      busca: 'tomate salada',
      kcal: 15, prot: 1.1, carb: 3.1, gord: 0.2,
      porcoes: [{ nome: '1 unidade média', g: 90 }, { nome: '4 rodelas', g: 60 }] },

    { id: 'brocolis', nome: 'Brócolis cozido', cat: 'legume',
      busca: 'brocolis cozido verdura',
      kcal: 25, prot: 2.1, carb: 4.4, gord: 0.5,
      porcoes: [{ nome: '1 pires', g: 80 }] },

    { id: 'cenoura', nome: 'Cenoura crua', cat: 'legume',
      busca: 'cenoura crua ralada legume',
      kcal: 34, prot: 1.3, carb: 7.7, gord: 0.2,
      porcoes: [{ nome: '1 unidade média', g: 80 }] },

    { id: 'abobrinha', nome: 'Abobrinha refogada', cat: 'legume',
      busca: 'abobrinha refogada legume',
      kcal: 30, prot: 1.1, carb: 3.0, gord: 1.9,
      porcoes: [{ nome: '1 pires', g: 80 }] },

    { id: 'couve', nome: 'Couve refogada', cat: 'legume',
      busca: 'couve refogada mineira verdura',
      kcal: 90, prot: 1.7, carb: 3.9, gord: 7.8,
      porcoes: [{ nome: '2 colheres de sopa', g: 40 }] },

    /* ── Frutas ────────────────────────────────────────── */
    { id: 'banana', nome: 'Banana prata', cat: 'fruta',
      busca: 'banana prata fruta',
      kcal: 98, prot: 1.3, carb: 26.0, gord: 0.1,
      porcoes: [{ nome: '1 unidade média', g: 70 }] },

    { id: 'maca', nome: 'Maçã', cat: 'fruta',
      busca: 'maca fruta',
      kcal: 56, prot: 0.3, carb: 15.2, gord: 0,
      porcoes: [{ nome: '1 unidade média', g: 130 }] },

    { id: 'mamao', nome: 'Mamão papaia', cat: 'fruta',
      busca: 'mamao papaia fruta',
      kcal: 40, prot: 0.5, carb: 10.4, gord: 0.1,
      porcoes: [{ nome: '1/2 unidade', g: 150 }] },

    { id: 'laranja', nome: 'Laranja pera', cat: 'fruta',
      busca: 'laranja pera fruta citrica',
      kcal: 37, prot: 1.0, carb: 8.9, gord: 0.1,
      porcoes: [{ nome: '1 unidade média', g: 130 }] },

    { id: 'abacate', nome: 'Abacate', cat: 'fruta',
      busca: 'abacate fruta gordura boa',
      kcal: 96, prot: 1.2, carb: 6.0, gord: 8.4,
      porcoes: [{ nome: '2 colheres de sopa', g: 50 }] },

    { id: 'morango', nome: 'Morango', cat: 'fruta',
      busca: 'morango fruta vermelha',
      kcal: 30, prot: 0.9, carb: 6.8, gord: 0.3,
      porcoes: [{ nome: '1 xícara', g: 150 }] },

    /* ── Laticínios ────────────────────────────────────── */
    { id: 'leite-integral', nome: 'Leite integral', cat: 'laticinio',
      busca: 'leite integral vaca', unidade: 'ml',
      kcal: 61, prot: 3.2, carb: 4.7, gord: 3.3,
      porcoes: [{ nome: '1 copo', g: 200 }] },

    { id: 'leite-desnatado', nome: 'Leite desnatado', cat: 'laticinio',
      busca: 'leite desnatado magro', unidade: 'ml',
      kcal: 35, prot: 3.4, carb: 5.0, gord: 0.1,
      porcoes: [{ nome: '1 copo', g: 200 }] },

    { id: 'iogurte-natural', nome: 'Iogurte natural integral', cat: 'laticinio',
      busca: 'iogurte natural integral',
      kcal: 61, prot: 3.5, carb: 4.7, gord: 3.3,
      porcoes: [{ nome: '1 pote', g: 170 }] },

    { id: 'queijo-mussarela', nome: 'Queijo mussarela', cat: 'laticinio',
      busca: 'queijo mussarela muçarela fatia',
      kcal: 330, prot: 25.0, carb: 3.0, gord: 25.0,
      porcoes: [{ nome: '1 fatia', g: 20 }, { nome: '2 fatias', g: 40 }] },

    { id: 'queijo-minas', nome: 'Queijo minas frescal', cat: 'laticinio',
      busca: 'queijo minas frescal branco',
      kcal: 264, prot: 17.4, carb: 3.2, gord: 20.2,
      porcoes: [{ nome: '1 fatia', g: 30 }] },

    { id: 'requeijao', nome: 'Requeijão cremoso', cat: 'laticinio',
      busca: 'requeijao cremoso catupiry',
      kcal: 257, prot: 9.6, carb: 3.0, gord: 22.6,
      porcoes: [{ nome: '1 colher de sopa', g: 20 }] },

    /* ── Gorduras e castanhas ──────────────────────────── */
    { id: 'azeite', nome: 'Azeite de oliva', cat: 'gordura',
      busca: 'azeite oliva extra virgem oleo', unidade: 'ml',
      kcal: 884, prot: 0, carb: 0, gord: 100,
      porcoes: [{ nome: '1 colher de sopa', g: 13 }, { nome: '1 fio', g: 5 }] },

    { id: 'oleo-soja', nome: 'Óleo de soja', cat: 'gordura',
      busca: 'oleo soja fritura cozinha', unidade: 'ml',
      kcal: 884, prot: 0, carb: 0, gord: 100,
      porcoes: [{ nome: '1 colher de sopa', g: 13 }] },

    { id: 'amendoim', nome: 'Amendoim torrado', cat: 'gordura',
      busca: 'amendoim torrado castanha',
      kcal: 544, prot: 27.2, carb: 20.3, gord: 43.9,
      porcoes: [{ nome: '1 punhado', g: 30 }] },

    { id: 'castanha-caju', nome: 'Castanha de caju', cat: 'gordura',
      busca: 'castanha caju oleaginosa',
      kcal: 570, prot: 18.5, carb: 29.1, gord: 46.3,
      porcoes: [{ nome: '1 punhado', g: 30 }] },

    { id: 'pasta-amendoim', nome: 'Pasta de amendoim integral', cat: 'gordura',
      busca: 'pasta amendoim manteiga integral',
      kcal: 588, prot: 25.0, carb: 20.0, gord: 50.0,
      porcoes: [{ nome: '1 colher de sopa', g: 20 }] },

    { id: 'manteiga', nome: 'Manteiga', cat: 'gordura',
      busca: 'manteiga com sal',
      kcal: 726, prot: 0.4, carb: 0.1, gord: 82.4,
      porcoes: [{ nome: '1 ponta de faca', g: 8 }] },

    /* ── Bebidas ───────────────────────────────────────── */
    { id: 'refrigerante-cola', nome: 'Refrigerante de cola', cat: 'bebida',
      busca: 'refrigerante coca cola refri', unidade: 'ml',
      kcal: 42, prot: 0, carb: 10.6, gord: 0,
      porcoes: [{ nome: '1 lata', g: 350 }, { nome: '1 copo', g: 200 }] },

    { id: 'suco-laranja', nome: 'Suco de laranja natural', cat: 'bebida',
      busca: 'suco laranja natural', unidade: 'ml',
      kcal: 37, prot: 0.7, carb: 8.6, gord: 0.2,
      porcoes: [{ nome: '1 copo', g: 200 }] },

    { id: 'cerveja', nome: 'Cerveja pilsen', cat: 'bebida',
      busca: 'cerveja pilsen alcool', unidade: 'ml',
      kcal: 41, prot: 0.6, carb: 3.2, gord: 0,
      porcoes: [{ nome: '1 lata', g: 350 }, { nome: '1 long neck', g: 355 }] },

    { id: 'cafe-preto', nome: 'Café preto sem açúcar', cat: 'bebida',
      busca: 'cafe preto sem acucar coado', unidade: 'ml',
      kcal: 2, prot: 0.1, carb: 0.3, gord: 0,
      porcoes: [{ nome: '1 xícara', g: 50 }] },

    /* ── Lanches e doces ───────────────────────────────── */
    { id: 'pizza-mussarela', nome: 'Pizza de mussarela', cat: 'lanche',
      busca: 'pizza mussarela muçarela queijo fatia',
      kcal: 266, prot: 11.4, carb: 30.6, gord: 10.9,
      porcoes: [{ nome: '1 fatia', g: 100 }, { nome: '2 fatias', g: 200 }] },

    { id: 'hamburguer', nome: 'Hambúrguer (pão, carne e queijo)', cat: 'lanche',
      busca: 'hamburguer x-burguer lanche sanduiche burger',
      kcal: 254, prot: 12.9, carb: 22.6, gord: 12.4,
      porcoes: [{ nome: '1 unidade', g: 180 }] },

    { id: 'coxinha', nome: 'Coxinha de frango', cat: 'lanche',
      busca: 'coxinha frango salgado frito',
      kcal: 273, prot: 8.5, carb: 27.0, gord: 14.5,
      porcoes: [{ nome: '1 unidade', g: 80 }] },

    { id: 'pao-de-queijo', nome: 'Pão de queijo', cat: 'lanche',
      busca: 'pao de queijo mineiro',
      kcal: 363, prot: 5.0, carb: 39.0, gord: 20.0,
      porcoes: [{ nome: '1 unidade pequena', g: 30 }] },

    { id: 'chocolate-ao-leite', nome: 'Chocolate ao leite', cat: 'lanche',
      busca: 'chocolate ao leite barra doce',
      kcal: 540, prot: 7.3, carb: 59.4, gord: 30.3,
      porcoes: [{ nome: '1 barra pequena', g: 25 }] },

    { id: 'biscoito-recheado', nome: 'Biscoito recheado', cat: 'lanche',
      busca: 'biscoito recheado bolacha doce',
      kcal: 472, prot: 5.6, carb: 71.0, gord: 19.0,
      porcoes: [{ nome: '3 unidades', g: 30 }] }
  ];

  /* Pratos: composições prontas para quem pesquisa a refeição inteira.
     As gramagens são de um prato comum, não de uma medição — por isso
     a tela mostra de onde vem cada linha da conta e deixa mudar. */
  const pratos = [
    { id: 'pf-frango', nome: 'Prato feito de frango',
      busca: 'pf prato feito frango arroz feijao salada marmita',
      itens: [
        { id: 'arroz-branco', g: 150 }, { id: 'feijao-carioca', g: 100 },
        { id: 'frango-peito', g: 150 }, { id: 'alface', g: 30 }, { id: 'tomate', g: 40 }
      ] },

    { id: 'pf-carne', nome: 'Prato feito de carne',
      busca: 'pf prato feito carne bife arroz feijao marmita',
      itens: [
        { id: 'arroz-branco', g: 150 }, { id: 'feijao-carioca', g: 100 },
        { id: 'carne-patinho', g: 130 }, { id: 'alface', g: 30 }, { id: 'tomate', g: 40 }
      ] },

    { id: 'arroz-feijao-ovo', nome: 'Arroz, feijão e ovo',
      busca: 'arroz feijao ovo simples basico',
      itens: [
        { id: 'arroz-branco', g: 150 }, { id: 'feijao-carioca', g: 100 }, { id: 'ovo-frito', g: 50 }
      ] },

    { id: 'frango-arroz-batata', nome: 'Frango com arroz e batata doce',
      busca: 'frango arroz batata doce marmita fitness treino',
      itens: [
        { id: 'frango-peito', g: 150 }, { id: 'arroz-branco', g: 100 }, { id: 'batata-doce', g: 150 }
      ] },

    { id: 'macarrao-carne', nome: 'Macarrão com carne moída',
      busca: 'macarrao carne moida bolonhesa massa',
      itens: [
        { id: 'macarrao', g: 200 }, { id: 'carne-moida', g: 100 }, { id: 'tomate', g: 50 }
      ] },

    { id: 'cafe-manha-pao', nome: 'Café da manhã com pão e ovo',
      busca: 'cafe da manha pao ovo queijo desjejum',
      itens: [
        { id: 'pao-frances', g: 50 }, { id: 'ovo-cozido', g: 50 },
        { id: 'queijo-minas', g: 30 }, { id: 'cafe-preto', g: 50 }
      ] },

    { id: 'tapioca-frango', nome: 'Tapioca de frango',
      busca: 'tapioca frango recheada lanche',
      itens: [{ id: 'tapioca', g: 60 }, { id: 'frango-peito', g: 80 }, { id: 'queijo-mussarela', g: 20 }] },

    { id: 'shake-pos-treino', nome: 'Shake pós-treino',
      busca: 'shake pos treino whey banana aveia vitamina',
      itens: [
        { id: 'whey', g: 30 }, { id: 'banana', g: 70 },
        { id: 'aveia', g: 30 }, { id: 'leite-desnatado', g: 200 }
      ] },

    { id: 'salada-atum', nome: 'Salada com atum',
      busca: 'salada atum leve verduras almoco',
      itens: [
        { id: 'alface', g: 60 }, { id: 'tomate', g: 60 }, { id: 'cenoura', g: 40 },
        { id: 'atum-lata', g: 120 }, { id: 'azeite', g: 8 }
      ] },

    { id: 'churrasco', nome: 'Churrasco com acompanhamentos',
      busca: 'churrasco picanha domingo carne arroz farofa',
      itens: [
        { id: 'picanha', g: 200 }, { id: 'arroz-branco', g: 100 },
        { id: 'feijao-preto', g: 80 }, { id: 'tomate', g: 50 }
      ] },

    { id: 'lanche-hamburguer', nome: 'Hambúrguer com batata e refri',
      busca: 'hamburguer batata frita refrigerante combo lanche fast food',
      itens: [
        { id: 'hamburguer', g: 180 }, { id: 'batata-frita', g: 100 },
        { id: 'refrigerante-cola', g: 350 }
      ] },

    { id: 'omelete-queijo', nome: 'Omelete de queijo',
      busca: 'omelete ovo queijo omelette',
      itens: [{ id: 'ovo-frito', g: 100 }, { id: 'queijo-mussarela', g: 30 }] }
  ];

  /* ── Busca ───────────────────────────────────────────── */

  /* Sem acento e em minúsculas dos dois lados: quem digita no celular
     costuma pular o acento, e "maca" precisa achar "maçã". */
  function normalizar(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .trim();
  }

  /* Pontua o quanto o item responde ao que foi digitado. Começar com o
     termo vale mais que contê-lo no meio, e o nome vale mais que a
     lista de sinônimos — assim "arroz" traz "Arroz branco" antes de
     "Prato feito", que só cita arroz na composição. */
  function pontuar(item, termo) {
    const nome = normalizar(item.nome);
    const chaves = normalizar(item.busca);
    if (nome === termo) return 100;
    if (nome.startsWith(termo)) return 80;
    /* A primeira palavra da lista de sinônimos é o termo principal do
       item: "frango peito file..." diz que aquilo é, antes de tudo,
       frango. Isso coloca o peito de frango à frente da coxinha de
       frango numa busca por "frango", mesmo os dois citando a palavra. */
    if (chaves.startsWith(termo)) return 70;
    if (nome.includes(termo)) return 60;
    // Palavra inteira nos sinônimos pesa mais que pedaço de palavra.
    if (new RegExp('(^| )' + termo).test(chaves)) return 40;
    if (chaves.includes(termo)) return 20;
    return 0;
  }

  /* Ligações que aparecem quando se digita a refeição por extenso.
     Sem tirá-las, "frango com arroz e feijão" não acha nada: o "com" e
     o "e" não existem em item nenhum e, como exigimos que todo termo
     encontre algo, derrubavam a busca inteira. */
  const LIGACOES = ['com', 'e', 'de', 'da', 'do', 'no', 'na', 'em', 'ao', 'a', 'o', 'os', 'as', 'um', 'uma'];

  /* Busca por palavras: todas precisam achar alguma coisa, o que faz
     "frango arroz" encontrar o prato que tem os dois em vez de tudo que
     tem frango. */
  function buscar(consulta, limite) {
    const bruto = normalizar(consulta).split(/\s+/).filter(Boolean);
    // Tira as ligações, mas não a ponto de ficar sem nada: quem digitou
    // só "de" ainda merece a tentativa com o que escreveu.
    const semLigacao = bruto.filter((t) => LIGACOES.indexOf(t) === -1);
    const termos = semLigacao.length ? semLigacao : bruto;
    if (!termos.length) return [];

    const universo = alimentos.map((a) => ({ item: a, tipo: 'alimento' }))
      .concat(pratos.map((p) => ({ item: p, tipo: 'prato' })));

    const achados = [];
    universo.forEach((entrada) => {
      let total = 0;
      for (const termo of termos) {
        const p = pontuar(entrada.item, termo);
        if (!p) return;          // faltou um termo: fora
        total += p;
      }
      /* Uma palavra é pedido de ingrediente; várias, de refeição.
         Quem digita "frango" quer o peito de frango, não o prato que
         por acaso começa com essa palavra no nome — e quem digita
         "frango com arroz" quer justamente o prato. Sem este ajuste o
         prato vencia sempre, porque começar com o termo pontua mais
         que contê-lo no meio. */
      if (entrada.tipo === 'prato') total += termos.length > 1 ? 30 : -35;
      achados.push({ ...entrada, ponto: total });
    });

    // Empate vai para o nome mais curto: costuma ser o item genérico,
    // que é o que a maioria procura.
    achados.sort((a, b) =>
      b.ponto - a.ponto ||
      a.item.nome.length - b.item.nome.length ||
      a.item.nome.localeCompare(b.item.nome));
    return limite ? achados.slice(0, limite) : achados;
  }

  function porId(id) {
    return alimentos.find((a) => a.id === id) || null;
  }

  function pratoPorId(id) {
    return pratos.find((p) => p.id === id) || null;
  }

  function porCategoria(catId) {
    return alimentos.filter((a) => a.cat === catId);
  }

  function categoriaPorId(id) {
    return categorias.find((c) => c.id === id) || null;
  }

  /* ── Cálculo ─────────────────────────────────────────── */

  /* Regra de três a partir dos 100 g da tabela. Uma casa decimal nos
     macros e nenhuma nas calorias: mais que isso é precisão inventada,
     já que a tabela é média de amostras. */
  function calcular(alimento, gramas) {
    const f = gramas / 100;
    return {
      gramas: gramas,
      kcal: Math.round(alimento.kcal * f),
      prot: Math.round(alimento.prot * f * 10) / 10,
      carb: Math.round(alimento.carb * f * 10) / 10,
      gord: Math.round(alimento.gord * f * 10) / 10
    };
  }

  /** Soma dos itens de um prato, com a linha de cada um para conferir. */
  function calcularPrato(prato) {
    const linhas = prato.itens.map((i) => {
      const alimento = porId(i.id);
      if (!alimento) return null;
      return { alimento: alimento, gramas: i.g, valores: calcular(alimento, i.g) };
    }).filter(Boolean);

    const total = linhas.reduce((soma, l) => ({
      kcal: soma.kcal + l.valores.kcal,
      prot: soma.prot + l.valores.prot,
      carb: soma.carb + l.valores.carb,
      gord: soma.gord + l.valores.gord,
      gramas: soma.gramas + l.gramas
    }), { kcal: 0, prot: 0, carb: 0, gord: 0, gramas: 0 });

    return {
      linhas: linhas,
      total: {
        gramas: total.gramas,
        kcal: Math.round(total.kcal),
        prot: Math.round(total.prot * 10) / 10,
        carb: Math.round(total.carb * 10) / 10,
        gord: Math.round(total.gord * 10) / 10
      }
    };
  }

  /** Unidade de medida do item: quase tudo em grama, líquido em ml. */
  function unidade(alimento) {
    return alimento.unidade || 'g';
  }

  /* ── Favoritos e recentes ────────────────────────────── */

  /* Mesmo padrão do resto do app: localStorage com try/catch, porque em
     navegação privada o acesso lança e o app não pode cair por isso. */
  const CHAVE_FAV = 'gym:nutri:favoritos';
  const CHAVE_REC = 'gym:nutri:recentes';
  const MAX_RECENTES = 8;

  function ler(chave) {
    try {
      const bruto = localStorage.getItem(chave);
      const lista = bruto ? JSON.parse(bruto) : [];
      return Array.isArray(lista) ? lista : [];
    } catch (erro) {
      return [];
    }
  }

  function gravar(chave, lista) {
    try {
      localStorage.setItem(chave, JSON.stringify(lista));
    } catch (erro) {
      // Sem storage: vale só enquanto o app estiver aberto.
    }
  }

  let favoritos = ler(CHAVE_FAV);
  let recentes = ler(CHAVE_REC);

  function eFavorito(id) {
    return favoritos.indexOf(id) !== -1;
  }

  function alternarFavorito(id) {
    const i = favoritos.indexOf(id);
    if (i === -1) favoritos.push(id);
    else favoritos.splice(i, 1);
    gravar(CHAVE_FAV, favoritos);
    return eFavorito(id);
  }

  /** Resolve os favoritos guardados em itens, ignorando id que sumiu. */
  function listaFavoritos() {
    return favoritos
      .map((id) => {
        const a = porId(id);
        if (a) return { item: a, tipo: 'alimento' };
        const p = pratoPorId(id);
        return p ? { item: p, tipo: 'prato' } : null;
      })
      .filter(Boolean);
  }

  /** Guarda o que foi aberto; o mais recente vai para o topo, sem repetir. */
  function registrarVisita(id) {
    recentes = [id].concat(recentes.filter((r) => r !== id)).slice(0, MAX_RECENTES);
    gravar(CHAVE_REC, recentes);
  }

  function listaRecentes() {
    return recentes
      .map((id) => {
        const a = porId(id);
        if (a) return { item: a, tipo: 'alimento' };
        const p = pratoPorId(id);
        return p ? { item: p, tipo: 'prato' } : null;
      })
      .filter(Boolean);
  }

  function limparRecentes() {
    recentes = [];
    gravar(CHAVE_REC, recentes);
  }

  return {
    categorias, alimentos, pratos,
    buscar, porId, pratoPorId, porCategoria, categoriaPorId,
    calcular, calcularPrato, unidade, normalizar,
    eFavorito, alternarFavorito, listaFavoritos,
    registrarVisita, listaRecentes, limparRecentes
  };
})();
