/server
│
├── src
│   ├── config          # Configurações (ex.: conexão com MongoDB e variáveis de ambiente)
│   │   └── db.ts       # Conexão com o MongoDB (usando Mongoose)
│   │
│   ├── controllers     # Lógica de negócio (funções que tratam as requisições)
│   │   └── exemploController.ts  # Exemplo de controller para uma rota
│   │
│   ├── models          # Modelos do banco de dados (schemas do Mongoose)
│   │   └── Exemplo.ts  # Exemplo de model com interface do TypeScript
│   │
│   ├── routes          # Definição das rotas da API
│   │   └── exemploRoutes.ts      # Rotas relacionadas ao controller de exemplo
│   │
│   ├── middlewares     # Middlewares (ex.: autenticação e tratamento de erros)
│   │   ├── auth.ts              # Middleware para autenticação (opcional)
│   │   └── errorHandler.ts      # Middleware global para tratamento de erros
│   │
│   └── utils           # Funções utilitárias específicas do backend
│       └── logger.ts          # Exemplo: função para log de mensagens
│
├── .env                # Variáveis de ambiente (não versionar!)
├── app.ts              # Arquivo principal que inicializa o servidor
├── tsconfig.json       # Configuração do TypeScript
└── package.json        # Gerenciamento de dependências e scripts do backend
