const pth = require('path');
const crypto = require('crypto');
const settings = require('../../settings');
const Moment = require('moment');
const protocol = settings.https ? 'https://' : 'http://';

const cache_string = +(new Date());

const url = (path) => {
    if (!path.startsWith('http')) {
        if (path[0] !== pth.sep) path = pth.sep + path;
        return `${protocol}${settings.site_url}${path}`;
    } else {
        return path;
    }
}

module.exports = {
    url,

    static: (path) => {
        if (path[0] !== pth.sep) path = pth.sep + path;
        if (path.startsWith('/static/')) path = path.replace('/static/', '/');
        return `${protocol}${settings.site_static}${path}?t=${cache_string}`;
    },

    dateFormat: (dateString) => {
        return new Moment(dateString).format('dddd, Do MMM YYYY');
    },

    tagsFormat: (tags) => {
        return tags.split(',').map(tag => {
            tag = tag.trim();
            return `<a href="${url(`/tags.html#${tag}`)}">#${tag}</a>`;
        }).join('');
    },

    md5: (str) => {
        return crypto.createHash('md5').update(str).digest('hex');
    }
};