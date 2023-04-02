import { Client, cacheExchange, fetchExchange } from "urql";

export const client = new Client({
  url: "https://cms.lynlab.co.kr/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
