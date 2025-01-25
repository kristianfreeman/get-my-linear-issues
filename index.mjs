import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

async function getDueIssues() {
  // First, get the current user's ID
  const userResponse = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINEAR_API_KEY}`,
    },
    body: JSON.stringify({
      query: `query { viewer { id } }`
    }),
  });


  const userData = await userResponse.json();
  const userId = userData.data.viewer.id;

  // Then fetch issues assigned to that user
  const response = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINEAR_API_KEY}`,
    },
    body: JSON.stringify({
      query: `query($userId: ID!) {
        issues(
          filter: {
            assignee: { id: { eq: $userId } }
          }
        ) {
          nodes {
            title
            identifier
            createdAt
            state { name }
            team {
              organization {
                urlKey
              }
            }
          }
        }
      }`,
      variables: {
        userId
      }
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

getDueIssues();
