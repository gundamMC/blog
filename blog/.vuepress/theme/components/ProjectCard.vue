<template>
    <v-card
        class="mx-auto"
        width="344"
        outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">{{page.frontmatter.field}}</div>
                <v-list-item-title class="headline mb-1">{{page.frontmatter.title}}</v-list-item-title>
                <v-list-item-subtitle>{{page.frontmatter.summary}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                tile
            >
                <v-img v-if="page.frontmatter.image" :src="page.frontmatter.image"></v-img>
                <v-icon v-else>mdi-code-braces</v-icon>
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <v-btn text :href="page.path">Details</v-btn>
            <v-btn text v-if="page.frontmatter.link" :href="page.frontmatter.link" rel="noopener noreferrer">{{page.frontmatter.linkTitle}}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
        props: {
                page: Object
        },
}
</script>