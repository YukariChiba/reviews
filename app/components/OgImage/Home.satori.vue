<script setup lang="ts">
defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        style="
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background-color: #0d0d0d;
            color: #ffffff;
            padding: 80px;
            justify-content: space-between;
            font-family: 'Noto Sans SC', sans-serif;
        "
    >
        <!-- 顶部 Logo 标识 -->
        <div
            style="
                display: flex;
                align-items: center;
                font-size: 48px;
                font-weight: 900;
                color: #bb86fc;
                letter-spacing: -1px;
            "
        >
            0x7f
            <span style="color: #ffffff; margin-left: 12px; font-weight: bold"
                >Reviews</span
            >
        </div>

        <!-- 核心标题与描述 -->
        <div style="display: flex; flex-direction: column">
            <h1
                style="
                    font-size: 96px;
                    font-weight: 900;
                    margin: 0 0 24px 0;
                    line-height: 1.1;
                    letter-spacing: -2px;
                "
            >
                {{ title || "羊羊点评" }}
            </h1>
            <p
                style="
                    font-size: 42px;
                    color: #a0a0a0;
                    margin: 0;
                    max-width: 950px;
                    line-height: 1.5;
                "
            >
                {{
                    description ||
                    "Personal review collection by Yukari Chiba. Discover ratings and thoughts on games, movies, books, and more."
                }}
            </p>
        </div>

        <!-- 底部装饰性分类标签 -->
        <div style="display: flex; gap: 24px">
            <div
                v-for="category in ['Games', 'TV Series', 'Movies', 'Books', 'Others']"
                style="
                    display: flex;
                    padding: 12px 32px;
                    background-color: #222222;
                    border-radius: 20px;
                    font-size: 32px;
                    font-weight: bold;
                    color: #eeeeee;
                    align-items: center;
                    justify-content: center;
                "
            >
                {{ category }}
            </div>
        </div>
    </div>
</template>
