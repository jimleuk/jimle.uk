const path = require('path');
const check = require('./helpers/check');
const each = require('async').each;

module.exports = (opts) => {

  return (files, metalsmith, done) => {
    const matches = {};
    const pattern = '*.html';

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
      try {
        const pattern = /!{video,?([^}]+)?}\(([^\)]+)\)/ig;
        const contents = data.contents.replace(pattern, (match, params, sourceString) => {
          const attributes = (params ? params.split(',') : []).reduce((acc, attr) => {
            let [key, value] = attr.split('=');
            if (key === 'width' || key === 'height') {
              value = `"${value}px"`;
            }
            return { ...acc, [key]: value }
          }, {
            width: '"100%"',
            height: '"auto"',
            controls: true,
            muted: true,
          });
          const sources = sourceString.split(',').map(source => ({
            src: source.trim(),
            type: path.extname(source.trim()).substr(1,4),
          }));
          return `
            <video ${Object.keys(attributes).map(key => `${key}=${attributes[key]}`).join(' ')}>
              ${sources.map(source => `<source src="${source.src}" type="video/${source.type}">`)}
              Your browser does not support the video tag.
            </video>
          `.trim();
        });
        data.html_content = contents;
        data.contents = Buffer.from(contents);
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