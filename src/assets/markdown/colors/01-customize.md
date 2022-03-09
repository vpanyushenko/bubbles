## Customize Colors

The global stylesheet that you imported from <code class="lc">bubbles-ui/css/app.css</code> added all of the supported colors as variables. You're able to add a stylesheet after the Bubbles stylesheet to override those styles and add your own.

With the exception of black and white, every color has a base color, three lighter variations, and three darker variations. Below is an example for primary, which you should use in your css as a color variable: <code class="lc">color: var(--primary)</code> or <code class="lc">background: var(--primary-dark)</code>.

| Name              | Hex                                                            |
| ----------------- | -------------------------------------------------------------- |
| primary-lightest  | <strong style="color:var(--primary-lightest)">#DAD6F4</strong> |
| primary-lighter   | <strong style="color:var(--primary-lighter)">#B5AEE9 </strong> |
| primary-light     | <strong style="color:var(--primary-light)"> #9186DE </strong>  |
| primary           | <strong style="color:var(--primary)">#6C5DD3 </strong>         |
| primary-dark      | <strong style="color:var(--primary-dark)"> #50459E </strong>   |
| primary-darker    | <strong style="color:var(--primary-darker)">#352E69 </strong>  |
| primary-darkerest | <strong style="color:var(--primary-darkest)">#1B1734 </strong> |
