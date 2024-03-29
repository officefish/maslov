export const artboard = {
  '.artboard': {
    '&-demo': {
      '@apply flex flex-none flex-col items-center justify-center': {},
    },

    '&.phone': {
      width: '320px',
      '&-1': {
        width: '320px',
        height: '568px',
        [`&.horizontal, &.artboard-horizontal`]: {
          width: '568px',
          height: '320px',
        },
      },

      '&-2': {
        width: '375px',
        height: '667px',
        [`&.horizontal, &.artboard-horizontal`]: {
          width: '667px',
          height: '375px',
        },
      },

      '&-3': {
        width: '414px',
        height: '736px',

        [`&.horizontal, &.artboard-horizontal`]: {
          width: '736px',
          height: '414px',
        },
      },

      '&-4': {
        width: '375px',
        height: '812px',

        [`&.horizontal, &.artboard-horizontal`]: {
          width: '812px',
          height: '375px',
        },
      },

      '&-5': {
        width: '414px',
        height: '896px',

        [`&.horizontal, &.artboard-horizontal`]: {
          width: '896px',
          height: '414px',
        },
      },

      '&-6': {
        width: '320px',
        height: '1024px',

        [`&.horizontal, &.artboard-horizontal`]: {
          width: '1024px',
          height: '320px',
        },
      },
    },
  },
}
