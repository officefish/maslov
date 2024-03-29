export const card = {
  '.card-side': {
    'align-items': 'stretch',
    'flex-direction': 'row',
    ':where(figure:first-child)': {
      '@apply overflow-hidden': {},
      'border-start-start-radius': 'inherit',
      'border-start-end-radius': 'unset',
      'border-end-start-radius': 'inherit',
      'border-end-end-radius': 'unset',
    },

    ':where(figure:last-child)': {
      '@apply overflow-hidden': {},
      'border-start-start-radius': 'unset',
      'border-start-end-radius': 'inherit',
      'border-end-start-radius': 'unset',
      'border-end-end-radius': 'inherit',
    },

    '& figure > *': {
      'max-width': 'unset',
    },
  },

  ':where(.card-side figure > *)': {
    width: '100%',
    height: '100%',
    'object-fit': 'cover',
  },
}
