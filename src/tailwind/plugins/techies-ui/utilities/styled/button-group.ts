export const buttonGroup = {
  /* group */
  '.btn-group': {
    '.btn:not(:first-child):not(:last-child)': {
      'border-top-left-radius': 0,
      'border-top-right-radius': 0,
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 0,
    },

    '.btn:first-child:not(:last-child)': {
      '@apply -mt-0 -ml-px': {},
      'border-top-left-radius': 'var(--rounded-btn, 0.5rem)',
      'border-top-right-radius': 0,
      'border-bottom-left-radius': 'var(--rounded-btn, 0.5rem)',
      'border-bottom-right-radius': 0,
    },

    '.btn:last-child:not(:first-child)': {
      'border-top-left-radius': 0,
      'border-top-right-radius': 'var(--rounded-btn, 0.5rem)',
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 'var(--rounded-btn, 0.5rem)',
    },

    '&-horizontal': {
      '.btn:not(:first-child):not(:last-child)': {
        'border-top-left-radius': 0,
        'border-top-right-radius': 0,
        'border-bottom-left-radius': 0,
        'border-bottom-right-radius': 0,
      },

      '.btn:first-child:not(:last-child)': {
        '@apply -mt-0 -ml-px': {},
        'border-top-left-radius': 'var(--rounded-btn, 0.5rem)',
        'border-top-right-radius': 0,
        'border-bottom-left-radius': 'var(--rounded-btn, 0.5rem)',
        'border-bottom-right-radius': 0,
      },

      '.btn:last-child:not(:first-child)': {
        'border-top-left-radius': 0,
        'border-top-right-radius': 'var(--rounded-btn, 0.5rem)',
        'border-bottom-left-radius': 0,
        'border-bottom-right-radius': 'var(--rounded-btn, 0.5rem)',
      },
    },

    '&-vertical': {
      '.btn:first-child:not(:last-child)': {
        '@apply -mt-px -ml-0': {},
        'border-top-left-radius': 'var(--rounded-btn, 0.5rem)',
        'border-top-right-radius': 'var(--rounded-btn, 0.5rem)',
        'border-bottom-left-radius': 0,
        'border-bottom-right-radius': 0,
      },
      '.btn:last-child:not(:first-child)': {
        'border-top-left-radius': 0,
        'border-top-right-radius': 0,
        'border-bottom-left-radius': 'var(--rounded-btn, 0.5rem)',
        'border-bottom-right-radius': 'var(--rounded-btn, 0.5rem)',
      },
    },
  },
}
