const STORAGE_KEY = 'layananPublikRequests';
const SEKRETARIAT_MESSAGE = 'Permohonan Anda diterima dan akan dihubungi via WhatsApp';

const sekretariatCategory = {
  value: 'sekretariat-umum',
  label: 'Form Lainnya'
};

const categoryOptions = [
  {
    value: 'cipta-karya',
    label: 'Form Cipta Karya',
    autoKeywords: ['bangun', 'gedung', 'kantor', 'air minum', 'sanitasi', 'permukiman'],
    recommendationTemplate: 'Permohonan Anda diterima. Silakan isi Form Cipta Karya melalui tautan berikut agar dapat diproses oleh bidang terkait.'
  },
  {
    value: 'psda',
    label: 'Form PSDA',
    autoKeywords: ['selokan', 'drainase', 'banjir', 'sungai', 'irigasi', 'air'],
    recommendationTemplate: 'Permohonan Anda diterima. Silakan isi Form PSDA melalui tautan berikut agar dapat ditindaklanjuti oleh tim teknis.'
  },
  {
    value: 'bina-marga',
    label: 'Form Bina Marga',
    autoKeywords: ['jalan', 'jembatan', 'aspal', 'rusak jalan'],
    recommendationTemplate: 'Permohonan Anda diterima. Silakan isi Form Bina Marga melalui tautan berikut untuk proses verifikasi lanjutan.'
  },
  {
    value: 'tata-ruang',
    label: 'Form Tata Ruang',
    autoKeywords: ['tata ruang', 'fungsi lahan', 'peruntukan lahan', 'persetujuan ruang', 'lahan'],
    recommendationTemplate: 'Permohonan Anda diterima. Silakan isi Form Tata Ruang melalui tautan berikut untuk proses verifikasi tata ruang.'
  },
  {
    value: 'bina-konstruksi',
    label: 'Form Bina Konstruksi',
    autoKeywords: ['jasa konstruksi', 'konstruksi', 'pengawasan konstruksi', 'konsultasi proyek', 'registrasi jasa'],
    recommendationTemplate: 'Permohonan Anda diterima. Silakan isi Form Bina Konstruksi melalui tautan berikut untuk proses tindak lanjut.'
  },
  {
    value: 'upt-lab-alat-berat',
    label: 'Form UPT PU Lab dan Alat Berat',
    autoKeywords: ['alat berat', 'uji material', 'pengujian material', 'laboratorium', 'sewa alat'],
    recommendationTemplate: 'Permohonan Anda diterima. Silakan isi Form UPT PU Lab dan Alat Berat melalui tautan berikut untuk proses tindak lanjut.'
  }
];

const categoryLinks = {
  'sekretariat-umum': '',
  'cipta-karya': 'https://pupr-penajamkab.vercel.app/layanan-publik/form-cipta-karya',
  psda: 'https://pupr-penajamkab.vercel.app/layanan-publik/form-psda',
  'bina-marga': 'https://pupr-penajamkab.vercel.app/layanan-publik/form-bina-marga',
  'tata-ruang': 'https://pupr-penajamkab.vercel.app/layanan-publik/form-tata-ruang',
  'bina-konstruksi': 'https://pupr-penajamkab.vercel.app/layanan-publik/form-bina-konstruksi',
  'upt-lab-alat-berat': 'https://pupr-penajamkab.vercel.app/layanan-publik/form-upt-lab-alat-berat'
};

const toPlainText = (input = '') => input.toString().toLowerCase().trim();
const trimRecommendationLink = (text = '') => text.replace(/\s*Link form:\s*https?:\/\/\S+\s*$/i, '').trim();

export const normalizePhoneForWhatsApp = (phone = '') => {
  const digits = phone.toString().replace(/\D/g, '');
  if (!digits) {
    return '';
  }

  if (digits.startsWith('62')) {
    return digits;
  }

  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }

  return digits;
};

export const getWhatsAppLink = (phone = '') => {
  const normalized = normalizePhoneForWhatsApp(phone);
  return normalized ? `https://wa.me/${normalized}` : '';
};

const readRequests = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Gagal membaca data layanan publik:', error);
    return [];
  }
};

const saveRequests = (requests) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

const normalizeLegacyRequest = (request) => {
  const normalizedAdminNote = trimRecommendationLink(request.adminNote || '').replace(
    'Permohonan Anda diterima dan langsung diarahkan ke sekretariat/umum untuk proses tindak lanjut.',
    SEKRETARIAT_MESSAGE
  );
  const normalizedAiRecommendationText = trimRecommendationLink(request.aiRecommendationText || '').replace(
    'Permohonan Anda diterima dan langsung diarahkan ke sekretariat/umum untuk proses tindak lanjut.',
    SEKRETARIAT_MESSAGE
  );

  const migratedBase = {
    ...request,
    sourceForm: request.sourceForm || 'form-layanan-publik',
    buktiFileName: request.buktiFileName || request.suratFileName || '',
    buktiFileType: request.buktiFileType || request.suratFileType || '',
    buktiFileData: request.buktiFileData || request.suratFileData || '',
    adminNote: normalizedAdminNote,
    aiRecommendationText: normalizedAiRecommendationText
  };

  if (request.assignedCategory !== 'layanan-umum') {
    return migratedBase;
  }

  const aiSummaryText = request.aiSummary || '';
  const updatedAiSummary = aiSummaryText.includes('dipetakan ke Form Layanan Publik')
    ? aiSummaryText.replace('dipetakan ke Form Layanan Publik.', 'langsung diarahkan ke sekretariat/umum.')
    : `Deteksi awal AI: keperluan "${request.keperluan}" langsung diarahkan ke sekretariat/umum.`;

  return {
    ...migratedBase,
    assignedCategory: sekretariatCategory.value,
    assignedFormLink: '',
    aiRecommendationText: SEKRETARIAT_MESSAGE,
    adminNote:
      request.adminNote?.includes('layanan-umum')
        ? SEKRETARIAT_MESSAGE
        : request.adminNote,
    aiSummary: updatedAiSummary
  };
};

export const getLayananCategories = () => categoryOptions;
export const getLayananCategoryLinks = () => categoryLinks;
export const getSekretariatCategory = () => sekretariatCategory;

export const detectLayananCategory = (textInput = '') => {
  const text = toPlainText(textInput);

  for (const category of categoryOptions) {
    const isMatched = category.autoKeywords.some((keyword) => text.includes(keyword));
    if (isMatched) {
      return category.value;
    }
  }

  return 'sekretariat-umum';
};

export const buildAIRecommendation = (category, detectedKeperluan) => {
  const isSekretariat = category === sekretariatCategory.value;
  const categoryInfo = categoryOptions.find((item) => item.value === category) || sekretariatCategory;
  const destinationLink = categoryLinks[categoryInfo.value] || '';

  if (isSekretariat) {
    return {
      category: sekretariatCategory.value,
      recommendationText: SEKRETARIAT_MESSAGE,
      destinationLink: '',
      aiSummary: `Deteksi awal AI: keperluan "${detectedKeperluan}" langsung diarahkan ke sekretariat/umum.`
    };
  }

  return {
    category: categoryInfo.value,
    recommendationText: categoryInfo.recommendationTemplate,
    destinationLink,
    aiSummary: `Deteksi awal AI: keperluan "${detectedKeperluan}" dipetakan ke ${categoryInfo.label}.`
  };
};

export const createLayananRequest = (payload) => {
  const keperluanGabungan = `${payload.keperluan || ''} ${payload.deskripsiTambahan || ''}`;
  const aiDetectedCategory = detectLayananCategory(keperluanGabungan);
  const recommendation = buildAIRecommendation(aiDetectedCategory, payload.keperluan);

  const whatsappLink = getWhatsAppLink(payload.nomorHp);

  const request = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'proses',
    nama: payload.nama.trim(),
    instansi: payload.instansi?.trim() || '-',
    alamat: payload.alamat.trim(),
    nomorHp: payload.nomorHp.trim(),
    whatsappLink,
    keperluan: payload.keperluan.trim(),
    deskripsiTambahan: payload.deskripsiTambahan?.trim() || '-',
    buktiFileName: payload.buktiFileName,
    buktiFileType: payload.buktiFileType,
    buktiFileData: payload.buktiFileData,
    sourceForm: 'form-layanan-publik',
    aiDetectedCategory,
    assignedCategory: aiDetectedCategory,
    assignedFormLink: recommendation.destinationLink,
    aiRecommendationText: recommendation.recommendationText,
    adminNote: recommendation.recommendationText,
    aiSummary: recommendation.aiSummary,
    handledBy: 'AI',
    history: [
      {
        timestamp: new Date().toISOString(),
        actor: 'System AI',
        action: 'Permohonan dibuat dan dideteksi otomatis'
      }
    ]
  };

  const current = readRequests();
  const updated = [request, ...current];
  saveRequests(updated);

  return request;
};

export const getLayananRequests = () => {
  const normalized = readRequests().map(normalizeLegacyRequest);
  saveRequests(normalized);
  return normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const updateLayananRequest = (id, patchData, actor = 'Admin') => {
  const requests = readRequests();

  const updatedRequests = requests.map((request) => {
    if (request.id !== id) {
      return request;
    }

    const updatedRequest = {
      ...request,
      ...patchData,
      updatedAt: new Date().toISOString(),
      handledBy: actor,
      history: [
        ...(request.history || []),
        {
          timestamp: new Date().toISOString(),
          actor,
          action: patchData.historyAction || 'Data permohonan diperbarui'
        }
      ]
    };

    return updatedRequest;
  });

  saveRequests(updatedRequests);
  return updatedRequests;
};

export const deleteLayananRequest = (id) => {
  const requests = readRequests();
  const updated = requests.filter((request) => request.id !== id);
  saveRequests(updated);
  return updated;
};

export const getCategoryLabel = (value) => {
  if (value === sekretariatCategory.value) {
    return sekretariatCategory.label;
  }
  return categoryOptions.find((item) => item.value === value)?.label || 'Lainnya';
};
