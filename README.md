# AzureSmartScale
Project Overview
Azure Smart Scale is an AI-powered tool for optimizing Azure resource configurations and estimating costs. Upload your Azure resource JSON, and receive recommendations and cost analysis instantly.

Prerequisites
Node.js (v18 or higher recommended)
npm or yarn
(Optional) An OpenAI API key for advanced AI features (set as environment variable)
Getting Started
1. Clone the Repository
git clone <your-repo-url>
cd azure-smart-scale-ai-main
2. Install Dependencies
npm install
# or
yarn install
3. Set Up Environment Variables
Create a .env file in the root directory and add your OpenAI API key:

NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
4. Start the Development Server
npm run dev
# or
yarn dev
The app will be available at http://localhost:5173 (or the port shown in your terminal).

Usage
Open the app in your browser.
Upload your Azure resource configuration JSON file.
View AI-powered recommendations and cost analysis.
Project Structure
src/pages/Index.tsx — Main UI and logic
src/lib/azureAnalysis.ts — API and AI analysis logic
src/components/ — UI components
Notes
Never commit your API keys to version control.
For production, secure your API keys and consider server-side proxying for API calls.
Troubleshooting
If you see errors about missing API keys, check your .env file.
For dependency issues, try deleting node_modules and running npm install again.
For more details, see the code comments or contact the project maintainer.

Welcome to your Lovable project
Project info
URL: https://lovable.dev/projects/a2397f49-2252-45e6-adee-2785d8c3678a

How can I edit this code?
There are several ways of editing your application.

Use Lovable

Simply visit the Lovable Project and start prompting.

Changes made via Lovable will be committed automatically to this repo.

Use your preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - install with nvm

Follow these steps:

# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
Edit a file directly in GitHub

Navigate to the desired file(s).
Click the "Edit" button (pencil icon) at the top right of the file view.
Make your changes and commit the changes.
Use GitHub Codespaces

Navigate to the main page of your repository.
Click on the "Code" button (green button) near the top right.
Select the "Codespaces" tab.
Click on "New codespace" to launch a new Codespace environment.
Edit files directly within the Codespace and commit and push your changes once you're done.
What technologies are used for this project?
This project is built with:

Vite
TypeScript
React
shadcn-ui
Tailwind CSS
How can I deploy this project?
Simply open Lovable and click on Share -> Publish.

Can I connect a custom domain to my Lovable project?
Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: Setting up a custom domain
