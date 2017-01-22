let settings_file = './development';
let debug = !true;

if (process.env.NODE_ENV === 'production') {
    settings_file = './production';
} else if (process.env.NODE_ENV === 'ghpages') {
    settings_file = './ghpages';
}

const settings = Object.assign({}, require(settings_file), { debug });

module.exports = settings;
