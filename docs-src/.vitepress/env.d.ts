/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<
		Record<string, unknown>,
		Record<string, unknown>,
		unknown
	>;
	export default component;
}

declare module "*.json" {
	const value: unknown;
	export default value;
}
