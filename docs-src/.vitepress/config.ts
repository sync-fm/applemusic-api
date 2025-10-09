import { defineConfig } from "vitepress";

export default defineConfig({
	title: "@syncfm/applemusic-api",
	description: "Type-safe helpers for Apple Music's private API.",
	srcDir: ".",
	outDir: "../docs",
	cleanUrls: true,
	lastUpdated: true,
	themeConfig: {
		logo: "/assets/favicon.png",
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Guides", link: "/guide/" },
			{ text: "API Reference", link: "/reference/" },
			{ text: "Credits", link: "/credits" },
			{ text: "GitHub", link: "https://github.com/sync-fm/applemusic-api" },
		],
		sidebar: {
			"/guide/": [
				{
					text: "Guides",
					items: [
						{ text: "Overview", link: "/guide/" },
						{ text: "Getting Started", link: "/guide/getting-started" },
					],
				},
			],
			"/reference/": [
				{ text: "Overview", link: "/reference/" },
				{
					text: "Core Class",
					items: [
						{ text: "AppleMusic", link: "/reference/classes/AppleMusic" },
					],
				},
				{
					text: "Namespaces",
					items: [
						{
							text: "AppleMusic",
							link: "/reference/@syncfm/namespaces/AppleMusic/",
						},
					],
				},
				{ text: "Globals", link: "/reference/globals" },
			],
		},
		socialLinks: [
			{ icon: "github", link: "https://github.com/sync-fm/applemusic-api" },
		],
		footer: {
			message: "Released under the MIT License.",
			copyright: `© ${new Date().getFullYear()} sync.fm`,
		},
	},
});
