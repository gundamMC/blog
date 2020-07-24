<template>
    <VuetifyBase :content-width="7">
        <template #content>
            <v-row justify="center" class="my-16">
                <v-col lg="6" sm="8" xs="12">
                    <h2 class="text-h2" style="border-bottom: 0">Shuming Xu</h2>
                    <h4 class="text-h4">software developer, explorer, & student @ Berkeley</h4>
                    <Content slot-key="about"/>

                    <div class="mt-8">
                        <v-btn class="ma-1" outlined href="/projects/">
                            My projects <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                        <v-btn class="ma-1" outlined href="/about/">
                            About me <v-icon right>mdi-arrow-right</v-icon>
                          </v-btn>
                    </div>
                </v-col>
            </v-row>

            <v-divider/>

            <v-row justify="center" class="my-16">
                <v-col xs="12" sm="5">
                    <!-- Most recent post -->
                    <h3 class="text-h3">Latest Posts</h3>
                    <v-img
                        :src="mostRecent.frontmatter.image"
                        class="grey lighten-2"
                        contain
                    >
                    </v-img>

                    <h4 class="text-h4 mt-4 mb-0"><a :href="mostRecent.path" class="link"> {{ mostRecent.title }} </a></h4>
                    <DateTagSpan :page="mostRecent" :hideUpdate="true"/>
                </v-col>

                <v-col xs="12" sm="5" class="mt-md-16 mt-sm-0">
                    <div v-for="post in recentPosts">
                        <h5 class="text-h5 mb-0"><a :href="post.path" class="link"> {{post.title}} </a></h5>
                        <DateTagSpan :page="post" :hideUpdate="true"/>
                    </div>
                </v-col>
            </v-row>

            <v-row justify="center" class="mb-16">
                <v-btn outlined href="/posts/">
                    View more posts <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
            </v-row>

        </template>
    </VuetifyBase>
</template>

<script>
import DateTagSpan from '../components/DateTagSpan.vue'

export default {
    components: {
        DateTagSpan
    },
    data() {
        return {
            recentPosts: [],
            mostRecent: null
        }
    },
    created() {
        let posts = []
        this.$site.pages.forEach(page => {
            if (page.id === "post" && page.frontmatter.date) {
                posts.push(page)
            }
        })
        // order by date desc
        posts.sort((prev, next) => {
            return new Date(next.frontmatter.date).getTime() - new Date(prev.frontmatter.date).getTime()
        })
        this.mostRecent = posts[0]
        this.recentPosts = posts.slice(1, 5)
    }
}
</script>

<style scoped>
        .link { color: #000; text-decoration: none;}
        .link:hover { text-decoration: underline; }
</style>