import { ApiClient } from '@/client/api-client.js';
import type { ApiResponse, PaginationOptions } from '@/client/types.js';
/**
 * Document Client for FeiShu
 *
 * API client specialized for document operations
 */
import type { DocumentContent, DocumentInfo } from './types/index.js';

/**
 * Document API client
 *
 * Specialized client for interacting with FeiShu document APIs
 */
export class DocumentClient extends ApiClient {
  /**
   * Get document raw content
   *
   * @param documentId - ID of the document
   * @param lang - Language setting (0 for default)
   * @returns Document content response
   */
  getDocumentContent = (
    documentId: string,
    lang = 0,
  ): Promise<ApiResponse<DocumentContent>> =>
    this.get<DocumentContent>(
      `/open-apis/docx/v1/documents/${documentId}/raw_content`,
      { lang },
    );

  /**
   * Get document metadata
   *
   * @param documentId - ID of the document
   * @returns Document information response
   */
  getDocumentInfo = (documentId: string): Promise<ApiResponse<DocumentInfo>> =>
    this.get<DocumentInfo>(`/open-apis/docx/v1/documents/${documentId}`);

  /**
   * Create a new document
   *
   * @param options - Document creation options
   * @returns Created document info response
   */
  createDocument = (
    options: { title?: string; folderToken?: string } = {},
  ): Promise<ApiResponse<DocumentInfo>> =>
    this.post<DocumentInfo>('/open-apis/docx/v1/documents', {
      title: options.title,
      folder_token: options.folderToken,
    });
}
