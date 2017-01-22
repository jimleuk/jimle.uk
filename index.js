const path          = require('path');
const Metalsmith    = require('metalsmith');
const collections   = require('metalsmith-collections');
const layouts       = require('metalsmith-layouts');
const permalinks    = require('metalsmith-permalinks');
const ignore        = require('metalsmith-ignore');
const sass          = require('metalsmith-sass');

const metalsmith_pug        = require('./plugins/metalsmith-pug');
const metalsmith_markdownit = require('./plugins/metalsmith-markdownit');
const cache_posts           = require('./plugins/cache-posts');

const settings      = require('./settings');
const template_tags = require('./src/utils/template_tags');
const build_dir     = settings.build_dir;

// =============================================================================
// assets
// =============================================================================
Metalsmith(__dirname)
    .source('src/static/css')
    .destination(`${build_dir}/static/css`)
    .clean(true)
    .use(ignore(['vendor/*']))
    .use(sass({ outputStyle: 'compressed' }))
    .build(function(err) {
        if (err) throw err;
    });

Metalsmith(__dirname)
    .source('src/static/img')
    .destination(`${build_dir}/static/img`)
    .clean(true)
    .build(function(err) {
        if (err) throw err;
    });

// =============================================================================
// posts
// =============================================================================
Metalsmith(__dirname)
    .metadata(Object.assign({}, settings, template_tags))
    .source('src/posts')
    .destination(`${build_dir}/posts`)
    .clean(true)
    .use(collections({
        posts: '*.md',
        sortBy: 'date',
        reverse: true
    }))
    .use(metalsmith_markdownit())
    .use(layouts({
        engine: 'pug',
        directory: 'src/templates'
    }))
    .use(cache_posts.plugin)
    .build(function(err) {
        if (err) throw err;
    });

// =============================================================================
// pages
// =============================================================================
Metalsmith(__dirname)
    .metadata(Object.assign({}, settings, template_tags))
    .source('src/pages')
    .destination(build_dir)
    .use(metalsmith_pug({
        getPosts: () => cache_posts.data.posts,
        getTags: () => cache_posts.data.tags
    }))
    .build(function(err) {
        if (err) throw err;
    });
