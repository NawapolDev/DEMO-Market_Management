<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <!-- <NavigationView></NavigationView> -->
  <router-view/>
</template>

<script>
import './assets/tailwind.css';
import NavigationView from './views/NavigationView.vue';

export default {
    name: "app",
    components: { NavigationView }
}
</script>
