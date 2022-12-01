const formatPosts = (posts) => {
  const _posts = [];
  const temp = [];
  let count = 0;

  for (let path in posts) {
    const post = posts[path];

    const p = {
      markdown: post.default,
      metadata: post.metadata || {},
    };

    if (path.slice(path.length - 6) === "svelte") {
      p.metadata.svelte = true;
    }

    if (path.slice(path.length - 9) === "50.svelte") {
      p.metadata.width = 50;
      p.metadata.height = 100;
    }

    if (p?.metadata?.width === 50) {
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
