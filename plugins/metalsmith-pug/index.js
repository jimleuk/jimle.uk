const path = require('path');
const check = require('./helpers/check');
const each = require('async').each;
const pug = require('jstransformer')(require('jstransformer-pug'));

module.exports = (opts) => {
    const { getPosts, getTags } = opts;

    return (files, metalsmith, done) => {
        const matches = {};
        const pattern = '*.pug';

        const posts = getPosts();
        const tags = getTags();

        /**
         * Stringify files that pass the check, pass to matches
         */
        Object.keys(files).forEach((file) => {
            if (!check(files, file, pattern, true)) {
                return;
            }

            const data = files[file];
            data.contents = data.contents.toString();
            matches[file] = data;
        });

        /**
        * Render files
        */
        const convert = (file, done) => {
            const data = files[file];
            const render = pug.render.bind(pug);

            // Rename file if necessary
            delete files[file];
            const fileInfo = path.parse(file);
            file = path.join(fileInfo.dir, fileInfo.name + '.html');

            try {
                const render_vars = Object.assign({
                    posts,
                    tags,
                    filename: path.join(metalsmith.source(), file)
                }, metalsmith.metadata());

                data.contents = render(data.contents, render_vars).body;

                if (data.output_filename) {
                    file = path.join(fileInfo.dir, data.output_filename);
                }

                files[file] = data;
                done();
            } catch (err) {
                done(err);
            }
        }

        /**
        * Render all matched files
        */
        each(Object.keys(matches), convert, done);
    }
}