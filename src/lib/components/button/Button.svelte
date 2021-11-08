<script>
  import { goto } from "$app/navigation";
  import { pageStore } from "$lib/stores/page.store";
  import { v4 as uuid } from "@lukeed/uuid";

  export let label = "Submit";
  export let onclick = null;
  export let color = "purple";
  export let mt = false;
  export let mb = false;
  export let wide = false;
  export let href;

  let id = uuid();

  $: loading = $pageStore.is_fetching && $pageStore.clicked === id;

  function buttonClicked(event) {
    const id = event.currentTarget.id;
    $pageStore.clicked = id;

    if (href) {
      $pageStore.is_fetching = true;
      goto(href)
        .then(() => {
          $pageStore.is_fetching = false;
        })
        .catch((err) => {
          console.error(err);
          $pageStore.is_fetching = false;
        });
    }
  }
</script>

<button
  {id}
  class="btn"
  class:btn_purple={color === "purple"}
  class:btn_red={color === "red"}
  class:btn_gray={color === "gray" || color === "grey"}
  class:mb
  class:mt
  class:btn_wide={wide}
  on:click={onclick}
  on:click={buttonClicked}
>
  <div class="d-flex">
    <span class="spinner mr-1 hidden" class:hidden={!loading} />
    <span style="vertical-align: middle;">{label}</span>
  </div>
</button>

<style>
  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    content: "";
    box-sizing: border-box;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 0.15rem solid #ccc;
    border-top-color: #fff;
    animation: loading 0.6s linear infinite;
    display: inline-block;
    vertical-align: bottom;
  }
  .mb {
    margin-bottom: 1rem;
  }

  .mt {
    margin-top: 1rem;
  }

  .mr-1 {
    margin-right: 1rem;
  }
  .btn {
    min-width: 166px;
    height: 56px;
    padding: 0 1.25rem;
    border-radius: 1rem/1rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: 700;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn .icon,
  .btn__text {
    display: inline-block;
    vertical-align: middle;
  }

  .btn .icon {
    position: relative;
    top: -2px;
    font-size: 1.25rem;
  }

  .btn .icon:not(:last-child) {
    margin-right: 0.625rem;
  }

  .btn_white {
    background: #ffffff;
    color: #1b1d21;
  }

  .btn_white_outline {
    background: none;
    border: 2px solid var(--white);
    color: var(--white);
  }
  .btn_white_outline:hover,
  .btn_white:hover {
    background-color: var(--white);
    color: var(--black);
  }

  .btn_purple {
    background: #6c5dd3;
    color: #ffffff !important;
  }

  .btn_purple:focus,
  .btn_purple:hover {
    background: #5a49ce;
  }

  .btn_red {
    background: var(--error);
    color: #ffffff;
  }

  .btn_red_outline {
    background: none;
    border: 2px solid var(--error);
    color: var(--error);
  }

  .btn_red_outline:hover,
  .btn_red:hover {
    background: var(--error-light);
    color: var(--white);
  }

  .btn_blue {
    background: #3f8cff;
    color: #ffffff;
  }

  .btn_blue:hover {
    background: #1b77ff;
  }

  .btn_blue-dark {
    background: #0049c6;
    color: #ffffff;
  }

  .btn_blue-dark:hover {
    background: #0056ea;
  }

  .btn_black {
    background: #1b1d21;
    color: #ffffff !important;
  }

  .btn_black .icon {
    fill: #ffffff;
  }

  .btn_black:hover {
    background: #6c5dd3;
  }

  .btn_black_outline {
    background: none;
    border: 2px solid var(--black);
    color: var(--black);
  }

  .btn_black_outline:hover,
  .btn_black:hover {
    background: var(--dark);
    color: var(--white);
  }

  .btn_gray {
    background: var(--gray-light);
    color: var(--black);
  }

  .btn_gray_outline {
    background: none;
    border: 2px solid var(--gray-light);
    color: var(--black);
  }

  .btn_gray_outline:hover,
  .btn_gray:hover {
    background: rgba(228, 228, 228, 0.5);
  }

  .btn_wide {
    min-width: 100%;
  }

  .btn_small {
    width: 5rem;
    min-width: auto;
  }

  .btn[href] {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .btn:disabled {
    cursor: not-allowed;
  }

  .btn__group {
    display: flex;
    justify-content: flex-end;
  }

  .btn__group .btn {
    width: 100%;
    min-width: none;
    max-width: none;
    margin: 0 0.625rem;
  }

  .btn__group .btn:only-child {
    width: 100%;
    min-width: none;
    max-width: 50%;
    margin: 0 0.625rem;
    justify-content: flex-end;
  }

  .btn__group .btn:first-of-type {
    margin-left: 0;
  }

  .btn__group .btn_small {
    width: 5rem;
    min-width: auto;
  }

  .btn__group .btn:last-of-type {
    margin-right: 0;
  }

  body.dark .btn_white {
    background: #242731;
    color: #ffffff;
  }

  body.dark .btn_white:hover {
    background: #1b1d21;
  }

  body.dark .btn_gray {
    background: rgba(228, 228, 228, 0.1);
    color: #ffffff;
  }

  body.dark .btn_gray:hover {
    opacity: 0.8;
  }

  .icon__btn {
    position: relative;
  }

  .icon__btn__open {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    font-size: 0;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .icon__btn__open .icon {
    font-size: 1.5rem;
    fill: #1b1d21;
    -webkit-transition: fill 0.25s;
    -o-transition: fill 0.25s;
    transition: fill 0.25s;
  }

  .icon.icon__sm {
    font-size: 17px;
  }

  .icon__btn__open:hover {
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  .icon__btn__counter {
    position: absolute;
    top: 0;
    right: -12px;
    display: inline-block;
    min-width: 1.5rem;
    line-height: 1.5rem;
    border-radius: 50%;
    background: var(--error);
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
  }

  .icon__btn__wrap {
    position: absolute;
    /* top: calc(100% + 1.5rem); */
    right: -12px;
    width: 360px;
    padding: 1.5rem 12px;
    -webkit-box-shadow: 0 0.625rem 36px rgba(227, 230, 236, 0.8);
    box-shadow: 0 0.625rem 36px rgba(227, 230, 236, 0.8);
    background: #ffffff;
    border-radius: 1.5rem;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    z-index: 100;
    margin-top: 1rem;
    border: 1px solid rgba(227, 230, 236, 0.8);
    max-height: 600px;
    overflow-y: auto;
  }

  .icon__btn__info {
    margin-bottom: 0px;
    padding: 0 1.5rem;
  }

  .icon__btn__list {
    margin-bottom: 0px;
  }

  .icon__btn__item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 1rem 28px 1rem 1.25rem;
    border-radius: 12px;
    background: transparent;
    cursor: pointer;
    -webkit-transition: background 0.25s;
    -o-transition: background 0.25s;
    transition: background 0.25s;
  }

  .icon__btn__table__row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 1rem 1rem 1rem 1.25rem;
    background: transparent;
    flex-grow: 1;
  }

  .icon__btn__table__row .table__cell {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .icon__btn__item:hover {
    background: var(--gray-light);
  }

  .icon__btn__details {
    display: flex;
    justify-content: space-between;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    align-items: center;
  }

  .icon__btn__line {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* margin-bottom: 6px; */
  }

  .icon__btn__title {
    font-size: 17px;
    margin-right: auto;
    padding-left: 1.25rem;
    color: #11142d;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .icon__btn__list .icon__btn__title:not(:first-child) {
    margin-top: 2rem;
  }

  .icon__btn__header {
    font-size: 17px;
    margin-right: auto;
    color: #11142d;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .icon__btn__time,
  .icon__btn__text {
    color: #b2b3bd;
    text-align: left;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .icon__btn__text {
    margin-top: 6px;
    padding-right: 0.625rem;
  }

  .icon__btn__time {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-left: 1.25rem;
  }

  .icon__btn__btns {
    text-align: center;
  }

  .icon__btn__btn {
    min-width: 230px;
  }

  .icon__btn.active .icon__btn__open {
    background: #6c5dd3;
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  .icon__btn.active .icon__btn__open .icon {
    fill: #ffffff;
  }

  .icon__btn.active .icon__btn__wrap {
    visibility: visible;
    opacity: 1;
  }

  body.dark .icon__btn__open {
    background: #242731;
  }

  body.dark .icon__btn__wrap {
    border: 1px solid var(--dark);
  }

  body.dark .icon__btn__open .icon {
    fill: #ffffff;
  }

  body.dark .icon__btn__item .icon {
    fill: #ffffff;
  }

  body.dark .icon__btn__item:hover {
    background: var(--dark);
  }

  body.dark .icon__btn__open:hover {
    -webkit-box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.3);
    box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.3);
  }

  body.dark .icon__btn__wrap {
    background: #242731;
    -webkit-box-shadow: 0 0.625rem 2.5rem rgba(0, 0, 0, 0.3);
    box-shadow: 0 0.625rem 2.5rem rgba(0, 0, 0, 0.3);
  }

  body.dark .icon__btn__header {
    color: #ffffff;
  }

  body.dark .icon__btn.active .icon__btn__open {
    -webkit-box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.7);
    box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.7);
  }

  @media only screen and (max-width: 767px) {
    .icon__btn {
      position: static;
    }
    .icon__btn__open {
      width: 2.5rem;
      height: 2.5rem;
      -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
      box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    }
    .table__cell .icon__btn__open {
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .icon__btn__open .icon {
      font-size: 1.25rem;
    }
    .icon__btn__counter {
      top: 5px;
      right: 5px;
      min-width: 12px;
      height: 12px;
      font-size: 0;
    }
    .icon__btn__wrap {
      /* top: calc(100% + 1px); */
      right: 0;
      left: 0;
      width: auto;
      padding: 1.5rem 1rem;
      -webkit-box-shadow: 0px 30px 30px rgba(27, 29, 33, 0.3);
      box-shadow: 0px 30px 30px rgba(27, 29, 33, 0.3);
    }
    .icon__btn__info {
      margin-bottom: 1rem;
      padding: 0;
    }
    /* .icon__btn__list {
    margin-bottom: 1.5rem;
  } */
    .icon__btn__item {
      padding: 8px 1rem;
    }

    .icon__btn__item:hover {
      background: none;
    }
    .icon__btn__item:not(:last-child) {
      margin-bottom: 1.25rem;
    }
    .icon__btn__ava {
      margin-right: 1rem;
    }
    body.dark .icon__btn__open {
      -webkit-box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.3);
    }
    body.dark .icon__btn__wrap {
      -webkit-box-shadow: 0 30px 30px rgba(0, 0, 0, 0.5);
      box-shadow: 0 30px 30px rgba(0, 0, 0, 0.5);
    }
  }
</style>
