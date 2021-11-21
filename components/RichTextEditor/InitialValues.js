const initialValues = [
  { type: 'heading-two', children: [{ text: 'Beef Wellington' }] },
  {
    type: 'paragraph',
    children: [
      { text: 'Wrapped in ' },
      { text: 'golden, buttery ', bold: true },
      {
        type: 'link',
        href: 'https://en.wikipedia.org/wiki/Puff_pastry',
        children: [{ text: 'puff pastry', bold: true }],
      },
      { text: ' and filled with deeply savory mushroom duxelles', bold: true },
      {
        text: ', beef Wellington is an unforgettable centerpiece to any feast. Dried porcini deliver extra umami to the beef, while a touch of Dijon and chopped herbs adds a layer of freshness as well. Skipping the foie gras makes the dish more approachable, and swapping out the traditional crepe lining for phyllo (thanks to a trick from Kenji Lopez-Alt) streamlines the process, but beef Wellington still demands several hours of searing, stuffing, rolling, and chilling to ensure its magical result.',
      },
    ],
  },
  {
    type: 'image',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Whole_Beef_Wellington.jpg/224px-Whole_Beef_Wellington.jpg',
    alt: 'Beef Wellington',
    children: [{ text: 'Image Caption' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: '' },
      {
        type: 'size',
        value: '20',
        children: [{ text: 'Ingredients', bold: true }],
      },
    ],
  },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            text: '1 (2 1/2-pound) center-cut beef tenderloin roast (about 12 inches long and 3 inches in diameter), trimmed',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          { text: '2 teaspoons ' },
          { text: 'sea ', strike: true },
          { text: 'kosher salt' },
        ],
      },
      {
        type: 'list-item',
        children: [{ text: '1 teaspoon freshly ground black pepper' }],
      },
      {
        type: 'list-item',
        children: [
          {
            text: '¼ ounce dried porcini mushrooms (5 to 6 pieces), ground to a powder in a spice grinder',
          },
        ],
      },
      { type: 'list-item', children: [{ text: '2 tablespoons canola oil' }] },
      {
        type: 'list-item',
        children: [{ text: '1 ½ tablespoons Dijon mustard' }],
      },
      {
        type: 'list-item',
        children: [
          {
            text: '1 ½ pounds fresh cremini mushrooms, stems trimmed, coarsely chopped (8 cups)',
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          { text: '3 large shallots, roughly chopped (about 1/2 cup)' },
        ],
      },
      {
        type: 'list-item',
        children: [{ text: '3 tablespoons unsalted butter' }],
      },
      {
        type: 'list-item',
        children: [{ text: '3 medium garlic cloves, finely chopped' }],
      },
      {
        type: 'list-item',
        children: [
          {
            text: '1 tablespoon chopped fresh thyme leaves, plus thyme branches for serving',
          },
        ],
      },
      { type: 'list-item', children: [{ text: '2 ½ tablespoons dry sherry' }] },
      {
        type: 'list-item',
        children: [{ text: '½ teaspoon teaspoon freshly ground black pepper' }],
      },
      {
        type: 'list-item',
        children: [{ text: '2 frozen phyllo pastry sheets, thawed' }],
      },
      { type: 'list-item', children: [{ text: '8 thin prosciutto slices' }] },
      {
        type: 'list-item',
        children: [{ text: '¼ cup finely chopped chives' }],
      },
      {
        type: 'list-item',
        children: [{ text: '¼ cup finely chopped flat-leaf parsley' }],
      },
      {
        type: 'list-item',
        children: [
          {
            text: '1 (14-ounce) package all-butter frozen puff pastry sheet (such as Dufour), thawed according to package directions',
          },
        ],
      },
      {
        type: 'list-item',
        children: [{ text: 'All-purpose flour, for dusting' }],
      },
      { type: 'list-item', children: [{ text: '1 large egg, beaten' }] },
      { type: 'list-item', children: [{ text: 'Flaky sea salt' }] },
    ],
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/Cyskqnp1j64?autoplay=0&showinfo=0&rel=0&modestbranding=1',
    children: [{ text: '' }],
  },
]

export default initialValues
