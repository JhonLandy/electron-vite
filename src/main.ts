import App from "@src/App.vue";
import "@src/css/index.sass";
import "tailwindcss/tailwind.css";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
const vuetify = createVuetify({
    components,
    directives,
});

createApp(App).use(vuetify).mount("#app");
