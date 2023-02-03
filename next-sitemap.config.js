const { blogConfig } = require('./config/index.js');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: blogConfig.url,
  generateRobotsTxt: true,
};
