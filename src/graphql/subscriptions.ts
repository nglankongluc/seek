/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication($owner: String!) {
    onCreateApplication(owner: $owner) {
      user_id
      application_id
      job_title
      job_link
      job_description
      date_applied
      skills
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication($owner: String!) {
    onUpdateApplication(owner: $owner) {
      user_id
      application_id
      job_title
      job_link
      job_description
      date_applied
      skills
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication($owner: String!) {
    onDeleteApplication(owner: $owner) {
      user_id
      application_id
      job_title
      job_link
      job_description
      date_applied
      skills
      createdAt
      updatedAt
      owner
    }
  }
`;
