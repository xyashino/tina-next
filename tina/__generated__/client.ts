import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '0764b7091ee874ce1176e65116de6d0a8323fe35', queries,  });
export default client;
  