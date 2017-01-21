const path = require('path');
const pick = require('lodash.pick');
const tags = require('./helpers/tags');
const data = {
    posts: [],
    tags: {}
};

module.exports = {
    data,
    plugin: (files, metalsmith, done) => {
        data.posts.push(
            ...Object.keys(files).map((file) => (
                Object.assign(
                    { permalink: `/posts/${file.toLowerCase()}` },
                    pick(files[file], ['title', 'author', 'date', 'tags', 'meta', 'stats'])
                )
            )).sort((b, a) => (new Date(b.date)) < (new Date(a.date)))
        );

        data.tags = tags(data.posts);
        done();
    }
}