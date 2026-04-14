<template>
    <v-container class="py-4 py-md-8">
        <v-card border variant="flat" class="mb-4 hidden-md-and-up">
            <FilterBar class="mb-6" />
        </v-card>

        <!-- 空状态占位 -->
        <v-empty-state
            v-if="filteredContent?.length === 0"
            icon="mdi-magnify-close"
            title="未找到匹配的评论"
            text="请尝试调整您的筛选条件"
            class="my-12"
            bg-color="transparent"
        ></v-empty-state>

        <!-- 卡片模式 -->
        <v-row v-else-if="filterStore.viewMode === 'card'" no-gutters>
            <v-col
                cols="12"
                xs="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
                v-for="item in filteredContent"
                :key="item.stem"
                class="pa-1"
            >
                <ItemCard :item="item" />
            </v-col>
        </v-row>

        <!-- 列表模式 -->
        <v-card v-else border variant="flat">
            <v-data-table
                :items="filteredContent"
                :headers="headers"
                hover
                class="bg-surface"
                :mobile-breakpoint="0"
            >
                <template v-slot:item.title="{ item }">
                    <v-menu open-on-hover location="end">
                        <template v-slot:activator="{ props }">
                            <NuxtLink
                                v-bind="props"
                                :to="`/review/${item.stem}`"
                                class="text-decoration-none text-primary font-weight-bold"
                            >
                                {{ item.title }}
                            </NuxtLink>
                        </template>
                        <v-card width="200" rounded="lg" elevation="8">
                            <v-img
                                :src="
                                    item.image ||
                                    'https://placehold.co/600x800?text=No+Image'
                                "
                                aspect-ratio="3/4"
                                cover
                            ></v-img>
                        </v-card>
                    </v-menu>
                </template>
                <template v-slot:item.type="{ item }">
                    <v-chip
                        size="small"
                        variant="tonal"
                        class="font-weight-medium"
                    >
                        <v-icon start size="small">{{
                            getTypeIcon(item.type)
                        }}</v-icon>
                        {{ getTypeName(item.type) }}
                    </v-chip>
                </template>
                <template v-slot:item.status="{ item }">
                    <v-icon size="small" class="mr-1">{{
                        getStatusIcon(item.status || "finished")
                    }}</v-icon>
                    <span class="text-caption font-weight-medium">{{
                        getStatusName(item.status || "finished")
                    }}</span>
                </template>
                <!-- 列表同样展示 v-rating -->
                <template v-slot:item.score="{ item }">
                    <div class="d-flex align-center">
                        <v-chip
                            :color="getScoreInfo(item.score || 0).colorName"
                            density="compact"
                            class="font-weight-black mr-2"
                        >
                            {{ (item.score || 0).toFixed(1) }}
                        </v-chip>
                        <v-rating
                            :model-value="(item.score || 0) / 2"
                            color="warning"
                            density="compact"
                            half-increments
                            readonly
                            size="x-small"
                        ></v-rating>
                    </div>
                </template>
                <template v-slot:item.date="{ item }">
                    <span class="text-body-2 text-medium-emphasis">{{
                        new Date(item.date).toLocaleDateString()
                    }}</span>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { useFilterStore } from "~/stores/filter";
import { useDisplay } from "vuetify";
import {
    getScoreInfo,
    getTypeIcon,
    getStatusIcon,
    getTypeName,
    getStatusName,
} from "~/utils/rating";

const title = "羊羊点评";
const description = "个人主观向的游戏、剧集、电影与书籍点评记录。";

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
});

defineOgImage("Home", {
    title: title,
    description: description,
});

const filterStore = useFilterStore();
const { xs, mdAndUp } = useDisplay();

const headers = computed(() => {
    const cols: any[] = [{ title: "标题", key: "title", align: "start" }];
    if (!xs.value) {
        cols.push({ title: "类型", key: "type", align: "start" });
    }
    if (mdAndUp.value) {
        cols.push({ title: "状态", key: "status", align: "start" });
    }
    cols.push({ title: "评分", key: "score", align: "start" });
    if (!xs.value) {
        cols.push({ title: "日期", key: "date", align: "start" });
    }
    return cols;
});

const { data: allContent } = await useAsyncData("reviews", () =>
    queryCollection("content")
        .where("hidden", "<>", true)
        .order("date", "DESC")
        .all(),
);

// 前端实时筛选
const filteredContent = computed(() => {
    return allContent.value?.filter((item) => {
        if (filterStore.type && item.type !== filterStore.type) return false;
        if (
            filterStore.status &&
            (item.status || "finished") !== filterStore.status
        )
            return false;

        const score = item.score || 0;
        if (
            score < filterStore.scoreRange[0] ||
            score > filterStore.scoreRange[1]
        )
            return false;
        if (filterStore.recommendOnly && !item.recommend) return false;
        return true;
    });
});
</script>

<style scoped>
.drop-shadow {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.4));
}
</style>
