export const modal = {
  '.modal': {
    '@apply pointer-events-none fixed max-w-none max-h-none w-full h-full inset-0 opacity-0 m-0 p-0 grid justify-items-center':
      {},
    'overscroll-behavior': 'contain',
    'z-index': 999,
  },

  '.modal-scroll': {
    'overscroll-behavior': 'auto',
  },

  ':where(.modal)': {
    '@apply items-center': {},
  },

  '.modal-box': {
    'max-height': 'calc(100vh - 5em)',
  },

  [`.modal-open,
    .modal:target,
    .modal-toggle:checked + .modal,
    .modal[open]
    `]: {
    '@apply pointer-events-auto visible opacity-100': {},
  },

  '.modal-action': {
    '@apply flex': {},
  },

  '.modal-toggle': {
    '@apply fixed h-0 w-0 appearance-none opacity-0': {},
  },

  ':root:has(:is(.modal-open, .modal:target, .modal-toggle:checked + .modal, .modal[open]))':
    {
      '@apply overflow-hidden': {},
    },
}
