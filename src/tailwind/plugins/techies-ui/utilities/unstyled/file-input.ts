export const fileInput = {
  '.file-input': {
    '&-xs': {
      '@apply pr-2 text-xs leading-relaxed h-6': {},
      '&::file-selector-button': {
        '@apply mr-2 h-[1.375rem] min-h-[1.375rem]': {},
        'font-size': '0.75rem',
      },
    },

    '&-sm': {
      '@apply pr-3 text-sm leading-loose h-8': {},
      '&::file-selector-button': {
        '@apply mr-3 h-[1.875rem] min-h-[1.875rem]': {},
        'font-size': '0.875rem',
      },
    },

    '&-md': {
      '@apply pr-4 text-sm leading-loose h-12': {},
      '&::file-selector-button': {
        '@apply mr-4 h-[2.875rem] min-h-[2.875rem]': {},
        'font-size': '0.875rem',
      },
    },

    '&-lg': {
      '@apply pr-6 text-lg leading-loose h-16': {},
      '&::file-selector-button': {
        '@apply mr-6 h-[3.875rem] min-h-[3.875rem]': {},
        'font-size': '1.125rem',
      },
    },
  },
}
