import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const sendHarnessData = async (formData) => {
  const payload = {
    pipeline_name: formData.pipelineName || "",
    account_identifier: formData.accountIdentifier || "",
    project_identifier: formData.projectIdentifier || "",
    org_identifier: formData.orgIdentifier || "",
    module_type: formData.moduleType || "",
    repo_identifier: formData.repoIdentifier || "",
    branch: formData.branch || "",
    parent_entity_connector_ref: formData.parentEntityConnectorRef || "",
    parent_entity_connector_repoName: formData.parentEntityConnectorRepoName || "",
    get_default_from_other_repo: formData.getDefaultFromOtherRepo || ""
  };

  try {
    const response = await axios.post(
      `${API_URL}/harness/pass-to-include`,
      { payload },
      {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
