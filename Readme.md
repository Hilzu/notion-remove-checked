# notion-remove-checked

Notion integration to remove checked to-do items from a page.
Great for managing a shopping list in Notion where you want to remove items you've already bought.
Includes a CDK app to deploy the integration to AWS Lambda and run it nightly.

## Usage

For this you need a page in Notion with a to-do list and an internal integration with access to that page.
You need to be a workspace owner in order to do this.

1. Create a new page in Notion and add a to-do list to it.
2. Create an internal integration in the Notion workspace here: https://www.notion.so/my-integrations
3. Copy the integration secret. This is the token used to authenticate with the Notion API.
4. Add the integration as a connection to the page you created in step 1.

To run this app locally or deploy it to AWS you need to copy the `example.env` file to `.env` and fill in the values.

```shell
# Install dependencies
npm install
# Build the app
npm run build
# Run the app locally
npm start
# Deploy the app to AWS
npx cdk deploy
```
