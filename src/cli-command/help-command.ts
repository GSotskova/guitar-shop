import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log('Программа для подготовки данных для REST API сервера.');
    console.log(`
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --help:                      # печатает этот текст
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
        `);
  }
}