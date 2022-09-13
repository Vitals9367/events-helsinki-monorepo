import type { JsonApiResponse } from '@events-helsinki/core-old/api/json-api';
import { isJsonApiSuccessResponse } from '@events-helsinki/core-old/api/json-api';
import type { GetPosts } from '@/backend/api/rest/post-repository.ssr';
import { ky } from '@/config/ky';

export const fetchPostsWithKy = async (): Promise<GetPosts> => {
  return ky
    .get('/api/rest/post')
    .json<JsonApiResponse<GetPosts>>()
    .then((resp) => {
      if (!isJsonApiSuccessResponse(resp)) {
        throw new Error(`Error fetching posts: ${JSON.stringify(resp.errors)}`);
      }
      return resp.data;
    });
};
