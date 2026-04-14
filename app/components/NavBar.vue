<template>
    <v-app-bar app extension-height="72" border>
        <v-container class="d-flex align-center px-4" max-width="1600">
            <div class="d-flex align-center ml-1 ml-sm-4 transition-swing">
                <NuxtLink
                    to="/"
                    class="text-decoration-none d-flex align-center"
                >
                    <v-icon
                        color="primary"
                        class="mr-1 mr-sm-2 d-none d-sm-inline"
                        size="large"
                        >mdi-star-box-multiple</v-icon
                    >
                    <span
                        class="font-weight-black text-primary text-title-large"
                        style="letter-spacing: -0.5px"
                    >
                        0x7f <span class="text-medium-emphasis">Reviews</span>
                    </span>
                </NuxtLink>
            </div>

            <v-spacer></v-spacer>

            <!-- 搜索框 -->
            <v-autocomplete
                v-model="search"
                :items="searchResults || []"
                item-title="title"
                item-value="stem"
                prepend-inner-icon="mdi-magnify"
                density="compact"
                variant="solo-filled"
                flat
                hide-details
                placeholder="搜索评论..."
                class="mx-2 mx-sm-4 flex-grow-1"
                style="max-width: 350px; min-width: 100px"
                @update:modelValue="onSearchSelect"
                no-data-text="未找到匹配项"
                clearable
                auto-select-first
                rounded="lg"
                menu-icon=""
            >
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :title="item.title" lines="two" density="compact">
                        <template v-slot:subtitle>
                            <div
                                class="d-flex align-center mt-1 text-caption text-medium-emphasis"
                            >
                                <v-icon size="x-small" class="mr-1">{{
                                    getTypeIcon(item.type)
                                }}</v-icon>
                                <span class="mr-2">{{
                                    getTypeName(item.type)
                                }}</span>
                                <v-rating
                                    :model-value="(item.score || 0) / 2"
                                    color="warning"
                                    density="compact"
                                    half-increments
                                    readonly
                                    size="x-small"
                                ></v-rating>
                                <span class="ml-1 font-weight-bold">{{
                                    (item.score || 0).toFixed(1)
                                }}</span>
                            </div>
                        </template>
                    </v-list-item>
                </template>
            </v-autocomplete>

            <v-btn
                icon
                @click="toggleTheme"
                class="mr-1 mr-sm-2 d-none d-sm-inline"
            >
                <v-icon>{{
                    theme.global.current.value.dark
                        ? "mdi-weather-night"
                        : "mdi-weather-sunny"
                }}</v-icon>
            </v-btn>
        </v-container>
        <template
            v-slot:extension
            v-if="
                !smAndDown &&
                router.currentRoute.value &&
                !router.currentRoute.value.path.startsWith('/review')
            "
        >
            <v-container maxWidth="1600" class="py-0 px-4 hidden-sm-and-down">
                <FilterBar />
            </v-container>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
import { getTypeIcon, getTypeName } from "~/utils/rating";

const theme = useTheme();
const router = useRouter();
const search = ref<string | null>(null);

// 从 content 层拉取所有基础信息供给全局搜索框
const { data: searchResults } = await useAsyncData("search-results", () =>
    queryCollection("content")
        .where("hidden", "<>", true)
        .select("title", "stem", "type", "score")
        .all(),
);

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
};

const onSearchSelect = (stem: string | null) => {
    if (stem) {
        router.push(`/review/${stem}`);
        search.value = null; // 跳转后清空搜索框
    }
};
</script>
