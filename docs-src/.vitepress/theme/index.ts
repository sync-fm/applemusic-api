import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import StatusPanel from "./components/StatusPanel.vue";
import "./custom.css";

const theme: Theme = {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component("StatusPanel", StatusPanel);
	},
};

export default theme;
