import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: `${import.meta.env.STRAPI_API_URL}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export async function GET({ url }) {
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

  const { data } = await client.query({
    query: gql`
      query Articles($page: Int!, $pageSize: Int!) {
        articles(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              title
              content
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
      }
    `,
    variables: { page, pageSize },
  });

  const { data: articles, meta } = data.articles;
  const hasMore = meta.pagination.page < meta.pagination.pageCount;

  return new Response(JSON.stringify({ articles, hasMore }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}