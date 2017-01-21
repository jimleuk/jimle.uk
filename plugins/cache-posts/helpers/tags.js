module.exports = (posts) => {
    const tags = {};

    const addOrCreateTag = (tag, post) => {
        tag = tag.trim();
        if (!tags[tag]) tags[tag] = [];
        tags[tag].push(post);
    }

    posts.filter(post => !!post['tags']).map(post => {
        post.tags.split(',').forEach(tag => addOrCreateTag(tag, Object.assign({}, post)))
    });

    return tags;
}