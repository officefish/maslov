export const join = {
  '.join.join-vertical': {
    '@apply flex-col': {},

    [`& .join-item:first-child:not(:last-child),
        & *:first-child:not(:last-child) .join-item`]: {
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 0,
      'border-top-left-radius': 'inherit',
      'border-top-right-radius': 'inherit',
    },

    [`& .join-item:last-child:not(:first-child),
        & *:last-child:not(:first-child) .join-item`]: {
      'border-top-left-radius': 0,
      'border-top-right-radius': 0,
      'border-bottom-left-radius': 'inherit',
      'border-bottom-right-radius': 'inherit',
    },
  },

  '.join.join-horizontal': {
    '@apply flex-row': {},

    [`& .join-item:first-child:not(:last-child),
        & *:first-child:not(:last-child) .join-item`]: {
      'border-bottom-right-radius': 0,
      'border-top-right-radius': 0,
      'border-bottom-left-radius': 'inherit',
      'border-top-left-radius': 'inherit',
    },

    [`& .join-item:last-child:not(:first-child),
        & *:last-child:not(:first-child) .join-item`]: {
      'border-bottom-left-radius': 0,
      'border-top-left-radius': 0,
      'border-bottom-right-radius': 'inherit',
      'border-top-right-radius': 'inherit',
    },
  },
}
