<template>
  <div class="apply-card" id="calculation">
    <div class="apply-card-glow" />
    <div class="apply-card-shine" />
    <div class="apply-logo"><img src="/logo.png" alt="R Cash"></div>
    <h2 class="apply-heading">Mulakan Permohonan Anda</h2>

    <div class="apply-form-section">
      <div class="form-label-row">
        <q-icon name="phone_android" size="18px" />
        <span>Mulakan Permohonan Anda</span>
      </div>
      <div class="input-wrap">
        <div class="prefix">+60</div>
        <input
          v-model="phone"
          type="tel"
          placeholder="123456789"
          maxlength="10"
          class="phone-input"
          :class="{ 'authenticated-input': verified }"
          @input="onInput"
        >
        <div v-if="verified" class="auth-check"><q-icon name="check_circle" size="18px" /></div>
      </div>
      <button class="apply-btn-full" :disabled="loading" @click="submit">
        <span>{{ loading ? 'Memproses...' : 'Mohon Sekarang' }}</span>
        <q-icon name="arrow_forward" size="18px" />
      </button>
    </div>

    <div class="apply-trust-center">
      <div class="security-row">
        <q-icon name="lock" size="13px" />
        <span>Data anda dilindungi dengan keselamatan gred bank</span>
      </div>
    </div>

    <div class="apply-chips">
      <span v-for="c in chips" :key="c" class="apply-chip">
        <q-icon name="check_circle" size="14px" />{{ c }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { submitApplication } from '@/services/api'

const $q = useQuasar()
const phone = ref('')
const loading = ref(false)
const verified = ref(false)
const chips = ['Tiada yuran tersembunyi', 'Kelulusan 5 minit', 'Pemindahan hari yang sama']

function onInput () {
  let v = phone.value.replace(/\D/g, '')
  if (v.startsWith('60')) v = v.slice(2)
  if (v.startsWith('0')) v = v.slice(1)
  phone.value = v.slice(0, 10)
  verified.value = false
}

async function submit () {
  const digits = phone.value.replace(/\D/g, '')
  if (!/^1\d{8,9}$/.test(digits)) {
    $q.notify({ type: 'negative', message: 'Masukkan nombor telefon yang sah.', position: 'top' })
    return
  }
  loading.value = true
  try {
    await submitApplication(digits)
    verified.value = true
    $q.notify({ type: 'positive', message: 'Nombor disahkan. Teruskan permohonan.', position: 'top' })
    window.location.href = `#/apply?phone=${digits}`
  } catch {
    $q.notify({ type: 'negative', message: 'Rangkaian gagal. Cuba lagi.', position: 'top' })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.apply-card {
  position: relative;
  overflow: hidden;
  padding: 3rem;
  border-radius: 28px;
  border: 1px solid rgba(139, 92, 246, .12);
  background: linear-gradient(145deg, rgba(15, 25, 50, .95), rgba(10, 18, 38, .95));
  backdrop-filter: blur(24px);
  box-shadow: 0 32px 80px rgba(0, 0, 0, .5), inset 0 0 0 1px rgba(139, 92, 246, .05);

  @media (max-width: 480px) { padding: 2rem; border-radius: 20px; }
}
.apply-card-glow {
  position: absolute; inset: -1px; z-index: -1; border-radius: 21px; pointer-events: none;
  background: linear-gradient(135deg, rgba(139, 92, 246, .2), transparent 40%, transparent 60%, rgba(139, 92, 246, .1));
}
.apply-card-shine {
  position: absolute; top: 0; left: 0; right: 0; height: 1px; z-index: 1;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, .5), rgba(100, 180, 255, .3), transparent);
}
.apply-logo { position: relative; z-index: 1; text-align: center; margin-bottom: .75rem; }
.apply-logo img { height: 8rem; width: auto; filter: brightness(1.2) drop-shadow(0 2px 8px rgba(139, 92, 246, .15)); }
.apply-heading { position: relative; z-index: 1; margin-bottom: 2rem; text-align: center; color: #a1a1aa; font-size: 1.35rem; font-weight: 700; }
.apply-form-section {
  position: relative; z-index: 1; padding: 1.5rem; margin-bottom: .25rem;
  border-radius: 18px; background: rgba(139, 92, 246, .03); border: 1px solid rgba(139, 92, 246, .08);
}
.form-label-row { display: flex; align-items: center; gap: .4rem; margin-bottom: .75rem; color: #a1a1aa; font-size: .85rem; }
.form-label-row .q-icon { color: #8b5cf6; }
.input-wrap { position: relative; flex: 1; }
.prefix { position: absolute; top: 50%; left: .85rem; transform: translateY(-50%); color: #71717a; font-size: .85rem; font-weight: 600; }
.phone-input {
  width: 100%; padding: .9rem .85rem .9rem 3rem; border-radius: 10px; outline: none;
  color: #e4e4e7; background: rgba(139, 92, 246, .04); border: 1px solid rgba(139, 92, 246, .08);
  font-size: .9rem; transition: border-color .2s;
  &::placeholder { color: #71717a; }
  &:focus { border-color: rgba(139, 92, 246, .18); }
  &.authenticated-input { background: rgba(139, 92, 246, .1); border-color: rgba(139, 92, 246, .18); }
}
.auth-check { position: absolute; top: 50%; right: .75rem; transform: translateY(-50%); color: #8b5cf6; }
.apply-btn-full {
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  width: 100%; margin-top: .75rem; padding: 1rem; border: none; border-radius: 14px;
  background: linear-gradient(135deg, #a78bfa, #8b5cf6); color: #1e0e33;
  font-size: .95rem; font-weight: 700; cursor: pointer; position: relative; overflow: hidden; transition: all .25s;
  &::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .45), transparent);
    transform: skew(-20deg); animation: btn-shine 3s ease-in-out 1.5s infinite;
  }
  &:hover { background: linear-gradient(135deg, #8b5cf6, #5b2d8e); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(91, 45, 142, .35), 0 0 20px rgba(139, 92, 246, .3); }
  &:disabled { opacity: .5; cursor: not-allowed; }
  &:disabled::before { display: none; }
}
.apply-trust-center { position: relative; z-index: 1; text-align: center; margin-top: 1.25rem; }
.security-row {
  display: inline-flex; align-items: center; gap: .4rem; padding: .45rem 1rem;
  border-radius: 100px; font-size: .75rem; font-weight: 600; color: #8b5cf6;
  background: rgba(139, 92, 246, .1); border: 1px solid rgba(139, 92, 246, .18);
}
.apply-chips {
  position: relative; z-index: 1; display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem;
  margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(139, 92, 246, .08);
}
.apply-chip {
  display: inline-flex; align-items: center; gap: .35rem; padding: .35rem .85rem;
  border-radius: 100px; font-size: .78rem; font-weight: 600; color: #e4e4e7;
  background: rgba(139, 92, 246, .06); border: 1px solid rgba(139, 92, 246, .1);
}
.apply-chip .q-icon { color: #8b5cf6; }

@keyframes btn-shine { 0% { left: -100%; } 50%, 100% { left: 150%; } }
</style>