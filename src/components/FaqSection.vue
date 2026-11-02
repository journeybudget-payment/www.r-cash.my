<template>
  <section class="faq-section" id="faq">
    <div class="faq-wrapper">
      <div class="faq-header">
        <div class="sec-label"><q-icon name="help_outline" size="13px" />FAQ</div>
        <h2 class="sec-title">Soalan Lazim</h2>
        <p class="sec-sub">Bantuan tersedia bila-bila masa anda memerlukannya</p>
      </div>

      <div class="faq-list">
        <div v-for="(item, i) in items" :key="i" class="faq-item">
          <div class="fq" :class="{ active: open === i }" @click="toggle(i)">
            <span class="fq-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="fq-text">{{ item.q }}</h3>
            <div class="fq-icon-wrap"><q-icon name="keyboard_arrow_down" class="fq-icon" size="20px" /></div>
          </div>
          <div v-show="open === i" class="fq-answer">
            <div class="fq-body" v-html="item.a" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(-1)
const toggle = (i) => { open.value = open.value === i ? -1 : i }

const items = [
  {
    q: 'Siapa yang boleh memohon pinjaman?',
    a: 'R Cash menawarkan perkhidmatan pinjaman kepada pelanggan yang memenuhi kriteria berikut:<ul><li>Pemohon mestilah berumur antara 20 dan 60 tahun</li><li>Pemohon sepatutnya sedang bekerja</li><li>Pemohon mesti mempunyai alamat kediaman yang sah di Malaysia</li></ul>Kriteria kelayakan ini memastikan perkhidmatan pinjaman diberikan kepada individu yang memenuhi keperluan yang ditetapkan.'
  },
  {
    q: 'Dokumen apa yang saya perlukan untuk permohonan pinjaman?',
    a: 'Untuk melengkapkan permohonan pinjaman anda, anda perlu menyediakan MyKad (NRIC) atau dokumen pengenalan lain seperti yang ditetapkan oleh pemberi pinjam. Dokumen ini diperlukan untuk pengesahan identiti dan untuk memastikan anda memenuhi kriteria kelayakan untuk pinjaman.'
  },
  {
    q: 'Bagaimana saya akan tahu jika pinjaman saya diluluskan?',
    a: 'Sebaik sahaja pinjaman peribadi anda diluluskan, status akan dikemas kini terus di laman web kami. Hanya log masuk ke akaun anda untuk melihat status terkini permohonan anda, bersama-sama dengan maklumat dan arahan yang diperlukan mengenai langkah seterusnya untuk melengkapkan proses pinjaman.'
  },
  {
    q: 'Berapa lama masa yang diperlukan untuk menerima pinjaman?',
    a: 'Kami berusaha untuk menyediakan proses pengeluaran pinjaman yang cepat dan cekap. Sebaik sahaja pinjaman anda diluluskan, kami berhasrat untuk memproses dan mengeluarkan dana dalam masa 24 jam. Status akan dikemas kini di laman web kami sebaik sahaja wang tunai berjaya dipindahkan.'
  },
  {
    q: 'Kaedah apa yang boleh saya gunakan untuk membayar balik pinjaman?',
    a: 'Membayar balik pinjaman anda dipermudahkan dengan pelbagai pilihan pembayaran:<ul><li>Pemindahan perbankan dalam talian</li><li>Pembayaran E-Wallet (Touch \'n Go, GrabPay, dll.)</li><li>Pemindahan DuitNow</li><li>Deposit kaunter bank</li></ul>Anda boleh memilih kaedah yang paling sesuai untuk anda.'
  },
  {
    q: 'Bolehkah saya bayar awal pinjaman?',
    a: 'Ya! Anda mempunyai pilihan untuk bayar awal pinjaman anda tanpa dikenakan sebarang penalti atau caj tambahan. Kami menggalakkan pengurusan kewangan yang bertanggungjawab, dan jika anda berada dalam kedudukan untuk membayar balik pinjaman anda sebelum tarikh matang, anda bebas berbuat demikian.'
  },
  {
    q: 'Adakah terdapat kos dan caj lain?',
    a: 'Ya, sebagai tambahan kepada faedah dan sebarang caj pembayaran lewat, terdapat yuran berkanun tertentu:<ul><li><strong>Duti Setem:</strong> Yuran yang dikenakan oleh kerajaan yang perlu dibayar atas perjanjian pinjaman.</li><li><strong>Kos Undang-undang:</strong> Dalam sesetengah kes, kos undang-undang mungkin ditanggung semasa proses permohonan.</li></ul>'
  },
  {
    q: 'Bolehkah saya mengambil pinjaman lain?',
    a: 'Jika anda ingin mengambil pinjaman lain, anda boleh memohon dalam talian dengan mudah melalui laman web kami. Kami mengalu-alukan pinjaman berulang, dan sebagai peminjam dengan sejarah pembayaran yang baik di R Cash, kami telah memudahkan untuk anda memohon semula.'
  }
]
</script>

<style scoped lang="scss">
.faq-section { padding: 6rem 2rem; background: #f3f0f7; @media (max-width: 768px) { padding: 4rem 1.25rem; } }
.faq-wrapper { max-width: 720px; margin: 0 auto; }
.faq-header { text-align: center; margin-bottom: 3rem; }
.faq-list { display: flex; flex-direction: column; gap: .75rem; text-align: left; }
.faq-item {
  background: #fff; border: 1px solid #d8cfe6; border-radius: 16px; overflow: hidden; transition: all .3s;
  &:has(.fq.active) { border-color: rgba(139, 92, 246, .35); box-shadow: 0 4px 20px rgba(139, 92, 246, .06); }
}
.fq {
  display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; cursor: pointer; transition: background .2s;
  &:hover { background: rgba(139, 92, 246, .02); }
  &.active { background: rgba(139, 92, 246, .04); }
}
.fq-num { flex-shrink: 0; padding: .25rem .6rem; border-radius: 6px; background: rgba(139, 92, 246, .08); color: #8b5cf6; font-size: .72rem; font-weight: 700; }
.fq-text { flex: 1; margin: 0; color: #3a1b5e; font-size: .92rem; font-weight: 700; }
.fq-icon-wrap {
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  width: 28px; height: 28px; border-radius: 8px; background: rgba(139, 92, 246, .06); transition: all .3s;
}
.fq-icon { color: #8b5cf6; transition: transform .3s; }
.fq.active .fq-icon-wrap { background: rgba(139, 92, 246, .12); }
.fq.active .fq-icon { transform: rotate(180deg); }
.fq-body {
  padding: 0 1.5rem 1.5rem 3.5rem; color: #5b2d8e; font-size: .88rem; line-height: 1.7;
  :deep(ul) { margin: .5rem 0; padding-left: 1.25rem; }
  :deep(li) { margin: .25rem 0; }
  :deep(strong) { color: #3a1b5e; font-weight: 600; }
}
</style>