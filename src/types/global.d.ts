declare module 'framer-motion' {
  export const motion: any;
  export * from 'framer-motion/types';
}

declare module 'react-router-dom' {
  export const Link: any;
  export const useNavigate: any;
  export const Navigate: any;
  export * from 'react-router-dom/types';
}

declare module 'lucide-react' {
  export const Youtube: any;
  export const Twitter: any;
  export const Disc: any;
  export const Brain: any;
  export const Scissors: any;
  export const Video: any;
  export const Wand2: any;
  export const ChevronRight: any;
  export const Github: any;
  export const Linkedin: any;
  export const Calendar: any;
  export const Music2: any;
  export const Upload: any;
  export const Share2: any;
  export const Play: any;
  export const Instagram: any;
  export const Facebook: any;
  export const BookText: any;
  export const Check: any;
  export const Settings: any;
  export const Music: any;
  export const X: any;
  export const Share: any;
  export const LogOut: any;
  export * from 'lucide-react/dist/esm';
}

declare module 'react-i18next' {
  export const useTranslation: any;
  export const initReactI18next: any;
  export * from 'react-i18next/types';
}

declare module 'react-select' {
  export const Select: any;
  export * from 'react-select/types';
}

declare module 'react-datepicker' {
  export const DatePicker: any;
  export * from 'react-datepicker/types';
}

declare module 'react-toastify' {
  export const toast: any;
  export * from 'react-toastify/types';
}

declare module 'react-dropzone' {
  export const useDropzone: any;
  export * from 'react-dropzone/types';
}

declare module '@ffmpeg/ffmpeg' {
  export class FFmpeg {
    load(): Promise<void>;
    writeFile(name: string, data: Uint8Array): Promise<void>;
    readFile(name: string): Promise<Uint8Array>;
    exec(args: string[]): Promise<void>;
    initialize(): Promise<void>;
  }
}

declare module '@ffmpeg/util' {
  export function fetchFile(file: File): Promise<Uint8Array>;
}

declare module 'i18next' {
  export const use: any;
  export const language: any;
  export const changeLanguage: any;
  export * from 'i18next/types';
}

declare module 'i18next-browser-languagedetector' {
  export * from 'i18next-browser-languagedetector/types';
}

declare module 'clsx' {
  export type ClassValue = any;
  export default function clsx(...inputs: any[]): string;
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: any[]): string;
}

declare module 'zustand' {
  export const create: any;
  export * from 'zustand/types';
}

declare module 'zustand/middleware' {
  export const persist: any;
  export * from 'zustand/middleware/types';
}

declare module '@aws-sdk/client-s3' {
  export const S3Client: any;
  export * from '@aws-sdk/client-s3/types';
}

declare module '@aws-sdk/lib-storage' {
  export const Upload: any;
  export * from '@aws-sdk/lib-storage/types';
}

declare module 'uuid' {
  export function v4(): string;
}

// Declarações de tipos para parâmetros implícitos
declare type AnyFunction = (...args: any[]) => any;
declare type AnyObject = { [key: string]: any };
declare type AnyArray = any[];

// Declaração do módulo s3Service
declare module './s3Service' {
  export * from './s3Service';
} 