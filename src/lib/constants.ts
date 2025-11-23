// Constantes do Reconnect

export const MOODS = [
  { emoji: '😌', label: 'Calmo', value: 'calm' },
  { emoji: '😰', label: 'Ansioso', value: 'anxious' },
  { emoji: '😢', label: 'Triste', value: 'sad' },
  { emoji: '😠', label: 'Irritado', value: 'angry' },
  { emoji: '😕', label: 'Confuso', value: 'confused' },
  { emoji: '🌟', label: 'Esperançoso', value: 'hopeful' },
  { emoji: '😵', label: 'Sobrecarregado', value: 'overwhelmed' },
  { emoji: '✨', label: 'Em paz', value: 'peaceful' },
] as const;

export const CHALLENGES = [
  {
    id: '1',
    title: '3 dias sem mensagens impulsivas',
    description: 'Respire fundo antes de enviar qualquer mensagem emocional',
    duration: '3 dias',
    category: 'single' as const,
    completed: false,
  },
  {
    id: '2',
    title: '48h de comunicação calma',
    description: 'Pratique escuta ativa e respostas sem defensividade',
    duration: '2 dias',
    category: 'couple' as const,
    completed: false,
  },
  {
    id: '3',
    title: 'Desafio anti-ciúmes',
    description: 'Identifique e questione pensamentos de ciúmes por 5 dias',
    duration: '5 dias',
    category: 'both' as const,
    completed: false,
  },
  {
    id: '4',
    title: 'Semana da autoconfiança',
    description: 'Liste 3 qualidades suas todos os dias por 7 dias',
    duration: '7 dias',
    category: 'single' as const,
    completed: false,
  },
  {
    id: '5',
    title: 'Conexão profunda',
    description: 'Faça uma pergunta significativa ao seu parceiro(a) por dia',
    duration: '7 dias',
    category: 'couple' as const,
    completed: false,
  },
];

export const AUDIO_LIBRARY = [
  {
    id: '1',
    title: 'Autoconfiança',
    description: 'Reconecte-se com sua força interior',
    duration: '12 min',
    category: 'confidence' as const,
    url: '/audio/confidence.mp3',
  },
  {
    id: '2',
    title: 'Controle da Ansiedade',
    description: 'Técnicas para acalmar a mente agitada',
    duration: '15 min',
    category: 'anxiety' as const,
    url: '/audio/anxiety.mp3',
  },
  {
    id: '3',
    title: 'Controle de Ciúmes',
    description: 'Transforme insegurança em confiança',
    duration: '18 min',
    category: 'jealousy' as const,
    url: '/audio/jealousy.mp3',
  },
  {
    id: '4',
    title: 'Clarity Boost Pós-Término',
    description: 'Encontre clareza após o fim de um relacionamento',
    duration: '20 min',
    category: 'clarity' as const,
    url: '/audio/clarity.mp3',
  },
  {
    id: '5',
    title: 'Reaproximação para Casais',
    description: 'Reconstrua a conexão emocional',
    duration: '16 min',
    category: 'reconnection' as const,
    url: '/audio/reconnection.mp3',
  },
];

export const SOS_PROMPTS = {
  single: {
    rejection: 'Você está lidando com rejeição. Vamos trabalhar isso juntos, com calma e clareza.',
    anxiety: 'Sua ansiedade afetiva está alta. Vou te guiar para um lugar mais seguro.',
    impulse: 'Você está prestes a agir por impulso. Vamos pausar e pensar com clareza.',
    abandonment: 'O medo de abandono está presente. Vamos entender isso profundamente.',
  },
  couple: {
    fight: 'Vocês estão em conflito. Vou ajudar a transformar isso em conexão.',
    communication: 'A comunicação está difícil. Vamos encontrar as palavras certas.',
    jealousy: 'O ciúme está presente. Vamos trabalhar a raiz disso.',
    distance: 'Há distância emocional. Vou guiar a reaproximação.',
  },
};

export const BREATHING_EXERCISE = {
  title: 'Respiração 4-7-8',
  steps: [
    'Inspire profundamente pelo nariz contando até 4',
    'Segure a respiração contando até 7',
    'Expire lentamente pela boca contando até 8',
    'Repita 4 vezes',
  ],
  duration: 90, // segundos
};
