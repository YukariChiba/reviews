import vuetify from "eslint-config-vuetify";
import prettier from "eslint-config-prettier";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  vuetify({
    ts: true,
  }),
  prettier(),
);
