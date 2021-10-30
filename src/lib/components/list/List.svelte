<script>
  export let items = [];
</script>

<div class="table__row__info">
  <div class="label color-gray">{label}</div>
  <div class="text d-flex justify-content-between">
    <a href="">{value}</a>
  </div>
</div>

<style>
  .table__row__info {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 4px;
    border: 1px solid #e4e4e4;
    border-radius: 16px;
    font-weight: 600;
    padding: 0 46px 0 21px;
    min-height: 80px;
  }

  .table__row__info > .label {
    margin-bottom: 0 !important;
    padding-top: 16px;
    padding-bottom: 4px;
    pointer-events: none;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
  }

  .table__row__info > .text {
    color: var(--black);
    margin-bottom: 0.5rem;
  }
</style>
