<template>
  <header :class="['w-full ', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
          >Bobo Careers
        </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="userStore.isLoggedIn" />
          <action-button
            v-else
            text="Sign in"
            type="primary"
            @click="userStore.loginUser"
          />
        </div>
      </div>
      <the-subnav v-if="userStore.isLoggedIn" />
    </div>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav,
  },
  data() {
    return {
      url: "https://careers.google.com",
      menuItems: [
        { text: "Teams", url: "/" },
        { text: "Locations", url: "/" },
        { text: "Life at Bobo Corp", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: "/jobs/results" },
      ],
    };
  },
  computed: {
    ...mapStores(useUserStore), // ==> { userStore: {.....} } we have access via the this keyword
    headerHeightClass() {
      return !this.userStore.isLoggedIn ? "h-16" : "h-32";
    },
  },
};
</script>
