export const bottomNavigation = {
  '.btm-nav': {
    '&-xs': {
      '@apply h-10': {},
      '& > *:where(.active)': {
        '@apply border-t-[1px]': {},
      },
      '.btm-nav-label': {
        '@apply text-xs': {},
      },
    },

    '&-sm': {
      '@apply h-12': {},
      '& > *:where(.active)': {
        '@apply border-t-2': {},
      },
      '.btm-nav-label': {
        '@apply text-xs': {},
      },
    },

    '&-md': {
      '@apply h-16': {},
      '& > *:where(.active)': {
        '@apply border-t-2': {},
      },
      '.btm-nav-label': {
        '@apply text-sm': {},
      },
    },

    '&-lg': {
      '@apply h-20': {},
      '& > *:where(.active)': {
        '@apply border-t-4': {},
      },
      '.btm-nav-label': {
        '@apply text-base': {},
      },
    },
  },
}
