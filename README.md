# CMUN-GPS

Rest service which gives municipe code and name from gps coordinates 


## Getting started

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


### Install dependences

    yarn install


## Usage

### GET api/v1/search?lat=<latitude>&lon=<longitude>

This method asks for the municipe data on a specific location.

#### Example Response
The response is a json object containing 2 values, the municipe id and the name.

```javascript
{
  "id": "32054",
  "nm": "Ourense"
}
````

