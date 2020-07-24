<template>
    <v-row class="mt-6">
        <v-col cols="3">
            <p text-subtitle-1>
                {{ resolvePostDate(page.frontmatter.date) }}
            </p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3" v-if="page.frontmatter.image">
            <v-img :src="page.frontmatter.image" :alt="page.frontmatter.title" contain max-width="100%" />
        </v-col>
        <v-col cols="6">
            <p v-if="this.page.frontmatter.tag" text-subtitle-2 class="font-weight-light mb-0">
                <TagSpan :page-tags="this.page.frontmatter.tag" />
            </p>
            <h2><a :href="page.path" class="link blueHover"> {{ page.title }} </a></h2>
            <p class="ui-post-summary" itemprop="description">
                {{ page.frontmatter.summary || page.summary }}
            </p>
        </v-col>
    </v-row>
</template>

<script>
import dayjs from 'dayjs'
import TagSpan from '../components/TagSpan.vue'

export default {
    components: {
        TagSpan
    },
    props: {
        page: Object
    },
    methods: {
      resolvePostDate(date) {
        return dayjs(date).format('YYYY-MM-DD')
      },
    },

}
</script>

<style scoped>
    .blueHover:hover { color: #1867c0; }
</style>