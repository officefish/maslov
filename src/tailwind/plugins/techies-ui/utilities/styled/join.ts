export const join = {
  '.join.join-vertical > :where(*:not(:first-child))': {
    '@apply -mt-px mx-0': {},
  },
  '.join.join-horizontal > :where(*:not(:first-child))': {
    '@apply -ml-px my-0': {},
  },
}
