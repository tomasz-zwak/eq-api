# Problem

Imagine that you’re part of a team working on a service that provides an API with information about earthquakes.

URL of the API: https://earthquake.usgs.gov/fdsnws/event/1/

Example query: https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02

## Checklist

1. Clone the repository and run the app (you can use the `start-dev-local.sh`). Enter http://localhost:3000/earthquakes to check if it's running properly.
2. Fetch the list of earthquakes from the Earthquake API
   - You may simply console.log it at this step.
   - Generate typescript client from the OpenAPI Spec (tip: you may use `openapi-fetch` and `openapi-typescript`, or anything you prefer)
3. Return the fetched earthquakes from the API under the `/earthquakes` route.
4. Add a method that should wait 5 seconds since the application startup and fetch all earthquakes that occured after 8 March 2024.
   - Use `EarthquakeScheduler#synchronizeEarthquakes`
5. Add a method that will fetch new earthquakes every day and store them in database.
   - Use `EarthquakeScheduler#updateEarthquakes`
6. Add a method to update a specific earthquake.
7. Secure the endpoint from pt 3.
8. Document the API
