<template>
  <q-layout view="hHh lpR fFf" class="layout-background">

    <q-header class="floating-header">
      <div class="header-background">
        <div class="header-shapes">
          <div class="header-shape shape-1" />
          <div class="header-shape shape-2" />
          <div class="header-shape shape-3" />
        </div>
      </div>

      <div class="header-wrapper">
        <q-toolbar class="header-toolbar">
          <div class="logo-section">
            <div class="logo-container" @click="$router.push('/')">
              <img src="/logo.png" alt="R Cash Logo" class="logo-image">
            </div>
          </div>

          <nav class="nav-tabs desktop-nav">
            <a href="#calculation" class="nav-tab">
              <q-icon name="description" class="nav-icon" size="18px" />
              <span>Mohon Sekarang</span>
            </a>
            <a href="#benefits" class="nav-tab">
              <q-icon name="local_offer" class="nav-icon" size="18px" />
              <span>Pakej Kami</span>
            </a>
          </nav>

          <div class="header-right">
            <q-btn flat no-caps class="language-dropdown" :label="localeLabel" />
            <q-btn flat no-caps class="login-btn desktop-only">
              <q-icon name="account_circle" size="18px" class="q-mr-xs" />
              <span>Log Masuk</span>
            </q-btn>
            <q-btn flat class="mobile-menu-btn" @click="drawer = true">
              <q-icon name="menu" />
            </q-btn>
          </div>
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer v-model="drawer" side="right" :width="320" class="mobile-nav-content">
      <div class="mobile-nav-header">
        <div class="mobile-logo">
          <img src="/logo.png" alt="R Cash Logo" class="mobile-logo-image">
          <span class="mobile-logo-text">R Cash</span>
        </div>
        <q-btn flat round icon="close" class="mobile-close-btn" @click="drawer = false" />
      </div>

      <div class="mobile-nav-items">
        <a href="#calculation" class="mobile-nav-item" @click="drawer = false">
          <div class="mobile-nav-icon"><q-icon name="description" size="24px" /></div>
          <div class="mobile-nav-text">
            <span class="nav-title">Mohon Sekarang</span>
            <span class="nav-desc">Mulakan permohonan pinjaman anda</span>
          </div>
          <q-icon name="arrow_forward_ios" class="nav-arrow" size="16px" />
        </a>
        <a href="#benefits" class="mobile-nav-item" @click="drawer = false">
          <div class="mobile-nav-icon"><q-icon name="local_offer" size="24px" /></div>
          <div class="mobile-nav-text">
            <span class="nav-title">Pakej Kami</span>
            <span class="nav-desc">Lihat pakej pinjaman</span>
          </div>
          <q-icon name="arrow_forward_ios" class="nav-arrow" size="16px" />
        </a>
      </div>

      <div class="mobile-nav-cta">
        <div class="mobile-security-notice">
          <q-icon name="security" size="16px" class="text-positive" />
          <span>Keselamatan gred bank • Berlesen oleh BNM</span>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="page-container" style="padding-top:66px">
      <router-view />
    </q-page-container>

    <footer class="enhanced-footer">
      <div class="footer-background">
        <div class="footer-pattern" />
        <div class="footer-shapes">
          <div v-for="n in 4" :key="n" :class="['footer-shape', `shape-${n}`]" />
        </div>
      </div>

      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-container">
            <div class="footer-section company-section">
              <div class="footer-logo">
                <img src="/logo.png" alt="R Cash Logo" class="footer-logo-image">
                <div class="footer-logo-text">
                  <span class="footer-brand">R Cash</span>
                  <span class="footer-tagline">Rakan Kewangan Anda Yang Dipercayai</span>
                </div>
              </div>
              <p class="company-description">
                Platform pinjaman dalam talian terkemuka Malaysia yang menyediakan perkhidmatan
                pinjaman yang pantas, selamat, dan telus. Dapatkan kelulusan dalam minit dengan
                sistem bertenaga AI kami.
              </p>
              <div class="license-section">
                <div class="license-item">
                  <q-icon name="verified" size="20px" class="text-positive" />
                  <span>Berlesen oleh Bank Negara Malaysia</span>
                </div>
                <div class="license-item">
                  <q-icon name="security" size="20px" class="text-primary" />
                  <span>Penyulitan SSL 256-bit</span>
                </div>
              </div>
              <div class="social-media">
                <span class="social-title">Ikuti Kami:</span>
                <div class="social-links">
                  <a class="social-link facebook"><q-icon name="facebook" size="20px" /></a>
                  <a class="social-link instagram"><q-icon name="camera_alt" size="20px" /></a>
                  <a class="social-link twitter"><q-icon name="alternate_email" size="20px" /></a>
                  <a class="social-link linkedin"><q-icon name="business" size="20px" /></a>
                </div>
              </div>
            </div>

            <div class="footer-section">
              <h4 class="footer-title"><q-icon name="link" class="title-icon" size="20px" /> Pautan Pantas</h4>
              <ul class="footer-links">
                <li><a href="#calculation">Mohon Sekarang</a></li>
                <li><a href="#benefits">Pakej Kami</a></li>
                <li><a href="#calculation">Kalkulator Pinjaman</a></li>
                <li><a href="#faq">Soalan Lazim</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4 class="footer-title"><q-icon name="gavel" class="title-icon" size="20px" /> Undang-undang</h4>
              <ul class="footer-links">
                <li><a href="#">Terma &amp; Syarat</a></li>
                <li><a href="#">Dasar Privasi</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4 class="footer-title"><q-icon name="support_agent" class="title-icon" size="20px" /> Hubungan &amp; Sokongan</h4>
              <div class="contact-info">
                <div class="contact-item">
                  <div class="contact-icon"><q-icon name="chat" size="18px" /></div>
                  <div class="contact-details">
                    <span class="contact-label">Sembang Langsung</span>
                    <a href="#" class="contact-link">Tersedia 24/7</a>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon"><q-icon name="location_on" size="18px" /></div>
                  <div class="contact-details">
                    <span class="contact-label">Alamat</span>
                    <span class="contact-text">Kuala Lumpur, Malaysia</span>
                  </div>
                </div>
              </div>
              <div class="operating-hours">
                <h5 class="hours-title">Waktu Beroperasi</h5>
                <div class="hours-item">
                  <span class="hours-day">Isnin - Jumaat</span>
                  <span class="hours-time">9:00 PG - 6:00 PTG</span>
                </div>
                <div class="hours-item">
                  <span class="hours-day">Hujung Minggu</span>
                  <span class="hours-time">Sokongan Dalam Talian Sahaja</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="trust-bar">
          <div class="trust-container">
            <div class="trust-items">
              <div v-for="t in trustItems" :key="t.title" class="trust-item">
                <div class="trust-icon"><q-icon :name="t.icon" size="24px" /></div>
                <div class="trust-text">
                  <span class="trust-title">{{ t.title }}</span>
                  <span class="trust-desc">{{ t.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-container">
          <div class="copyright">
            <p>© {{ year }} R Cash. Hak cipta terpelihara.</p>
            <p class="legal-notice">
              R Cash adalah tanda dagangan berdaftar. Berlesen oleh Bank Negara Malaysia di bawah
              Akta Perniagaan Perkhidmatan Wang 2011.
            </p>
          </div>
          <div class="footer-badges">
            <div class="security-badges">
              <div class="security-badge-item"><q-icon name="https" size="16px" /><span>SSL</span></div>
              <div class="security-badge-item"><q-icon name="verified" size="16px" /><span>BNM</span></div>
              <div class="security-badge-item"><q-icon name="security" size="16px" /><span>SELAMAT</span></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

const drawer = ref(false)
const year = new Date().getFullYear()
const localeLabel = computed(() => 'Bahasa Malaysia')

const trustItems = [
  { icon: 'verified_user', title: 'Keselamatan Gred Bank', desc: 'Penyulitan SSL 256-bit' },
  { icon: 'account_balance', title: 'Pemberi Pinjam Berlesen', desc: 'Dikawal selia oleh Bank Negara' },
  { icon: 'support_agent', title: 'Sokongan 24/7', desc: 'Sentiasa ada untuk membantu' },
  { icon: 'people', title: '50,000+ Pelanggan', desc: 'Dipercayai oleh Rakyat Malaysia' }
]
</script>

<style scoped lang="scss">
.floating-header {
  position: fixed !important;
  inset: 0 0 auto;
  z-index: 2000;
  background: rgba(255, 255, 255, .95);
  backdrop-filter: blur(20px);
  border: none;
  box-shadow: 0 4px 30px rgba(0, 0, 0, .1);
  transition: all .3s;
}
.header-background { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
.header-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(25, 118, 210, .03), rgba(66, 165, 245, .02));
  animation: headerFloat 8s ease-in-out infinite;
}
.shape-1 { width: 60px; height: 60px; top: -30px; left: 10%; }
.shape-2 { width: 40px; height: 40px; top: -20px; right: 20%; animation-delay: 2s; }
.shape-3 { width: 80px; height: 80px; top: -40px; right: 5%; animation-delay: 4s; }

.header-wrapper { position: relative; z-index: 2; max-width: 1400px; margin: 0 auto; }
.header-toolbar { display: flex; align-items: center; justify-content: space-between; height: 80px; padding: 0 2rem; }
.logo-container { display: flex; align-items: center; padding: .5rem; border-radius: 12px; cursor: pointer; transition: all .3s; }
.logo-container:hover { background: rgba(25, 118, 210, .05); transform: translateY(-1px); }
.logo-image { height: 45px; width: auto; }
.desktop-nav { flex: 1; display: flex; align-items: center; justify-content: center; gap: 2rem; margin: 0 2rem; }
.nav-tab {
  display: flex; align-items: center; gap: .5rem; padding: .8rem 1rem;
  border-radius: 25px; color: #333; font-size: .9rem; font-weight: 600;
  text-decoration: none; text-transform: capitalize; transition: all .3s;
}
.nav-tab:hover { color: #1976d2; background: rgba(25, 118, 210, .08); transform: translateY(-2px); }
.nav-icon { opacity: .7; transition: opacity .3s; }
.nav-tab:hover .nav-icon { opacity: 1; }
.header-right { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
.language-dropdown {
  color: #666; background: rgba(255, 255, 255, .8); border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 25px; padding: .5rem 1rem; font-size: .85rem; font-weight: 600; transition: all .3s;
}
.login-btn {
  color: #fff !important; background: linear-gradient(135deg, #1976d2, #1565c0);
  border-radius: 25px; padding: .6rem 1.5rem; font-size: .9rem; font-weight: 600;
  box-shadow: 0 4px 15px rgba(25, 118, 210, .3); transition: all .3s;
}
.login-btn:hover { background: linear-gradient(135deg, #1565c0, #0d47a1); transform: translateY(-2px); }
.mobile-menu-btn { display: none; color: #1976d2; background: rgba(25, 118, 210, .1); border-radius: 12px; padding: .5rem; }
.mobile-menu-btn:hover { background: rgba(25, 118, 210, .2); }

.mobile-nav-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 2rem 1.5rem 1rem; color: #fff;
  background: linear-gradient(135deg, #1976d2, #42a5f5);
}
.mobile-logo { display: flex; align-items: center; gap: .8rem; }
.mobile-logo-image { height: 35px; filter: brightness(0) invert(); }
.mobile-logo-text { font-size: 1.3rem; font-weight: 800; }
.mobile-close-btn { color: #fff; background: rgba(255, 255, 255, .2); border-radius: 8px; }
.mobile-nav-items { flex: 1; padding: 1rem 0; }
.mobile-nav-item { display: flex; align-items: center; gap: 1rem; padding: 1.2rem 1.5rem; color: #333; text-decoration: none; border-left: 4px solid transparent; transition: all .3s; }
.mobile-nav-item:hover { background: rgba(25, 118, 210, .05); border-left-color: #1976d2; transform: translateX(5px); }
.mobile-nav-icon {
  display: flex; align-items: center; justify-content: center; width: 50px; height: 50px;
  border-radius: 12px; color: #fff; background: linear-gradient(135deg, #1976d2, #42a5f5); flex-shrink: 0;
}
.mobile-nav-text { display: flex; flex-direction: column; gap: .2rem; flex: 1; }
.nav-title { font-size: 1rem; font-weight: 600; color: #333; }
.nav-desc { font-size: .8rem; color: #666; }
.nav-arrow { color: #999; }
.mobile-nav-cta { padding: 1.5rem; background: #f8f9fa; border-top: 1px solid #e0e0e0; }
.mobile-security-notice { display: flex; align-items: center; justify-content: center; gap: .5rem; font-size: .8rem; color: #666; }

.enhanced-footer { position: relative; overflow: hidden; color: #fff; background: linear-gradient(135deg, #1a1a1a, #2d2d2d); }
.footer-background { position: absolute; inset: 0; z-index: 1; }
.footer-pattern {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 25% 25%, rgba(25, 118, 210, .1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 107, 53, .05) 0%, transparent 50%);
}
.footer-shapes { position: absolute; inset: 0; }
.footer-shape { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, .03); animation: footerFloat 12s ease-in-out infinite; }
.footer-shape.shape-1 { width: 100px; height: 100px; top: 10%; left: 5%; }
.footer-shape.shape-2 { width: 60px; height: 60px; top: 20%; right: 10%; animation-delay: 3s; }
.footer-shape.shape-3 { width: 80px; height: 80px; bottom: 30%; left: 15%; animation-delay: 6s; }
.footer-shape.shape-4 { width: 120px; height: 120px; bottom: 10%; right: 20%; animation-delay: 9s; }
.footer-content { position: relative; z-index: 2; }
.footer-main { padding: 4rem 0 2rem; }
.footer-container { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem; max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.footer-title { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: 700; }
.title-icon { color: #1976d2; }
.footer-logo { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.footer-logo-image { height: 40px; filter: brightness(0) invert(); }
.footer-logo-text { display: flex; flex-direction: column; gap: .1rem; }
.footer-brand { font-size: 1.5rem; font-weight: 800; }
.footer-tagline { font-size: .8rem; color: #999; }
.company-description { color: #ccc; font-size: .95rem; line-height: 1.6; margin-bottom: 2rem; }
.license-item { display: flex; align-items: center; gap: .5rem; margin-bottom: .5rem; font-size: .9rem; color: #ccc; }
.social-title { display: block; margin-bottom: .8rem; font-size: .9rem; font-weight: 600; }
.social-links { display: flex; gap: .8rem; }
.social-link { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: rgba(255, 255, 255, .1); transition: all .3s; }
.social-link:hover { background: rgba(255, 255, 255, .2); transform: translateY(-3px); }
.footer-links { list-style: none; margin: 0; padding: 0; }
.footer-links li { margin-bottom: .8rem; }
.footer-links a { display: flex; align-items: center; gap: .5rem; color: #ccc; font-size: .9rem; text-decoration: none; transition: all .3s; }
.footer-links a:hover { color: #1976d2; transform: translateX(5px); }
.contact-item { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.2rem; }
.contact-icon { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; color: #1976d2; background: rgba(25, 118, 210, .2); flex-shrink: 0; }
.contact-details { display: flex; flex-direction: column; gap: .2rem; }
.contact-label { font-size: .8rem; color: #999; }
.contact-link { color: #fff; font-weight: 600; text-decoration: none; }
.contact-text { color: #ccc; font-size: .9rem; }
.hours-title { margin-bottom: .8rem; font-size: 1rem; font-weight: 600; }
.hours-item { display: flex; justify-content: space-between; margin-bottom: .5rem; font-size: .85rem; }
.hours-day { color: #ccc; }
.hours-time { font-weight: 500; }
.trust-bar { padding: 2rem 0; background: rgba(0, 0, 0, .3); border-top: 1px solid rgba(255, 255, 255, .1); }
.trust-container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.trust-items { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
.trust-item { display: flex; align-items: center; gap: 1rem; padding: 1.5rem; border-radius: 12px; background: rgba(255, 255, 255, .05); border: 1px solid rgba(255, 255, 255, .1); transition: all .3s; }
.trust-item:hover { background: rgba(255, 255, 255, .08); transform: translateY(-3px); }
.trust-icon { display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, #1976d2, #42a5f5); flex-shrink: 0; }
.trust-text { display: flex; flex-direction: column; gap: .2rem; }
.trust-title { font-size: 1rem; font-weight: 600; }
.trust-desc { font-size: .8rem; color: #ccc; }
.footer-bottom { padding: 1.5rem 0; background: rgba(0, 0, 0, .5); border-top: 1px solid rgba(255, 255, 255, .1); }
.footer-bottom-container { display: flex; align-items: center; justify-content: space-between; gap: 2rem; max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.copyright p { margin: 0 0 .3rem; font-size: .85rem; color: #ccc; }
.copyright p.legal-notice { font-size: .75rem; color: #999; }
.security-badges { display: flex; gap: .5rem; }
.security-badge-item { display: flex; align-items: center; gap: .3rem; padding: .3rem .8rem; border-radius: 15px; font-size: .7rem; font-weight: 600; color: #4caf50; background: rgba(76, 175, 80, .2); border: 1px solid rgba(76, 175, 80, .3); }

@keyframes headerFloat { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-10px) rotate(5deg); } }
@keyframes footerFloat {
  0%, 100% { transform: translateY(0) rotate(0); }
  33% { transform: translateY(-8px) rotate(2deg); }
  66% { transform: translateY(-4px) rotate(-1deg); }
}

@media (max-width: 1200px) { .header-toolbar { padding: 0 1rem 0 0; } .desktop-nav { gap: 1.5rem; margin: 0 1rem; } }
@media (max-width: 992px) {
  .desktop-nav, .desktop-only { display: none !important; }
  .mobile-menu-btn { display: inline-flex; }
  .header-toolbar { height: 70px; }
  .header-right { gap: .5rem; }
  .footer-container { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
@media (max-width: 768px) {
  .logo-image { height: 35px; }
  .footer-container { grid-template-columns: 1fr; padding: 0 1rem; }
  .footer-main { padding: 3rem 0 1.5rem; }
  .trust-container { padding: 0 1rem; }
  .trust-items { grid-template-columns: 1fr; gap: 1rem; }
  .footer-bottom-container { flex-direction: column; text-align: center; padding: 0 1rem; }
}
</style>