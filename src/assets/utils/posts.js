const formatPosts = (posts) => {
  const _posts = [];
  const temp = [];
  let count = 0;

  for (let path in posts) {
    const post = posts[path];
    const metadata = post.metadata;

    const p = {
      markdown: post.default,
      metadata,
    };

    if (post?.metadata?.width === 50) {
      temp.push(p);
      count++;

      if (count === 2) {
        let copy = [...temp];
        _posts.push(copy);
        temp.length = 0;
        count = 0;
      }
    } else {
      _posts.push(p);
    }
  }

  return _posts;
};

export { formatPosts };
