export const select = {
  '.select': {
    '&-md': {
      '@apply h-12 pl-4 pr-10 text-sm leading-loose min-h-12': {},
      '[dir="rtl"] &': {
        '@apply pr-4 pl-10': {},
      },
    },

    '&-lg': {
      '@apply h-16 pl-6 pr-8 text-lg leading-loose min-h-16': {},
      '[dir="rtl"] &': {
        '@apply pr-6 pl-8': {},
      },
    },

    '&-sm': {
      '@apply h-8 pl-3 pr-8 text-sm leading-8 min-h-8 py-0': {},
      '[dir="rtl"] &': {
        '@apply pr-3 pl-8': {},
      },
    },

    '&-xs': {
      '@apply h-6 pl-2 pr-8 text-xs leading-relaxed min-h-6 py-0': {},
      '[dir="rtl"] &': {
        '@apply pr-2 pl-8': {},
      },
    },
  },
}
