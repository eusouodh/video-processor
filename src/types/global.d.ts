declare module 'framer-motion' {
  export * from 'framer-motion/types';
}

declare module 'react-router-dom' {
  export * from 'react-router-dom/types';
}

declare module 'lucide-react' {
  export * from 'lucide-react/dist/esm';
}

declare module 'react-i18next' {
  export * from 'react-i18next/types';
}

declare module 'react-select' {
  export * from 'react-select/types';
}

declare module 'react-datepicker' {
  export * from 'react-datepicker/types';
}

declare module 'react-toastify' {
  export * from 'react-toastify/types';
}

declare module 'react-dropzone' {
  export * from 'react-dropzone/types';
}

declare module '@ffmpeg/ffmpeg' {
  export class FFmpeg {
    load(): Promise<void>;
    writeFile(name: string, data: Uint8Array): Promise<void>;
    readFile(name: string): Promise<Uint8Array>;
    exec(args: string[]): Promise<void>;
  }
}

declare module '@ffmpeg/util' {
  export function fetchFile(file: File): Promise<Uint8Array>;
}

declare module 'i18next' {
  export * from 'i18next/types';
}

declare module 'i18next-browser-languagedetector' {
  export * from 'i18next-browser-languagedetector/types';
}

declare module 'clsx' {
  export default function clsx(...inputs: any[]): string;
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: any[]): string;
}

declare module 'zustand' {
  export * from 'zustand/types';
}

declare module 'zustand/middleware' {
  export * from 'zustand/middleware/types';
}

declare module '@aws-sdk/client-s3' {
  export * from '@aws-sdk/client-s3/types';
}

declare module '@aws-sdk/lib-storage' {
  export * from '@aws-sdk/lib-storage/types';
}

declare module 'uuid' {
  export function v4(): string;
}

// Declarações de tipos para parâmetros implícitos
declare type AnyFunction = (...args: any[]) => any;
declare type AnyObject = { [key: string]: any };
declare type AnyArray = any[]; 