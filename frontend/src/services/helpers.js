const PAISES_ISO = {
  'estados unidos': 'US', 'reino unido': 'GB', 'japão': 'JP', 'japao': 'JP',
  'canadá': 'CA', 'canada': 'CA', 'frança': 'FR', 'franca': 'FR',
  'alemanha': 'DE', 'brasil': 'BR', 'nova zelândia': 'NZ', 'nova zelandia': 'NZ',
  'coreia do sul': 'KR', 'espanha': 'ES', 'méxico': 'MX', 'mexico': 'MX',
  'chile': 'CL', 'itália': 'IT', 'italia': 'IT', 'suécia': 'SE', 'suecia': 'SE',
  'ucrânia': 'UA', 'ucrania': 'UA', 'austrália': 'AU', 'australia': 'AU',
  'guatemala': 'GT', 'china': 'CN', 'índia': 'IN', 'india': 'IN',
  'rússia': 'RU', 'russia': 'RU', 'argentina': 'AR', 'portugal': 'PT',
};

export function getBandeira(nomePais) {
  if (!nomePais) return null;
  const iso = PAISES_ISO[nomePais.toLowerCase().trim()];
  if (!iso) return null;
  // Converte código ISO em emoji de bandeira
  return iso
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e0 - 65 + c.charCodeAt(0)))
    .join('');
}

export function formatarDuracao(time) {
  if (!time) return null;
  const partes = time.split(':');
  const h = parseInt(partes[0]);
  const m = parseInt(partes[1]);
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

export function formatarOrcamento(valor) {
  if (!valor) return null;
  const n = parseFloat(valor);
  if (n >= 1_000_000_000) return `US$ ${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `US$ ${(n / 1_000_000).toFixed(1)}M`;
  return `US$ ${n.toLocaleString('pt-BR')}`;
}