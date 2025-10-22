# Projeto Lista de Tarefas

Este é um aplicativo de lista de tarefas simples, desenvolvido com React Native, TypeScript e banco de dados local (Realm).

## ⚙️ Como Instalar e Rodar o Projeto

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

**Pré-requisitos:**
*   Node.js v18.18.0
*   Ambiente de desenvolvimento React Native configurado para seu sistema operacional (Android/iOS). Siga o [guia oficial](https://reactnative.dev/docs/environment-setup).
*   CocoaPods (para iOS)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd lista_de_tarefa
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Instale os Pods (apenas para iOS):**
    ```bash
    cd ios
    pod install
    cd ..
    ```

4.  **Execute o aplicativo:**

    *   **Para Android:**
        ```bash
        npm run android
        ```

    *   **Para iOS:**
        ```bash
        npm run ios
        ```

## 🛠️ Tecnologias e Bibliotecas

A seleção de tecnologias visou criar uma base de código moderna, tipada e de fácil manutenção.

*   **TypeScript:** Adicionado para garantir a segurança de tipos, resultando em um código mais previsível, auto-documentado e com menos bugs em tempo de execução.
*   **Realm Database:** Selecionado como banco de dados local por sua alta performance, facilidade de uso com objetos e capacidade offline-first, ideal para uma aplicação mobile onde a conectividade pode variar.
*   **React Navigation:** Utilizado para gerenciar a navegação entre as telas do aplicativo de forma declarativa e intuitiva.
*   **React Native Image Picker & Compressor:** Para permitir que o usuário adicione imagens às tarefas e as comprima para otimizar o armazenamento.
*   **react-native-fs:** Utilizada para interagir com o sistema de arquivos do dispositivo, permitindo salvar a imagem capturada em um local permanente.
*   **react-native-geolocation-service:** Empregada para obter a localização do usuário (latitude e longitude) e associá-la a uma tarefa.
*   **react-native-uuid:** Usada para gerar identificadores únicos para cada nova tarefa, garantindo que cada registro tenha uma chave primária exclusiva no banco de dados.

## 💾 Implementação da Persistência

A persistência de dados foi estruturada em duas camadas principais para desacoplar a lógica de negócio da interface do usuário:

1.  **Banco de Dados com Realm:**
    *   No diretório `src/database/`, o arquivo `realm.ts` configura a conexão com o banco de dados e define o schema da entidade `Tarefa`.
    *   O serviço `src/database/services/tarefas.ts` abstrai todas as operações de CRUD (Criar, Ler, Atualizar, Deletar), fornecendo uma forma simples para interagir com o banco de dados (ex: `getAll`, `create`, `update`, `deleteById`).

2.  **React Context API (`TarefaContext`):**
    *   O `src/contexts/TarefaContext.tsx` atua como um provedor de estado global para as tarefas.
    *   Ele busca os dados do serviço de tarefas (Realm) e os disponibiliza para todos os componentes aninhados.
    *   Funções como `adicionarTarefa`, `excluirTarefa`, etc., são expostas pelo contexto. Elas primeiro chamam o serviço correspondente para persistir a alteração no Realm e, em seguida, atualizam o estado do contexto para que a UI seja renderizada novamente com os dados mais recentes.

Este padrão (Service Layer + Context API) centraliza a lógica de dados, tornando o código mais organizado e fácil de manter.

## 챌린지 Desafios e Soluções

O principal desafio durante o desenvolvimento foi a adaptação ao **TypeScript**. Vindo de uma experiência primária com JavaScript, a necessidade de definir tipos estritos para todos os componentes, props, estados e, especialmente, para os objetos do Realm, exigiu uma curva de aprendizado.

**Solução:** O desafio foi superado com pesquisa na documentação oficial do TypeScript, Realm e todas as outras libs utilizadas, e com a prática de criar interfaces e tipos (como em `src/types/tarefa.ts`). Embora tenha aumentado o tempo inicial de desenvolvimento.

## 🔮 O que eu faria diferente com mais tempo

Com um cronograma mais extenso, as seguintes melhorias seriam implementadas:

*   **Estilização e UI/UX:** Investiria mais tempo no design do aplicativo, criando uma interface mais bonita e moderna, com animações e transições suaves para melhorar a experiência do usuário.
*   **Funcionalidades Adicionais:** Implementaria recursos como:
    *   Notificações para lembrar o usuário de tarefas pendentes.
    *   Notificações mais bonitas ao invés do padrão do dispositivo.
*   **Testes Unitários:** Adicionaria testes unitários para os serviços do banco de dados e para a lógica dos componentes para garantir a estabilidade do app a longo prazo.

## ⏱️ Tempo Total Investido

O tempo total investido neste projeto foi de aproximadamente **6 horas**.