<template>
    <div class="component-sticky">

        <div v-if="$page.headers && $page.headers.length > 1" class="mb-4">
            <h3>Table of Contents</h3>
            <Headers/>
            <v-divider/>
        </div>
    </div>
</template>

<script>
import Headers from './Headers.vue'

export default {
    components: {
        Headers
    },
}
</script>

<style>
    .component-sticky {
        padding: 0 5px;
        position: sticky;
        top: 100px;
    }
</style>