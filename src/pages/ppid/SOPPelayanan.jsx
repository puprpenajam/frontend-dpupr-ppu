import FadeIn from '../../components/FadeIn';

const SOPPelayanan = () => {
  return (
    <div className="mb-8">
      <FadeIn>
      <h2 className="text-2xl font-bold text-dpupr-blue mb-6">Standar Operasional Prosedur (SOP) Pelayanan PPID</h2>
      
      {/* Introduction */}
      </FadeIn>

      <FadeIn delay={100}>
      <div className="bg-gradient-to-r from-dpupr-blue to-blue-600 rounded-xl p-6 mb-8" style={{ color: '#ffffff' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>ðŸ“Š Tentang SOP Pelayanan</h3>
        <p className="leading-relaxed" style={{ color: '#ffffff' }}>
          Standar Operasional Prosedur (SOP) Pelayanan PPID adalah pedoman tertulis yang berisi tahapan-tahapan 
          pelayanan informasi publik yang harus dilaksanakan oleh petugas PPID untuk memberikan pelayanan yang 
          terstandar, cepat, tepat, dan berkualitas kepada masyarakat yang membutuhkan informasi publik.
        </p>
      </div>
      </FadeIn>

      {/* SOP Permohonan Informasi */}
      <FadeIn delay={200}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">A. SOP Permohonan Informasi Publik</h3>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-800 mb-2">Penerimaan Permohonan</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Waktu:</strong> Setiap hari kerja jam 08:00 - 15:00</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Petugas:</strong> Admin PPID / Petugas Informasi</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Aktivitas:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>â€¢ Menerima formulir permohonan informasi dari pemohon</li>
                  <li>â€¢ Memeriksa kelengkapan dokumen (KTP, formulir, dll)</li>
                  <li>â€¢ Memberikan tanda terima permohonan</li>
                  <li>â€¢ Mencatat dalam buku register permohonan</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2"><strong>Output:</strong> Tanda bukti penerimaan permohonan</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-5 border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-800 mb-2">Verifikasi dan Penelitian</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Waktu:</strong> Maksimal 1 hari kerja</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Petugas:</strong> Koordinator PPID</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Aktivitas:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>â€¢ Memverifikasi kelengkapan dan keabsahan dokumen</li>
                  <li>â€¢ Meneliti substansi informasi yang diminta</li>
                  <li>â€¢ Mengecek apakah informasi termasuk kategori dikecualikan atau tidak</li>
                  <li>â€¢ Menentukan ketersediaan informasi</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2"><strong>Output:</strong> Hasil verifikasi (lengkap/tidak lengkap)</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-5 border-l-4 border-purple-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 mb-2">Pengumpulan dan Pengolahan Informasi</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Waktu:</strong> Maksimal 7 hari kerja</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Petugas:</strong> Tim Teknis/Bidang Terkait</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Aktivitas:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>â€¢ Mengumpulkan data dan informasi yang diminta</li>
                  <li>â€¢ Mengolah dan menyusun informasi</li>
                  <li>â€¢ Melakukan pengaburan (jika diperlukan)</li>
                  <li>â€¢ Menyiapkan dokumen sesuai format yang diminta</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2"><strong>Output:</strong> Dokumen informasi yang diminta</p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-5 border-l-4 border-orange-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h4 className="font-bold text-orange-800 mb-2">Penyampaian Informasi</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Waktu:</strong> Maksimal 10 hari kerja (sejak permohonan diterima)</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Petugas:</strong> Admin PPID</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Aktivitas:</strong></p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>â€¢ Menghubungi pemohon untuk penyerahan informasi</li>
                  <li>â€¢ Menyerahkan informasi sesuai pilihan pemohon (soft/hard copy)</li>
                  <li>â€¢ Meminta tanda terima dari pemohon</li>
                  <li>â€¢ Mencatat dalam buku register penyerahan</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2"><strong>Output:</strong> Informasi tersampaikan kepada pemohon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* SOP Keberatan */}
      <FadeIn delay={300}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">B. SOP Penanganan Keberatan</h3>
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-600">
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-red-800 mb-1">1. Penerimaan Keberatan (Hari ke-0)</p>
              <p>Petugas menerima pengajuan keberatan secara tertulis dari pemohon dan memberikan tanda terima</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 mb-1">2. Verifikasi Keberatan (1-2 hari kerja)</p>
              <p>Koordinator PPID memverifikasi alasan keberatan dan kelengkapan dokumen pendukung</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 mb-1">3. Penelaahan dan Kajian (3-25 hari kerja)</p>
              <p>Atasan PPID meneliti alasan keberatan, mengkaji ulang keputusan, dan berkonsultasi dengan pihak terkait</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 mb-1">4. Putusan Keberatan (Maksimal 30 hari kerja)</p>
              <p>Atasan PPID memberikan putusan tertulis (mengabulkan/menolak) dan menyampaikan kepada pemohon</p>
            </div>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* SOP Dokumentasi */}
      <FadeIn delay={400}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dpupr-blue mb-4">C. SOP Dokumentasi dan Pelaporan</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-teal-50 rounded-lg p-5 border-l-4 border-teal-600">
            <h4 className="font-bold text-teal-800 mb-3">ðŸ“Š Dokumentasi</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>â€¢ Setiap permohonan dicatat dalam buku register</li>
              <li>â€¢ Dokumen disimpan teratur sesuai klasifikasi</li>
              <li>â€¢ Backup digital dilakukan rutin</li>
              <li>â€¢ Arsip dijaga kerahasiaan dan keamanannya</li>
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-lg p-5 border-l-4 border-indigo-600">
            <h4 className="font-bold text-indigo-800 mb-3">ðŸ“ Pelaporan</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>â€¢ Laporan bulanan ke Atasan PPID</li>
              <li>â€¢ Laporan triwulan ke Komisi Informasi</li>
              <li>â€¢ Laporan tahunan dipublikasikan</li>
              <li>â€¢ Evaluasi SOP dilakukan berkala</li>
            </ul>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Prinsip Pelayanan */}
      <FadeIn delay={500}>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500 mb-8">
        <h3 className="text-lg font-bold text-yellow-800 mb-3">â­ Prinsip Pelayanan PPID</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Cepat & Tepat Waktu</p>
            <p className="text-sm text-gray-700">Melayani sesuai batas waktu yang ditentukan peraturan</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Akurat & Benar</p>
            <p className="text-sm text-gray-700">Informasi yang diberikan akurat dan dapat dipertanggungjawabkan</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Ramah & Sopan</p>
            <p className="text-sm text-gray-700">Petugas melayani dengan sikap ramah dan profesional</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Transparan</p>
            <p className="text-sm text-gray-700">Prosedur dan biaya jelas dan terbuka</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Mudah Diakses</p>
            <p className="text-sm text-gray-700">Tersedia berbagai kanal akses informasi</p>
          </div>
          <div>
            <p className="font-semibold text-yellow-700 mb-1">Non-Diskriminatif</p>
            <p className="text-sm text-gray-700">Melayani semua pemohon tanpa membeda-bedakan</p>
          </div>
        </div>
      </div>
      </FadeIn>

      {/* Standar Waktu */}
      <FadeIn delay={600}>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">â±ï¸ Standar Waktu Pelayanan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-dpupr-blue text-white">
              <tr>
                <th className="p-3 text-left">Jenis Layanan</th>
                <th className="p-3 text-left">Standar Waktu</th>
                <th className="p-3 text-left">Perpanjangan</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="p-3">Permohonan Informasi</td>
                <td className="p-3 font-semibold">10 hari kerja</td>
                <td className="p-3">7 hari kerja (dengan pemberitahuan)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Keberatan</td>
                <td className="p-3 font-semibold">30 hari kerja</td>
                <td className="p-3">-</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Informasi Serta Merta</td>
                <td className="p-3 font-semibold">Segera (maksimal 24 jam)</td>
                <td className="p-3">-</td>
              </tr>
              <tr>
                <td className="p-3">Pengaduan</td>
                <td className="p-3 font-semibold">14 hari kerja</td>
                <td className="p-3">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default SOPPelayanan;

