<template>
    <p class="text-subtitle-1 font-weight-light">
        <span v-if="page.frontmatter.date">{{ resolvePostDate(page.frontmatter.date) }}</span>
        <v-icon size="small" v-if="page.frontmatter.date && (page.frontmatter.tag || page.frontmatter.field)">mdi-minus</v-icon>
        <TagSpan v-if="page.frontmatter.tag" :page-tags="page.frontmatter.tag" /></span>
        <span v-else-if="page.frontmatter.field">
            {{ page.frontmatter.field }}
        </span>

        <i v-if="!hideUpdate && page.lastUpdated">
            (Last Updated: {{ page.lastUpdated }})
        </i>
    </p>
</template>

<script>
import dayjs from 'dayjs'
import TagSpan from './TagSpan.vue'

export default {
    components: {
        TagSpan
    },
    props: {
        page: Object,
        hideUpdate: {
            type: Boolean,
            default: false
        }
    },
    methods: {
      resolvePostDate(date) {
        return dayjs(date).format('YYYY-MM-DD')
      },
    },

}
</script>
