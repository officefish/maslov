export const select = {
  '.select': {
    '@apply inline-flex flex-shrink-0 cursor-pointer select-none appearance-none':
      {},
    '@apply h-12 pl-4 pr-10 text-sm leading-loose min-h-12': {},

    /* disabled */
    /* &-disabled,
    &[disabled] {
      @apply pointer-events-none;
    } */
    /* multiple */
    '&[multiple]': {
      '@apply h-auto': {},
    },
  },
}
