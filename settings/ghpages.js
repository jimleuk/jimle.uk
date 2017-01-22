const config = require('./development');
const ghpages_domain="jimle-uk.github.io/jimle.uk";

module.exports = Object.assign(config, {
    "site_url": ghpages_domain,
    "site_static": `${ghpages_domain}/static`,
    "site_description": "This is a mirror site for http://jimle.uk",
    "https": true,
    "build_dir": "docs"
});