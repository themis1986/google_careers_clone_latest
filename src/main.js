import { createApp } from "vue";
import App from "@/App.vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "@/index.css";

/* add icons to the library */
library.add(faSearch);

createApp(App).component("FontAwesomeIcon", FontAwesomeIcon).mount("#app");
