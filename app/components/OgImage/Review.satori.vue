<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
    score: number;
    color: string;
    type: string;
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
            justify-content: center;
            font-family: 'Noto Sans SC', sans-serif;
        "
    >
        <div style="display: flex; flex-direction: column; flex-grow: 1">
            <div
                style="
                    font-size: 32px;
                    color: #a0a0a0;
                    margin-bottom: 20px;
                    display: flex;
                "
            >
                {{ type }} 评论
            </div>
            <h1
                style="
                    font-size: 72px;
                    font-weight: 700;
                    margin: 0 0 20px 0;
                    line-height: 1.1;
                "
                :style="{ color: color }"
            >
                {{ title }}
            </h1>
            <p
                style="
                    font-size: 36px;
                    color: #cccccc;
                    margin: 0 0 40px 0;
                    max-width: 900px;
                    line-height: 1.4;
                "
            >
                {{ description }}
            </p>
        </div>
        <div
            style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            "
        >
            <div
                style="
                    display: flex;
                    font-size: 40px;
                    font-weight: bold;
                    color: #888888;
                "
            >
                0x7f Reviews / 羊羊点评
            </div>
            <div
                style="
                    display: flex;
                    padding: 16px 32px;
                    border-radius: 20px;
                    font-size: 48px;
                    font-weight: 900;
                    background-color: #222222;
                    align-items: center;
                    justify-content: center;
                "
                :style="{ color: color }"
            >
                Score: {{ score.toFixed(1) }}
            </div>
        </div>
    </div>
</template>
