# userway test task

## Local setup
* Prepare .env `npm run prepare:dev`
* `docker compose build`
* `docker compose run`
* Open your browser in `localhost:3000` and try the example REST endpoints:
	* `localhost:8080/api/url/create` (POST)
		* Body format: `{ url: 'https://example.com' }`
	* `localhost:8080/:shortUrlId` (GET)
