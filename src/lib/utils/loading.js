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
    const index = store.loading.findIndex((a) => a === id);

    if (index > -1) {
      store.loading.splice(index, 1);
    }

    return store;
  });
};

export { showLoading, hideLoading };
