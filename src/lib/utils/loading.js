import { pageStore } from "$lib/stores/page.store";

const showLoading = (id) => {
  pageStore.update((store) => {
    if (!store.loading.includes(id) && id) {
      store.loading.push(id);
    }
    return store;
  });
};

const hideLoading = (id) => {
  if (!id) {
    return;
  }

  pageStore.update((store) => {
    if (Array.isArray(store.loading)) {
      store.loading = store.loading.filter((a) => a !== id);
    } else {
      store.loading = [];
    }

    if (store.clicked === id) {
      store.clicked = null;
    }

    return store;
  });
};

export { showLoading, hideLoading };
