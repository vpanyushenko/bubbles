<label class="radio">
  <input class="radio__input" type="radio" name="radio" checked="" />
  <span class="radio__in">
    <span class="radio__tick" />
    <span class="radio__text">Followers</span>
  </span>
</label>

<style>
  .radio {
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .radio:hover .radio__in .radio__tick {
    background-color: var(--primary);
  }

  .radio__input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .radio__in {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .radio__tick {
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 20px;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e4e4e4;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .radio__input:checked + .radio__in .radio__tick {
    background: #6c5dd3;
  }

  .radio__text {
    margin-left: 8px;
    padding-top: 3px;
    font-size: 13px;
    line-height: 1.2;
    color: #808191;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .radio__input:checked + .radio__in .radio__tick:before {
    opacity: 1;
  }
  .radio__tick:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 4px rgb(0 0 0 / 50%);
    box-shadow: 0px 2px 4px rgb(0 0 0 / 50%);
    opacity: 0;
    -webkit-transition: opacity 0.25s;
    -o-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }
</style>
