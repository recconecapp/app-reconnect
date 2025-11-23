// Serviço de IA para análise emocional

import { RadarAnalysis, EmotionalState, UserMode } from './types';

export async function analyzeEmotionalState(
  userInput: string,
  mode: UserMode
): Promise<RadarAnalysis> {
  // Simulação de análise de IA (em produção, conectar com OpenAI)
  
  const patterns = identifyPatterns(userInput);
  const triggers = identifyTriggers(userInput);
  const hiddenFears = identifyHiddenFears(userInput, mode);
  const emotionalState = detectEmotionalState(userInput);
  const practicalGuidance = generateGuidance(userInput, mode, emotionalState);
  const immediateActions = generateImmediateActions(emotionalState, mode);

  return {
    emotionalState,
    patterns,
    triggers,
    hiddenFears,
    practicalGuidance,
    immediateActions,
  };
}

function detectEmotionalState(text: string): EmotionalState {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('ansioso') || lowerText.includes('nervoso') || lowerText.includes('preocupado')) {
    return 'anxious';
  }
  if (lowerText.includes('triste') || lowerText.includes('sozinho') || lowerText.includes('vazio')) {
    return 'sad';
  }
  if (lowerText.includes('raiva') || lowerText.includes('irritado') || lowerText.includes('bravo')) {
    return 'angry';
  }
  if (lowerText.includes('confuso') || lowerText.includes('perdido') || lowerText.includes('não sei')) {
    return 'confused';
  }
  if (lowerText.includes('esperança') || lowerText.includes('melhor') || lowerText.includes('otimista')) {
    return 'hopeful';
  }
  if (lowerText.includes('sobrecarregado') || lowerText.includes('demais') || lowerText.includes('exausto')) {
    return 'overwhelmed';
  }
  if (lowerText.includes('paz') || lowerText.includes('tranquilo') || lowerText.includes('sereno')) {
    return 'peaceful';
  }
  
  return 'calm';
}

function identifyPatterns(text: string): string[] {
  const patterns: string[] = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('sempre') || lowerText.includes('toda vez') || lowerText.includes('de novo')) {
    patterns.push('Padrão de repetição comportamental detectado');
  }
  if (lowerText.includes('mensagem') || lowerText.includes('texto') || lowerText.includes('whatsapp')) {
    patterns.push('Comunicação digital como gatilho emocional');
  }
  if (lowerText.includes('esperar') || lowerText.includes('resposta') || lowerText.includes('ignorar')) {
    patterns.push('Ansiedade de validação externa');
  }
  if (lowerText.includes('ciúme') || lowerText.includes('desconfiança') || lowerText.includes('inseguro')) {
    patterns.push('Padrão de insegurança relacional');
  }
  
  return patterns.length > 0 ? patterns : ['Explorando novos padrões emocionais'];
}

function identifyTriggers(text: string): string[] {
  const triggers: string[] = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('não respondeu') || lowerText.includes('visualizou') || lowerText.includes('online')) {
    triggers.push('Ausência de resposta imediata');
  }
  if (lowerText.includes('briga') || lowerText.includes('discussão') || lowerText.includes('conflito')) {
    triggers.push('Conflitos e confrontos');
  }
  if (lowerText.includes('sozinho') || lowerText.includes('abandonado') || lowerText.includes('deixou')) {
    triggers.push('Medo de abandono');
  }
  if (lowerText.includes('ex') || lowerText.includes('passado') || lowerText.includes('antes')) {
    triggers.push('Memórias de relacionamentos anteriores');
  }
  
  return triggers.length > 0 ? triggers : ['Identificando gatilhos específicos'];
}

function identifyHiddenFears(text: string, mode: UserMode): string[] {
  const fears: string[] = [];
  const lowerText = text.toLowerCase();
  
  if (mode === 'single') {
    if (lowerText.includes('rejeição') || lowerText.includes('não gosta') || lowerText.includes('não quer')) {
      fears.push('Medo profundo de rejeição');
    }
    if (lowerText.includes('sozinho') || lowerText.includes('ninguém') || lowerText.includes('nunca')) {
      fears.push('Medo de solidão permanente');
    }
    if (lowerText.includes('não sou') || lowerText.includes('não mereço') || lowerText.includes('não consigo')) {
      fears.push('Crença de não ser suficiente');
    }
  } else {
    if (lowerText.includes('perder') || lowerText.includes('terminar') || lowerText.includes('acabar')) {
      fears.push('Medo de perder o relacionamento');
    }
    if (lowerText.includes('traição') || lowerText.includes('outra pessoa') || lowerText.includes('mentira')) {
      fears.push('Medo de traição ou infidelidade');
    }
    if (lowerText.includes('distante') || lowerText.includes('frio') || lowerText.includes('não ama')) {
      fears.push('Medo de perda de conexão emocional');
    }
  }
  
  return fears.length > 0 ? fears : ['Explorando medos ocultos'];
}

function generateGuidance(text: string, mode: UserMode, state: EmotionalState): string {
  const guidanceMap: Record<EmotionalState, { single: string; couple: string }> = {
    anxious: {
      single: 'Sua ansiedade está te dizendo que algo está errado, mas nem sempre ela está certa. O que você está sentindo é real, mas a interpretação pode estar distorcida. Respire. Você não precisa de validação imediata para ter valor.',
      couple: 'A ansiedade no relacionamento geralmente vem de necessidades não comunicadas. Em vez de esperar que a outra pessoa adivinhe, pratique expressar o que você precisa com clareza e vulnerabilidade. Isso é força, não fraqueza.',
    },
    sad: {
      single: 'Tristeza é um sinal de que algo importante para você foi tocado. Não fuja dela. Sente com essa emoção, entenda o que ela está tentando te dizer. Você está processando algo real e isso é parte da cura.',
      couple: 'A tristeza no relacionamento merece ser compartilhada. Vulnerabilidade cria conexão. Permita-se ser visto(a) na sua dor, e dê espaço para que seu parceiro(a) te acolha. Isso fortalece o vínculo.',
    },
    angry: {
      single: 'Raiva é uma emoção secundária. Embaixo dela, geralmente há mágoa, decepção ou medo. Antes de agir, pergunte-se: o que realmente está me machucando? Essa clareza vai te dar poder de escolha.',
      couple: 'Raiva no relacionamento é um pedido de atenção disfarçado. Em vez de atacar, tente: "Eu me sinto [emoção] quando [situação]. Eu preciso [necessidade]." Isso transforma conflito em conexão.',
    },
    confused: {
      single: 'Confusão é um convite para pausar. Você não precisa ter todas as respostas agora. Às vezes, a clareza vem quando paramos de forçar e começamos a observar. Dê tempo ao tempo.',
      couple: 'Confusão no relacionamento geralmente significa que há informações ou sentimentos não processados. Converse abertamente sobre o que está confuso. Perguntas honestas criam clareza compartilhada.',
    },
    hopeful: {
      single: 'Esperança é linda, mas precisa estar ancorada na realidade. Celebre esse sentimento, mas também mantenha os pés no chão. Você merece alguém que corresponda ao seu investimento emocional.',
      couple: 'Esperança no relacionamento é combustível para crescimento. Use essa energia para criar momentos de conexão genuína. Pequenas ações consistentes constroem grandes transformações.',
    },
    overwhelmed: {
      single: 'Você está carregando peso demais sozinho(a). Não é fraqueza pedir ajuda ou dar um passo atrás. Priorize o essencial: sua saúde emocional vem primeiro. Sempre.',
      couple: 'Sobrecarga no relacionamento é sinal de que os papéis e responsabilidades precisam ser revistos. Conversem sobre como dividir melhor o peso. Relacionamento é parceria, não sacrifício.',
    },
    peaceful: {
      single: 'Paz interior é o maior indicador de que você está no caminho certo. Proteja esse estado. Escolha pessoas e situações que honrem essa tranquilidade que você conquistou.',
      couple: 'Paz no relacionamento é construída dia após dia. Celebrem esse momento. Continuem nutrindo a conexão com presença, escuta e pequenos gestos de amor.',
    },
    calm: {
      single: 'Calma é poder. Você está em um lugar de clareza. Use esse momento para refletir sobre o que você realmente quer e merece. Decisões tomadas na calma são sempre melhores.',
      couple: 'Calma no relacionamento é um presente. Aproveitem para fortalecer a intimidade emocional. Conversas profundas e momentos de qualidade florescem na tranquilidade.',
    },
  };
  
  return guidanceMap[state][mode];
}

function generateImmediateActions(state: EmotionalState, mode: UserMode): string[] {
  const actionsMap: Record<EmotionalState, { single: string[]; couple: string[] }> = {
    anxious: {
      single: [
        'Faça 3 respirações profundas agora',
        'Escreva o que você está sentindo sem filtro',
        'Pergunte-se: isso é real ou é minha ansiedade falando?',
        'Não envie aquela mensagem ainda - espere 1 hora',
      ],
      couple: [
        'Pratique a respiração 4-7-8',
        'Escreva o que você precisa comunicar antes de falar',
        'Peça um abraço sem palavras',
        'Combine um momento para conversar com calma',
      ],
    },
    sad: {
      single: [
        'Permita-se sentir sem julgamento',
        'Escreva uma carta para você mesmo(a) com compaixão',
        'Faça algo que te conforta (música, banho, caminhada)',
        'Lembre-se: isso vai passar',
      ],
      couple: [
        'Compartilhe sua tristeza com vulnerabilidade',
        'Peça para ser ouvido(a) sem soluções, apenas presença',
        'Façam algo reconfortante juntos',
        'Expressem gratidão um pelo outro',
      ],
    },
    angry: {
      single: [
        'Afaste-se da situação por 10 minutos',
        'Identifique a emoção real embaixo da raiva',
        'Escreva tudo que quer dizer, mas não envie',
        'Faça exercício físico para liberar a tensão',
      ],
      couple: [
        'Peça um tempo antes de continuar a conversa',
        'Use "eu sinto" em vez de "você sempre"',
        'Respirem juntos por 2 minutos',
        'Lembrem-se: vocês são um time, não adversários',
      ],
    },
    confused: {
      single: [
        'Liste o que você sabe vs. o que você está assumindo',
        'Pergunte diretamente em vez de interpretar',
        'Dê tempo para processar antes de decidir',
        'Converse com alguém de confiança',
      ],
      couple: [
        'Façam perguntas abertas um ao outro',
        'Clarifiquem expectativas e necessidades',
        'Evitem tomar decisões grandes agora',
        'Busquem entender antes de serem entendidos',
      ],
    },
    hopeful: {
      single: [
        'Anote o que está te dando esperança',
        'Mantenha expectativas realistas',
        'Continue investindo em você mesmo(a)',
        'Observe ações, não apenas palavras',
      ],
      couple: [
        'Compartilhem suas esperanças para o relacionamento',
        'Criem um plano de ação conjunto',
        'Celebrem pequenas vitórias',
        'Mantenham a comunicação aberta',
      ],
    },
    overwhelmed: {
      single: [
        'Faça uma lista e escolha apenas 1 coisa para hoje',
        'Diga não para o que não é essencial',
        'Peça ajuda - você não precisa fazer tudo sozinho(a)',
        'Tire 15 minutos só para você',
      ],
      couple: [
        'Conversem sobre como redistribuir responsabilidades',
        'Priorizem o essencial juntos',
        'Façam algo simples e leve juntos',
        'Deem espaço um ao outro quando necessário',
      ],
    },
    peaceful: {
      single: [
        'Registre esse momento de paz no seu diário',
        'Identifique o que te trouxe aqui',
        'Proteja sua energia de situações tóxicas',
        'Continue fazendo o que está funcionando',
      ],
      couple: [
        'Aproveitem esse momento de conexão',
        'Façam algo especial juntos',
        'Expressem gratidão um pelo outro',
        'Conversem sobre o que está funcionando bem',
      ],
    },
    calm: {
      single: [
        'Use essa clareza para tomar decisões importantes',
        'Reflita sobre seus valores e limites',
        'Planeje seus próximos passos com intenção',
        'Mantenha práticas que te trazem equilíbrio',
      ],
      couple: [
        'Tenham conversas profundas e significativas',
        'Planejem o futuro juntos',
        'Fortaleçam a intimidade emocional',
        'Criem rituais de conexão',
      ],
    },
  };
  
  return actionsMap[state][mode];
}

export async function generateDiaryInsights(
  content: string,
  previousEntries: string[]
): Promise<{
  insights: string;
  patterns: string[];
  triggers: string[];
  microActions: string[];
}> {
  // Análise de padrões ao longo do tempo
  const patterns = analyzePatterns(content, previousEntries);
  const triggers = identifyTriggers(content);
  const insights = generateDeepInsights(content, patterns);
  const microActions = generateMicroActions(content);
  
  return {
    insights,
    patterns,
    triggers,
    microActions,
  };
}

function analyzePatterns(current: string, previous: string[]): string[] {
  const patterns: string[] = [];
  
  // Análise simples de repetição de palavras-chave
  const keywords = ['ansioso', 'triste', 'sozinho', 'rejeitado', 'confuso', 'raiva'];
  const currentLower = current.toLowerCase();
  
  keywords.forEach(keyword => {
    const countInCurrent = (currentLower.match(new RegExp(keyword, 'g')) || []).length;
    const countInPrevious = previous.filter(entry => 
      entry.toLowerCase().includes(keyword)
    ).length;
    
    if (countInCurrent > 0 && countInPrevious >= 2) {
      patterns.push(`Padrão recorrente: sentimentos de ${keyword}`);
    }
  });
  
  return patterns.length > 0 ? patterns : ['Novos padrões sendo identificados'];
}

function generateDeepInsights(content: string, patterns: string[]): string {
  const hasRecurringPatterns = patterns.length > 1;
  
  if (hasRecurringPatterns) {
    return 'Percebo que alguns sentimentos estão se repetindo. Isso não é coincidência - é um convite para olhar mais fundo. O que esses momentos têm em comum? Que necessidade sua não está sendo atendida? Você merece entender isso e fazer escolhas diferentes.';
  }
  
  return 'Você está se permitindo sentir e isso já é um grande passo. Continue registrando suas emoções. Com o tempo, padrões vão emergir e você terá clareza sobre o que precisa mudar. Estou aqui com você nessa jornada.';
}

function generateMicroActions(content: string): string[] {
  return [
    'Identifique uma necessidade emocional não atendida hoje',
    'Pratique dizer não a algo que não te serve',
    'Escreva 3 coisas que você fez bem hoje',
    'Pergunte-se: o que eu preciso agora?',
  ];
}

export async function generateSOSGuidance(
  crisis: string,
  mode: UserMode
): Promise<{
  guidance: string;
  steps: string[];
  breathingExercise: boolean;
}> {
  const lowerCrisis = crisis.toLowerCase();
  let guidance = '';
  let steps: string[] = [];
  let breathingExercise = false;
  
  if (mode === 'single') {
    if (lowerCrisis.includes('mensagem') || lowerCrisis.includes('texto')) {
      guidance = 'Você está prestes a enviar uma mensagem por impulso. Vamos pausar juntos. Essa mensagem pode esperar. Sua paz emocional não pode.';
      steps = [
        'Coloque o celular longe por 10 minutos',
        'Respire fundo 5 vezes',
        'Escreva o que você quer dizer aqui, não para a pessoa',
        'Pergunte-se: isso vai me aproximar da paz ou da ansiedade?',
        'Se ainda quiser enviar depois de 1 hora, revise a mensagem',
      ];
      breathingExercise = true;
    } else if (lowerCrisis.includes('rejeição') || lowerCrisis.includes('rejeitado')) {
      guidance = 'Rejeição dói, mas não define seu valor. Você é completo(a) independente da resposta de alguém. Vamos trabalhar isso juntos agora.';
      steps = [
        'Reconheça: a dor é real e válida',
        'Lembre-se: rejeição é redirecionamento',
        'Liste 5 qualidades suas que ninguém pode tirar',
        'Faça algo que te faz sentir bem consigo mesmo(a)',
        'Dê tempo - a clareza vem depois da tempestade',
      ];
      breathingExercise = true;
    } else {
      guidance = 'Você está em um momento difícil. Respire. Você não está sozinho(a). Vamos atravessar isso juntos, um passo de cada vez.';
      steps = [
        'Pare tudo por 5 minutos',
        'Respire profundamente',
        'Identifique a emoção principal',
        'Pergunte-se: o que eu preciso agora?',
        'Faça uma coisa pequena que te acalme',
      ];
      breathingExercise = true;
    }
  } else {
    if (lowerCrisis.includes('briga') || lowerCrisis.includes('discussão')) {
      guidance = 'Vocês estão em conflito. Isso não significa que o relacionamento acabou - significa que há algo importante que precisa ser ouvido. Vamos transformar isso em conexão.';
      steps = [
        'Peçam um tempo de 15 minutos separados',
        'Respirem e se acalmem individualmente',
        'Voltem e digam: "Eu quero entender você"',
        'Cada um fala 2 minutos sem interrupção',
        'Busquem entender, não vencer',
      ];
      breathingExercise = true;
    } else if (lowerCrisis.includes('ciúme') || lowerCrisis.includes('ciúmes')) {
      guidance = 'Ciúmes é medo disfarçado. Vamos trabalhar a raiz disso, não apenas o sintoma. Você merece se sentir seguro(a) no relacionamento.';
      steps = [
        'Identifique: o que exatamente está te deixando inseguro(a)?',
        'Pergunte-se: isso é real ou é minha insegurança falando?',
        'Converse com vulnerabilidade, não com acusação',
        'Peça o que você precisa para se sentir seguro(a)',
        'Trabalhem juntos para construir confiança',
      ];
      breathingExercise = false;
    } else {
      guidance = 'Relacionamentos têm momentos difíceis. Isso não significa fracasso - significa que vocês estão crescendo. Vamos navegar isso juntos.';
      steps = [
        'Respirem juntos por 2 minutos',
        'Digam: "Eu te amo e quero resolver isso"',
        'Identifiquem a necessidade real de cada um',
        'Busquem uma solução que honre ambos',
        'Lembrem-se: vocês são um time',
      ];
      breathingExercise = true;
    }
  }
  
  return { guidance, steps, breathingExercise };
}
