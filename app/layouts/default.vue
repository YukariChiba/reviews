<template>
    <NavBar />

    <v-main class="bg-background">
        <v-container max-width="1600" class="pa-0">
            <slot />
        </v-container>
    </v-main>

    <FootBar />
</template>
