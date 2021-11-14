import { publish } from "gh-pages";

publish(
  "build", // path to public directory
  {
    branch: "dev",
    repo: "https://github.com/vpanyushenko/bubbles",
    user: {
      name: "vpanyushenko", // update to use your name
      email: "me@panyushenko.com", // Update to use your email
    },
    dotfiles: true,
  },
  () => {
    console.log("Deploy Complete!");
  }
);
