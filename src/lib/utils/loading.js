import { pageStore } from "$lib/stores/page.store";

const showLoading = (id) => {
  pageStore.update((store) => {
    if (!store.loading.includes(id)) {
      store.loading.push(id);
    }
    return store;
  });
};

const hideLoading = (id) => {
  pageStore.update((store) => {
    store.loading = store.loading.filter((a) => a !== id);

    if (!id) {
      store.loading = [];
    }

    return store;
  });
};

export { showLoading, hideLoading };
