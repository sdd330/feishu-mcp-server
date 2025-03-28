import { ApiClient } from '@/client/api-client.js';
import type {
  ApiResponse,
  ListResponseData,
  PaginationOptions,
} from '@/client/types.js';
/**
 * Chat Client
 *
 * Implements FeiShu Chat API operations.
 */
import type {
  ChatData,
  ChatListParams,
  ChatSearchParams,
} from './types/index.js';

/**
 * Feishu Chat Client
 */
export class ChatClient extends ApiClient {
  /**
   * Search for groups
   *
   * @param params - Search parameters
   * @returns Search results
   */
  searchChats = (
    params: ChatSearchParams = {},
  ): Promise<ApiResponse<ListResponseData<ChatData>>> => {
    const { pageSize, pageToken, ...otherParams } = params;
    const pagination: PaginationOptions = {};

    if (pageSize) pagination.pageSize = pageSize;
    if (pageToken) pagination.pageToken = pageToken;

    return this.getList<ListResponseData<ChatData>>(
      '/open-apis/im/v1/chats/search',
      pagination,
      otherParams,
    );
  };

  /**
   * Get the list of groups that a user or bot is in
   *
   * @param params - List parameters
   * @returns List of chats
   */
  getChats = (
    params: ChatListParams = {},
  ): Promise<ApiResponse<ListResponseData<ChatData>>> => {
    const { pageSize, pageToken, ...otherParams } = params;
    const pagination: PaginationOptions = {};

    if (pageSize) pagination.pageSize = pageSize;
    if (pageToken) pagination.pageToken = pageToken;

    return this.getList<ListResponseData<ChatData>>(
      '/open-apis/im/v1/chats',
      pagination,
      otherParams,
    );
  };
}
