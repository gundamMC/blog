module.exports = {
  title: 'Shuming Xu',
  description: 'Shuming Xu\'s Blog',
  head: [
    // for vuetify
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'}],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css'}],
  ],
  markdown: {
    lineNumbers: true
  },
  theme: '',
  themeConfig: {
    sitemap: {
      hostname: 'https://shumingxu.com/'
    },
    comment: {
      // Which service you'd like to use
      service: 'vssue',
      // The owner's name of repository to store the issues and comments.
      owner: 'gundamMC',
      // The name of repository to store the issues and comments.
      repo: 'blog',
      // The clientId & clientSecret introduced in OAuth2 spec.
      clientId: 'd71d3a0915df15a191b6',
      clientSecret: '048bf217a1a4acaed22268fe8a9e489dfcafaa5a',
    },
    feed: {
      canonical_base: 'https://shumingxu.com/',
    },
    summary: true,
    summaryLength: 200,
    pwa: false,
    smoothScroll: true
  },
}
