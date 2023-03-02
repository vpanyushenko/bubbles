<script>
  export let name;
  export let outline = false;

  name = `${name}`;

  /**
   * @typedef parsed_name
   * @type {{title: String, first: String, middle: String, last: String, nickname: String, suffix: String, initials: String, errors: Array}}
   */

  /**
   * Parses a name into pieces
   * @param {String} name_to_parse - the name to parse
   * @param {Object} options
   * @param {Boolean} [options.use_experimental_list=false] - if true, use experimental list of suffixes, prefixes, and titles
   * @returns {{title: String, first: String, middle: String, last: String, nickname: String, suffix: String, errors: Array}}
   */
  const parseName = (name_to_parse, options = { use_experimental_list: false }) => {
    let i,
      j,
      l,
      m,
      n,
      part,
      comma,
      TITLE_LIST,
      SUFFIX_LIST,
      PREFIX_LIST,
      parts_to_check,
      part_found,
      parts_found_count,
      first_comma,
      remaining_commas,
      name_parts = [],
      name_commas = [null],
      parts_found = [];

    const CONJUNCTIONS_LIST = ["&", "and", "et", "e", "of", "the", "und", "y"];

    /** @type {parsed_name} */
    let parsed_name = {
      title: "",
      first: "",
      middle: "",
      last: "",
      nickname: "",
      suffix: "",
      initials: "",
      errors: [],
    };

    const REGEX = /\s(?:[‘’']([^‘’']+)[‘’']|[“”"]([^“”"]+)[“”"]|\[([^\]]+)\]|\(([^\)]+)\)),?\s/g;

    name_to_parse = name_to_parse || "";

    // Auto-detect fix_case: fix if name_to_parse is all upper or all lowercase
    let fix_case =
      name_to_parse === name_to_parse.toUpperCase() || name_to_parse === name_to_parse.toLowerCase() ? true : false;

    function handleError(message) {
      parsed_name.errors.push(message);
    }
    /**
     *
     * @param {parsed_name} fixed_case_name
     * @param {Boolean} should_fix_case
     * @returns {parsed_name}
     */
    function fixParsedNameCase(fixed_case_name, should_fix_case) {
      const FORCED_CASE_LIST = [
        "e",
        "y",
        "av",
        "af",
        "da",
        "dal",
        "de",
        "del",
        "der",
        "di",
        "la",
        "le",
        "van",
        "der",
        "den",
        "vel",
        "von",
        "II",
        "III",
        "IV",
        "J.D.",
        "LL.M.",
        "M.D.",
        "D.O.",
        "D.C.",
        "Ph.D.",
      ];
      let forced_case_list_index;
      let name_part_labels = [];
      let name_part_strings;
      if (should_fix_case) {
        name_part_labels = Object.keys(parsed_name).filter((key) => {
          return key !== "errors";
        });
        for (i = 0, l = name_part_labels.length; i < l; i++) {
          if (fixed_case_name[name_part_labels[i]]) {
            name_part_strings = (fixed_case_name[name_part_labels[i]] + "").split(" ");
            for (j = 0, m = name_part_strings.length; j < m; j++) {
              forced_case_list_index = FORCED_CASE_LIST.map(function (v) {
                return v.toLowerCase();
              }).indexOf(name_part_strings[j].toLowerCase());
              if (forced_case_list_index > -1) {
                // Set case of words in FORCED_CASE_LIST
                name_part_strings[j] = FORCED_CASE_LIST[forced_case_list_index];
              } else if (name_part_strings[j].length === 1) {
                // Uppercase initials
                name_part_strings[j] = name_part_strings[j].toUpperCase();
              } else if (
                name_part_strings[j].length > 2 &&
                name_part_strings[j].slice(0, 1) === name_part_strings[j].slice(0, 1).toUpperCase() &&
                name_part_strings[j].slice(1, 2) === name_part_strings[j].slice(1, 2).toLowerCase() &&
                name_part_strings[j].slice(2) === name_part_strings[j].slice(2).toUpperCase()
              ) {
                // Detect McCASE and convert to McCase
                name_part_strings[j] = name_part_strings[j].slice(0, 3) + name_part_strings[j].slice(3).toLowerCase();
              } else if (
                name_part_labels[j] === "suffix" &&
                name_part_strings[j].slice(-1) !== "." &&
                !SUFFIX_LIST.indexOf(name_part_strings[j].toLowerCase())
              ) {
                // Convert suffix abbreviations to UPPER CASE
                if (name_part_strings[j] === name_part_strings[j].toLowerCase()) {
                  name_part_strings[j] = name_part_strings[j].toUpperCase();
                }
              } else {
                // Convert to Title Case
                name_part_strings[j] =
                  name_part_strings[j].slice(0, 1).toUpperCase() + name_part_strings[j].slice(1).toLowerCase();
              }
            }
            fixed_case_name[name_part_labels[i]] = name_part_strings.join(" ");
          }
        }
      }

      const getInitial = (string) => {
        return string
          .toLowerCase()
          .split(" ")
          .filter((s) => !FORCED_CASE_LIST.includes(s))
          .join(" ")
          .slice(0, 1)
          .toUpperCase();
      };

      fixed_case_name.initials = "";

      if (fixed_case_name.nickname) fixed_case_name.initials += getInitial(fixed_case_name.nickname);
      else if (fixed_case_name.first) fixed_case_name.initials += getInitial(fixed_case_name.first);
      if (fixed_case_name.last) fixed_case_name.initials += getInitial(fixed_case_name.last);

      return fixed_case_name;
    }

    // If no input name, or input name is not a string, abort
    if (!name_to_parse || typeof name_to_parse !== "string") {
      handleError("No name provided");
      parsed_name = fixParsedNameCase(parsed_name, fix_case);
      return parsed_name;
    } else {
      name_to_parse = name_to_parse.trim();
    }

    // Initialize lists of prefixes, suffixes, and titles to detect
    // Note: These list entries must be all lowercase
    if (options.use_experimental_list === true) {
      SUFFIX_LIST = [
        "esq",
        "esquire",
        "jr",
        "jnr",
        "sr",
        "snr",
        "2",
        "ii",
        "iii",
        "iv",
        "v",
        "clu",
        "chfc",
        "cfp",
        "md",
        "phd",
        "j.d.",
        "ll.m.",
        "m.d.",
        "d.o.",
        "d.c.",
        "p.c.",
        "ph.d.",
      ];
      PREFIX_LIST = [
        "a",
        "ab",
        "antune",
        "ap",
        "abu",
        "al",
        "alm",
        "alt",
        "bab",
        "bäck",
        "bar",
        "bath",
        "bat",
        "beau",
        "beck",
        "ben",
        "berg",
        "bet",
        "bin",
        "bint",
        "birch",
        "björk",
        "björn",
        "bjur",
        "da",
        "dahl",
        "dal",
        "de",
        "degli",
        "dele",
        "del",
        "della",
        "der",
        "di",
        "dos",
        "du",
        "e",
        "ek",
        "el",
        "escob",
        "esch",
        "fleisch",
        "fitz",
        "fors",
        "gott",
        "griff",
        "haj",
        "haug",
        "holm",
        "ibn",
        "kauf",
        "kil",
        "koop",
        "kvarn",
        "la",
        "le",
        "lind",
        "lönn",
        "lund",
        "mac",
        "mhic",
        "mic",
        "mir",
        "na",
        "naka",
        "neder",
        "nic",
        "ni",
        "nin",
        "nord",
        "norr",
        "ny",
        "o",
        "ua",
        "ui'",
        "öfver",
        "ost",
        "över",
        "öz",
        "papa",
        "pour",
        "quarn",
        "skog",
        "skoog",
        "sten",
        "stor",
        "ström",
        "söder",
        "ter",
        "ter",
        "tre",
        "türk",
        "van",
        "väst",
        "väster",
        "vest",
        "von",
      ];
      TITLE_LIST = [
        "mr",
        "mrs",
        "ms",
        "miss",
        "dr",
        "herr",
        "monsieur",
        "hr",
        "frau",
        "a v m",
        "admiraal",
        "admiral",
        "air cdre",
        "air commodore",
        "air marshal",
        "air vice marshal",
        "alderman",
        "alhaji",
        "ambassador",
        "baron",
        "barones",
        "brig",
        "brig gen",
        "brig general",
        "brigadier",
        "brigadier general",
        "brother",
        "canon",
        "capt",
        "captain",
        "cardinal",
        "cdr",
        "chief",
        "cik",
        "cmdr",
        "coach",
        "col",
        "col dr",
        "colonel",
        "commandant",
        "commander",
        "commissioner",
        "commodore",
        "comte",
        "comtessa",
        "congressman",
        "conseiller",
        "consul",
        "conte",
        "contessa",
        "corporal",
        "councillor",
        "count",
        "countess",
        "crown prince",
        "crown princess",
        "dame",
        "datin",
        "dato",
        "datuk",
        "datuk seri",
        "deacon",
        "deaconess",
        "dean",
        "dhr",
        "dipl ing",
        "doctor",
        "dott",
        "dott sa",
        "dr",
        "dr ing",
        "dra",
        "drs",
        "embajador",
        "embajadora",
        "en",
        "encik",
        "eng",
        "eur ing",
        "exma sra",
        "exmo sr",
        "f o",
        "father",
        "first lieutient",
        "first officer",
        "flt lieut",
        "flying officer",
        "fr",
        "frau",
        "fraulein",
        "fru",
        "gen",
        "generaal",
        "general",
        "governor",
        "graaf",
        "gravin",
        "group captain",
        "grp capt",
        "h e dr",
        "h h",
        "h m",
        "h r h",
        "hajah",
        "haji",
        "hajim",
        "her highness",
        "her majesty",
        "herr",
        "high chief",
        "his highness",
        "his holiness",
        "his majesty",
        "hon",
        "hr",
        "hra",
        "ing",
        "ir",
        "jonkheer",
        "judge",
        "justice",
        "khun ying",
        "kolonel",
        "lady",
        "lcda",
        "lic",
        "lieut",
        "lieut cdr",
        "lieut col",
        "lieut gen",
        "lord",
        "m",
        "m l",
        "m r",
        "madame",
        "mademoiselle",
        "maj gen",
        "major",
        "master",
        "mevrouw",
        "miss",
        "mlle",
        "mme",
        "monsieur",
        "monsignor",
        "mr",
        "mrs",
        "ms",
        "mstr",
        "nti",
        "pastor",
        "president",
        "prince",
        "princess",
        "princesse",
        "prinses",
        "prof",
        "prof dr",
        "prof sir",
        "professor",
        "puan",
        "puan sri",
        "rabbi",
        "rear admiral",
        "rev",
        "rev canon",
        "rev dr",
        "rev mother",
        "reverend",
        "rva",
        "senator",
        "sergeant",
        "sheikh",
        "sheikha",
        "sig",
        "sig na",
        "sig ra",
        "sir",
        "sister",
        "sqn ldr",
        "sr",
        "sr d",
        "sra",
        "srta",
        "sultan",
        "tan sri",
        "tan sri dato",
        "tengku",
        "teuku",
        "than puying",
        "the hon dr",
        "the hon justice",
        "the hon miss",
        "the hon mr",
        "the hon mrs",
        "the hon ms",
        "the hon sir",
        "the very rev",
        "toh puan",
        "tun",
        "vice admiral",
        "viscount",
        "viscountess",
        "wg cdr",
        "ind",
        "misc",
        "mx",
      ];
    } else {
      SUFFIX_LIST = [
        "esq",
        "esquire",
        "jr",
        "jnr",
        "sr",
        "snr",
        "2",
        "ii",
        "iii",
        "iv",
        "md",
        "phd",
        "j.d.",
        "ll.m.",
        "m.d.",
        "d.o.",
        "d.c.",
        "p.c.",
        "ph.d.",
      ];
      PREFIX_LIST = [
        "ab",
        "bar",
        "bin",
        "da",
        "dal",
        "de",
        "de la",
        "del",
        "della",
        "der",
        "di",
        "du",
        "ibn",
        "l'",
        "la",
        "le",
        "san",
        "st",
        "st.",
        "ste",
        "ter",
        "van",
        "van de",
        "van der",
        "van den",
        "vel",
        "ver",
        "vere",
        "von",
      ];
      TITLE_LIST = [
        "dr",
        "miss",
        "mr",
        "mrs",
        "ms",
        "prof",
        "sir",
        "frau",
        "herr",
        "hr",
        "monsieur",
        "captain",
        "doctor",
        "judge",
        "officer",
        "professor",
        "ind",
        "misc",
        "mx",
      ];
    }

    // Nickname: remove and store parts with surrounding punctuation as nicknames
    part_found = (" " + name_to_parse + " ").match(REGEX);
    if (part_found) parts_found = parts_found.concat(part_found);
    parts_found_count = parts_found.length;
    if (parts_found_count === 1) {
      parsed_name.nickname = parts_found[0].slice(2).slice(0, -2);
      if (parsed_name.nickname.slice(-1) === ",") {
        parsed_name.nickname = parsed_name.nickname.slice(0, -1);
      }
      name_to_parse = (" " + name_to_parse + " ").replace(parts_found[0], " ").trim();
      parts_found = [];
    } else if (parts_found_count > 1) {
      handleError(parts_found_count + " nicknames found");
      for (i = 0; i < parts_found_count; i++) {
        name_to_parse = (" " + name_to_parse + " ").replace(parts_found[i], " ").trim();
        parts_found[i] = parts_found[i].slice(2).slice(0, -2);
        if (parts_found[i].slice(-1) === ",") {
          parts_found[i] = parts_found[i].slice(0, -1);
        }
      }
      parsed_name.nickname = parts_found.join(", ");
      parts_found = [];
    }
    if (!name_to_parse.trim().length) {
      return fixParsedNameCase(parsed_name, fix_case);
    }

    // Split remaining name_to_parse into parts, remove and store preceding commas
    for (i = 0, n = name_to_parse.split(" "), l = n.length; i < l; i++) {
      part = n[i];
      comma = null;
      if (part.slice(-1) === ",") {
        comma = ",";
        part = part.slice(0, -1);
      }
      name_parts.push(part);
      name_commas.push(comma);
    }

    // Suffix: remove and store matching parts as suffixes
    for (l = name_parts.length, i = l - 1; i > 0; i--) {
      parts_to_check =
        name_parts[i].slice(-1) === "." ? name_parts[i].slice(0, -1).toLowerCase() : name_parts[i].toLowerCase();
      if (SUFFIX_LIST.indexOf(parts_to_check) > -1 || SUFFIX_LIST.indexOf(parts_to_check + ".") > -1) {
        parts_found = name_parts.splice(i, 1).concat(parts_found);
        if (name_commas[i] === ",") {
          // Keep comma, either before or after
          name_commas.splice(i + 1, 1);
        } else {
          name_commas.splice(i, 1);
        }
      }
    }
    parts_found_count = parts_found.length;
    if (parts_found_count === 1) {
      parsed_name.suffix = parts_found[0];
      parts_found = [];
    } else if (parts_found_count > 1) {
      handleError(parts_found_count + " suffixes found");
      parsed_name.suffix = parts_found.join(", ");
      parts_found = [];
    }
    if (!name_parts.length) {
      return fixParsedNameCase(parsed_name, fix_case);
    }

    // Title: remove and store matching parts as titles
    for (l = name_parts.length, i = l - 1; i >= 0; i--) {
      parts_to_check =
        name_parts[i].slice(-1) === "." ? name_parts[i].slice(0, -1).toLowerCase() : name_parts[i].toLowerCase();
      if (TITLE_LIST.indexOf(parts_to_check) > -1 || TITLE_LIST.indexOf(parts_to_check + ".") > -1) {
        parts_found = name_parts.splice(i, 1).concat(parts_found);
        if (name_commas[i] === ",") {
          // Keep comma, either before or after
          name_commas.splice(i + 1, 1);
        } else {
          name_commas.splice(i, 1);
        }
      }
    }
    parts_found_count = parts_found.length;
    if (parts_found_count === 1) {
      parsed_name.title = parts_found[0];
      parts_found = [];
    } else if (parts_found_count > 1) {
      handleError(parts_found_count + " titles found");
      parsed_name.title = parts_found.join(", ");
      parts_found = [];
    }
    if (!name_parts.length) {
      return fixParsedNameCase(parsed_name, fix_case);
    }

    // Join name prefixes to following names
    if (name_parts.length > 1) {
      for (i = name_parts.length - 2; i >= 0; i--) {
        if (PREFIX_LIST.indexOf(name_parts[i].toLowerCase()) > -1) {
          name_parts[i] = name_parts[i] + " " + name_parts[i + 1];
          name_parts.splice(i + 1, 1);
          name_commas.splice(i + 1, 1);
        }
      }
    }

    // Join conjunctions to surrounding names
    if (name_parts.length > 2) {
      for (i = name_parts.length - 3; i >= 0; i--) {
        if (CONJUNCTIONS_LIST.indexOf(name_parts[i + 1].toLowerCase()) > -1) {
          name_parts[i] = name_parts[i] + " " + name_parts[i + 1] + " " + name_parts[i + 2];
          name_parts.splice(i + 1, 2);
          name_commas.splice(i + 1, 2);
          i--;
        }
      }
    }

    // Suffix: remove and store items after extra commas as suffixes
    name_commas.pop();
    first_comma = name_commas.indexOf(",");
    remaining_commas = name_commas.filter(function (v) {
      return v !== null;
    }).length;
    if (first_comma > 1 || remaining_commas > 1) {
      for (i = name_parts.length - 1; i >= 2; i--) {
        if (name_commas[i] === ",") {
          parts_found = name_parts.splice(i, 1).concat(parts_found);
          name_commas.splice(i, 1);
          remaining_commas--;
        } else {
          break;
        }
      }
    }
    if (parts_found.length) {
      if (parsed_name.suffix) {
        parts_found = [parsed_name.suffix].concat(parts_found);
      }
      parsed_name.suffix = parts_found.join(", ");
      parts_found = [];
    }

    // Last name: remove and store last name
    if (remaining_commas > 0) {
      if (remaining_commas > 1) {
        handleError(remaining_commas - 1 + " extra commas found");
      }
      // Remove and store all parts before first comma as last name
      if (name_commas.indexOf(",")) {
        parsed_name.last = name_parts.splice(0, name_commas.indexOf(",")).join(" ");
        name_commas.splice(0, name_commas.indexOf(","));
      }
    } else {
      // Remove and store last part as last name
      parsed_name.last = name_parts.pop();
    }
    if (!name_parts.length) {
      return fixParsedNameCase(parsed_name, fix_case);
    }

    // First name: remove and store first part as first name
    parsed_name.first = name_parts.shift();
    if (!name_parts.length) {
      return fixParsedNameCase(parsed_name, fix_case);
    }

    // Middle name: store all remaining parts as middle name
    if (name_parts.length > 2) {
      handleError(name_parts.length + " middle names");
    }
    parsed_name.middle = name_parts.join(" ");

    return fixParsedNameCase(parsed_name, fix_case);
  };
</script>

<div class="avatar {$$props.class || ''}" style={$$props.style} class:outline>
  <p>{name.length > 3 ? parseName(name)?.initials : name}</p>
</div>

<style>
  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--background-color, var(--primary));
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .outline {
    outline: 2px solid var(--line-color, var(--white));
  }

  .avatar p {
    color: var(--color, var(--white));
  }
</style>
