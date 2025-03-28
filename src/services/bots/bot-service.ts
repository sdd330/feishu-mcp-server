import { BotClient, MessageType } from '@/client/index.js';
import type { ApiClientConfig } from '@/client/types.js';
/**
 * Bot Service
 *
 * Business logic for FeiShu bot operations.
 */
import { FeiShuApiError } from '../error.js';
import type { BotCardContentBO, BotMessageResponseBO } from './types/index.js';

/**
 * Bot service for FeiShu
 */
export class BotService {
  private client: BotClient;

  /**
   * Create bot service
   *
   * @param config - API client configuration
   */
  constructor(config: ApiClientConfig) {
    this.client = new BotClient(config);
  }

  /**
   * Send text message to a chat
   *
   * @param chatId - Chat ID
   * @param text - Message text
   * @returns Message ID
   */
  async sendTextMessage(
    chatId: string,
    text: string,
  ): Promise<BotMessageResponseBO> {
    try {
      const response = await this.client.sendMessage(
        chatId,
        text,
        MessageType.TEXT,
      );

      if (response.code !== 0) {
        throw new FeiShuApiError(
          `Failed to send message: ${response.msg}`,
          response.code,
        );
      }

      if (!response.data?.message_id) {
        throw new FeiShuApiError('No message ID returned');
      }

      return {
        messageId: response.data.message_id,
      };
    } catch (error) {
      if (error instanceof FeiShuApiError) {
        throw error;
      }

      throw new FeiShuApiError(
        `Error sending message: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Send interactive card message
   *
   * @param chatId - Chat ID
   * @param cardContent - Interactive card JSON content
   * @returns Message ID
   */
  async sendCardMessage(
    chatId: string,
    cardContent: BotCardContentBO,
  ): Promise<BotMessageResponseBO> {
    try {
      const response = await this.client.sendMessage(
        chatId,
        cardContent,
        MessageType.INTERACTIVE,
      );

      if (response.code !== 0) {
        throw new FeiShuApiError(
          `Failed to send card: ${response.msg}`,
          response.code,
        );
      }

      return {
        messageId: response.data?.message_id || '',
      };
    } catch (error) {
      if (error instanceof FeiShuApiError) {
        throw error;
      }

      throw new FeiShuApiError(
        `Error sending card: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
