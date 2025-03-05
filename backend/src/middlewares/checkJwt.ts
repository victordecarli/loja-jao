// src/middleware/checkJwt.ts
import { RequestHandler } from 'express';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { auth0Config } from '@/config/auth0';

// Interface para o objeto de configuração do Auth0
interface Auth0Config {
  domain: string;
  audience: string;
}

// Configuração do middleware de autenticação JWT
export const checkJwt: RequestHandler = expressjwt({
  // Configuração do provedor de chaves públicas
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Config.domain}/.well-known/jwks.json`
  })  as unknown as GetVerificationKey,

  // Validação do token JWT
  audience: auth0Config.audience,
  issuer: `https://${auth0Config.domain}/`,
  algorithms: ['RS256'],

  // Tipagem para o payload decodificado do JWT
  credentialsRequired: true
}).unless({
  // Rotas que não requerem autenticação (opcional)
  path: ['/api/public-route']
});

// Middleware de tratamento de erros de autenticação
