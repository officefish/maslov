export const menu = {
  '.menu-horizontal': {
    '@apply inline-flex flex-row': {},
    '& > li:not(.menu-title) > details > ul': {
      '@apply absolute': {},
    },
  },

  '.menu-vertical': {
    '@apply flex flex-col': {},
    '& > li:not(.menu-title) > details > ul': {
      '@apply relative': {},
    },
  },
}
