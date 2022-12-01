## Validation Params

Every form input has a property called `validation`. This accept a string of values that indicate how you want this input to be validated.

You can pass multiple options by separating with a pipe character. In addition, some validations options take an extra parameter, which is done with a colon.

For example: a common use case is for password character to have a minimum length. So you want the field to be **required**, a **string**, and have a minimum length of 8. This will be expressed as: `required|string|min:8`. The order does not matter.

| Param        | Details                                                                         |
| :----------- | :------------------------------------------------------------------------------ |
| required     | The input has to have a value                                                   |
| boolean      | Accepts `true`, `false`, `0`, `1` and their string counterparts e.g: "true"     |
| accepted     | The value must be either: "on", "yes", `1`, "1", `true`, "true", or "checked"   |
| string       | The value must be a string                                                      |
| min: (min:7) | Compares the size of strings or the value of numbers if there is a truthy value |
| max: (max:5) | Compares the size of strings or the value of numbers if there is a truthy value |
| email        | The value must be an email                                                      |
| array        | The value must be an array                                                      |
| url          | The value must be a url                                                         |
| alpha        | The string value must only have letters, uppercase and lowercase                |
| alpha_dash   | The string value must only have letters, numbers, dashes, and underscores       |
| alpha_num    | The string must only have numbers and letters                                   |
| integer      | The value must be an integer. Can be a string like "10"                         |
| regex:       | Add a custom regex string for validation                                        |
| date         | The value has to be a date value                                                |
