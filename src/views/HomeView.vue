<template>
    <div class="home">
        <WelcomeScreen />
    </div>
</template>

<script>
// @ is an alias to /src
import WelcomeScreen from '@/components/WelcomeScreen.vue'

export default {
    name: 'HomeView',
    components: {
        WelcomeScreen
    }
}
</script>
