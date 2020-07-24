<template>
    <div>
        <h1 class="text-h2 mb-16 ml-4">
            {{ $frontmatter.title }}
        </h1>

        <v-row v-if="$pagination" justify="space-around">
            <ProjectCard v-for="page of $pagination.pages" :key="page.key" :page="page" class="ma-6" />
        </v-row>
        
        <v-pagination v-if="$pagination.length > 1" v-model="pageNumber" :length="$pagination.length" @input="changePage" class="my-12">
        </v-pagination>
    </div>
</template>

<script>
import ProjectCard from '../components/ProjectCard.vue'

export default {
    components: {
        ProjectCard
    },
    data() {
        return {
            pageNumber: 1
        }
    },
    created() {
        this.pageNumber = this.$pagination.paginationIndex + 1
    },
    methods: {
        changePage() {
            const path = this.$pagination.getSpecificPageLink(this.pageNumber - 1)    // - 1 for index
            this.$router.push(path).catch(e => {
                if (e.name !== 'NavigationDuplicated') {
                    throw e
                }
            })
        }
    },
}
</script>

<style>
</style>