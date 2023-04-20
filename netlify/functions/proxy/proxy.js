const fetch = require('node-fetch')

const handler = async function (event) {
  // get url and format from query parameters
  const {
    queryStringParameters: { url, format },
  } = event
  // fetch the data
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    // format data
    let data = await response[format]()
    if (format === 'json') data = JSON.stringify(data)
    // return data
    return {
      statusCode: 200,
      body: data,
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}
module.exports = { handler }
