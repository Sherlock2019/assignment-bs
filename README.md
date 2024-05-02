Assignment
The assignment is to build a very simple app that has two features for the users:

Display real-time Ethereum price
Display real-time Gas price (in gwei + ETH) across standard, fast and instant
Here are minimum technical/logistical requirements for the assignment:

create a new private repository called 'assignment-bs' on your own GitHub account. Invite @kennysliding and @dark5tarx as collaborators. git clone and work on this repo.
The repository should contain all BE + FE code together in an organized way
The repository should be entirely be written in TypeScript, except for files that by nature are in JavaScript (ex. .eslintrc.js)
Make the best use of TypeScript. Stick to strict typings wherever possible.
The FE must be written in the most modern Next.js + React.
The BE can be written in any framework or libraries of your choice in TS/JS ecosystem.
The BE ↔️ FE communication only happens through WebSocket. Ideally, BE should constantly update Ether/Gas price by publishing changes via WebSocket in FE. And FE would update its value accordingly to show to the user.
For the sake of simplicity, do not create any DB. Store all information in BE server in-memory (for example, in an object or dictionary variable) and send it to FE. Consider BE server to be just ephemeral. We are not going to deploy this app. It's only for local testing.
FE UI/UX is left to you, except that the app should only have a single page. Feel free to be creative but assume you are building some that can be shipped to a production platform for real users.
You can use any libraries/APIs out there as long as they help. But you need to have a clear rationale on why. The authenticity of Ether/Gas price coming from centralized APIs isn't that important as long as the project just works.
Organize the project structure/folders/settings/tools in the most efficient, helpful way.
Recommended Node version is v20.10.0.
Write a README.md explaining setup instructions and any peculiarities or anything important or relevant. Imagine other developers will need to setup, use and add to your codebase.
Organize your commit messages semantically and reasonably.
Do not be complacent for the working code; but rather show the best version of yourself and write the best code.
This assignment is expected to be finished within 48-72 hours.
If you have completed all these steps, tell us on Discord.
Bonus:

The entire codebase (BE + FE) runs on docker, to eliminate differences and intricacies in different developer environments
The basic requirements should be clear, but other aspects not specifically mentioned are within your creative freedom.

However if you have any questions, please ask via Discord.

Lastly: If you are familiar with DevOps, you can share high-level steps if we were to deploy this app on AWS/Amplify/Cloudflare (not Vercel)
