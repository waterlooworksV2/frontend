# Setup Instructions
> Mostly MacOS, because I don't have a windows laptop to test

## Step 1: Clone the repository
`https://github.com/waterlooworksV2/frontend.git`

## Step 2: Install dependencies
1. [brew](brew.sh)
2. [node.js](https://nodejs.org/en/)
3. [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
4. Run `yarn install`

## Step 3: The Big Red Button
> If it's your first time starting the frontend then you might have to do `yarn build` before `yarn build-css`
- To start the frontend server locally `yarn start`
- To live compile SCSS `yarn watch-css`
- To build an optimized version `yarn build`
