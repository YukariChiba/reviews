<template>
    <NuxtLoadingIndicator color="rgb(var(--v-theme-primary))" />
    <v-app>
        <nuxt-layout>
            <nuxt-page />
        </nuxt-layout>
    </v-app>
</template>

<script lang="ts" setup>
useSeoMeta({
    titleTemplate: (titleChunk) =>
        titleChunk && titleChunk !== "羊羊点评"
            ? `${titleChunk} - 0x7f Reviews 羊羊点评`
            : "0x7f Reviews 羊羊点评",
    ogSiteName: "0x7f Reviews",
    description: "Personal review collection by Yukari Chiba.",
    ogDescription: "Personal review collection by Yukari Chiba.",
});
</script>
