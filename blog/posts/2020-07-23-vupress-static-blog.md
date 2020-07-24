---
title: "VuePress: Static Blog using Vue.js"
date: 2020-07-23
image: /images/vuepress/VuePress-min.png
tag: 
  - Vue
  - Vuepress
  - Web
---

## Introduction

Like any other developer, I have my own blog to document the tiny pieces of information on my development journey. Yet, my original blog,
built with Wordpress and styled with a free theme, felt lacking in personality or - I guess - a sense of customization and "hacky-ness."
It felt dull. Then... in comes [VuePress](https://vuepress.vuejs.org/), a Vue-powered static site generator by Evan You himself.

## Why VuePress?

First of all, static site generators are better suited for small, personal uses than large CMSs like Wordpress. Static sites are more
performant, more secure (I mean, what is there to hack into?), requires zero maintenance, and can be easy stored anywhere (offline, GitHub, random thumb drives).

But then, you ask, why VuePress? Why not Jekyll, Hugo, Gatsby, Hexo, or any other well-known generators? Well, to be fair, they all have their pros and cons,
but it was simple: Vue. It's more of a personal preference, but I do really like Vue. So... there's only three generators left: VuePress,
Gridsome, and Saber.

[Gridsome](https://gridsome.org/) is like a Gatsby version of VuePress, has GraphQL support, and can consume data from other sources like CMSs or APIs.
Meanwhile, [Saber](https://saber.land/) is like a simpler and out-of-the-box version of  VuePress. I think Saber's own documentation does a fair job comparing
the choices:

> VuePress and Saber both support Markdown pages by default, but you can also use .vue or .js pages in Saber.
> VuePress has a flexible plugin system so you can pretty much build any static site with VuePress as well. Saber is like a mix of all the good stuff from Gatsby.js, Hexo and VuePress.
>
> Gridsome is a close sibling to Gatsby.js which is GraphQL based. If you want something exactly like Gatsby.js in Vue Land, Gridsome is just what you need.

At the end, I choice VuePress due to it being simpler than Gridsome (I don't really need all the CMS support and GraphQL) and its extensive plugins/community support. 

## Getting Started

VuePress provides a handy `create-vuepress` tool that builds the basic scaffold for you. To use it, simply use:

``` shell
yarn create vuepress [directoryName]
# OR npx create-vuepress [directoryName]
```

Since we're building a blog, choose the `blog` boilerplate and finish filling out the metadata (Don't worry we can change these later).

Don't forget to do `yarn install` to install all dependencies. After that, you can use `yarn dev` to start the dev server at <http://localhost:8080/>.

Although VuePress's doc already has a section on directory structure, I'll go a bit more in-depth regarding what each of the files/folders actually do:

``` html
.
├── blog
│   ├── .vuepress (Where you set up the layouts/styles for your site)
│   │   ├── components (Vue components that you can use in your markdown files)
│   │   ├── theme (Customizing how your site looks - we'll get into this later)
│   │   ├── public (Usually static assets like images)
│   │   ├── styles (Site-specific styling, I would recommend doing it in /theme tho)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── config.js (Site settings like name, description, plugins/theme/markdown settings)
│   │   └── enhanceApp.js (Add vue plugins, register components, etc.)
│   │
│   └── _posts (Where your markdown posts are)
│
├── README.md
└── package.json
```

You probably won't have the `theme` and `public` folders for now, but feel free to create them because we'll need it later.

## Using Markdown

::: tip
If you're not familiar with Markdown, [The Markdown Guide](https://www.markdownguide.org/basic-syntax/) has a nice intro to the basic syntax.
:::

On the top of your markdown file in `_post`, there is a section marked with `---` lines. (The empty line is there to prevent styling issues, you don't actually need it for frontmatter)

``` markdown
---
date: 2018-11-7
tag:
  - frontmatter
  - vuepress
author: ULIVZ
location: Hangzhou

---
```

This is [frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html). It basically allows you to define metadata for each post, like date, tags, author, etc. You can add your own field to any post simply by adding another line.

In addition, VuePress also offers a large variety of extensions, such as Emoji :tada:, table of contents, and custom containers. For details, refer to [the official documentation](https://vuepress.vuejs.org/guide/markdown.html). (You may need to install the plugins manually for some of them that are not included in the default blog theme.)

## Customizing your theme

### Basics

Remember the `theme` folder? That's where all your theme files will be at. Firstly, create a `theme/Layout.vue` file as your default layout.

This works like any other Vue component, with the only exception being that you will need to add a special `<Content/>` component to include the contents of your markdown page.

::: tip
It is also possible to have multiple `<Content/>` slots to separate your markdown content into different locations on the page, such as having a separate sidebar content, by using `<Content slot-key="name"/>` and blocking your markdown with `::: slot name` and `:::`
:::

### Posts

In this case, since we're building a blog, we would only have roughly three types of pages: index, list of posts, and a post. Let's break it down. The index is pretty self-explanatory. The list of posts page lacks a `<Content/>` since there is no markdown representation for it, and it will serve as both a "all posts" page and a taxonomy page, with the only different being the title. The post page is basically a page with fancy decorations wrapping `<Content/>`.

Let's outline what a "list of posts" page would like. VuePress's blog plugin already routes the pages for us and includes a few handy tools that we can use. For instance, we can use `$pagination` to get a list of posts. Hence, we can use this to check if the current page is a list or a single post by a simple `if ($pagination)`. In Vue, this translates to:

``` vue
<template>
  <div>
    <BaseListLayout v-if="$pagination"/>
    <PostBody v-else />
  </div>
</template>
```

This will automatically switch from list to post. Then, we can continue to set up `BaseListLayout` for our list page.

``` vue
<template>
  <div>
    <h1>
      {{ $frontmatter.title }}
      <!-- pagination automatically sets the title of the page for taxonomy pages -->
    </h1>

    <div>
        <ol>
            <PostSummary v-for="page of $pagination.pages" :key="page.key" :page="page" />
            <!-- a summary for each post on the current page -->
        </ol>
    </div>

    <Pagination />
    <!-- https://vuepress-plugin-blog.ulivz.com/components/#pagination -->
  </div>
</template>
```

`PostSummary` is basically just a summary, but it can be anything as simple as:

``` vue
<template>
    <a :href="page.path"><h2> {{ page.title }} </h2></a>
    <p>
        {{ page.frontmatter.date }} - {{ page.frontmatter.summary || page.summary }}
    </p>
</template>

<script>
export default {
    props: {
        page: Object
    },
}
</script>
```

Next, let's build a simple `PostBody`:

``` vue
<template>
    <Content/>
</template>
```

That's it? Yep. Although it's not really visually pleasing, it will get the job done. Feel free to add some styling and customization if you'd like.

At this point, you should have a working list of posts when you access <http://localhost:8080/>. (If hot reload isn't working, just restarting the dev server should work.)

### Custom layouts

For the index page and any other custom pages, you could use frontmatter to specify which layout to use.

``` markdown
layout: index
```

For instance, this would use the `layouts/index.vue` layout (you will need to create that). This would also work for other pages like `about`, `contact`, you name it.

### Styling

Although you could technically style everything in Vue components, it can be easier to use the `styles` folder instead. Simply move your styles to `styles/index.styl`, and you will be able to use them globally.

If you want to style markdown content, use the class `.content__default`. For instance, here's how you can style an image defined in markdown:

``` stylus
.content__default
  img
    max-width 100%
    max-height 40vh
```

## Theme Configuration

Blog for VuePress works kind of differently than the rest of VuePress - even the [documentation](https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html) exists on a different site. That said, it is still a great plugin and provides extensive support for blogs.

However, before we modify everything, I would like to suggest you remove the default blog theme first. We already have created our own theme, so now it is time to detach the plugin configuration from the default theme and start our own. To do so, simple remove the `@vuepress/theme-blog` package and set `theme: '@vuepress/theme-blog'` in `config.js` to something like `theme: ''`. Now, go to your `theme` folder and create `index.js`, which will act as the entry point to your theme. A basic set up for the blog plugin could look something like this:

``` js
module.exports = themeConfig => {
  const defaultBlogPluginOptions = {
    directories: [
      {
        id: 'post',
        dirname: '_posts',
        path: '/',
        title: 'All Posts',  // remember {{ $frontmatter.title }} ?
        itemPermalink: '/posts/:slug', // Permalink for matched pages.
        //layout: 'BaseListLayout', // custom layout for "list" page
        pagination: { // Pagination behavior
            lengthPerPage: 6,
            //layout: 'PostBody' // custom layout for each post
          },
      },
    ],
    frontmatters: [  // taxonomy
      {
        id: 'tag',
        keys: ['tag', 'tags'],
        path: '/tag/',
        frontmatter: { title: 'Tag' },  // sets {{ $frontmatter.title }}
      },
    ],
  }

  ...

  const plugins = [
    ['@vuepress/blog', blogPluginOptions],
    // along with your other plugins
  ]

  ...

  const config = {
    plugins
  }

  return config
}
```

`directories` set up - well - directories for your posts. If you want to have an additional type of posts, say `pages`, simply add it to `directories`:

``` js
    directories: [
      {
        id: 'post',
        ...
      },
      {
        id: 'pages',
        dirname: '_pages',
        path: '/pages/',
        title: 'All Pages',  // remember {{ $frontmatter.title }} ?
        itemPermalink: '/pages/:slug', // Permalink for matched pages.
        layout: 'PageListLayout', // custom layout for "list" page
        pagination: { // Pagination behavior
            lengthPerPage: 6,
            layout: 'PageBody' // custom layout for each post
          },
      },
    ],
```

The same thing applies to `frontmatters`, which basically defines taxonomies like tags that you can define in your markdown files.

But wait, what about the rest of `index.js`? You'll probably want to set up other plugins like `smooth-scroll`, `vuepress-plugin-container`, and `@vuepress/search`. Because it can convoluted with `themeConfig` and a bunch of plugins, here are two different examples that show how simple and messy it can be:

- [super basic 70 lines theme](https://github.com/ulivz/70-lines-of-vuepress-blog-theme/blob/master/index.js)
- [default blog theme](https://github.com/vuepressjs/vuepress-theme-blog/blob/master/index.js)

::: tip
Most themes will include `themeConfig`s. It is provide additional customization to your theme from `.vuepress/config.js` (so the user doesn't need to edit `theme/index.js`). You don't need to worry about this if you don't plan on adapting your theme to multiple different sites.
:::

Feel free to add your own configurations on the blog plugin and other plugins.

## Conclusion

At this point, you should already have a working site running your own theme and your own configuration of plugins. If you would like more references, I post the source code of this blog on GitHub at [gundamMC/blog](https://github.com/gundamMC/blog). [awesome-vuepress](https://github.com/vuepressjs/awesome-vuepress) also provides a lot of additional resources, plugins, and themes.

As an additional tip, you could use UI libraries like Vuetify to speed up your development process. However, do keep in mind that it will conflict with VuePress's styling, which you would have to manually resolve.
