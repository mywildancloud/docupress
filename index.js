#!/usr/bin/env node

import { program } from "commander";
import degit from "degit";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";

program
  .version("1.0.2")
  .description("CLI to create a new Docubook project")
  .argument(
    "<project-directory>",
    "Directory to create the new Docubook project"
  )
  .action(async (projectDirectory) => {
    // URL repo untuk degit tanpa pilihan template
    const repo = "github:mywildancloud/docubook";
    const emitter = degit(repo);
    const projectPath = path.resolve(process.cwd(), projectDirectory);

    console.log(
      `Creating a new Docubook project in ${projectPath} from the main branch...`
    );

    // Spinner untuk cloning project
    const spinner = ora(`Cloning ${chalk.magenta("main")}...`).start();

    try {
      await emitter.clone(projectPath);
      spinner.succeed(
        `Docubook project successfully created in ${projectPath}!`
      );

      // Pilih paket manager
      const { packageManager } = await inquirer.prompt([
        {
          type: "list",
          name: "packageManager",
          message: "Choose your package manager:",
          choices: ["npm", "pnpm", "brew"],
        },
      ]);

      console.log(chalk.blue("\nNext steps:"));
      console.log(`1. Navigate to your project directory:`);
      console.log(`   cd ${projectDirectory}`);
      
      // Command install dependencies
      if (packageManager === "npm" || packageManager === "pnpm") {
        console.log(`2. Install dependencies:`);
        console.log(`   ${packageManager} install`);
        console.log(`3. Start the development server:`);
        console.log(`   ${packageManager} run dev`);
      } else if (packageManager === "brew") {
        console.log(`2. Install dependencies with brew:`);
        console.log(`   brew install ${projectDirectory}`);
      }

    } catch (err) {
      spinner.fail("Error creating project:");
      console.error(err.message);
    }
  });

program.parse(process.argv);
