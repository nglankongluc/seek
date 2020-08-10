/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateApplicationInput = {
  job_title: string,
  job_link?: string | null,
  job_description: string,
  date_applied: string,
  skills: Array< string | null >,
};

export type ModelApplicationConditionInput = {
  user_id?: ModelIDInput | null,
  application_id?: ModelIDInput | null,
  job_title?: ModelStringInput | null,
  job_link?: ModelStringInput | null,
  job_description?: ModelStringInput | null,
  date_applied?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  and?: Array< ModelApplicationConditionInput | null > | null,
  or?: Array< ModelApplicationConditionInput | null > | null,
  not?: ModelApplicationConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateApplicationInput = {
  user_id?: string | null,
  application_id?: string | null,
  job_title?: string | null,
  job_link?: string | null,
  job_description?: string | null,
  date_applied?: string | null,
  skills?: Array< string | null > | null,
};

export type DeleteApplicationInput = {
  id?: string | null,
};

export type ModelApplicationFilterInput = {
  user_id?: ModelIDInput | null,
  application_id?: ModelIDInput | null,
  job_title?: ModelStringInput | null,
  job_link?: ModelStringInput | null,
  job_description?: ModelStringInput | null,
  date_applied?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  and?: Array< ModelApplicationFilterInput | null > | null,
  or?: Array< ModelApplicationFilterInput | null > | null,
  not?: ModelApplicationFilterInput | null,
};

export type CreateApplicationMutationVariables = {
  input: CreateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type CreateApplicationMutation = {
  createApplication:  {
    __typename: "Application",
    user_id: string,
    application_id: string,
    job_title: string,
    job_link: string | null,
    job_description: string,
    date_applied: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateApplicationMutationVariables = {
  input: UpdateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type UpdateApplicationMutation = {
  updateApplication:  {
    __typename: "Application",
    user_id: string,
    application_id: string,
    job_title: string,
    job_link: string | null,
    job_description: string,
    date_applied: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteApplicationMutationVariables = {
  input: DeleteApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type DeleteApplicationMutation = {
  deleteApplication:  {
    __typename: "Application",
    user_id: string,
    application_id: string,
    job_title: string,
    job_link: string | null,
    job_description: string,
    date_applied: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetApplicationQueryVariables = {
  id: string,
};

export type GetApplicationQuery = {
  getApplication:  {
    __typename: "Application",
    user_id: string,
    application_id: string,
    job_title: string,
    job_link: string | null,
    job_description: string,
    date_applied: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListApplicationsQueryVariables = {
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApplicationsQuery = {
  listApplications:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      user_id: string,
      application_id: string,
      job_title: string,
      job_link: string | null,
      job_description: string,
      date_applied: string,
      skills: Array< string | null >,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateApplicationSubscriptionVariables = {
  owner: string,
};

export type OnCreateApplicationSubscription = {
  onCreateApplication:  {
    __typename: "Application",
    user_id: string,
    application_id: string,
    job_title: string,
    job_link: string | null,
    job_description: string,
    date_applied: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateApplicationSubscriptionVariables = {
  owner: string,
};

export type OnUpdateApplicationSubscription = {
  onUpdateApplication:  {
    __typename: "Application",
    user_id: string,
    application_id: string,
    job_title: string,
    job_link: string | null,
    job_description: string,
    date_applied: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteApplicationSubscriptionVariables = {
  owner: string,
};

export type OnDeleteApplicationSubscription = {
  onDeleteApplication:  {
    __typename: "Application",
    user_id: string,
    application_id: string,
    job_title: string,
    job_link: string | null,
    job_description: string,
    date_applied: string,
    skills: Array< string | null >,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
