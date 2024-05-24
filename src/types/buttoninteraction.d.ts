import { Interaction, Client, ButtonInteraction } from 'discord.js';

/**
 * コマンドを表すクラスです。
 */
export class Interaction extends ButtonInteraction {
  /**
   * コマンドのデータです。
   */
  public data: {
    customId: string;
    aliases?: string[];
  };

  /**
   * コマンドを実行します。
   * @param interaction - インタラクションオブジェクトです。
   * @param client - Discordクライアントオブジェクトです。
   * @returns Promise<void>
   */
  private execute(interaction: Interaction, client: Client<boolean>): Promise<void>;
}
