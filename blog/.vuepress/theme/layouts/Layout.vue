<template>
    <VuetifyBase>
        <template #content>
            <BaseListLayout v-if="$pagination"/>
            <PostBody v-else />
        </template>

        <template #sidebarRight>
            <Sidebar v-if="!$pagination" v-show="$vuetify.breakpoint.lgAndUp"/>
        </template>
    </VuetifyBase>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
    components: {
        Sidebar
    },
}
</script>