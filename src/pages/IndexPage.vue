<template>
  <q-page class="q-page">
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-dots" />
        <div class="hero-orb orb-1" />
        <div class="hero-orb orb-2" />
        <div class="hero-orb orb-3" />
        <div class="hero-ring ring-1" />
        <div class="hero-ring ring-2" />
        <div class="hero-ring ring-3" />
        <div v-for="n in 5" :key="`p${n}`" class="hero-particle" />
        <div v-for="n in 3" :key="`a${n}`" :class="['hero-accent', `accent-${n}`]" />
        <div class="hero-lines">
          <div v-for="n in 3" :key="`h${n}`" class="h-line" />
          <div v-for="n in 3" :key="`v${n}`" class="v-line" />
        </div>
      </div>

      <div class="hero-grid">
        <div class="hero-left">
          <div class="hero-tagline">
            <span v-for="t in ['Pantas', 'Selamat', 'Telus']" :key="t" class="tagline-badge">{{ t }}</span>
          </div>

          <h1 class="hero-headline">
            Dapatkan Sehingga <span class="gl-gold">RM 5,000</span><br>
            Hari Yang Sama Pinjaman ke<br>
            <span class="gl-red">Akaun Bank Anda</span>
          </h1>

          <div class="hero-divider" />

          <p class="hero-sub">
            Kelulusan pantas dalam masa 5 minit sahaja. Tiada yuran tersembunyi, tiada kertas kerja
            yang rumit. Dapatkan wang tunai yang anda perlukan hari ini dengan pemberi pinjaman
            dalam talian yang paling dipercayai di Malaysia.
          </p>

          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-num">5<span class="hero-stat-unit">min</span></span>
              <span class="hero-stat-lbl">Kelulusan</span>
            </div>
            <div class="hero-stat-sep" />
            <div class="hero-stat">
              <span class="hero-stat-num">50K<span class="hero-stat-unit">+</span></span>
              <span class="hero-stat-lbl">Pelanggan</span>
            </div>
            <div class="hero-stat-sep" />
            <div class="hero-stat">
              <span class="hero-stat-num">4.8<span class="hero-stat-unit">★</span></span>
              <span class="hero-stat-lbl">Penilaian</span>
            </div>
          </div>

          <div class="hero-cta-row">
            <button class="btn-gold" @click="scrollTo('#calculation')">
              Mohon Sekarang <q-icon name="arrow_forward" size="18px" />
            </button>
            <button class="btn-outline" @click="scrollTo('#how-it-works')">
              <q-icon name="play_circle_outline" size="18px" /> Cara ia berfungsi
            </button>
          </div>
        </div>

        <div class="hero-right">
          <ApplyCard />
        </div>
      </div>
    </section>

    <div class="trust-strip">
      <div class="trust-track">
        <template v-for="n in 2" :key="n">
          <div v-for="t in trustItems" :key="`${n}-${t.label}`" class="trust-item">
            <q-icon :name="t.icon" size="16px" />{{ t.label }}
          </div>
          <div class="trust-sep">·</div>
        </template>
      </div>
    </div>

    <section class="steps-section" id="how-it-works">
      <div class="steps-wrapper">
        <div class="sec-label"><q-icon name="route" size="13px" />Proses Mudah</div>
        <h2 class="sec-title">Cara Memohon Pinjaman Anda</h2>
        <p class="sec-sub">
          Dapatkan pinjaman anda diluluskan dalam 3 langkah mudah sahaja. Proses yang diperkemas
          kami memastikan anda mendapat dana yang diperlukan dengan cepat dan cekap.
        </p>

        <div class="steps-row">
          <div v-for="(s, i) in steps" :key="i" class="step-col">
            <div class="step-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-card">
              <h3 class="step-title">{{ s.title }}</h3>
              <p class="step-desc">{{ s.desc }}</p>
              <div class="step-tags">
                <span v-for="t in s.tags" :key="t.label" class="step-tag">
                  <q-icon :name="t.icon" size="14px" />{{ t.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bento-section" id="benefits">
      <div class="section-bg">
        <div class="bg-dots" />
        <div class="bg-orb bg-orb-1" />
        <div class="bg-orb bg-orb-2" />
        <div v-for="n in 3" :key="`fc${n}`" :class="['floating-circle', `fc-${n}`]" />
      </div>

      <div class="bento-wrapper">
        <div class="bento-header">
          <div class="sec-label"><q-icon name="workspace_premium" size="13px" />Mengapa Pilih R Cash?</div>
          <h2 class="sec-title">Alami Masa Depan Pinjaman Dalam Talian</h2>
          <p class="sec-sub">
            Sertai ribuan pelanggan yang berpuas hati yang mempercayai R Cash untuk keperluan
            kewangan mereka. Teknologi terkini dan pendekatan mengutamakan pelanggan kami
            menjadikan peminjaman mudah, selamat, dan pantas.
          </p>
        </div>

        <div class="bento-grid">
          <div v-for="b in benefits" :key="b.area" :class="['bento-card', `b-${b.area}`]">
            <div :class="['bento-icon', `i-${b.tone}`]">
              <q-icon :name="b.icon" size="26px" />
            </div>
            <h3 class="bento-title">{{ b.title }}</h3>
            <p class="bento-desc" v-html="b.desc" />
            <div v-for="c in b.checks" :key="c.label" class="bento-check">
              <q-icon :name="c.icon" size="14px" />{{ c.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cases-section">
      <div class="cases-wrapper">
        <div class="sec-label"><q-icon name="category" size="13px" />Penyelesaian Wang Tunai Pantas</div>
        <h2 class="sec-title">Perlukan WangHari Ini?</h2>
        <p class="sec-sub" style="margin:0 auto">
          Sama ada untuk kecemasan, perbelanjaan tidak dijangka, atau peluang yang baik - dapatkan
          wang tunai yang anda perlukan dalam akaun bank anda dalam beberapa minit.
        </p>

        <div class="cases-scroll">
          <div v-for="c in cases" :key="c.title" class="case-card">
            <div :class="['case-icon-area', `c-${c.tone}`]">
              <q-icon :name="c.icon" size="36px" />
            </div>
            <div class="case-body">
              <div class="case-title">{{ c.title }}</div>
              <div class="case-desc">{{ c.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="proof-section">
      <div class="section-bg">
        <div class="bg-dots" />
        <div class="bg-orb bg-orb-1" />
        <div class="bg-orb bg-orb-2" />
        <div v-for="n in 3" :key="`pfc${n}`" :class="['floating-circle', `fc-${n}`]" />
      </div>

      <div class="proof-inner">
        <h2 class="proof-title">Bersedia untuk Mengalami Perbezaan R Cash?</h2>
        <p class="proof-sub">Sertai ribuan pelanggan yang berpuas hati yang memilih cara yang lebih bijak untuk meminjam</p>

        <div class="proof-stats">
          <div v-for="(s, i) in proofStats" :key="s.label" class="proof-stat-item">
            <div class="proof-num">
              {{ display[i] }}<span class="proof-suffix">{{ s.suffix }}</span>
            </div>
            <div class="proof-label">{{ s.label }}</div>
          </div>
        </div>

        <div class="proof-cta-pill">
          <p class="proof-cta-text">Perlukan WangHari Ini? Kami Ada untuk Anda!</p>
          <button class="btn-gold" @click="scrollTo('#calculation')">
            Mohon Sekarang - Mulakan dalam 2 Minit <q-icon name="arrow_forward" size="18px" />
          </button>
        </div>
      </div>
    </section>

    <FaqSection />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ApplyCard from '@/components/ApplyCard.vue'
import FaqSection from '@/components/FaqSection.vue'

const trustItems = [
  { icon: 'verified_user', label: 'Selamat' },
  { icon: 'speed', label: 'Pantas' },
  { icon: 'visibility', label: 'Telus' },
  { icon: 'lock', label: 'Tiada yuran tersembunyi' }
]

const steps = [
  {
    title: 'Mohon Dalam Talian Dalam Minit',
    desc: 'Isi borang permohonan mudah kami dengan maklumat asas anda. Tiada kertas kerja yang rumit diperlukan.',
    tags: [
      { icon: 'smartphone', label: 'Aplikasi mesra mudah alih' },
      { icon: 'lock', label: 'Penyulitan data selamat' }
    ]
  },
  {
    title: 'Semakan Bertenaga AI Segera',
    desc: 'Sistem AI canggih kami menganalisis permohonan anda dengan serta-merta dan memberikan keputusan kelulusan segera.',
    tags: [
      { icon: 'timer', label: '5 min Masa Semakan Purata' },
      { icon: 'trending_up', label: '95% Kadar Kelulusan' }
    ]
  },
  {
    title: 'Terima Dana Segera',
    desc: 'Sebaik sahaja diluluskan, jumlah pinjaman anda dipindahkan terus ke akaun bank anda dalam beberapa minit.',
    tags: [
      { icon: 'flash_on', label: 'Pemindahan hari yang sama' },
      { icon: 'account_balance', label: 'Terus ke akaun bank' }
    ]
  }
]

const benefits = [
  {
    area: 'speed', icon: 'flash_on', tone: 'gold', title: 'Pantas Kilat',
    desc: 'Dapatkan kelulusan dalam masa <strong>5 minutes</strong> sahaja dengan sistem penilaian bertenaga AI kami. Tiada lagi menunggu berhari-hari untuk kelulusan pinjaman.',
    checks: [{ icon: 'check_circle', label: '5min Masa Kelulusan' }, { icon: 'check_circle', label: '24/7 Tersedia' }]
  },
  {
    area: 'easy', icon: 'touch_app', tone: 'green', title: 'Permohonan Mudah',
    desc: 'Hanya <strong>MyKad</strong> anda - itu sahaja yang anda perlukan. Proses yang diperkemas kami menghapuskan kertas kerja yang tidak perlu.',
    checks: [{ icon: 'check_circle', label: 'Hanya MyKad diperlukan' }, { icon: 'check_circle', label: 'Tiada dokumen pendapatan' }]
  },
  {
    area: 'security', icon: 'security', tone: 'purple', title: 'Keselamatan Gred Bank',
    desc: 'Data anda dilindungi dengan <strong>256-bit SSL</strong> dan protokol keselamatan canggih yang dipercayai oleh institusi kewangan utama.',
    checks: [{ icon: 'verified_user', label: 'SSL Selamat' }]
  },
  {
    area: 'transparency', icon: 'visibility', tone: 'gold', title: 'Ketelusan Penuh',
    desc: 'Tiada yuran tersembunyi atau caj mengejut. Anda akan tahu dengan tepat apa yang perlu anda bayar sebelum memohon dengan <strong>clear fee structure</strong> kami.',
    checks: []
  },
  {
    area: 'accessibility', icon: 'diversity_3', tone: 'rose', title: 'Untuk Semua Orang',
    desc: 'Kriteria kelayakan yang fleksibel bermakna lebih ramai orang boleh mengakses dana yang mereka perlukan, walaupun dengan <strong>less-than-perfect credit</strong>.',
    checks: [{ icon: 'check_circle', label: 'Umur 20-60' }, { icon: 'check_circle', label: 'Sedang Bekerja' }]
  },
  {
    area: 'convenience', icon: 'schedule', tone: 'cyan', title: 'Tersedia 24/7',
    desc: 'Mohon bila-bila masa, di mana-mana sahaja. Platform kami tidak pernah tidur, jadi anda boleh mendapat bantuan kewangan yang anda perlukan <strong>24/7</strong>.',
    checks: [{ icon: 'smartphone', label: 'Dioptimumkan Mudah Alih' }]
  }
]

const cases = [
  { icon: 'local_hospital', tone: 'red', title: 'Kecemasan Perubatan', desc: 'Tampung bil perubatan yang tidak dijangka dengan segera' },
  { icon: 'home_repair_service', tone: 'blue', title: 'Pembaikan Rumah', desc: 'Selesaikan masalah rumah yang mendesak tanpa tekanan' },
  { icon: 'school', tone: 'green', title: 'Yuran Pendidikan', desc: 'Bayar yuran pendidikan tepat pada masanya' },
  { icon: 'trending_up', tone: 'orange', title: 'Peluang Perniagaan', desc: 'Rebut peluang perniagaan' }
]

const proofStats = [
  { label: 'Pelanggan Gembira', suffix: '+', target: 50000 },
  { label: 'Kadar Kelulusan', suffix: '%', target: 95 },
  { label: 'Penilaian Pelanggan', suffix: '/5', target: 4.8 }
]
const display = ref(['0', '0', '0.0'])

const scrollTo = (sel) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })

let observer = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      proofStats.forEach((s, i) => {
        const dec = s.target % 1 !== 0
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / 1400, 1)
          const v = s.target * (1 - Math.pow(1 - p, 3))
          display.value[i] = dec ? v.toFixed(1) : Math.round(v).toLocaleString('en-MY')
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
      observer.disconnect()
    })
  }, { threshold: 0.4 })
  observer.observe(document.querySelector('.proof-stats'))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped lang="scss">
.hero {
  position: relative; display: flex; align-items: center; overflow: hidden;
  min-height: 100vh; padding: 6rem 2rem 4rem;
  background: linear-gradient(160deg, #1e0e33 0%, #2d1549 30%, #5b2d8e 55%, #3a1b5e 100%);
  @media (max-width: 768px) { min-height: auto; padding: 5rem 1.25rem 3rem; }
}
.hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 480px; align-items: center; gap: 4rem; width: 100%; max-width: 1200px; margin: 0 auto; }
.hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.hero-orb { position: absolute; border-radius: 50%; filter: blur(50px); }
.orb-1 { width: 800px; height: 800px; top: -20%; left: 45%; transform: translateX(-50%); background: radial-gradient(circle, rgba(139, 92, 246, .6), rgba(139, 92, 246, .2) 40%, transparent 70%); animation: orbFloat 12s ease-in-out infinite; }
.orb-2 { width: 600px; height: 600px; bottom: -15%; left: -8%; background: radial-gradient(circle, rgba(100, 160, 255, .35), rgba(139, 92, 246, .1) 50%, transparent 70%); animation: orbFloat 16s