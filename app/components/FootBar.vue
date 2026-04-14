<template>
    <v-footer app border class="text-caption text-medium-emphasis">
        <v-container maxWidth="1600" class="py-0 px-4 d-flex">
            <div class="d-flex align-center">
                &copy; 202{{
                    new Date().getFullYear().toString().slice(-1)
                }}
                Yukari Chiba. <span class="hidden-sm-and-down">All Rights Reserved.</span>
            </div>
            <v-spacer></v-spacer>
            <div class="hidden-sm-and-down">
                <v-btn variant="text" href="https://ewe.moe">Homepage</v-btn>
                <v-btn variant="text" href="https://0x7f.cc">Blog</v-btn>
            </div>
        </v-container>
    </v-footer>
</template>
