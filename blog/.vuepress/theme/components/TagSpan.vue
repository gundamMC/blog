<template>
    <span>
        <span v-for="(tag, key, index) in tags">
            <span v-if="index != 0">, </span>
            <a :href="tag.path" class="link">{{key}}</a>
        </span>
    </span>
</template>

<script>
export default {
    props: {
        pageTags: Array
    },
    computed: {
        tags() {
            var tmp = {}
            for (let index = 0; index < this.pageTags.length; index++) {
                tmp[this.pageTags[index]] = this.$tag._metaMap[this.pageTags[index]]
            }
            return tmp
        },
    }
}
</script>
