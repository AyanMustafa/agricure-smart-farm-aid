import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'hi' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    diagnose: 'Diagnose Crop',
    history: 'Diagnosis History',
    analytics: 'Analytics',
    recommendations: 'Recommendations',
    reports: 'Reports',
    navigation: 'Navigation',
    administration: 'Administration',
    
    // User Management
    manage_users: 'Manage Users',
    ai_models: 'AI Models',
    system_settings: 'System Settings',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    guest: 'Guest',
    
    // Diagnosis
    upload_image: 'Upload Crop Image',
    take_photo: 'Take Photo',
    analyzing: 'Analyzing...',
    analysis_complete: 'Analysis Complete',
    disease_detected: 'Disease Detected',
    healthy_crop: 'Healthy Crop',
    severity: 'Severity',
    affected_area: 'Affected Area',
    confidence: 'Confidence',
    
    // Common
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Status
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  },
  es: {
    // Navigation
    dashboard: 'Panel de Control',
    diagnose: 'Diagnosticar Cultivo',
    history: 'Historial de Diagnósticos',
    analytics: 'Análisis',
    recommendations: 'Recomendaciones',
    reports: 'Informes',
    navigation: 'Navegación',
    administration: 'Administración',
    
    // User Management
    manage_users: 'Gestionar Usuarios',
    ai_models: 'Modelos de IA',
    system_settings: 'Configuración del Sistema',
    profile: 'Perfil',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    guest: 'Invitado',
    
    // Diagnosis
    upload_image: 'Subir Imagen del Cultivo',
    take_photo: 'Tomar Foto',
    analyzing: 'Analizando...',
    analysis_complete: 'Análisis Completo',
    disease_detected: 'Enfermedad Detectada',
    healthy_crop: 'Cultivo Saludable',
    severity: 'Severidad',
    affected_area: 'Área Afectada',
    confidence: 'Confianza',
    
    // Common
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    view: 'Ver',
    search: 'Buscar',
    filter: 'Filtrar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    
    // Status
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    critical: 'Crítico'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    diagnose: 'फसल निदान',
    history: 'निदान इतिहास',
    analytics: 'विश्लेषण',
    recommendations: 'सुझाव',
    reports: 'रिपोर्ट',
    navigation: 'नेविगेशन',
    administration: 'प्रशासन',
    
    // User Management
    manage_users: 'उपयोगकर्ता प्रबंधन',
    ai_models: 'एआई मॉडल',
    system_settings: 'सिस्टम सेटिंग्स',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    guest: 'अतिथि',
    
    // Diagnosis
    upload_image: 'फसल छवि अपलोड करें',
    take_photo: 'फोटो लें',
    analyzing: 'विश्लेषण...',
    analysis_complete: 'विश्लेषण पूर्ण',
    disease_detected: 'बीमारी का पता चला',
    healthy_crop: 'स्वस्थ फसल',
    severity: 'गंभीरता',
    affected_area: 'प्रभावित क्षेत्र',
    confidence: 'विश्वास',
    
    // Common
    submit: 'सबमिट करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    view: 'देखें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    
    // Status
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    critical: 'गंभीर'
  },
  sw: {
    // Navigation
    dashboard: 'Dashibodi',
    diagnose: 'Chunguza Mazao',
    history: 'Historia ya Uchunguzi',
    analytics: 'Uchanganuzi',
    recommendations: 'Mapendekezo',
    reports: 'Ripoti',
    navigation: 'Uongozi',
    administration: 'Utawala',
    
    // User Management
    manage_users: 'Simamia Watumiaji',
    ai_models: 'Mifano ya AI',
    system_settings: 'Mipangilio ya Mfumo',
    profile: 'Wasifu',
    settings: 'Mipangilio',
    logout: 'Toka',
    guest: 'Mgeni',
    
    // Diagnosis
    upload_image: 'Pakia Picha ya Mazao',
    take_photo: 'Piga Picha',
    analyzing: 'Inachanganua...',
    analysis_complete: 'Uchanganuzi Umekamilika',
    disease_detected: 'Ugonjwa Umegunduliwa',
    healthy_crop: 'Mazao Mazuri',
    severity: 'Ukali',
    affected_area: 'Eneo Lililoathiriwa',
    confidence: 'Imani',
    
    // Common
    submit: 'Wasilisha',
    cancel: 'Ghairi',
    save: 'Hifadhi',
    delete: 'Futa',
    edit: 'Hariri',
    view: 'Ona',
    search: 'Tafuta',
    filter: 'Chuja',
    loading: 'Inapakia...',
    error: 'Hitilafu',
    success: 'Mafanikio',
    
    // Status
    low: 'Chini',
    medium: 'Kati',
    high: 'Juu',
    critical: 'Hatari'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}