export const modal = {
  '.modal-top :where(.modal-box)': {
    '@apply w-full max-w-none -translate-y-10 scale-100 rounded-b-box rounded-t-none':
      {},
  },

  '.modal-middle :where(.modal-box)': {
    '@apply w-11/12 max-w-lg translate-y-0 scale-90 rounded-t-box rounded-b-box':
      {},
  },

  '.modal-bottom :where(.modal-box)': {
    '@apply w-full max-w-none translate-y-10 scale-100 rounded-t-box rounded-b-none':
      {},
  },
}
