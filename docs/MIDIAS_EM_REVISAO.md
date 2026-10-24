# A7 Rio — Revisão de mídias (V2) — NÃO autoriza publicação

O repositório `anacdiias/a7rio` é **público**. Por isso, nenhuma foto com pessoas identificáveis foi commitada.
Fotos originais: Drive da responsável (DJI drone). Conversões apenas técnicas (EXIF, tamanho, compressão).

## Versionadas (sem pessoas identificáveis) — todas fotos reais de drone, apenas recortadas/comprimidas
| Arquivo | Origem | Uso |
|---|---|---|
| `/assets/hero-tijucas.jpg` | `/assets/tijucas.jpg` (existente no repo), 1824px | Hero (com movimento CSS), card Jet 3h, galeria |
| `catalogo/ilhas-detalhe.jpg` | recorte de `tijucas.jpg` (ilha) | Card Ilhas Tijucas |
| `catalogo/ilhas-falesia.jpg` | recorte de `tijucas.jpg` (falésia) | Card Jet 2h |
| `catalogo/agua-turquesa.jpg` | recorte de `tijucas.jpg` (água) | Card Jet 1h |
| `catalogo/costa-arco.jpg` | topo de `DJI_20260808003025_0008_D.JPG` (só rochas) | Card Jet Ski 30 min |
| `catalogo/costa-mar.jpg` | topo de `DJI_20260324041845_0053_D.JPG` (rochas e mar) | Card Lancha + Jet Ski, galeria |
| `catalogo/costa-falesia.jpg` | topo de `DJI_20260721024913_0022_D.JPG` (falésia) | Card Jet 30 min (duração), galeria |
| `catalogo/costa-barra.jpg` | topo de `DJI_20260728003259_0009_D.JPG` (Canal da Barra, Quebra-Mar, Cagarras; pessoas só como pontos distantes no molhe) | Card Jet 15 min |

As imagens dos cards ilustram a categoria, não o passeio nem a rota. Confirmar autoria/direitos de `tijucas.jpg`.

## NÃO versionadas — pessoas adultas, aguardam autorização de imagem
Guardadas apenas localmente (fora do repositório). Para usar, trocar o `image` do card em `app/page.tsx` (ver "Como ativar").
- `jet-ski-capa.jpg` ← `DJI_20260808003025_0008_D.JPG` (2 pessoas, distantes)
- `lancha-jet-capa.jpg` ← `DJI_20260324041845_0053_D.JPG` (adultos com rosto visível; logos Adidas/Mercury visíveis)
- `jet-ski-30.jpg` ← `DJI_20260721024913_0022_D.JPG` (grupo, distante)
- `jet-ski-60.jpg` ← `DJI_20260721024904_0020_D.JPG` (grupo, distante)
- `jet-ski-120.jpg` ← `DJI_20260721024900_0019_D.JPG` (grupo, distante; também usada na galeria)

## EXCLUÍDAS — crianças identificáveis (não usar sem autorização dos responsáveis)
- `jet-ski-15.jpg` ← `DJI_20260728003259_0009_D.JPG` (criança no raso; só o recorte do topo, sem pessoas, foi usado)
- `galeria-ilhas.jpg` ← `DJI_20260728003243_0007_D.JPG` (crianças junto à boia)
- `galeria-rio.jpg` ← `DJI_20260728003253_0008_D.JPG` (criança em close, rosto visível)
- `galeria-mar.jpg` ← `DJI_20260322222059_0046_D.JPG` (muitas pessoas, possíveis menores)
- `galeria-jet.jpg` = duplicata de `jet-ski-30.jpg`; `jet-ski-180.jpg` = duplicata de `jet-ski-capa.jpg`

## Também sem uso
- `/assets/jetski-tour.jpg` e `/assets/gigoia.jpg`: aparentam ser geradas por IA (marca d'água do Gemini). Não apresentar como foto real.
- `/assets/snorkel.jpg`: pessoas identificáveis, incluindo criança, em stand-up paddle.
- `hero-video.mp4` (16 MB, ainda no repo por já estar em produção): mostra o rosto de uma pessoa. NÃO é usado nesta versão; o hero agora é `hero-tijucas.jpg`. Se for reutilizado, otimizar (720px, ~2,6 MB) e confirmar autorização.

## Como ativar as fotos autorizadas
Copiar o arquivo para `public/assets/catalogo/`, apontar o `image` do card para ele em `app/page.tsx` e commitar — somente após a autorização documentada.
As cinco durações de jet ski ilustram a categoria; a imagem não garante a rota.
