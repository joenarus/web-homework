# Divvy Homework Assignment

An app to track transactions between vendors and users


## Project Setup

**Node** version **12** is the safest NodeJS release to use.  You can try version 14, but there can be node-gyp/python issues on OSX.

**To setup the webapp:** 
1. Navigate to the webapp directory: `cd webapp`
2. Install dependent libraries: `npm install`

**To set up Phoenix Server:**

**Make sure you have your Postgres database installed and running:**

username: postgress

password: postgress

**Or update the elixir/config/dev.exs and elixir/config/text.exs files to match your current username/password settings for postgres.**

1. Navigate to the elixir directory: `cd elixir`
2. To start the server with seeded data:
    * Install dependencies with `mix deps.get`
    * Create and migrate your database with `mix ecto.setup`
    * Seed database with `mix run priv/repo/seeds.exs`

## Running the Project

**Starting up the Phoenix server:**

1. In the elixir directory run: 
    * Start Phoenix endpoint with `mix phx.server`
This will get your Phoenix server up and running and ready to receive calls


**Starting up the webapp:**

1. In the webapp directory:
    * Use the command: `npm start`
    
    This will boot up the application at localhost:3000

## Cleaning up Data
1. In the elixir directory run: 
    * Drops dbs: `mix ecto.reset`
    * As a precaution: reseed database with: `mix run priv/repo/seeds.exs`

This will reset the data back to the originally seeded data


## Testing
For elixir: 
    In the elixir directory run: `mix test`

For the webapp: 
    In the webapp directory run: `npm test`
