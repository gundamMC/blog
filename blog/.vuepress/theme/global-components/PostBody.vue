<template>
    <v-container>
        <v-row>
            <v-col v-if="$frontmatter.image" class="mt-4 mb-16">
                <v-img :src="$frontmatter.image" :alt="$frontmatter.title" contain max-width="100%" max-height="500px"/>
            </v-col>
        </v-row>

        <v-row>
            <DateTagSpan :page="$page"/>
        </v-row>

        <v-row>
            <h1 class="text-h2 font-weight-regular"> {{ $frontmatter.title }} </h1>
        </v-row>

        <v-row class="mt-8">
            <v-col>
                <Content itemprop="articleBody"/>
            </v-col>
        </v-row>

        <v-row class="mt-8">
            <Comment/>
        </v-row>
    </v-container>
</template>

<script>
import { Comment } from '@vuepress/plugin-blog/lib/client/components'
import DateTagSpan from '../components/DateTagSpan.vue'

export default {
  components: {
    Comment,
    DateTagSpan
  },
}
</script>