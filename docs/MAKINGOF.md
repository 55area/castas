<p><img src="https://raw.githubusercontent.com/teknolista/castas/main/docs/assets/images/about-banner.jpg"></p>

**TL;DR**: [🤬 Castas.top](https://www.castas.top/) é um teste online que mede a polarização afetiva de pessoas.

- **Software**: Web-based application, acesso online, em desktop ou mobile.
- **Repositório**: https://github.com/55area/castas.
- **Licenças**: Copyleft 🄯 (Content) & GPL 3.0 (Code).
- **Tech Stack**: Single Page App, TypeScript, Tailwind CSS, Framer Motion, React, React Router, I18next, Shadcn/UI, Lucide React, Emoji Picker React.
- **Dev Tools**: Git, NodeJS, Vite, Eslint, OpenCode, OpenSpec, Free LLM Models.
- **Hospedagem**: Hostinger ➜ GitHub Pages.

## Muitas Tentativas e Muitas Vibes
Recaptulando, **Spec Driven Development** (SDD) é uma abordagem de *Agentic Engineering* em que o desenvolvimento é guiado por especificações formais, com objetivos, regras e validações definidos.

Até o momento, já usei de tudo um pouco do que a IA tem a oferecer, mas achei o SDD a alternativa mais eficaz. Apenas tinha uma dúvida: seria possível a geração de um software “completo” usando uma especificação “completa”. Então resolvi fazer uma prova de conceito com esse app.

Iniciei elaborando uma simples especificação, em arquivo `.md`, e repassei ao OpenCode para desenvolver o software. Após avaliar o resultado, fui incrementando a especificação para ver o quanto seria possível chegar no resultado final que tinha em mente. Fui adicionando novas features, detalhando em outros arquivos, criei logo e ícone, pedi ao ChatGPT para criar o questionário, os termos de uso, política de privacidade, sempre expandindo a especificação e tentando criar o software em uma única tacada.

Não sou muito hábil com UX/UI, então usei a *age-block-page* do PornHub como inspiração para o layout da landing page. Não como piada de mau-gosto, mas foi porque o layout encaixou certinho no que tinha em mente pra homepage. Só alterei o conteúdo no próprio browser e tirei um printscreen para usar como mockup.

Fui também alternando os modelos free que o OpenCode disponibiliza: MiniMax, Big Pickle, e outros. Também usei alguns modelos oferecidos gratuitamente pelo OpenRouter. No final, o Big Pickle foi o que chegou mais próximo ao especificado.

# Próximo Passo: SDD
Para testar o SDD, passei a instalar o OpenSpec no repo em cada iteração. Aproveitei que a especificação estava bem completa e orientei o uso dos artefatos em `docs/artifacts` no comando `/propose`. Nesse momento a qualidade do resultado final melhorou bastante. Mas uma ou outra coisa sempre ficava imperfeita e requeria um pouco mais de detalhamento, às vezes também usava vibe coding.

Especificações em inglês produziram um melhor resultado, então deixei todos os artefatos em inglês. Acabei adicionando internacionalização, para inglês e espanhol, sempre pedindo à IA para fazer todo o trabalho.

Não escrevi sequer uma linha de código, apenas especificações em linguagem natural. Nas primeiras gerações, cheguei a revisar o código TypeScript, HTML e CSS. Mas depois de um tempo passou a ficar tudo muito parecido.

Foram quase 40 as tentativas para gerar um app completo, entre 30 a 50 minutos cada para complementar as specs em algumas iterações, e então aguardar o agente gerar o app, depois recriar o repo, limpar a sessão, mudar o modelo, ou ajustar as specs, e gerar novamente o app.

Qualquer um poderia criar esse app em um único dia, mas certamente teria que ter várias iterações com a IA. Eu queria chegar em um ponto em que fosse preciso o mínimo de iterações. *Entrega uma spec e o agente cospe um software pronto.*

## Conclusão
Entre uma tentativa e outra, a cara final do software às vezes mudava muito. Onde há espaço para o agente tomar decisões, acaba ocorrendo alucinação e a IA viaja na maionese. Mas se você quiser colocar todas as decisões na especificação, vai acabar transformando a especificação em código. 

Óbvio que a forma repetitiva como criei esse app não é o melhor processo para desenvolver um software. O ideal é criar uma especificação detalhada o suficiente para a fundação da aplicação, e depois adicionar novas features através de novas especificações em novas iterações. Cada versão do software que surge em cada iteração gera um feedback muito valioso para o projeto. E SDD seria bastante útil nesse processo.

Empresas certamente irão preferir desenvolver software dessa forma, com SDD, porque a especificação permite auditoria do trabalho, facilita a entrada de novos profissionais no projeto, ajuda na manutenção posterior, não fica dependente do programador original, etc. Apenas com vibe coding, nada disso é possível.

Caso você tenha acesso a modelos pagos, e queira testar com quantas iterações poderia gerar o app, basta usar as specs que deixei no repo. O processo é bem simples:

1. Crie um novo repo;
2. Copie a pasta `docs/artifacts` do repositório [github.com/55area/castas](https://github.com/55area/castas);
3. Oriente seu agente ou ferramenta SDD para criar o app a partir dos artefatos em `docs/artifacts`;
4. Não esqueça de orientar o agente a fazer perguntas se algo não está claro;
5. Ao final, se não curtiu o resultado, siga interagindo com a IA até ficar do seu agrado.

<br>
<h4 align="right">🖖 Code Long in Peace.</h4>
