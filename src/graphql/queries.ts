/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getApplication = /* GraphQL */ `
         query GetApplication($user_id: ID!, $application_id: ID!) {
           getApplication(user_id: $user_id, application_id: $application_id) {
             user_id
             application_id
             job_title
             job_link
             job_company
             job_description
             date_applied
             skills
             createdAt
             updatedAt
             owner
           }
         }
       `;
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user_id
        application_id
        job_title
        job_link
        job_company
        job_description
        date_applied
        skills
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
