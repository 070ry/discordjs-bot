import { Interaction, Client } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

/**
 * コマンドを表すクラスです。
 */
export class Command extends SlashCommandBuilder {
  /**
   * コマンドのデータです。
   */
  data: {
    name: string;
    description: string;
    options?: any;
    defaultPermission?: boolean;
    aliases?: string[];
  };

  /**
   * コマンドを実行します。
   * @param interaction - インタラクションオブジェクトです。
   * @param client - Discordクライアントオブジェクトです。
   * @returns Promise<void>
   */
  execute(interaction: Interaction, client: Client<boolean>): Promise<void>;
}
