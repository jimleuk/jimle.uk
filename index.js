#!/usr/local/bin/node

const Metalsmith    = require('metalsmith');
const collections   = require('@metalsmith/collections');
const layouts       = require('@metalsmith/layouts');
const inPlace       = require('@metalsmith/in-place');
const remove        = require('@metalsmith/remove');
const sass          = require('@metalsmith/sass');

const metalsmith_pug        = require('./plugins/metalsmith-pug');
const metalsmith_markdownit = require('./plugins/metalsmith-markdownit');
const cache_posts           = require('./plugins/cache-posts');

const settings      = require('./settings');
const template_tags = require('./src/utils/template_tags');
const TaskSequence = require('./src/utils/task_sequence');
const build_dir     = settings.build_dir;

const isProduction = process.env.NODE_ENV === 'production';

// =============================================================================
// assets
// =============================================================================
Metalsmith(__dirname)
    .source('src/static/css')
    .destination(`${build_dir}/static/css`)
    .use(remove(['vendor/*']))
    .use(sass({
        style: isProduction ? 'compressed' : 'expanded',
    }))
    .clean(false)
    .build(function(err) {
        if (err) throw err;
    });

Metalsmith(__dirname)
    .source('src/static/img')
    .destination(`${build_dir}/static/img`)
    .clean(false)
    .build(function(err) {
        if (err) throw err;
    });

// misc assets like favicon, robots.txt
Metalsmith(__dirname)
    .source('src/assets')
    .destination(`${build_dir}`)
    .clean(false)
    .build(function(err) {
        if (err) throw err;
    });

// keybase
Metalsmith(__dirname)
    .source('src/.well-known')
    .destination(`${build_dir}/.well-known`)
    .clean(false)
    .build(function(err) {
        if (err) throw err;
    });

// =============================================================================
// posts
// =============================================================================
const phase_posts = (resolve) => {
    Metalsmith(__dirname)
        .metadata(Object.assign({}, settings, template_tags))
        .source('src/posts')
        .destination(`${build_dir}/posts`)
        .use(collections({
            posts: '*.md',
            sortBy: 'date',
            reverse: true
        }))
        .use(metalsmith_markdownit())
        .use(layouts({
            directory: 'src/templates',
        }))
        .use(cache_posts.plugin)
        .clean(false)
        .build((err) => {
            if (err) throw err;
            resolve();
        });
};

// =============================================================================
// pages
// =============================================================================
const phase_pages = (resolve) => {
    Metalsmith(__dirname)
        .metadata(Object.assign({}, settings, template_tags))
        .source('src/pages')
        .destination(build_dir)
        .use(metalsmith_pug({
            getPosts: () => cache_posts.data.posts,
            getTags: () => cache_posts.data.tags
        }))
        .clean(false)
        .build((err) => {
            if (err) throw err;
            resolve();
        })
};

// =============================================================================
// Chain the phases to run in sequence
// assets don't have dependencies so they can run asynchronous
// =============================================================================
const taskSequence = new TaskSequence();

taskSequence
    .run(phase_posts)
    .run(phase_pages)
    .end();
