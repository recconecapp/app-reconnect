'use client';

import { useState } from 'react';
import { UserMode } from '@/lib/types';
import { Heart, Users, ArrowRight, Brain, AlertCircle, BookOpen, Sparkles, TrendingUp, MessageCircle, CheckCircle, Play, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analyzeEmotionalState, generateMessageVariations, getSOSGuidance } from '@/lib/ai-service';

export default function Home() {
  const [step, setStep] = useState<'welcome' | 'onboarding' | 'app'>('welcome');
  const [userMode, setUserMode] = useState<UserMode | null>(null);
  const [onboardingData, setOnboardingData] = useState<any>({});

  if (step === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A2A] to-[#0A0A0A]">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-1000">
          <div className="space-y-6">
            <div className="inline-block p-6 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm animate-pulse">
              <Heart className="w-20 h-20 text-rose-400" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Reconnect
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed">
              21 dias para restaurar sua autoconfiança<br />e reconectar com quem importa
            </p>
          </div>

          <div className="space-y-6 pt-8">
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed">
                Aqui você recupera sua força emocional. Um espaço seguro para entender seus sentimentos, 
                superar padrões e construir relacionamentos saudáveis.
              </p>
            </div>
            
            <Button
              onClick={() => setStep('onboarding')}
              className="group bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-12 py-8 text-xl rounded-3xl transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Começar jornada de 21 dias
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-400" />
                <span className="text-sm text-gray-400">Premium</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <span className="text-sm text-gray-400">R$ 79,90/mês</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'onboarding') {
    return <OnboardingFlow onComplete={(data) => {
      setOnboardingData(data);
      setUserMode(data.mode);
      setStep('app');
    }} />;
  }

  return <MainApp mode={userMode!} onboardingData={onboardingData} />;
}

// Onboarding Flow
function OnboardingFlow({ onComplete }: { onComplete: (data: any) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<any>({
    mode: null,
    goal: null,
    urgency: null,
    emotions: [],
    age: null,
  });

  const handleNext = () => {
    if (currentStep === 5) {
      onComplete(data);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A2A] to-[#0A0A0A]">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-700">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Passo {currentStep} de 5</span>
            <span className="text-rose-400">{Math.round((currentStep / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rose-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Modo */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-white">Como você está agora?</h2>
              <p className="text-gray-400 text-lg">Escolha o que melhor representa seu momento</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <button
                onClick={() => {
                  setData({ ...data, mode: 'single' });
                  handleNext();
                }}
                className="group p-8 bg-gradient-to-br from-rose-500/10 to-purple-500/10 hover:from-rose-500/20 hover:to-purple-500/20 border border-rose-500/20 hover:border-rose-500/40 rounded-3xl transition-all duration-300 hover:scale-105 text-left"
              >
                <Heart className="w-12 h-12 text-rose-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Solteiro(a)</h3>
                <p className="text-gray-400 leading-relaxed">
                  Navegue rejeição, ansiedade afetiva e construa autoconfiança para relacionamentos saudáveis.
                </p>
              </button>

              <button
                onClick={() => {
                  setData({ ...data, mode: 'couple' });
                  handleNext();
                }}
                className="group p-8 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border border-purple-500/20 hover:border-purple-500/40 rounded-3xl transition-all duration-300 hover:scale-105 text-left"
              >
                <Users className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Em relacionamento</h3>
                <p className="text-gray-400 leading-relaxed">
                  Melhore comunicação, resolva conflitos e fortaleça a conexão emocional com seu parceiro(a).
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Objetivo */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-white">Qual seu objetivo principal?</h2>
              <p className="text-gray-400 text-lg">Escolha o que mais ressoa com você agora</p>
            </div>

            <div className="grid gap-4 pt-4">
              {(data.mode === 'single' ? [
                { id: 'reconquest', label: 'Reconquistar alguém', icon: Heart },
                { id: 'overcome', label: 'Superar um término', icon: TrendingUp },
                { id: 'confidence', label: 'Recuperar autoconfiança', icon: Sparkles },
                { id: 'learn', label: 'Aprender a iniciar relacionamentos', icon: MessageCircle },
              ] : [
                { id: 'communication', label: 'Melhorar comunicação', icon: MessageCircle },
                { id: 'reconnect', label: 'Reconectar emocionalmente', icon: Heart },
                { id: 'conflicts', label: 'Resolver conflitos recorrentes', icon: AlertCircle },
                { id: 'jealousy', label: 'Controlar ciúmes', icon: Brain },
              ]).map((goal) => {
                const IconComponent = goal.icon;
                return (
                  <button
                    key={goal.id}
                    onClick={() => {
                      setData({ ...data, goal: goal.id });
                      handleNext();
                    }}
                    className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 rounded-2xl transition-all duration-300 hover:scale-105 text-left flex items-center gap-4"
                  >
                    <IconComponent className="w-8 h-8 text-rose-400" />
                    <span className="text-lg text-white">{goal.label}</span>
                    <ArrowRight className="ml-auto w-5 h-5 text-gray-500 group-hover:text-rose-400 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Urgência */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-white">Qual seu nível de urgência?</h2>
              <p className="text-gray-400 text-lg">Isso nos ajuda a personalizar sua jornada</p>
            </div>

            <div className="grid gap-4 pt-4">
              {[
                { id: 'high', label: 'Alta - Preciso de ajuda agora', color: 'from-red-500/20 to-orange-500/20 border-red-500/40' },
                { id: 'medium', label: 'Média - Quero melhorar gradualmente', color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/40' },
                { id: 'low', label: 'Baixa - Estou explorando', color: 'from-green-500/20 to-emerald-500/20 border-green-500/40' },
              ].map((urgency) => (
                <button
                  key={urgency.id}
                  onClick={() => {
                    setData({ ...data, urgency: urgency.id });
                    handleNext();
                  }}
                  className={`group p-6 bg-gradient-to-br ${urgency.color} hover:scale-105 rounded-2xl transition-all duration-300 text-left border`}
                >
                  <span className="text-lg text-white">{urgency.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Emoções */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-white">Como você se sente?</h2>
              <p className="text-gray-400 text-lg">Selecione todas as emoções que ressoam com você</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {[
                { id: 'anxious', label: 'Ansioso(a)', emoji: '😰' },
                { id: 'sad', label: 'Triste', emoji: '😢' },
                { id: 'angry', label: 'Com raiva', emoji: '😠' },
                { id: 'confused', label: 'Confuso(a)', emoji: '😕' },
                { id: 'hopeful', label: 'Esperançoso(a)', emoji: '🌟' },
                { id: 'overwhelmed', label: 'Sobrecarregado(a)', emoji: '😵' },
                { id: 'lonely', label: 'Sozinho(a)', emoji: '😔' },
                { id: 'frustrated', label: 'Frustrado(a)', emoji: '😤' },
                { id: 'insecure', label: 'Inseguro(a)', emoji: '😰' },
              ].map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => {
                    const emotions = data.emotions.includes(emotion.id)
                      ? data.emotions.filter((e: string) => e !== emotion.id)
                      : [...data.emotions, emotion.id];
                    setData({ ...data, emotions });
                  }}
                  className={`p-6 rounded-2xl transition-all duration-300 border-2 ${
                    data.emotions.includes(emotion.id)
                      ? 'bg-gradient-to-br from-rose-500/20 to-purple-500/20 border-rose-500/60'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-4xl mb-2">{emotion.emoji}</div>
                  <div className="text-sm text-white">{emotion.label}</div>
                </button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={data.emotions.length === 0}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white py-6 text-lg rounded-2xl disabled:opacity-50"
            >
              Continuar
            </Button>
          </div>
        )}

        {/* Step 5: Idade */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-white">Qual sua faixa etária?</h2>
              <p className="text-gray-400 text-lg">Última pergunta para personalizar sua experiência</p>
            </div>

            <div className="grid gap-4 pt-4">
              {[
                { id: '22-30', label: '22-30 anos' },
                { id: '31-37', label: '31-37 anos' },
                { id: '38-44', label: '38-44 anos' },
              ].map((age) => (
                <button
                  key={age.id}
                  onClick={() => {
                    setData({ ...data, age: age.id });
                    handleNext();
                  }}
                  className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 rounded-2xl transition-all duration-300 hover:scale-105 text-left"
                >
                  <span className="text-lg text-white">{age.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main App
function MainApp({ mode, onboardingData }: { mode: UserMode; onboardingData: any }) {
  const [activeTab, setActiveTab] = useState<'home' | 'journey' | 'coach' | 'tools' | 'profile'>('home');

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0A0A0A]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-xl">
              <Heart className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Reconnect</h1>
              <p className="text-xs text-gray-500">
                {mode === 'single' ? 'Modo Solteiro' : 'Modo Casal'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-full border border-rose-500/30">
              <p className="text-xs text-rose-400 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Premium
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {activeTab === 'home' && <HomeTab mode={mode} onboardingData={onboardingData} onNavigate={setActiveTab} />}
        {activeTab === 'journey' && <JourneyTab mode={mode} onboardingData={onboardingData} />}
        {activeTab === 'coach' && <CoachTab mode={mode} onboardingData={onboardingData} />}
        {activeTab === 'tools' && <ToolsTab mode={mode} onboardingData={onboardingData} />}
        {activeTab === 'profile' && <ProfileTab mode={mode} onboardingData={onboardingData} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/98 backdrop-blur-xl border-t border-white/5 safe-area-bottom">
        <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-around">
          <NavButton icon={Heart} label="Início" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavButton icon={BookOpen} label="Jornada" active={activeTab === 'journey'} onClick={() => setActiveTab('journey')} />
          <NavButton icon={MessageCircle} label="Coach" active={activeTab === 'coach'} onClick={() => setActiveTab('coach')} />
          <NavButton icon={Sparkles} label="Ferramentas" active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} />
          <NavButton icon={Users} label="Perfil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-br from-rose-500/20 to-purple-500/20 text-rose-400' 
          : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

// Home Tab
function HomeTab({ mode, onboardingData, onNavigate }: any) {
  const [checkInMood, setCheckInMood] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Bem-vindo(a) de volta</h2>
        <p className="text-gray-400 text-lg">Como você está se sentindo hoje?</p>
      </div>

      {/* Check-in diário */}
      <div className="bg-gradient-to-br from-rose-500/5 to-purple-500/5 border border-white/5 rounded-3xl p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Check-in emocional</h3>
          {checkInMood && <CheckCircle className="w-6 h-6 text-green-400" />}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { emoji: '😌', label: 'Calmo', value: 'calm' },
            { emoji: '😰', label: 'Ansioso', value: 'anxious' },
            { emoji: '😢', label: 'Triste', value: 'sad' },
            { emoji: '😠', label: 'Irritado', value: 'angry' },
            { emoji: '😕', label: 'Confuso', value: 'confused' },
            { emoji: '🌟', label: 'Esperançoso', value: 'hopeful' },
            { emoji: '😵', label: 'Sobrecarregado', value: 'overwhelmed' },
            { emoji: '✨', label: 'Bem', value: 'peaceful' },
          ].map((mood) => (
            <button
              key={mood.value}
              onClick={() => setCheckInMood(mood.value)}
              className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 ${
                checkInMood === mood.value
                  ? 'bg-gradient-to-br from-rose-500/30 to-purple-500/30 border-2 border-rose-500/60'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="text-3xl mb-1">{mood.emoji}</div>
              <div className="text-xs text-gray-400">{mood.label}</div>
            </button>
          ))}
        </div>
        {checkInMood && (
          <div className="pt-4 animate-in fade-in duration-500">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-rose-400">Insight:</strong> {
                  checkInMood === 'anxious' ? 'Sua ansiedade está te dizendo que algo precisa de atenção. Respire fundo e vamos explorar isso juntos.' :
                  checkInMood === 'sad' ? 'A tristeza é um convite para cuidar de você. Que tal começar com algo pequeno que te faça bem?' :
                  checkInMood === 'calm' ? 'Que bom ver você em paz. Aproveite esse momento para fortalecer sua base emocional.' :
                  'Reconhecer como você se sente já é um grande passo. Vamos trabalhar isso juntos.'
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Jornada de 21 dias - Destaque */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-3xl p-6 md:p-8 space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Jornada de 21 Dias</h3>
            <p className="text-gray-400">Seu caminho para a transformação emocional</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-400">Dia 1</div>
            <div className="text-sm text-gray-500">de 21</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progresso geral</span>
            <span className="text-indigo-400 font-medium">5%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full w-[5%] transition-all duration-500"></div>
          </div>
        </div>

        <Button
          onClick={() => onNavigate('journey')}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
        >
          Começar módulo de hoje
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Acesso rápido */}
      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => onNavigate('coach')}
          className="group p-6 bg-gradient-to-br from-rose-500/10 to-purple-500/10 hover:from-rose-500/20 hover:to-purple-500/20 border border-rose-500/20 rounded-3xl transition-all duration-300 hover:scale-105 text-left space-y-3"
        >
          <MessageCircle className="w-10 h-10 text-rose-400" />
          <h3 className="text-xl font-bold text-white">Coach Reconnect</h3>
          <p className="text-gray-400 text-sm">
            Converse com a IA sobre seus sentimentos e receba orientação personalizada
          </p>
        </button>

        <button
          onClick={() => onNavigate('tools')}
          className="group p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border border-purple-500/20 rounded-3xl transition-all duration-300 hover:scale-105 text-left space-y-3"
        >
          <Sparkles className="w-10 h-10 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Ferramentas Rápidas</h3>
          <p className="text-gray-400 text-sm">
            Templates de mensagens, checklists e recursos para situações específicas
          </p>
        </button>
      </div>

      {/* Métricas de progresso */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-5">
        <h3 className="text-xl font-semibold text-white">Seu progresso</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Autoconfiança', value: 45, color: 'from-rose-500 to-pink-600' },
            { label: 'Comunicação', value: 60, color: 'from-indigo-500 to-purple-600' },
            { label: 'Bem-estar', value: 55, color: 'from-emerald-500 to-teal-600' },
          ].map((metric) => (
            <div key={metric.label} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{metric.label}</span>
                <span className="text-lg font-bold text-white">{metric.value}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Journey Tab - Jornada de 21 dias
function JourneyTab({ mode, onboardingData }: any) {
  const [currentDay, setCurrentDay] = useState(1);
  const [showModule, setShowModule] = useState(false);

  const modules = [
    {
      day: 1,
      title: 'Reconhecendo seus padrões emocionais',
      objective: 'Identificar os gatilhos que afetam suas emoções e comportamentos',
      duration: '12 min',
      type: 'Autoconhecimento',
    },
    {
      day: 2,
      title: 'A arte de pausar antes de agir',
      objective: 'Desenvolver o hábito de respirar antes de responder impulsivamente',
      duration: '10 min',
      type: 'Controle emocional',
    },
    {
      day: 3,
      title: 'Comunicação sem julgamento',
      objective: 'Aprender a expressar necessidades sem atacar ou se defender',
      duration: '15 min',
      type: 'Comunicação',
    },
    // ... mais módulos
  ];

  if (showModule) {
    return <ModuleView day={currentDay} mode={mode} onBack={() => setShowModule(false)} />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Jornada de 21 Dias</h2>
        <p className="text-gray-400 text-lg">Transformação emocional passo a passo</p>
      </div>

      {/* Progresso geral */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-3xl p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">Dia {currentDay} de 21</h3>
            <p className="text-gray-400 mt-1">Continue sua jornada</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {Math.round((currentDay / 21) * 100)}%
            </div>
            <div className="text-sm text-gray-500">completo</div>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(currentDay / 21) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Módulos */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Seus módulos</h3>
        {modules.map((module) => (
          <button
            key={module.day}
            onClick={() => {
              setCurrentDay(module.day);
              setShowModule(true);
            }}
            disabled={module.day > currentDay}
            className={`w-full p-6 rounded-3xl transition-all duration-300 text-left ${
              module.day === currentDay
                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/60 hover:scale-105'
                : module.day < currentDay
                ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                : 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                module.day === currentDay
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  : module.day < currentDay
                  ? 'bg-green-500/20'
                  : 'bg-white/10'
              }`}>
                {module.day < currentDay ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <span className="text-xl font-bold text-white">{module.day}</span>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{module.duration}</span>
                </div>
                <p className="text-sm text-gray-400">{module.objective}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full">
                    {module.type}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Module View
function ModuleView({ day, mode, onBack }: any) {
  const [step, setStep] = useState<'intro' | 'content' | 'exercise' | 'complete'>('intro');

  const moduleData = {
    title: 'Reconhecendo seus padrões emocionais',
    objective: 'Identificar os gatilhos que afetam suas emoções e comportamentos',
    content: `Todos nós temos padrões emocionais - formas automáticas de reagir a certas situações. 
    \nQuando alguém não responde sua mensagem, você sente ansiedade? Quando há um conflito, você ataca ou se fecha? Esses são padrões.
\nO primeiro passo para mudança é reconhecer esses padrões sem julgamento. Não é sobre ser \"bom\" ou \"ruim\" - é sobre entender como você funciona.
\nHoje, você vai identificar 3 padrões que se repetem na sua vida emocional.`,
    exercise: {
      title: 'Exercício: Mapeando seus padrões',
      steps: [
        'Pense em 3 situações recentes que te deixaram emocionalmente abalado(a)',
        'Para cada uma, identifique: O que aconteceu? Como você se sentiu? Como você reagiu?',
        'Procure semelhanças: há um padrão de gatilho? De emoção? De reação?',
        'Escreva seus 3 padrões principais no diário',
        'Para cada padrão, pergunte: \"Isso me serve? Isso me aproxima de quem eu quero ser?\"',
      ],
      duration: '10 min',
    },
    audioScript: `Olá. Vamos começar o dia 1 da sua jornada. Encontre um lugar confortável e respire fundo.
\nHoje vamos falar sobre padrões emocionais. Aquelas formas automáticas que você reage quando algo te afeta.
\nNão estamos aqui para julgar. Estamos aqui para entender. Porque só quando você entende como funciona, pode escolher mudar.
\nVamos começar?`,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-180" />
        </button>
        <div>
          <div className="text-sm text-gray-500">Dia {day} de 21</div>
          <h2 className="text-2xl font-bold text-white">{moduleData.title}</h2>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        {['intro', 'content', 'exercise', 'complete'].map((s, i) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full transition-all duration-500 ${
              ['intro', 'content', 'exercise', 'complete'].indexOf(step) >= i
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Intro */}
      {step === 'intro' && (
        <div className="space-y-6 animate-in fade-in duration-700">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-3xl p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white">Objetivo de hoje</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{moduleData.objective}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-indigo-400" />
              <h4 className="font-semibold text-white">Áudio de introdução</h4>
            </div>
            <p className="text-sm text-gray-400">3 minutos • Narração guiada</p>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-2xl">
              <Play className="w-5 h-5 mr-2" />
              Reproduzir áudio
            </Button>
          </div>

          <Button
            onClick={() => setStep('content')}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-6 text-lg rounded-2xl"
          >
            Continuar lendo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Content */}
      {step === 'content' && (
        <div className="space-y-6 animate-in fade-in duration-700">
          <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="prose prose-invert max-w-none">
              {moduleData.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-300 text-lg leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setStep('exercise')}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6 text-lg rounded-2xl"
          >
            Ir para o exercício
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Exercise */}
      {step === 'exercise' && (
        <div className="space-y-6 animate-in fade-in duration-700">
          <div className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 border border-rose-500/30 rounded-3xl p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{moduleData.exercise.title}</h3>
              <span className="text-sm text-gray-400">{moduleData.exercise.duration}</span>
            </div>
            
            <div className="space-y-4">
              {moduleData.exercise.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <h4 className="font-semibold text-white">Espaço para reflexão</h4>
            <textarea
              placeholder="Escreva suas reflexões aqui..."
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
            />
          </div>

          <Button
            onClick={() => setStep('complete')}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white py-6 text-lg rounded-2xl"
          >
            Concluir módulo
            <CheckCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Complete */}
      {step === 'complete' && (
        <div className="space-y-6 animate-in fade-in duration-700 text-center py-12">
          <div className="inline-block p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full">
            <CheckCircle className="w-20 h-20 text-green-400" />
          </div>
          <h3 className="text-3xl font-bold text-white">Módulo concluído!</h3>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Você deu mais um passo importante na sua jornada de transformação emocional.
          </p>
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-2xl"
          >
            Voltar para jornada
          </Button>
        </div>
      )}
    </div>
  );
}

// Coach Tab
function CoachTab({ mode, onboardingData }: any) {
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: 'Olá. Estou aqui para te ouvir e te ajudar. Como você está se sentindo agora?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseType, setResponseType] = useState<'empathetic' | 'practical' | 'coaching'>('empathetic');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await analyzeEmotionalState(input, mode, onboardingData);
      
      const assistantMessage = {
        role: 'assistant',
        content: response.guidance,
        variations: response.variations,
        actions: response.actions,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao analisar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Coach Reconnect</h2>
        <p className="text-gray-400 text-lg">Converse livremente, sem julgamentos</p>
      </div>

      {/* Tipo de resposta */}
      <div className="flex items-center gap-3 justify-center">
        <span className="text-sm text-gray-500">Tom:</span>
        {[
          { value: 'empathetic', label: 'Empático' },
          { value: 'practical', label: 'Prático' },
          { value: 'coaching', label: 'Desafiador' },
        ].map((type) => (
          <button
            key={type.value}
            onClick={() => setResponseType(type.value as any)}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              responseType === type.value
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 min-h-[500px] max-h-[600px] overflow-y-auto">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-rose-500 to-purple-600 text-white'
                  : 'bg-white/10 text-gray-300'
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>
              {message.actions && (
                <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
                  <p className="text-sm font-semibold">Ações sugeridas:</p>
                  {message.actions.map((action: string, j: number) => (
                    <p key={j} className="text-sm opacity-90">• {action}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escreva o que você está sentindo..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl disabled:opacity-50"
        >
          Enviar
        </Button>
      </div>

      {/* Exemplos rápidos */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500 text-center">Ou escolha um exemplo:</p>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'Ele não responde minhas mensagens',
            'Quero terminar, mas tenho medo de ficar sozinho(a)',
            'Me ajuda a pedir desculpas',
            'Como reacender o desejo no meu relacionamento?',
          ].map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left text-sm text-gray-400 hover:text-gray-300 transition-all"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tools Tab
function ToolsTab({ mode, onboardingData }: any) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  if (selectedTool === 'messages') {
    return <MessageTemplates mode={mode} onBack={() => setSelectedTool(null)} />;
  }

  if (selectedTool === 'checklist') {
    return <HealthyConversationChecklist onBack={() => setSelectedTool(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Ferramentas Rápidas</h2>
        <p className="text-gray-400 text-lg">Recursos práticos para situações específicas</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => setSelectedTool('messages')}
          className="group p-8 bg-gradient-to-br from-rose-500/10 to-purple-500/10 hover:from-rose-500/20 hover:to-purple-500/20 border border-rose-500/20 rounded-3xl transition-all duration-300 hover:scale-105 text-left space-y-4"
        >
          <MessageCircle className="w-12 h-12 text-rose-400" />
          <h3 className="text-2xl font-bold text-white">Mensagem em 30s</h3>
          <p className="text-gray-400 leading-relaxed">
            Templates prontos para reconquista, desculpas, limites e mais
          </p>
          <div className="flex items-center gap-2 text-sm text-rose-400">
            <span>60+ templates</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button
          onClick={() => setSelectedTool('checklist')}
          className="group p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-indigo-500/20 border border-indigo-500/20 rounded-3xl transition-all duration-300 hover:scale-105 text-left space-y-4"
        >
          <CheckCircle className="w-12 h-12 text-indigo-400" />
          <h3 className="text-2xl font-bold text-white">Checklist de Conversa</h3>
          <p className="text-gray-400 leading-relaxed">
            7 itens essenciais para uma comunicação saudável
          </p>
          <div className="flex items-center gap-2 text-sm text-indigo-400">
            <span>Guia completo</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button
          className="group p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/20 rounded-3xl transition-all duration-300 hover:scale-105 text-left space-y-4"
        >
          <Brain className="w-12 h-12 text-emerald-400" />
          <h3 className="text-2xl font-bold text-white">Simulador de Conversa</h3>
          <p className="text-gray-400 leading-relaxed">
            Pratique conversas difíceis com IA antes de ter na vida real
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <span>Role-play interativo</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button
          className="group p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border border-orange-500/20 rounded-3xl transition-all duration-300 hover:scale-105 text-left space-y-4"
        >
          <Sparkles className="w-12 h-12 text-orange-400" />
          <h3 className="text-2xl font-bold text-white">Scripts de Confrontação</h3>
          <p className="text-gray-400 leading-relaxed">
            Como estabelecer limites e confrontar de forma saudável
          </p>
          <div className="flex items-center gap-2 text-sm text-orange-400">
            <span>Guias passo a passo</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
}

// Message Templates
function MessageTemplates({ mode, onBack }: any) {
  const [category, setCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'apology', label: 'Desculpas' },
    { id: 'boundaries', label: 'Limites' },
    { id: 'reconnect', label: 'Reconexão' },
    { id: 'breakup', label: 'Término' },
    { id: 'flirt', label: 'Flerte' },
  ];

  const templates = [
    {
      id: 1,
      category: 'apology',
      title: 'Pedido de desculpas sincero',
      preview: 'Eu errei e reconheço isso...',
      variations: [
        { tone: 'apologetic', text: 'Eu errei e reconheço isso. Não tenho desculpas para o que fiz, mas quero que você saiba que estou genuinamente arrependido(a) e trabalhando para ser melhor.' },
        { tone: 'direct', text: 'Errei. Ponto. Não vou tentar justificar. Só quero que você saiba que estou trabalhando nisso e não vai acontecer de novo.' },
        { tone: 'reflective', text: 'Passei muito tempo pensando no que aconteceu. Eu errei, e isso me fez perceber coisas sobre mim que preciso mudar. Desculpa de verdade.' },
      ],
    },
    {
      id: 2,
      category: 'boundaries',
      title: 'Estabelecendo limites com respeito',
      preview: 'Preciso te dizer algo importante...',
      variations: [
        { tone: 'assertive', text: 'Preciso te dizer algo importante: isso que está acontecendo não está funcionando para mim. Eu te respeito, mas preciso que você respeite meu espaço também.' },
        { tone: 'gentle', text: 'Quero conversar sobre algo que está me incomodando. Não é sobre você ser ruim, é sobre eu precisar de um limite aqui. Podemos encontrar um jeito que funcione para nós dois?' },
        { tone: 'confident', text: 'Eu não vou mais aceitar isso. Não é sobre brigar, é sobre eu me respeitar. Espero que você entenda.' },
      ],
    },
    // ... mais templates
  ];

  if (selectedTemplate) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedTemplate(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          Voltar
        </button>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-bold text-white">{selectedTemplate.title}</h3>
            <p className="text-gray-400">Escolha o tom que mais combina com você</p>
          </div>

          {selectedTemplate.variations.map((variation: any, i: number) => (
            <div
              key={i}
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full capitalize">
                  {variation.tone}
                </span>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  Copiar
                </button>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{variation.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowRight className="w-5 h-5 rotate-180" />
        Voltar
      </button>

      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Templates de Mensagens</h2>
        <p className="text-gray-400 text-lg">60+ mensagens prontas para qualquer situação</p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              category === cat.id
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates */}
      <div className="grid md:grid-cols-2 gap-4">
        {templates
          .filter((t) => category === 'all' || t.category === category)
          .map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 hover:scale-105 text-left space-y-3"
            >
              <h4 className="text-lg font-semibold text-white">{template.title}</h4>
              <p className="text-sm text-gray-400 line-clamp-2">{template.preview}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{template.variations.length} variações</span>
                <ArrowRight className="w-4 h-4 text-rose-400" />
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}

// Healthy Conversation Checklist
function HealthyConversationChecklist({ onBack }: any) {
  const [checked, setChecked] = useState<number[]>([]);

  const items = [
    {
      id: 1,
      title: 'Escolhi o momento certo',
      description: 'Ambos estão calmos e disponíveis para conversar',
    },
    {
      id: 2,
      title: 'Vou falar sobre mim, não atacar',
      description: 'Uso \"eu sinto\" em vez de \"você sempre\"',
    },
    {
      id: 3,
      title: 'Estou disposto(a) a ouvir',
      description: 'Não só esperar minha vez de falar',
    },
    {
      id: 4,
      title: 'Vou evitar generalizações',
      description: 'Sem \"sempre\" e \"nunca\"',
    },
    {
      id: 5,
      title: 'Tenho clareza do que preciso',
      description: 'Sei o que quero comunicar',
    },
    {
      id: 6,
      title: 'Vou pausar se ficar muito intenso',
      description: 'Respiro antes de reagir',
    },
    {
      id: 7,
      title: 'Busco solução, não culpados',
      description: 'Foco em como melhorar, não em quem errou',
    },
  ];

  const toggleCheck = (id: number) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowRight className="w-5 h-5 rotate-180" />
        Voltar
      </button>

      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Checklist de Conversa Saudável</h2>
        <p className="text-gray-400 text-lg">7 itens essenciais antes de uma conversa importante</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-3xl p-6 space-y-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className={`w-full p-5 rounded-2xl transition-all duration-300 text-left ${
              checked.includes(item.id)
                ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/60'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  checked.includes(item.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/30'
                }`}
              >
                {checked.includes(item.id) && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-500/30">
          <p className="text-white">
            <span className="text-3xl font-bold text-indigo-400">{checked.length}</span>
            <span className="text-gray-400"> de {items.length} itens</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Profile Tab
function ProfileTab({ mode, onboardingData }: any) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-block p-6 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-full">
          <Users className="w-16 h-16 text-rose-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Seu Perfil</h2>
        <p className="text-gray-400 text-lg">Acompanhe sua evolução emocional</p>
      </div>

      {/* Métricas principais */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Autoconfiança', value: 45, change: '+12%', color: 'from-rose-500 to-pink-600' },
          { label: 'Comunicação', value: 60, change: '+18%', color: 'from-indigo-500 to-purple-600' },
          { label: 'Bem-estar', value: 55, change: '+15%', color: 'from-emerald-500 to-teal-600' },
        ].map((metric) => (
          <div key={metric.label} className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{metric.label}</span>
              <span className="text-xs text-green-400">{metric.change}</span>
            </div>
            <div className="text-4xl font-bold text-white">{metric.value}%</div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Conquistas */}
      <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-white/5 rounded-3xl p-8 space-y-6">
        <h3 className="text-2xl font-bold text-white">Conquistas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '🔥', title: 'Sequência de 7 dias', unlocked: true },
            { icon: '💪', title: 'Primeira semana completa', unlocked: true },
            { icon: '🎯', title: '10 exercícios concluídos', unlocked: false },
            { icon: '⭐', title: 'Jornada de 21 dias', unlocked: false },
          ].map((achievement, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/40'
                  : 'bg-white/5 border-white/10 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{achievement.icon}</span>
                <span className="text-white font-medium">{achievement.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configurações */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        <h3 className="text-2xl font-bold text-white">Configurações</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
            <span className="text-white">Modo atual</span>
            <span className="text-gray-400 capitalize">{mode === 'single' ? 'Solteiro' : 'Casal'}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
            <span className="text-white">Notificações</span>
            <span className="text-green-400">Ativadas</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
            <span className="text-white">Assinatura</span>
            <span className="text-rose-400">Premium • R$ 79,90/mês</span>
          </div>
        </div>
      </div>
    </div>
  );
}