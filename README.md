# Mini-Book Site Generator

An [Antora](https://antora.org/) site generator that produces mini-book site.

## Install

To generate and publish a site with Antora, you need the Antora's command line interface (Antora CLI).

To install the Antora CLI and this site generator packages globally, open a terminal and run:

    $ npm i -g @antora/cli@2.3 mini-book-site-generator

Verify the antora command is available on your `PATH` by running:

    $ antora -v

If installation was successful, the command should report the version of Antora (where .x represents the latest patch number).

    $ antora -v
    2.3.x

## Directory Structure

This site generator expects the following directory structure (which differs from a standard Antora directory structure):
```
src/docs/asciidoc
├── antora.yml
├── chapters
│   ├── about.adoc
│   ├── acknowledgements.adoc
│   ├── action.adoc
│   ├── chapter1.adoc
│   ├── chapter2.adoc
│   ├── chapter3.adoc
│   ├── colophon.adoc
│   ├── dedication.adoc
│   ├── index.adoc
│   ├── introduction.adoc
│   └── preface.adoc
├── images
│   ├── cover.jpg
│   └── cover.png
├── index.adoc
└── nav.adoc
```

Example: https://github.com/mraible/infoq-mini-book
