<template>
    <v-app>
        <v-app-bar app elevate-on-scroll class="px-2 px-lg-12 px-xl-16">
            <v-toolbar-title class="ml-2 ml-lg-12 ml-xl-16">
                <a href="/" class="link"> Shuming Xu </a>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="mr-2 mr-lg-12 mr-xl-16">
                <v-btn text href="/posts/">Posts</v-btn>
                <v-btn text href="/projects/">Projects</v-btn>
                <v-btn text href="/about/">About</v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">Theme</v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="setTheme(false)">
                            <v-list-item-title>Light</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="setTheme(true)">
                            <v-list-item-title>Dark</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="2" />
                    <v-col :cols="contentWidth">
                        <slot name="content" />
                    </v-col>
                    <v-col cols="2">
                        <slot name="sidebarRight"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <v-footer padless class="mt-16">
            <v-card flat tile class="lighten-1 text-center" min-width="100%">
                <v-card-text>
                    <a href="https://github.com/gundamMC" class="link" rel="noopener noreferrer">Github</a>
                    |
                    <a href="https://twitter.com/Imshuming/" class="link" rel="noopener noreferrer">Twitter</a>
                    |
                    <a href="https://www.linkedin.com/in/shuming-xu/" class="link" rel="noopener noreferrer">LinkedIn</a>
                </v-card-text>
                <v-card-text>
                    <p style="max-width: 40%; text-align: center;" class="mx-auto grey--text">
                        I'm still amazed that milk comes in bags here in Canada.
                    </p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="">
                    	&copy; {{ new Date().getFullYear() }} &mdash; <strong>Shuming Xu</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    props: {
        contentWidth: {
            type: Number,
            default: 5
        }
    },
    methods: {
        setTheme(dark) {
            this.$vuetify.theme.dark = dark
            document.cookie = `dark=${dark}` + "; path=/"  // make cookie sitewide
        }
    },
    created() {
        this.$vuetify.theme.dark = document.cookie.match(/dark=true/i) != null
    }
}
</script>
