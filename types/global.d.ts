declare module 'framer-motion'
declare module 'emailjs-com'
declare module 'node-fetch'
declare module 'react'
declare module 'react/jsx-runtime'

// Minimal React/JSX ambient types to avoid TS errors when @types/react isn't installed.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
