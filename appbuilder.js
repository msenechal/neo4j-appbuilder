#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const { join } = require('path');
const simpleGit = require('simple-git');

async function setupProject(repoUrl, branch) {
  const target = join(__dirname, 'your-app-name', `${branch}-project`);

  const git = simpleGit();

  try {
    await git.clone(repoUrl, target);
    console.log(`Cloning the repository ${repoUrl}...`);
    
    await git.cwd({ path: target, root: true });
    
    console.log(`Checking out the branch ${branch}...`);
    await git.checkout(branch);
    
    console.log(`Project setup complete.`);
  } catch (error) {
    console.error('Error setting up the project:', error);
  }
}

program
  .version('0.0.1')
  .description('AppBuilder CLI for building Neo4j solutions');

program
  .command('start')
  .description('Start the AppBuilder process')
  .action(() => {
    console.log("Welcome to AppBuilder!");
  });

program
  .command('backend <language> <branch>')
  .description('Choose a backend technology and branch (e.g., Node.js express)')
  .action((language, branch) => {
    console.log(`You have chosen ${language} as your backend with the ${branch} branch.`);
    let repoUrl;
    switch (language.toLowerCase()) {
      case 'nodejs':
        repoUrl = 'https://github.com/msenechal/neo4j-boilerplate-nodejs';
        break;
      case 'python':
        repoUrl = 'https://github.com/msenechal/neo4j-boilerplate-python';
        break;
      default:
        console.error('Unsupported backend language. Supported languages are Node.js and Python.');
        return;
    }
    setupProject(repoUrl, branch);
  });

program.parse(process.argv);
