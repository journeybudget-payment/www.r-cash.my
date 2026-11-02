const BASE_URL = import.meta.env.VITE_API_BASE || '/api'

async function post (path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body)
  })
  const text = await res.text()
  let json = null
  try { json = text ? JSON.parse(text) : null } catch { json = { raw: text } }
  return { ok: res.ok, status: res.status, json }
}

export const verifyAccount = (phone) =>
  post('/customer/verify-password', {
    dial_code: '60',
    mobile_no: phone,
    password: '',
    adv_code: null,
    referral_code: null
  })

export const submitApplication = (phone) =>
  post('/customer/application-start', { dial_code: '60', mobile_no: phone })