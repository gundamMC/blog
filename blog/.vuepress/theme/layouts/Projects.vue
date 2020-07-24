<template>
    <VuetifyBase>
        <template #content>
            <CardListLayout v-if="$pagination"/>
            <PostBody v-else />
        </template>
    </VuetifyBase>
</template>
