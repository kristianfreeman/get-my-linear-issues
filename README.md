# get-my-linear-issues

Simple Node.js example to get all issues assigned to a user, based on the API key provided.

## Usage

Create an API key in Linear's settings page - specifically, a "User" API key. Add it to the `.env` file:

```bash
$ cp .env.example .env
$ vi .env
```

Install the dependencies:

```bash
$ npm install
```

Run the script:

```bash
$ npm start
```

The script will output the issues assigned to the user, in JSON:

```jsonc
{ "data": 
  [
    {
      // ...
    }
  ]
}
```

## License

MIT
