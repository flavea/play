export const initialFilters = {
  blur: 0,
  brightness: 1,
  contrast: 1,
  'hue-rotate': 0,
  invert: 0,
  opacity: 1,
  saturate: 1,
  sepia: 0,
  grayscale: 0,
  'drop-shadow': '0px 0px 0px',
}

export const filtersData = [
  {
    type: 'opacity',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    type: 'blur',
    min: 0,
    max: 500,
    step: 5,
  },
  {
    type: 'brightness',
    min: 0,
    max: 2,
    step: 0.1,
  },
  {
    type: 'contrast',
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    type: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    type: 'hue-rotate',
    min: 0,
    max: 360,
    step: 5,
  },
  {
    type: 'invert',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    type: 'saturate',
    min: 0,
    max: 5,
    step: 0.1,
  },
  {
    type: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
]

export const symbols = {
  blur: 'px',
  'hue-rotate': 'deg',
}
