export function importAll(imports) {
  // mdsvex generates a real JS module out of each Markdown file.
  // The .default of such a module is a Svelte component(!) which contains the actual Markdown content rendered as HTML.
  const modules = Object.values(imports);

  const markdown = modules.map((item) => {
    return item.default;
  });
  // This is the frontmatter in the Markdown file, parsed by mdsvex automagically as 'metadata'
  const metadata = modules.map((wi) => wi.metadata);
  return { metadata, markdown };
}

export function importMarkdown() {
  const imports = import.meta.globEager("../data/*.{svx,md}");
  // You could also load a single file with: const natttModule = (await import('../data/work/nattt.md')).default;
  return importAll(imports);
}
