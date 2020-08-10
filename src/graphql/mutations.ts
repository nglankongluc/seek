/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
      user_id
      application_id
      job_title
      job_link
      job_description
      date_applied
      skills
      createdAt
      updatedAt
    }
  }
`;
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
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
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
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
