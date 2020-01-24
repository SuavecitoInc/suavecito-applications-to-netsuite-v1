# Suavecito Application to NetSuite v1
> NetSuite

### AWS Lambda (us-west-1)

[Claudia Tutorial](https://www.freecodecamp.org/news/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35/)

Deploy: `claudia create --handler lambda.handler --deploy-proxy-api --region us-west-1`

Update: `claudia update`

```javascript
{
  "lambda": {
    "role": "suavecito-application-to-netsuite-v1-executor",
    "name": "suavecito-application-to-netsuite-v1",
    "region": "us-west-1"
  },
  "api": {
    "id": "afp7cff6q4",
    "url": "https://afp7cff6q4.execute-api.us-west-1.amazonaws.com/latest"
  }
}
```