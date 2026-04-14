<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card
            v-bind="props"
            :to="`/review/${item.stem}`"
            class="transition-swing h-100 d-flex flex-sm-column"
            variant="flat"
            border
        >
            <v-img
                :src="
                    item.image || 'https://placehold.co/600x800?text=No+Image'
                "
                aspect-ratio="3/4"
                cover
                class="align-start"
            >
                <!-- 左上角 Recommend 角标 -->
                <div v-if="item.recommend" class="ma-3">
                    <v-chip
                        color="warning"
                        variant="tonal"
                        size="small"
                        prepend-icon="mdi-crown"
                        class="font-weight-bold"
                    >
                        强烈推荐
                    </v-chip>
                </div>
                <div v-if="item.notrecommend" class="ma-3">
                    <v-chip
                        color="error"
                        variant="tonal"
                        size="small"
                        prepend-icon="mdi-minus-circle"
                        class="font-weight-bold"
                    >
                        不推荐
                    </v-chip>
                </div>
                

                <!-- 右下角分数叠加层 -->
                <div
                    class="position-absolute bottom-0 right-0 ma-2"
                    v-if="item.score"
                >
                    <v-chip
                        :color="getScoreInfo(item.score).colorName"
                        variant="tonal"
                        class="font-weight-black text-body-large"
                    >
                        {{ item.score.toFixed(1) }}
                    </v-chip>
                </div>
            </v-img>

            <v-card-item class="flex-grow-1 pt-4 pb-2">
                <v-card-title
                    class="text-title-medium font-weight-black"
                    style="white-space: normal; line-height: 1.4"
                    >{{ item.title }}</v-card-title
                >

                <v-card-subtitle
                    class="d-flex align-center mt-2 text-medium-emphasis pb-1"
                >
                    <v-icon size="small" class="mr-1">{{
                        getTypeIcon(item.type)
                    }}</v-icon>
                    <span class="text-caption mr-3 font-weight-medium">{{
                        getTypeName(item.type)
                    }}</span>
                    <v-icon size="small" class="mr-1">{{
                        getStatusIcon(item.status || "finished")
                    }}</v-icon>
                    <span class="text-caption font-weight-medium">{{
                        getStatusName(item.status || "finished")
                    }}</span>
                </v-card-subtitle>
            </v-card-item>
        </v-card>
    </v-hover>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

defineProps<{
    item: ContentCollectionItem;
}>();
</script>
