<template>
    <VuetifyBase>
        <template #content>
            <h1 class="text-h2 mb-16">
                {{ $frontmatter.title }}
            </h1>

            <v-row v-if="$tag" justify="space-around">
                <v-card v-for="tag in $tag._metaMap" class="mx-auto my-3" max-width="250" outlined>
                    <v-card-title><a :href="tag.path" class="link">{{ tag.key }}</a></v-card-title>

                    <v-card-subtitle>
                        {{ tag.pages.length }} Post<span v-if="tag.pages.length > 1">s</span>
                    </v-card-subtitle>

                    <v-card-text>
                        Latest Post: <a :href="tag.pages[0].path" class="link">{{ tag.pages[0].title }}</a>
                    </v-card-text>
                </v-card>
            </v-row>
        </template>
    </VuetifyBase>
</template>

<style scoped>
        .link { color: #000; text-decoration: none;}
        .link:hover { text-decoration: underline; }
</style>