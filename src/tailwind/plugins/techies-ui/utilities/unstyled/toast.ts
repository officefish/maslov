export const toast = {
  ':where(.toast)': {
    '@apply right-0 left-auto top-auto bottom-0 translate-x-0 translate-y-0':
      {},
  },

  '.toast:where(.toast-start)': {
    '@apply right-auto left-0 translate-x-0': {},
  },

  '.toast:where(.toast-center)': {
    '@apply right-1/2 left-1/2 -translate-x-1/2': {},
  },

  '.toast:where(.toast-end)': {
    '@apply right-0 left-auto translate-x-0': {},
  },

  '.toast:where(.toast-bottom)': {
    '@apply top-auto bottom-0 translate-y-0': {},
  },

  '.toast:where(.toast-middle)': {
    '@apply top-1/2 bottom-auto -translate-y-1/2': {},
  },

  '.toast:where(.toast-top)': {
    '@apply top-0 bottom-auto translate-y-0': {},
  },
}
