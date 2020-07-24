const removeMd = require('remove-markdown')
const path = require('path')
const pick = require('lodash/pick')

module.exports = themeConfig => {
  /**
   * Default theme configuration
   */
  themeConfig = Object.assign(themeConfig, {
    summary: themeConfig.summary === undefined ? true : themeConfig.summary,
    summaryLength:
      typeof themeConfig.summaryLength === 'number'
        ? themeConfig.summaryLength
        : 200,
    pwa: !!themeConfig.pwa,
  })

  /**
   * Configure blog plugin
   */
  const defaultBlogPluginOptions = {
    directories: [
      {
        id: 'post',
        dirname: 'posts',
        path: '/posts/',
        title: 'All Posts',
        itemPermalink: '/posts/:slug', // Permalink for matched pages.
        //layout: 'Posts', // Layout component name for entry page.
        pagination: { // Pagination behavior
            lengthPerPage: 6,
            //layout: 'Posts'
          },
      },
      {
        id: 'project',
        dirname: 'projects',
        path: '/projects/',
        title: 'Projects',
        itemPermalink: '/projects/:slug', // Permalink for matched pages.
        layout: 'Projects', // Layout component name for entry page.
        pagination: { // Pagination behavior
            lengthPerPage: 8,
            //layout: 'Posts'
          },
      },
    ],
    frontmatters: [
      {
        id: 'tag',
        keys: ['tag', 'tags'],
        path: '/tag/',
        layout: 'Tag',
        frontmatter: { title: 'Tags' },
      },
    ],
  }

  let resolvedFeedOptions
  const isFeedEnabled = themeConfig.feed && themeConfig.feed.canonical_base
  if (isFeedEnabled) {
    const {
      rss = true,
      atom = false,
      json = false,
      ...feedOptions
    } = themeConfig.feed
    resolvedFeedOptions = Object.assign({}, feedOptions, {
      feeds: {
        rss2: { enable: rss },
        atom1: { enable: atom },
        json1: { enable: json },
      },
    })
  }

  const properties = [
    'directories',
    'frontmatters',
    'globalPagination',
    'sitemap',
    'comment',
    'newsletter',
  ]
  const themeConfigPluginOptions = {
    ...pick(themeConfig, properties),
    feed: resolvedFeedOptions,
  }

  const blogPluginOptions = Object.assign(
    {},
    defaultBlogPluginOptions,
    themeConfigPluginOptions
  )

  /**
   * Integrate plugins
   */

  const enableSmoothScroll = themeConfig.smoothScroll === true

  const plugins = [
    '@vuepress/last-updated',
    '@vuepress/plugin-nprogress',
    [ '@vuepress/medium-zoom',
      {
        selector: 'img',
      }],
    ['@vuepress/blog', blogPluginOptions],
    ['smooth-scroll', enableSmoothScroll],
    ['@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    }],
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'mdwarning',
        defaultTitle: {
          '/': 'WARNING',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'danger',
        defaultTitle: {
          '/': 'DANGER',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'details',
        defaultTitle: {
          '/': 'Details',
        },
      },
    ],
  ]

  /**
   * Enable pwa
   */
  if (themeConfig.pwa) {
    plugins.push([
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ])
  }

  const config = {
    plugins,
    /**
     * Generate summary.
     */
    extendPageData(pageCtx) {
      const strippedContent = pageCtx._strippedContent
      if (!strippedContent) {
        return
      }
      if (themeConfig.summary) {
        pageCtx.summary =
          removeMd(
            strippedContent
              .trim()
              .replace(/^#+\s+(.*)/, '')
              .slice(0, themeConfig.summaryLength)
          ) + ' ...'
        pageCtx.frontmatter.description = pageCtx.summary
      }
      if (pageCtx.frontmatter.summary) {
        pageCtx.frontmatter.description = pageCtx.frontmatter.summary
      }
    },
  }

  return config
}