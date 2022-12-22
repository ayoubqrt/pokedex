const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["raw.githubusercontent.com"],
	},
	experimental: { images: { allowFutureImage: true, unoptimized: true } },
};

module.exports = withVanillaExtract(nextConfig);
