# Instagram MCP — @a7riooficial (somente leitura + prévia)

Pacote: `instagram-mcp-ai@0.8.0` (MIT, Node >= 22), API oficial Instagram/Meta.
O mantenedor informa que nenhuma ferramenta foi testada em conta real: validar tudo em leitura antes de qualquer escrita.

## Estado de segurança configurado nos modelos
| Variável | Valor | Efeito |
|---|---|---|
| `IG_TOOL_PACKAGES` | `reader` | Só carrega ferramentas de leitura; as de publicar/comentar nem aparecem |
| `IG_WRITE_MODE` | `preview` | Qualquer escrita só descreve a mudança, não envia à Meta |
| `IG_ALLOW_DESTRUCTIVE` | `false` | Bloqueia `delete_comment` |

## Passos (dependem do dono da conta)
1. Confirmar que @a7riooficial é conta Business/Creator.
2. Criar o app em developers.facebook.com e cadastrar a URI de redirecionamento (ver `docs/setup-guide.md` e `docs/auth.md` do repositório do pacote, incluindo as permissões exigidas).
3. Copiar `instagram.env.example` para fora do repositório e preencher `IG_APP_ID` e `IG_APP_SECRET`.
4. No terminal da própria máquina: `npx instagram-mcp-ai@0.8.0 login --path ig` (abre o navegador, o token fica no arquivo env).
5. `npx instagram-mcp-ai@0.8.0 doctor` para validar.
6. Registrar: `claude mcp add instagram --env IG_ENV_FILE=<caminho> --env IG_TOOL_PACKAGES=reader --env IG_WRITE_MODE=preview -- npx -y instagram-mcp-ai@0.8.0` (ou usar `mcp.example.json`).
7. Testar `get_account`, `list_media`, insights e `token_status`.

## Fase 2 — rascunhos (só após validação da leitura e sua aprovação)
Trocar `IG_TOOL_PACKAGES` para incluir `publisher`, mantendo `IG_WRITE_MODE=preview`.

## Fase 3 — publicação (somente com aprovação por post)
`IG_WRITE_MODE=apply` apenas durante a publicação aprovada e voltar a `preview` depois. Mídia precisa estar em URL HTTPS pública. Token expira em ~60 dias (`refresh`).
Não publicar promoções, descontos ou valores não confirmados. Não usar DMs em massa, seguidores artificiais ou login por senha.
