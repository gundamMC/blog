<template>
    <v-list expand>
        <div v-for="header in headers">
            <v-list-group v-if="header.sub && header.sub.length > 0">
                <template v-slot:activator>
                    <v-list-item-title>{{ header.title }}</v-list-item-title>
                </template>
                
                <RouterLink v-for="subheader in header.sub" :to="'#' + subheader.slug" class="sidebar-link">
                    <v-list-item link class="subheader">
                        <v-list-item-title>{{ subheader.title }}</v-list-item-title>
                    </v-list-item>
                </RouterLink>
            </v-list-group>

            <RouterLink v-else :to="'#' + header.slug" class="sidebar-link">
                <v-list-item link>
                    <v-list-item-title>{{ header.title }}</v-list-item-title>
                </v-list-item>
            </RouterLink>
        </div>
    </v-list>
</template>

<script>

// get offset top
function getAbsoluteTop(dom) {
  return dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top +
        document.body.scrollTop +
        document.documentElement.scrollTop
    : 0
}


export default {
    created() {
        if (this.$page.headers.length > 1) {
            let tmpHeader = this.$page.headers[0]
            tmpHeader.sub = []

            this.headers = [ tmpHeader ]

            for (let i = 1; i < this.$page.headers.length; i++) {
                if (this.$page.headers[i].level === 2) {
                    tmpHeader = this.$page.headers[i]
                    tmpHeader.sub = []
                    this.headers.push(tmpHeader)
                }
                else {
                    tmpHeader.sub.push(this.$page.headers[i])
                }
            }
        }
    }
}
</script>

<style>

a {
    text-decoration: none;
    color: #000;
}

.subheader {
    padding-left: 50px;
}

.theme--light.v-list-group__header.v-list-item--active {
    color: #000;
}

.theme--dark.v-list-group__header.v-list-item--active {
    color: #fff;
}


.router-link-active .v-list-item__title {
    color: #1976d2;
}


</style>