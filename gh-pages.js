import { publish } from "gh-pages";

publish(
  "build", // path to public directory
  {
    branch: "master",
    repo: "https://github.com/vpanyushenko/bubbles", // Update to point to your repository
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
