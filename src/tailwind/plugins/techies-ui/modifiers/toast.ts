export const toast = {
  '.toast': {
    '@apply gap-2 p-4': {},
    '& > *': {
      animation: 'toast-pop 0.25s ease-out',
    },
  },

  '@keyframes toast-pop': {
    '0%': {
      transform: 'scale(0.9)',
      opacity: 0,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}
