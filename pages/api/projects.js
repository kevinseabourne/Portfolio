import { gql, GraphQLClient } from "graphql-request";

export async function getAllProjects() {
  const url = process.env.NEXT_PUBLIC_ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: process.env.NEXT_PUBLIC_GRAPHCMS_AUTH_TOKEN,
    },
  });

  const query = gql`
    {
      projects {
        websiteLink
        displayImage {
          url
        }
        title
        shortDescription
        shortStack
      }
    }
  `;

  const data = await graphQLClient.request(query);
  return data;
}

export async function getProject(slug) {
  try {
    const url = process.env.NEXT_PUBLIC_ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
      headers: {
        authorization: process.env.NEXT_PUBLIC_GRAPHCMS_AUTH_TOKEN,
      },
    });

    const query = gql`
      query($slug: String!) {
        project(where: { slug: $slug }) {
          title
          description
          features
          fullStack
          githubLink
          websiteLink
          stackChoice
          galleryImages {
            url
          }
          challengesFaced
          lessonsLearned
        }
      }
    `;

    const variables = {
      slug,
    };

    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (ex) {
    return ex;
  }
}

export async function getOtherProjects(slug) {
  try {
    const url = process.env.NEXT_PUBLIC_ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
      headers: {
        authorization: process.env.NEXT_PUBLIC_GRAPHCMS_AUTH_TOKEN,
      },
    });

    const query = gql`
      query($slug: String!) {
        projects(where: { slug_not: $slug }) {
          websiteLink
          displayImage {
            url
          }
          title
          shortDescription
          shortStack
        }
      }
    `;

    const variables = {
      slug,
    };

    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (ex) {}
}
