<template>
    <v-container v-if="article" class="py-8" max-width="1600">
        <v-row>
            <!-- 左侧：窄栏信息 -->
            <v-col cols="12" md="4" lg="3">
                <v-card
                    class="position-sticky bg-surface"
                    style="top: 100px"
                    variant="flat"
                    border
                >
                    <div class="d-flex flex-row flex-md-column">
                        <div class="w-33 w-md-100 flex-shrink-0 d-flex justify-center align-center">
                            <v-img
                                :src="
                                    article.image ||
                                    'https://placehold.co/600x800?text=No+Image'
                                "
                                aspect-ratio="3/4"
                                cover
                            ></v-img>
                        </div>

                        <v-card-text class="text-center pt-4 pt-md-6 px-4 flex-grow-1 d-flex flex-column justify-center align-center">
                            <h2
                                class="text-h6 text-md-h5 font-weight-black mb-2 mb-md-4"
                                style="line-height: 1.3"
                            >
                                {{ article.title }}
                            </h2>

                            <div
                                class="d-flex flex-wrap justify-center align-center mb-4 text-medium-emphasis py-1 py-md-2 mx-1 mx-md-2 rounded-lg"
                            >
                                <v-icon class="mr-1" size="small">{{
                                    getTypeIcon(article.type)
                                }}</v-icon>
                                <span
                                    class="text-caption mr-3 font-weight-medium"
                                    >{{ getTypeName(article.type) }}</span
                                >
                                <v-icon class="mr-1" size="small">{{
                                    getStatusIcon(article.status || "finished")
                                }}</v-icon>
                                <span class="text-caption font-weight-medium">{{
                                    getStatusName(article.status || "finished")
                                }}</span>
                            </div>

                            <div class="my-2 my-md-4">
                                <v-rating
                                    :model-value="(article.score || 0) / 2"
                                    :color="getScoreInfo(article.score || 0).color"
                                    half-increments
                                    readonly
                                    :size="$vuetify.display.mdAndUp ? 'x-large' : 'small'"
                                    density="compact"
                                    class="mb-2"
                                ></v-rating>
                                <div
                                    class="mt-1 mt-md-2 text-body-1 text-md-title-medium font-weight-black"
                                    :style="{
                                        color: getScoreInfo(article.score || 0)
                                            .color,
                                    }"
                                >
                                    {{ getScoreInfo(article.score || 0).text }} ({{(article.score || 0).toFixed(1)}})
                                </div>
                            </div>

                            <v-chip
                                v-if="article.recommend"
                                color="warning"
                                class="mt-2 mt-md-4 font-weight-bold"
                                prepend-icon="mdi-crown"
                                :size="$vuetify.display.mdAndUp ? 'large' : 'default'"
                                variant="tonal"
                            >
                                强烈推荐
                            </v-chip>
                            <v-chip
                                v-if="article.notrecommend"
                                color="error"
                                class="mt-2 mt-md-4 font-weight-bold"
                                prepend-icon="mdi-minus-circle"
                                :size="$vuetify.display.mdAndUp ? 'large' : 'default'"
                                variant="tonal"
                            >
                                不推荐
                            </v-chip>
                        </v-card-text>
                    </div>
                </v-card>
            </v-col>

            <!-- 右侧：宽栏正文 -->
            <v-col cols="12" md="8" lg="9">
                <v-card variant="flat" border class="pa-4 pa-md-10 h-100">
                    <div class="mb-6 mb-md-8">
                        <h1
                            class="text-h4 text-md-h3 font-weight-black text-primary mb-3 mb-md-4"
                            style="line-height: 1.3"
                        >
                            《{{ article.title }}》评论
                        </h1>
                        <div
                            class="text-caption text-md-body-2 text-medium-emphasis d-flex align-center"
                        >
                            <v-icon size="small" class="mr-2"
                                >mdi-calendar-edit</v-icon
                            >
                            发布于：{{
                                new Date(article.date).toLocaleDateString()
                            }}
                        </div>
                    </div>

                    <v-divider class="mb-6 mb-md-8"></v-divider>

                    <!-- Markdown 正文渲染 -->
                    <div class="markdown-body text-body-1">
                        <ContentRenderer :value="article" />
                    </div>

                    <v-divider class="my-8 my-md-10"></v-divider>

                    <!-- 协议声明 -->
                    <v-alert
                        icon="mdi-creative-commons"
                        variant="tonal"
                        color="secondary"
                        rounded="lg"
                        density="compact"
                        class="font-weight-medium text-caption text-md-body-2"
                    >
                        本文内容采用
                        <a
                            href="https://creativecommons.org/licenses/by/4.0/deed.zh"
                            target="_blank"
                            class="text-primary font-weight-bold text-decoration-none"
                            >CC-BY 4.0</a
                        >
                        协议进行许可。转载请注明出处。
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {
    getScoreInfo,
    getTypeIcon,
    getStatusIcon,
    getTypeName,
    getStatusName,
} from "~/utils/rating";

const route = useRoute();
const id = route.params.id as string;

const { data: article } = await useAsyncData(`review-${id}`, () =>
    queryCollection("content").where("stem", "=", id).first(),
);

if (!article.value) {
    throw createError({ statusCode: 404, statusMessage: "Review not found" });
}

const title = `《${article.value.title}》评论与评分`;
const description =
    article.value.description ||
    `这是关于《${article.value.title}》的评论。评分：${(article.value.score || 0).toFixed(1)}。`;

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
});

const { color } = getScoreInfo(article.value.score || 0);

defineOgImage("Review", {
    title: article.value.title,
    description: description,
    score: article.value.score || 0,
    color: color,
    type: getTypeName(article.value.type),
});
</script>

<style scoped>
/* 样式统一化，更精致排版并配以优雅边距与色彩 */
.markdown-body {
    line-height: 1.8;
    color: rgba(var(--v-theme-on-surface), 0.85);
}
.markdown-body :deep(h2) {
    margin-top: 1.8em;
    margin-bottom: 0.8em;
    color: rgb(var(--v-theme-primary));
    font-weight: 900;
    font-size: 1.75rem;
    border-bottom: 2px solid rgba(var(--v-theme-primary), 0.1);
    padding-bottom: 0.3em;
}
.markdown-body :deep(h3) {
    margin-top: 1.5em;
    margin-bottom: 0.8em;
    font-weight: 700;
    font-size: 1.35rem;
    color: rgb(var(--v-theme-on-surface));
}
.markdown-body :deep(p) {
    margin-bottom: 1.2em;
}
.markdown-body :deep(img) {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 1.5em 0;
    display: block;
}
.markdown-body :deep(blockquote) {
    border-left: 4px solid rgb(var(--v-theme-primary));
    margin: 1.5em 0;
    padding: 0.8em 1.2em;
    background: rgba(var(--v-theme-primary), 0.05);
    border-radius: 0 8px 8px 0;
    color: rgba(var(--v-theme-on-surface), 0.75);
    font-style: italic;
}
.markdown-body :deep(a) {
    color: rgb(var(--v-theme-primary));
    text-decoration: none;
    font-weight: 500;
}
.markdown-body :deep(a:hover) {
    text-decoration: underline;
}
</style>
