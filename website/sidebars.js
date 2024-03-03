/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
export default {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      items: ['getting-started'],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsible: false,
      items: [
        'api/overview',
        'api/types',
        'api/builder',
        'api/constructs',
        'api/quantifiers',
        'api/character-classes',
        'api/anchors',
      ],
    },
    {
      type: 'doc',
      label: 'Examples',
      id: 'examples',
    },
  ],
};

