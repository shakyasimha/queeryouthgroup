// /sanity/lib/imageUrl.ts
// import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// ✅ reuse your sanity client
import { client } from "./client"; // adjust path if your client file is elsewhere

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
