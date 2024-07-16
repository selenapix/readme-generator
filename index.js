const inquirer = require('inquirer');
const fs = require('fs');

//License Badges depending on user input
const licenseBadges = {
  MIT: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
  GPL: '[![License: GPL](https://img.shields.io/badge/License-GPL-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
  Apache: '[![License: Apache](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)',
  BSD: '[![License: BSD](https://img.shields.io/badge/License-BSD-green.svg)](https://opensource.org/licenses/BSD-3-Clause)',
  None: ''
};

//function so that the license badge renders
function renderLicenseBadge(license) {
  return licenseBadges[license] || '';
}

//Questions for user input to create new README file
const questions = [
  { type: 'input', name: 'Title', message: 'Enter the title of your project' },
  { type: 'input', name: 'Description', message: 'Provide a description for your project' },
  { type: 'input', name: 'Installation', message: 'What installation steps are required for this project?' },
  { type: 'input', name: 'Usage', message: 'How would a user use this project?' },
  { type: 'list', name: 'Licenses', choices: ['MIT', 'GPL', 'Apache', 'BSD 3-Clause', 'Creative Commons', 'None'] },
  { type: 'input', name: 'Contributing', message: 'How can others contribute to the project?' },
  { type: 'input', name: 'Testing', message: 'What command should a user type to test the project?' },
  { type: 'input', name: 'Username', message: 'What is your GitHub username?' },
  { type: 'input', name: 'Email', message: 'What is your email?' }
];

//Generating a README file based on user input
function generateReadMe(Title, Description, Installation, Usage, Licenses, Contributing, Testing, Username, Email) {
  const licenseBadge = renderLicenseBadge(Licenses);
  return `
  # ${Title}

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Licenses](#licenses)
  - [Contributing](#contributing)
  - [Testing](#testing)
  - [Questions](#questions)

  ## Description
  ${Description}

  ## Installation
  ${Installation}

  ## Usage 
  ${Usage}

  ## License
  ${Licenses}

  ## Contributing
  ${Contributing}

  ## Testing
  ${Testing}

  ## For questions, please contact:
  To see my other repositories, click here [GitHub Profile] (https://github.com/${Username})
  ${Email}
  `;
}

//Function to create README file
function createReadMe () {
  inquirer
  .prompt(questions)
  .then((answers) => {
    
    const { Title, Description, Installation, Usage, Licenses, Contributing, Testing, Username, Email } = answers;
    const readmeContent = generateReadMe(Title, Description, Installation, Usage, Licenses, Contributing, Testing, Username, Email);

    //Write new README file
    fs.writeFile('new-README.md', readmeContent, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('README file created successfully!');
      }
    });
  });
}

//Function call to write the New File
createReadMe();






