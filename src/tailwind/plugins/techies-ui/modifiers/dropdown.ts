export const dropdown = {
  '.dropdown .dropdown-content': {
    '@apply origin-top scale-95 transform transition duration-200 ease-in-out':
      {},
  },

  '.dropdown-bottom .dropdown-content': {
    '@apply origin-top': {},
  },

  '.dropdown-top .dropdown-content': {
    '@apply origin-bottom': {},
  },

  '.dropdown-left .dropdown-content': {
    '@apply origin-right': {},
  },

  '.dropdown-right .dropdown-content': {
    '@apply origin-left': {},
  },

  [`.dropdown.dropdown-open .dropdown-content,
    .dropdown.dropdown-hover:hover .dropdown-content,
    .dropdown:focus .dropdown-content,
    .dropdown:focus-within .dropdown-content`]: {
    '@apply scale-100': {},
  },
}
