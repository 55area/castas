export interface Question {
  id: number;
  dimensionId: 'a' | 'b' | 'c' | 'd' | 'e';
  text: {
    'pt-BR': string;
    en: string;
    es: string;
  };
}

export const questions: Question[] = [
  // Dimension A - Hostilidade Emocional
  {
    id: 1,
    dimensionId: 'a',
    text: {
      'pt-BR': 'Sinto irritação imediata quando ouço alguém defender o outro grupo político.',
      en: 'I feel immediate irritation when I hear someone defending the other political group.',
      es: 'Siento irritación inmediata cuando escucho a alguien defender al otro grupo político.',
    },
  },
  {
    id: 2,
    dimensionId: 'a',
    text: {
      'pt-BR': 'Sinto desconforto ou "tensão" ao ouvir argumentos do outro grupo.',
      en: 'I feel discomfort or "tension" when hearing arguments from the other group.',
      es: 'Siento incomodidad o "tensión" al escuchar argumentos del otro grupo.',
    },
  },
  {
    id: 3,
    dimensionId: 'a',
    text: {
      'pt-BR': 'É difícil para mim manter a calma ao discutir política com alguém do outro grupo.',
      en: 'It is difficult for me to stay calm when discussing politics with someone from the other group.',
      es: 'Es difícil para mí mantener la calma al discutir política con alguien del otro grupo.',
    },
  },
  {
    id: 4,
    dimensionId: 'a',
    text: {
      'pt-BR': 'Quando o outro grupo perde uma disputa politica, sinto um certo alívio.',
      en: 'When the other group loses a political dispute, I feel some relief.',
      es: 'Cuando el otro grupo pierde una disputa política, siento cierto alivio.',
    },
  },
  {
    id: 5,
    dimensionId: 'a',
    text: {
      'pt-BR': 'Sinto pouca empatia pelas dificuldades enfrentadas pelo outro grupo.',
      en: 'I feel little empathy for the difficulties faced by the other group.',
      es: 'Siento poca empatía por las dificultades enfrentadas por el otro grupo.',
    },
  },
  {
    id: 6,
    dimensionId: 'a',
    text: {
      'pt-BR': 'O sucesso político do outro grupo me preocupa ou me causa indignação.',
      en: 'The political success of the other group worries me or causes me indignation.',
      es: 'El éxito político del otro grupo me preocupa o me causa indignación.',
    },
  },
  {
    id: 7,
    dimensionId: 'a',
    text: {
      'pt-BR': 'Tenho tendência a desconfiar automaticamente de qualquer informação vinda do outro grupo.',
      en: 'I tend to automatically distrust any information coming from the other group.',
      es: 'Tiendo a desconfiar automáticamente de cualquier información que venga del otro grupo.',
    },
  },
  {
    id: 8,
    dimensionId: 'a',
    text: {
      'pt-BR': 'Evito me envolver em conversas ou discussões políticas com o outro grupo para não perder a paciência.',
      en: 'I avoid getting involved in conversations or political discussions with the other group so as not to lose patience.',
      es: 'Evito involucrarme en conversaciones o discusiones políticas con el otro grupo para no perder la paciencia.',
    },
  },
  // Dimension B - Desvalorização Moral
  {
    id: 9,
    dimensionId: 'b',
    text: {
      'pt-BR': 'Acredito que o outro grupo é, na maioria das vezes, ignorante ou mal-informado.',
      en: 'I believe the other group is, most of the time, ignorant or misinformed.',
      es: 'Creo que el otro grupo es, la mayoría de las veces, ignorante o mal informado.',
    },
  },
  {
    id: 10,
    dimensionId: 'b',
    text: {
      'pt-BR': 'Sinto que o outro grupo age, em grande parte, por má-fé ou egoísmo.',
      en: 'I feel that the other group acts, to a large extent, in bad faith or out of selfishness.',
      es: 'Siento que el otro grupo actúa, en gran parte, por mala fe o egoísmo.',
    },
  },
  {
    id: 11,
    dimensionId: 'b',
    text: {
      'pt-BR': 'Acho que o outro grupo representa um risco real para o futuro do país.',
      en: 'I think the other group represents a real risk to the country\'s future.',
      es: 'Creo que el otro grupo representa un riesgo real para el futuro del país.',
    },
  },
  {
    id: 12,
    dimensionId: 'b',
    text: {
      'pt-BR': 'Acredito que o outro grupo costuma manipular ou distorcer fatos para ganhar discussões.',
      en: 'I believe the other group usually manipulates or distorts facts to win discussions.',
      es: 'Creo que el otro grupo suele manipular o distorsionar hechos para ganar discusiones.',
    },
  },
  {
    id: 13,
    dimensionId: 'b',
    text: {
      'pt-BR': 'Frequentemente, sinto que o outro grupo vive em uma "realidade paralela".',
      en: 'I frequently feel that the other group lives in a "parallel reality".',
      es: 'Frecuentemente, siento que el otro grupo vive en una "realidad paralela".',
    },
  },
  {
    id: 14,
    dimensionId: 'b',
    text: {
      'pt-BR': 'Considero que o outro grupo prioriza interesses próprios em vez do bem comum.',
      en: 'I consider that the other group prioritizes their own interests instead of the common good.',
      es: 'Considero que el otro grupo prioriza intereses propios en vez del bien común.',
    },
  },
  {
    id: 15,
    dimensionId: 'b',
    text: {
      'pt-BR': 'É muito difícil confiar nas verdadeiras intenções de quem faz parte do outro grupo.',
      en: 'It is very difficult to trust the true intentions of those who belong to the other group.',
      es: 'Es muy difícil confiar en las verdaderas intenciones de quienes forman parte del otro grupo.',
    },
  },
  {
    id: 16,
    dimensionId: 'b',
    text: {
      'pt-BR': 'Sinto que o outro grupo não entende, ou ignora, a realidade básica e os principais problemas do país.',
      en: 'I feel that the other group does not understand, or ignores, the basic reality and the main problems of the country.',
      es: 'Siento que el otro grupo no entiende, o ignora, la realidad básica y los principales problemas del país.',
    },
  },
  // Dimension C - Distanciamento Social
  {
    id: 17,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Eu evitaria cultivar uma amizade próxima com alguém que pertence ao outro grupo.',
      en: 'I would avoid cultivating a close friendship with someone who belongs to the other group.',
      es: 'Evitaría cultivar una amistad cercana con alguien que pertenece al otro grupo.',
    },
  },
  {
    id: 18,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Eu me sentiria desconfortável tendo alguém do outro grupo como vizinho imediato.',
      en: 'I would feel uncomfortable having someone from the other group as an immediate neighbor.',
      es: 'Me sentiría incómodo teniendo a alguien del otro grupo como vecino inmediato.',
    },
  },
  {
    id: 19,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Eu preferiria não trabalhar diretamente sob a liderança de alguém do outro grupo.',
      en: 'I would prefer not to work directly under the leadership of someone from the other group.',
      es: 'Preferiría no trabajar directamente bajo el liderazgo de alguien del otro grupo.',
    },
  },
  {
    id: 20,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Eu me sentiria desconfortável se um familiar próximo se casasse com alguém do outro grupo.',
      en: 'I would feel uncomfortable if a close relative married someone from the other group.',
      es: 'Me sentiría incómodo si un familiar cercano se casara con alguien del otro grupo.',
    },
  },
  {
    id: 21,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Prefiro conviver apenas em ambientes (físicos ou digitais) onde a maioria pensa como eu e compartilha minhas opiniões políticas.',
      en: 'I prefer to socialize only in environments (physical or digital) where most people think like me and share my political opinions.',
      es: 'Prefiero convivir solo en ambientes (físicos o digitales) donde la mayoría piensa como yo y comparte mis opiniones políticas.',
    },
  },
  {
    id: 22,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Já deixei de frequentar locais ou eventos por causa de divergências políticas e da presença do outro grupo.',
      en: 'I have stopped going to places or events because of political disagreements and the presence of the other group.',
      es: 'He dejado de frecuentar lugares o eventos por causa de divergencias políticas y de la presencia del otro grupo.',
    },
  },
  {
    id: 23,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Às vezes evito expor minhas opiniões políticas reais quando estou perto do outro grupo para evitar conflitos.',
      en: 'Sometimes I avoid exposing my real political opinions when I am near the other group to avoid conflicts.',
      es: 'A veces evito exponer mis opiniones políticas reales cuando estoy cerca del otro grupo para evitar conflictos.',
    },
  },
  {
    id: 24,
    dimensionId: 'c',
    text: {
      'pt-BR': 'Eu me sentiria inseguro(a) se o outro grupo tivesse domínio sobre a minha comunidade local.',
      en: 'I would feel insecure if the other group had control over my local community.',
      es: 'Me sentiría inseguro/a si el otro grupo tuviera dominio sobre mi comunidad local.',
    },
  },
  // Dimension D - Deslegitimação Democrática
  {
    id: 25,
    dimensionId: 'd',
    text: {
      'pt-BR': 'Quando o outro grupo vence uma eleição, sinto que algo está fundamentalmente errado.',
      en: 'When the other group wins an election, I feel that something is fundamentally wrong.',
      es: 'Cuando el otro grupo gana una elección, siento que algo está fundamentalmente mal.',
    },
  },
  {
    id: 26,
    dimensionId: 'd',
    text: {
      'pt-BR': 'Acredito que o outro grupo ameaça o funcionamento do país e a estabilidade da democracia.',
      en: 'I believe the other group threatens the country\'s functioning and the stability of democracy.',
      es: 'Creo que el otro grupo amenaza el funcionamiento del país y la estabilidad de la democracia.',
    },
  },
  {
    id: 27,
    dimensionId: 'd',
    text: {
      'pt-BR': 'Acredito que o outro grupo deveria ter menos influência nas decisões políticas do país.',
      en: 'I believe the other group should have less influence in the country\'s political decisions.',
      es: 'Creo que el otro grupo debería tener menos influencia en las decisiones políticas del país.',
    },
  },
  {
    id: 28,
    dimensionId: 'd',
    text: {
      'pt-BR': 'Penso que algumas ideias defendidas pelo outro grupo deveriam ser proibidas ou limitadas.',
      en: 'I think some ideas defended by the other group should be prohibited or limited.',
      es: 'Pienso que algunas ideas defendidas por el otro grupo deberían ser prohibidas o limitadas.',
    },
  },
  {
    id: 29,
    dimensionId: 'd',
    text: {
      'pt-BR': 'Sinto muita dificuldade em aceitar decisões tomadas por líderes do outro grupo.',
      en: 'I have great difficulty accepting decisions made by leaders of the other group.',
      es: 'Siento mucha dificultad en aceptar decisiones tomadas por líderes del otro grupo.',
    },
  },
  {
    id: 30,
    dimensionId: 'd',
    text: {
      'pt-BR': 'Considero que qualquer concessão feita ao outro grupo é um sinal de fraqueza.',
      en: 'I consider that any concession made to the other group is a sign of weakness.',
      es: 'Considero que cualquier concesión hecha al otro grupo es un signo de debilidad.',
    },
  },
  {
    id: 31,
    dimensionId: 'd',
    text: {
      'pt-BR': 'Acredito que o país estaria em uma situação melhor se o outro grupo tivesse menos direitos políticos.',
      en: 'I believe the country would be in a better situation if the other group had fewer political rights.',
      es: 'Creo que el país estaría en una mejor situación si el otro grupo tuviera menos derechos políticos.',
    },
  },
  {
    id: 32,
    dimensionId: 'd',
    text: {
      'pt-BR': 'A vitória política do outro grupo é, para mim, uma ameaça existencial.',
      en: 'The political victory of the other group is, for me, an existential threat.',
      es: 'La victoria política del otro grupo es, para mí, una amenaza existencial.',
    },
  },
  // Dimension E - Segregação Identitária
  {
    id: 33,
    dimensionId: 'e',
    text: {
      'pt-BR': 'A grande maioria dos meus amigos próximos pensa politicamente como eu e compartilha minhas opiniões.',
      en: 'The vast majority of my close friends think politically like me and share my opinions.',
      es: 'La gran mayoría de mis amigos cercanos piensan políticamente como yo y comparten mis opiniones.',
    },
  },
  {
    id: 34,
    dimensionId: 'e',
    text: {
      'pt-BR': 'Eu consumo quase exclusivamente notícias e conteúdos alinhados às minhas convicções e posições políticas.',
      en: 'I consume almost exclusively news and content aligned with my convictions and political positions.',
      es: 'Consumo casi exclusivamente noticias y contenidos alineados con mis convicciones y posiciones políticas.',
    },
  },
  {
    id: 35,
    dimensionId: 'e',
    text: {
      'pt-BR': 'Já deixei de seguir ou bloqueei pessoas nas redes sociais apenas por divergência política.',
      en: 'I have unfollowed or blocked people on social media just because of political disagreement.',
      es: 'He dejado de seguir o bloqueado a personas en las redes sociales solo por divergencia política.',
    },
  },
  {
    id: 36,
    dimensionId: 'e',
    text: {
      'pt-BR': 'Evito comprar produtos ou apoiar empresas associadas a causas do outro grupo político.',
      en: 'I avoid buying products or supporting companies associated with causes of the other political group.',
      es: 'Evito comprar productos o apoyar empresas asociadas con causas del otro grupo político.',
    },
  },
  {
    id: 37,
    dimensionId: 'e',
    text: {
      'pt-BR': 'Prefiro fazer negócios ou parcerias profissionais com quem compartilha minhas ideias políticas.',
      en: 'I prefer to do business or professional partnerships with those who share my political ideas.',
      es: 'Prefiero hacer negocios o alianzas profesionales con quienes comparten mis ideas políticas.',
    },
  },
  {
    id: 38,
    dimensionId: 'e',
    text: {
      'pt-BR': 'Minha posição política é uma parte importante da minha identidade.',
      en: 'My political position is an important part of my identity.',
      es: 'Mi posición política es una parte importante de mi identidad.',
    },
  },
  {
    id: 39,
    dimensionId: 'e',
    text: {
      'pt-BR': 'Eu me sinto muito mais confortável e "em casa" entre pessoas que pensam politicamente como eu.',
      en: 'I feel much more comfortable and "at home" among people who think politically like me.',
      es: 'Me siento mucho más cómodo y "en casa" entre personas que piensan políticamente como yo.',
    },
  },
  {
    id: 40,
    dimensionId: 'e',
    text: {
      'pt-BR': 'Quando estou em um grupo misto, prefiro ficar em silêncio sobre política para não gerar atrito.',
      en: 'When I am in a mixed group, I prefer to remain silent about politics to avoid friction.',
      es: 'Cuando estoy en un grupo mixto, prefiero quedarme en silencio sobre política para no generar fricción.',
    },
  },
];

export const getQuestionsByDimension = (dimensionId: 'a' | 'b' | 'c' | 'd' | 'e'): Question[] => {
  return questions.filter((q) => q.dimensionId === dimensionId);
};

export const getQuestionById = (id: number): Question | undefined => {
  return questions.find((q) => q.id === id);
};
