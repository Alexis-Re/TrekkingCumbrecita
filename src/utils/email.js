export const EMAIL = 'cascadaelchorrillo.2018@gmail.com'

export function crearLinkMailto({ subject = '', body = '' } = {}) {
  const params = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${EMAIL}${params.length ? `?${params.join('&')}` : ''}`
}

export async function copiarEmail() {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(EMAIL)
      return true
    } catch {
      // fallback por si no hay contexto seguro (http) o permiso denegado
    }
  }

  try {
    const campo = document.createElement('textarea')
    campo.value = EMAIL
    campo.setAttribute('readonly', '')
    campo.style.position = 'fixed'
    campo.style.opacity = '0'
    document.body.appendChild(campo)
    campo.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(campo)
    return ok
  } catch {
    return false
  }
}
