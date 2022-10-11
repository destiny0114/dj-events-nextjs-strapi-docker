<p align="center"><img src="frontend/public/assets/logo.svg" width="150" height="150"></p>

## About DJ Events

DJ Events is created by Brad Traversy. He is wonderful mentor as a developer and i learnt alot from him. Im transform his project into typescript and added some feature even styling.

- Authentication and Authorization system
- Password Reset
- Follow and Following system
- Image Upload

## Technology

- [Nextjs](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [strapi](https://strapi.io/)
- [cloudinary](https://cloudinary.com/)
- [postgres](https://www.postgresql.org/)
- [React Hook Form](https://react-hook-form.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

## Installation

The web application need to run by [docker](https://www.docker.com/). The application is develop on apple silicon that are running arm64 if your machine is running on x86 maybe need modify docker-compose.yml and remove arm64v8 and platform linux/amd64. Be sure go check them out if you don't have them.

## Usage

To run the application, please following the steps:

1. Clone the project

```shell
$ git clone https://github.com/destiny0114/dj-events-nextjs-strapi-docker.git
```

2. cd frontend folder

```shell
$ cp .env.example .env.local
```

3. cd ../backend folder

```shell
$ cp .env.example .env
$ cp .postgres.env.example .postgres.env
```

4. Register the cloudinary account and get api keys paste into env file

```txt
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

5. Fill the database config in postgres env file

```txt
POSTGRES_USER=strapi
POSTGRES_PASSWORD=strapi
POSTGRES_DB=strapi
```

6. Run the application

```shell
$ docker-compose up
```

7. View the frontend at: http://localhost. Thats it!

## License

The Application is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
