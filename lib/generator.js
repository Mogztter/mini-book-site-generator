'use strict'

/**
 * Book Generator based on Antora
 */
const asciidocLoader = require('../packages/asciidoc-loader/lib/index')
const { resolveConfig: resolveAsciiDocConfig } = asciidocLoader
const aggregateContent = require('../packages/content-aggregator/lib/index')
const buildNavigation = require('../packages/navigation-builder/lib/index')
const buildPlaybook = require('@antora/playbook-builder')
const classifyContent = require('../packages/content-classifier/lib/index')
const convertDocuments = require('../packages/document-converter/lib/index')
const createPageComposer = require('@antora/page-composer')
const loadUi = require('../packages/ui-loader/lib/index')
const mapSite = require('@antora/site-mapper')
const produceRedirects = require('../packages/redirect-producer/lib/index')
const publishSite = require('@antora/site-publisher')


async function generateSite (args, env) {
  const playbook = buildPlaybook(args, env)
  const asciidocConfig = resolveAsciiDocConfig(playbook)
  const [contentCatalog, uiCatalog] = await Promise.all([
    aggregateContent(playbook).then((contentAggregate) => classifyContent(playbook, contentAggregate, asciidocConfig)),
    loadUi(playbook),
  ])
  const pages = convertDocuments(contentCatalog, asciidocConfig, { asciidocLoader })
  const navigationCatalog = buildNavigation(contentCatalog, asciidocConfig)
  const composePage = createPageComposer(playbook, contentCatalog, uiCatalog, env)
  pages.forEach((page) => composePage(page, contentCatalog, navigationCatalog))
  const siteFiles = mapSite(playbook, pages).concat(produceRedirects(playbook, contentCatalog))
  if (playbook.site.url) siteFiles.push(composePage(create404Page()))
  const siteCatalog = { getAll: () => siteFiles }
  return publishSite(playbook, [contentCatalog, uiCatalog, siteCatalog])
}

function create404Page () {
  return {
    title: 'Page Not Found',
    mediaType: 'text/html',
    src: { stem: '404' },
    out: { path: '404.html' },
    pub: { url: '/404.html', rootPath: '' },
  }
}

module.exports = generateSite
