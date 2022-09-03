import { error } from '@sveltejs/kit';

throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ url, params, fetch, session, stuff }) {
  throw error(404);
}
