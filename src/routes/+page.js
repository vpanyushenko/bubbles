import { redirect } from "@sveltejs/kit";

export const load = async (page) => {
  throw redirect(302, `/welcome`);
};
