import { gql } from "urql";

export type ResumeData = {
  post: {
    blobs: {
      textHtml: string;
    }[];
  };
};

export type ResumeVariables = {
  lang: string;
};

export const resumeQuery = gql<ResumeData, ResumeVariables>`
  query($lang: String!) {
    post(site: "hello.dhlyn.me", namespace: "resume", slug: $lang) {
      blobs {
        ... on MarkdownBlob {
          textHtml
        }
      }
    }
  }
`;
