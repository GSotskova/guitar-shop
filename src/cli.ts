#!/usr/bin/env node
import 'reflect-metadata';
import HelpCommand from './cli-command/help-command.js';
import CLIApplication from './app/cli-application.js';
import GenerateCommand from './cli-command/generate-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new GenerateCommand
]);
myManager.processCommand(process.argv);