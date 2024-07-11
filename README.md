# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Setup the project in development

To setup the project, clone this repo and use the following command

```bash
npm install
```

## Run dev server

```bash
npm run dev
```

## Build and run docker

```bash
docker build . -t todo-localstore
```

```bash
docker run -p 3000:3000 todo-localstore
```
