import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {
  faSearch,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import router from "@/router";

/* add icons to the library */
library.add(faSearch);
library.add(faAngleUp);
library.add(faAngleDown);

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .mount("#app");
