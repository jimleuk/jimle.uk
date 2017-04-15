const path              = require('path');
const check             = require('./helpers/check');
const each              = require('async').each;
const hljs              = require('highlightjs');
const markdown          = require('markdown-it');
const markdown_footnote = require('markdown-it-footnote');

module.exports = (opts) => {
    const md = markdown({
        highlight: (str, lang) => {
            const hasLang = lang && hljs.getLanguage(lang);
            return hasLang ? hljs.highlight(lang, str).value : '';
        }
    });

    md.use(markdown_footnote);

    return (files, metalsmith, done) => {
        const matches = {};
        const pattern = '*.md';

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

            // Rename file if necessary
            delete files[file];
            const fileInfo = path.parse(file);
            file = path.join(fileInfo.dir, fileInfo.name + '.html');

            try {
                const contents = md.render(data.contents);
                data.html_content = contents;
                data.contents = new Buffer(contents);
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