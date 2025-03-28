/**
 * FeiShu Services Module
 *
 * Exports service implementations for FeiShu API operations.
 */
import type { ApiClientConfig } from '@/client/types.js';
import { BotService } from './bots/bot-service.js';
import { ChatService } from './chats/chat-service.js';
import { DocumentService } from './documents/document-service.js';
import { SheetService } from './sheets/sheet-service.js';

// Re-export all errors
export * from './error.js';

// Re-export document services
export * from './documents/document-service.js';

// Re-export bot services
export * from './bots/bot-service.js';

// Re-export chat services
export * from './chats/chat-service.js';

// Re-export sheet services
export * from './sheets/sheet-service.js';

/**
 * FeiShu services container
 *
 * Provides a unified interface to all FeiShu services.
 */
export class FeiShuServices {
  readonly documents: DocumentService;
  readonly bots: BotService;
  readonly chats: ChatService;
  readonly sheets: SheetService;

  /**
   * Initialize all FeiShu services
   *
   * @param config - Client configuration
   */
  constructor(config: ApiClientConfig) {
    this.documents = new DocumentService(config);
    this.bots = new BotService(config);
    this.chats = new ChatService(config);
    this.sheets = new SheetService(config);
  }
}

/**
 * Legacy FeiShu service
 *
 * Encapsulates FeiShu API interactions,
 * abstracting the complexities of the API client and authentication.
 *
 * @deprecated Use DocumentService and BotService instead
 */
export class FeiShuService {
  private client: DocumentService;

  /**
   * Initialize FeiShu service
   *
   * @param apiId - FeiShu application ID
   * @param apiSecret - FeiShu application secret
   */
  constructor(apiId: string, apiSecret: string) {
    this.client = new DocumentService({
      appId: apiId,
      appSecret: apiSecret,
    });
  }

  /**
   * Retrieve document content by ID
   *
   * Fetches the raw text content of a FeiShu document using its document ID.
   *
   * @param documentId - Unique identifier of the target document
   * @returns Raw text content of the document
   * @throws FeiShuApiError if API request fails or returns empty content
   */
  async getDocx(documentId: string): Promise<string> {
    return this.client.getDocumentContent(documentId);
  }
}
