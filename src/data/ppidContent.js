// PPID Content Data - untuk inisialisasi konten halaman PPID
// Dapat digunakan untuk populate localStorage atau sebagai fallback content

export const ppidContentData = {
  // 1. Visi dan Misi PPID
  'visi-misi-ppid': {
    id: 12,
    name: 'Visi dan Misi PPID',
    slug: 'visi-misi-ppid',
    category: 'ppid',
    description: 'Visi dan Misi PPID Dinas PUPR Kabupaten Penajam Paser Utara',
    title: 'Visi dan Misi PPID',
    isPublished: true,
    contentBlocks: [
      {
        id: Date.now(),
        type: 'text',
        content: `
          <h2 class="text-2xl font-bold text-dpupr-blue mt-8 mb-4">Visi</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Terwujudnya penyelenggaraan pemerintahan yang baik, transparan, efektif dan efisien, akuntabel 
            serta meningkatkan pengelolaan dan pelayanan informasi dan dokumentasi di Pemerintah Kabupaten 
            untuk menghasilkan layanan informasi dan dokumentasi yang berkualitas.
          </p>
          
          <h2 class="text-2xl font-bold text-dpupr-blue mt-8 mb-4">Misi</h2>
          <p class="text-gray-700 leading-relaxed mb-2">
            <strong class="text-dpupr-blue font-semibold">a)</strong> Menghimpun informasi publik dari seluruh 
            Bidang dan UPT PU di lingkungan Dinas PUPR Kabupaten Penajam Paser Utara;
          </p>
          <p class="text-gray-700 leading-relaxed mb-2">
            <strong class="text-dpupr-blue font-semibold">b)</strong> Menata dan menyimpan informasi publik dari 
            seluruh Bidang dan UPT PU di lingkungan Dinas PUPR Kabupaten Penajam Paser Utara;
          </p>
          <p class="text-gray-700 leading-relaxed mb-2">
            <strong class="text-dpupr-blue font-semibold">c)</strong> Melaksanakan konsultasi informasi publik 
            kategori dikecualikan dari informasi yang terbuka untuk publik;
          </p>
          <p class="text-gray-700 leading-relaxed mb-2">
            <strong class="text-dpupr-blue font-semibold">d)</strong> Mengelesaikan sengketa informasi.
          </p>
        `
      }
    ]
  },

  // 2. Maklumat Pelayanan Informasi Publik
  'maklumat-pelayanan': {
    id: 13,
    name: 'Maklumat Pelayanan Informasi Publik',
    slug: 'maklumat-pelayanan',
    category: 'ppid',
    description: 'Maklumat Pelayanan Informasi Publik PPID Dinas PUPR',
    title: 'Maklumat Pelayanan Informasi Publik',
    isPublished: true,
    contentBlocks: [
      {
        id: Date.now() + 1,
        type: 'text',
        content: `
          <div class="mb-8">
            <p class="text-gray-700 leading-relaxed mb-6">
              Mewujudkan tata kelola pemerintahan yang transparan dan akuntabel, Dinas Pekerjaan Umum dan 
              Penataan Ruang Kabupaten Penajam Paser Utara berupaya memberikan pelayanan informasi dengan 
              sebaik-baiknya dan berkomitmen untuk:
            </p>
            
            <ol class="list-decimal ml-6 space-y-4">
              <li class="text-gray-700 leading-relaxed">
                <strong>Memberikan Informasi Publik sesuai dengan peraturan yang berlaku (UU No. 14 Tahun 2008);</strong>
              </li>
              <li class="text-gray-700 leading-relaxed">
                <strong>Menyediakan Informasi Publik yang akurat, benar dan tidak menyesatkan;</strong>
              </li>
              <li class="text-gray-700 leading-relaxed">
                <strong>Memberikan layanan informasi, memanfaatkan Teknologi Informasi yang mudah diakses masyarakat;</strong>
              </li>
              <li class="text-gray-700 leading-relaxed">
                <strong>Tidak Melakukan pungutan yang tidak sah dalam memberikan layanan Informasi Publik.</strong>
              </li>
            </ol>
          </div>
        `
      }
    ]
  },

  // 3. Formulir Permohonan Informasi Publik
  'formulir-permohonan': {
    id: 15,
    name: 'Formulir Permohonan Informasi Publik',
    slug: 'formulir-permohonan',
    category: 'ppid',
    description: 'Formulir Permohonan Informasi Publik PPID Dinas PUPR',
    title: 'Formulir Permohonan Informasi Publik',
    isPublished: true,
    contentBlocks: [
      {
        id: Date.now() + 2,
        type: 'text',
        content: `
          <div class="mb-8">
            <p class="text-gray-700 leading-relaxed mb-6">
              Untuk mengajukan permohonan informasi publik, masyarakat dapat mengisi formulir permohonan 
              yang telah disediakan oleh PPID Kabupaten Penajam Paser Utara.
            </p>
            
            <div class="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <h3 class="text-xl font-bold text-[#2C3E7D] mb-4">Akses Formulir Permohonan</h3>
              <p class="text-gray-700 mb-4">
                Formulir permohonan informasi publik dapat diakses melalui portal PPID Kabupaten Penajam Paser Utara.
              </p>
              <a 
                href="https://ppidppu.penajamkab.go.id/layanan/formulir_permohonan" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 font-bold px-6 py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                style="color: #ffffff !important; text-decoration: none;"
              >
                <svg xmlns="http://www.w3.org/2000/svg" style="color: #ffffff;" class="h-6 w-6" viewBox="0 0 20 20" fill="white">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                </svg>
                <span style="color: #ffffff !important; font-size: 16px; font-weight: bold;">Buka Formulir Permohonan</span>
              </a>
            </div>

            <div class="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <h3 class="text-lg font-bold text-yellow-800 mb-3">Informasi Penting:</h3>
              <ul class="list-disc ml-6 space-y-2 text-gray-700">
                <li>Formulir harus diisi dengan lengkap dan benar</li>
                <li>Lampirkan dokumen identitas yang masih berlaku (KTP/SIM/Paspor)</li>
                <li>Permohonan akan diproses sesuai dengan ketentuan yang berlaku</li>
                <li>Anda akan mendapatkan tanda bukti penerimaan permohonan</li>
              </ul>
            </div>
          </div>
        `
      }
    ]
  },

  // 4. Tata Cara Permohonan Informasi Publik
  'tata-cara-permohonan': {
    id: 16,
    name: 'Tata Cara Permohonan Informasi Publik',
    slug: 'tata-cara-permohonan',
    category: 'ppid',
    description: 'Tata Cara Permohonan Informasi Publik PPID Dinas PUPR',
    title: 'Tata Cara Permohonan Informasi Publik',
    isPublished: true,
    contentBlocks: [
      {
        id: Date.now() + 3,
        type: 'text',
        content: `
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-dpupr-blue mb-6">Alur Permohonan Informasi Publik</h2>
            
            <div class="space-y-6">
              <!-- Step 1 -->
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-dpupr-blue">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-dpupr-blue text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-dpupr-blue mb-2">Pemohon Mengajukan Permohonan</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Pemohon mengajukan permohonan informasi secara online melalui Portal PPID 
                      (<a href="https://ppidppu.penajamkab.go.id" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">ppidppu.penajamkab.go.id</a>) 
                      dengan melengkapi syarat dan mengisi formulir permohonan.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-green-700 mb-2">Petugas Mengecek Kelengkapan Syarat Permohonan</h3>
                    <p class="text-gray-700 leading-relaxed mb-3">
                      Petugas memeriksa kelengkapan dokumen dan syarat permohonan yang diajukan.
                    </p>
                    <div class="grid md:grid-cols-2 gap-3">
                      <div class="bg-white/80 p-3 rounded-lg">
                        <p class="font-semibold text-green-700 mb-1">✓ Lengkap</p>
                        <p class="text-sm text-gray-600">Lanjut ke proses selanjutnya</p>
                      </div>
                      <div class="bg-white/80 p-3 rounded-lg">
                        <p class="font-semibold text-red-600 mb-1">✗ Tidak Lengkap</p>
                        <p class="text-sm text-gray-600">Dikembalikan untuk dilengkapi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-purple-700 mb-2">Pejabat Menerima dan Registrasi Permohonan</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Pejabat PPID menerima dan meregistrasi permohonan yang telah memenuhi syarat. 
                      Hari kerja dan tanggal dihitung sejak permohonan terdaftar.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-orange-700 mb-2">Permohonan Diteruskan ke Pimpinan</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Permohonan diteruskan ke pimpinan untuk mendapatkan persetujuan dan arahan terkait 
                      informasi yang dimohonkan.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 5 -->
              <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-yellow-700 mb-2">Proses Sengketa Informasi di Komisi Informasi</h3>
                    <p class="text-gray-700 leading-relaxed mb-3">
                      Jika terjadi sengketa, proses dapat dilakukan di Komisi Informasi dengan diskusi temuan 
                      di Samarinda.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 6 -->
              <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                    6
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-red-700 mb-2">Penolakan Permohonan Sengketa</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Jika permohonan sengketa ditolak, pemohon akan diberikan pemberitahuan resmi.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 7 -->
              <div class="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                    7
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-teal-700 mb-2">Permohonan Diterima - Keberatan</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Jika permohonan diterima, pemohon dapat mengajukan keberatan jika tidak puas 
                      dengan informasi yang diberikan.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 8 -->
              <div class="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border-l-4 border-indigo-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    8
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-indigo-700 mb-2">Keberatan di Proses 30 Hari Kerja</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Keberatan akan diproses maksimal 30 hari kerja sejak diterimanya pengajuan keberatan.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 9 -->
              <div class="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 border-l-4 border-pink-600">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                    9
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-pink-700 mb-2">Permohonan Selesai</h3>
                    <p class="text-gray-700 leading-relaxed">
                      Permohonan telah selesai diproses dan informasi diberikan kepada pemohon 
                      sesuai dengan ketentuan yang berlaku.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Waktu Proses -->
            <div class="mt-8 bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6" style="color: white;">
              <h3 class="text-xl font-bold mb-4" style="color: white;">⏰ Waktu Proses Permohonan</h3>
              <ul class="space-y-2" style="color: white;">
                <li class="flex items-start gap-2" style="color: white;">
                  <span class="flex-shrink-0" style="color: white;">•</span>
                  <span style="color: white;">Permohonan informasi diproses maksimal <strong style="color: white;">10 hari kerja</strong> sejak permohonan diterima</span>
                </li>
                <li class="flex items-start gap-2" style="color: white;">
                  <span class="flex-shrink-0" style="color: white;">•</span>
                  <span style="color: white;">Dapat diperpanjang maksimal <strong style="color: white;">7 hari kerja</strong> dengan pemberitahuan tertulis</span>
                </li>
                <li class="flex items-start gap-2" style="color: white;">
                  <span class="flex-shrink-0" style="color: white;">•</span>
                  <span style="color: white;">Keberatan diproses maksimal <strong style="color: white;">30 hari kerja</strong></span>
                </li>
              </ul>
            </div>
          </div>
        `
      }
    ]
  }
};

// Function to initialize PPID content in localStorage
export const initializePPIDContent = () => {
  const savedPages = localStorage.getItem('kontenPages');
  
  if (savedPages) {
    const pages = JSON.parse(savedPages);
    
    // Update pages with PPID content
    const updatedPages = pages.map(page => {
      if (ppidContentData[page.slug]) {
        return {
          ...page,
          contentBlocks: ppidContentData[page.slug].contentBlocks
        };
      }
      return page;
    });
    
    localStorage.setItem('kontenPages', JSON.stringify(updatedPages));
    console.log('PPID content initialized successfully');
    return true;
  }
  
  return false;
};

export default ppidContentData;
