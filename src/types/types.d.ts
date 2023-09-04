export declare type Tag = {
  id?: string;
  label?: string;
  tooltip?: string;
  color?: string;
  colors?: string[];
  small?: boolean = false;
  min_width?: number = 3;
  margin?: string = "0 0 0 0";
  dark_mode_invert?: boolean = false;
  onclick?: Function;
  onhover?: Function;
  onblur?: Function;
};

export declare type input_type =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "password"
  | "date"
  | "number"
  | "textarea"
  | "tel"
  | "phone"
  | "time"
  | "tag"
  | "chip"
  | "stripe"
  | "switch"
  | "select"
  | "select-number"
  | "button"
  | "submit"
  | "button-group"
  | "divider"
  | "radio"
  | "radio-group"
  | "checkbox-group"
  | "file"
  | "p"
  | "caption";

export declare type typeahead = (value: string) => Promise<{ label: string; value: string | number }>;

export declare type onselect = (value: any, event: Event) => void;

export declare type SelectOption =
  | {
      value: string | number | null;
      label: string;
      caption?: string;
    }
  | { divider: boolean; label: string }
  | { break: boolean };

export declare type Input = {
  id: string;
  label: string;
  type?: input_type = "text";
  error?: string | undefined;
  desc?: string | undefined;
  value?: any | null | undefined;
  margin?: boolean | undefined;
  bounds?: number[] | undefined;
  validation?: string | undefined;
  rows?: number | undefined;
  typeahead?: typeahead | undefined;
  autocomplete?: boolean | undefined;
  validate_on_blur?: boolean | undefined;
  debounce?: number | undefined;
  disabled?: boolean | undefined;
  extensions?: string[] | undefined;
  typeahead_options?: { label: string; value: string | number }[] | undefined;
  onselect?: Function | undefined;
  allow_multiple_files?: boolean | undefined;
  display_value?: string | undefined;
  width?: 100 | 75 | 50 | 25 | "100" | "75" | "50" | "25";
};

export declare type Select = {
  id: string;
  type: "select";
  options: SelectOption[];
  label: string;
  error?: string;
  desc?: string;
  value?: any | null;
  prefix_options?: SelectOption[];
  desc?: string;
  search?: boolean;
  search_threshold?: number;
  validation?: string;
  validate_on_blur?: boolean;
  min_width?: boolean;
  onselect?: onselect;
};

export declare type FormInput = (Input | Select) & { multiply_by?: number; is_hidden: boolean; to_js_date?: boolean };

//We'll pass in an array of FormInputs into a function
//and it will return an object where the keys are the id properties of the FormInputs
//and the values are the values of the FormInputs
export declare type FormData = {
  [key: string]: any;
};

// export declare type ExtractedData

export declare type TableHeaderCell = {
  label?: string;
  align?: "left" | "right";
  mobile_width?: number;
  width?: number;
  sort?: {
    order: "asc" | "desc";
    id: string;
  };
  checkbox?: boolean;
};

export declare type Button = {
  id?: string;
  label?: string;
  onclick?: Function;
  onsubmit?: Function;
  color?: string;
  mt?: boolean;
  mb?: boolean;
  wide?: boolean;
  new_page?: boolean;
  href?: string;
  counter?: number;
  preload?: "hover" | "tap" | "off";
  type?: "button" | "submit" | "reset";
  style?: string;
  disabled?: boolean;
  icon?:
    | "arrowLeft"
    | "arrowLeftDouble"
    | "arrowRight"
    | "arrowRightDouble"
    | "more"
    | "add"
    | "close"
    | "search"
    | "edit"
    | "trash"
    | "filter"
    | string;
  dark_mode_invert?: boolean;
  shadow?: boolean;
  typeahead?: typeahead;
  debounce?: number;
  search?: boolean;
  radius?: "blocky" | "rounded";
  larger?: boolean;
};

export declare type IconButton = {
  id?: string;
  icon?:
    | "arrowLeft"
    | "arrowLeftDouble"
    | "arrowRight"
    | "arrowRightDouble"
    | "more"
    | "add"
    | "close"
    | "search"
    | "edit"
    | "trash"
    | "filter"
    | string;
  type?: "button" | "submit" | "reset";
  onclick?: Function;
  options: SelectOption[];
  href?: string;
  new_page?: boolean;
  align?: "left" | "right";
  radius?: "blocky" | "rounded";
  larger?: boolean;
  dropdown_buttons?: Button[];
  counter?: number;
  color?: string;
  dark_mode_invert?: boolean;
  shadow?: boolean;
  typeahead?: typeahead;
  onselect?: onselect;
  debounce?: number;
  search?: boolean;
  reset_on_search?: boolean;
  search?: boolean;
  href_listener?: string;
};

export declare type Dropdown = {
  id?: string;
  value?: string | number | null;
  options?: SelectOption[];
  search?: boolean;
  placeholder?: string;
  empty?: string;
  create_option?: boolean;
  search_threshold?: number;
  type?: "select" | "select-number";
  align?: "left" | "right";
  parent?: string;
  is_list_open?: boolean;
  buttons: Button[];
};

export declare type TableCell = {
  id?: string;
  href?: string;
  text?: string;
  caption?: string;
  captions?: string[];
  large?: boolean;
  bold?: boolean;
  empty?: boolean;
  code?: boolean;
  tooltip?: string;
  preload?: "hover" | "tap" | "off";
  align?: "left" | "right";
  width?: number | "min";
  mobile_width?: number | "min";
  wrap?: boolean;
  mobile_wrap?: boolean;
  img?: {
    src?: string;
    alt?: string;
  };
  tag?: Tag;
  checkbox?: boolean;
  button?: Button;
};
