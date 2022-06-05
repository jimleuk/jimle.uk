const config = require('./development');

module.exports = Object.assign(config, {
    "site_url": "www.jimle.uk",
    "site_static": "www.jimle.uk/static",
    "https": true,
    "build_dir": "docs",
});