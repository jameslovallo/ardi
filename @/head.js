export default {
  meta: [
    { charset: 'UTF-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'description',
      content:
        'Ardi makes it almost too easy to create reactive custom elements that work with any site or framework.',
    },
  ],
  link: [
    {
      rel: 'stylesheet',
      href: '/@/css/style.css',
    },
    {
      rel: 'icon',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐵</text></svg>',
    },
  ],
  script: [{ src: '//cdn.jsdelivr.net/npm/@ungap/custom-elements' }],
}
