<template>
    <v-app>
        <v-main>
            <WelcomeScreen />
        </v-main>
    </v-app>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen.vue'

export default {
    name: 'App',

    components: {
        WelcomeScreen,
    },

    data: () => ({
        //
    }),

    emits: ['continue'],
}
</script>
