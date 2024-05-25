import * as path from 'path';
import { defineConfig } from 'rspress/config';
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';
import vercelAnalytics from 'rspress-plugin-vercel-analytics';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';

export default defineConfig({
  root: 'docs',
  base: '/ts-regex-builder/',
  title: 'TS Regex Builder',
  description: '<<TODO>>',
  icon: '/img/owl.png',
  logo: '/img/owl.png',
  logoText: 'TS Regex Builder',
  outDir: 'build',
  markdown: {
    checkDeadLinks: true,
    codeHighlighter: 'prism',
  },
  multiVersion: {
    default: '1.x',
    versions: ['1.x'],
  },
  route: {
    cleanUrls: true,
  },
  search: {
    versioned: true,
  },
  themeConfig: {
    enableContentAnimation: true,
    enableScrollToTop: true,
    outlineTitle: 'Contents',
    footer: {
      message: 'Copyright © 2024 Callstack Open Source',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/callstack/ts-regex-builder',
      },
    ],
  },
  globalStyles: path.join(__dirname, 'docs/styles/index.css'),
  builderConfig: {
    plugins: [
      pluginOpenGraph({
        title: 'React Native Testing Library',
        type: 'website',
        url: 'https://callstack.github.io/ts-regex-builder/',
        description: '<<TOOD>>',
      }),
    ],
    tools: {
      rspack(config, { addRules }) {
        addRules([
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
        ]);
      },
    },
  },
  plugins: [pluginFontOpenSans(), vercelAnalytics()],
});
