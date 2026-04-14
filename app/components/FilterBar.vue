<template>
    <v-card
        class="bg-surface"
        variant="flat"
        rounded="lg"
        style="overflow: visible"
    >
        <v-card-text class="d-flex flex-wrap align-center gap-4 pa-3 pa-sm-4">
            <!-- 类型筛选 -->
            <v-select
                v-model="filterStore.type"
                :items="typeItems"
                color="primary"
                item-title="title"
                item-value="value"
                label="类型"
                clearable
                density="compact"
                hide-details
                variant="outlined"
                style="min-width: 100px; flex: 1 1 auto"
                bg-color="background"
            />

            <!-- 状态筛选 -->
            <v-select
                v-model="filterStore.status"
                :items="statusItems"
                color="primary"
                item-title="title"
                item-value="value"
                label="状态"
                clearable
                density="compact"
                hide-details
                variant="outlined"
                style="min-width: 100px; flex: 1 1 auto"
                bg-color="background"
            />

            <!-- 分数区间 -->
            <div
                style="min-width: 200px; flex: 2 1 auto"
                class="mx-2 mx-sm-4"
            >
                <v-range-slider
                    v-model="filterStore.scoreRange"
                    :min="0"
                    :max="10"
                    :step="0.5"
                    density="compact"
                    hide-details
                    thumb-label="hover"
                    color="primary"
                    track-color="surface-variant"
                >
                    <template v-slot:prepend>
                        <span class="text-body-2 font-weight-medium d-none d-sm-inline">评分</span>
                    </template>
                </v-range-slider>
            </div>

            <v-switch
                v-model="filterStore.recommendOnly"
                label="强烈推荐"
                color="warning"
                hide-details
                density="compact"
                inset
                class="mt-n1"
                style="flex: 0 1 auto"
            />

            <v-spacer class="d-none d-md-block"></v-spacer>

            <!-- 视图切换 -->
            <v-btn-toggle
                v-model="filterStore.viewMode"
                color="primary"
                mandatory
                variant="outlined"
                density="compact"
                class="bg-background"
                rounded="lg"
                style="flex: 1 1 auto; justify-content: center"
            >
                <v-btn value="card" class="flex-grow-1">
                    <v-icon start class="mr-1"> mdi-view-grid </v-icon>
                    卡片
                </v-btn>
                <v-btn value="list" class="flex-grow-1">
                    <v-icon start class="mr-1"> mdi-format-list-bulleted </v-icon>
                    列表
                </v-btn>
            </v-btn-toggle>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { useFilterStore } from "~/stores/filter";

const filterStore = useFilterStore();

const typeItems = [
    { title: "游戏", value: "game" },
    { title: "剧集", value: "tv-series" },
    { title: "电影", value: "movie" },
    { title: "书籍", value: "book" },
    { title: "其他", value: "others" },
];

const statusItems = [
    { title: "已完成", value: "finished" },
    { title: "进行中", value: "ongoing" },
    { title: "已弃坑", value: "abandoned" },
];
</script>

<style scoped>
.gap-4 {
    gap: 1rem;
}
</style>
