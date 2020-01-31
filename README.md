# Suavecito Application to NetSuite v1
> NetSuite -- AWS Lambda (us-west-1)

### Setup / Config
> Project expects the following Environmental Variables input these in AWS. You can view the AWS Lambda Developer Guide [here](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html).
```javascript
// Netsuite Production
NETSUITE_ACCT_ID="NETSUITE SPRODUCTION ACCT ID"
NETSUITE_RESTLET_URL="NETSUITE PRODUCTION RESTLET URL" // Callback RESTlet URL
NETSUITE_CONSUMER_KEY="NETSUITE PRODUCTION CONSUMER KEY" // Generated at Integration Record creation
NETSUITE_CONSUMER_SECRET="NETSUITE PRODUCTION CONSUMER SECRET" // Generated at Integration Record creation
NETSUITE_ACCESS_TOKEN="NETSUITE PRODUCTION ACCESS TOKEN" // User specific access token
NETSUITE_TOKEN_SECRET="NETSUITE PRODUCTION TOKEN SECRET" // User specific token secret
```

### Token Based Authentication (TBA)
> Setting up Token-Based Authentication for a RESTlet

I. Acquiring the Consumer Key and Consumer Secret
   1. Go to `Setup > Integrations > Manage Integrations > New`. Fill out the form.
   2. Enable Token-Based Authentication
   3. You will receive the following <i>message</i>, along with the <i>Consumer Key</i> and <i>Consumer Secret</i>. Save it somewhere secure.
   ```
   Warning: For security reasons, this is the only time that the Consumer Key and Consumer Secret values are displayed.
   After you leave this page, they cannot be retrieved from the system. If you lose or forget these credentials, you
   will need to reset them to obtain new values.
   
   Treat the values for Consumer Key and Consumer Secret as you would a password. Never share these credentials
   with unauthorized individuals and never send them by email.
   ```
II. Acquiring the Token ID and Token Secret
   1. If your role is granted with User Access Token permission (If your reading this you should have Admin privileges), you should be able to see `Manage Access Tokens` inside the settings portlet.
   2. Click on `New My Access Token`
   3. Select an Application Name and enter your preferred Token Name.
   4. Click `Save`
   5. You will receive the following <i>message</i>, along with the <i>Token ID</i> and <i>Token Secret</i>. Save it somewhere secure.
   ```
   Warning: For security reasons, this is the only time that the Token ID and Token Secret values are displayed. After
   you leave this page, they cannot be retrieved from the system. If you lose or forget these credentials, you will need
   to reset them to obtain new values.

   Treat the values for Token ID and Token Secret as you would a password. Never share these credentials with
   unauthorized individuals and never send them by email.
   ```
III. Testing with Postman
   1. Select the appropriate request method (ex: GET, POST, PUT, DELETE).
   2. Enter the URL you can grab it from the deployment record / integration record.
   3. Click on Authorization.
   4. Select OAuth 1.0
   5. Enter the following Parameters:
        - Consumer Key (from Section I, Step 3)
        - Consumer Secret (from Section I, Step 3)
        - Access Token (from Section II, Step 6)
        - Token Secret (from Section II, Step 6)
   6. Enter the NetSutie Account ID under `Advanced > Realm`.
   7. Test

### Claudia Setup

> [Claudia Tutorial](https://www.freecodecamp.org/news/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35/)

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

### Routes and Controllers

#### Lead Creation
/lead/create

Post Body:
```javascript
{
  businessName: 'Business Name',
  businessType: 'Business Type (NetSuite List Item ID)',
  businessWebsite: 'Business Website',
  businessSocialFB: 'Facebook Name or URL',
  businessSocialIG: 'Instagram Name or URL',
  businessSocialYelpo: 'Yelp Name or URL',
  contactFirstName: 'Contact First Name',
  contactLastName: 'Contact Last Name',
  contactEmail: 'Contact Email',
  mapURL: 'URL to MAP Agreement',
  businessPhone: 'Business Phone',
  billingFirstName: 'Billing First Name',
  billingLastName: 'Billing Last Name',
  billingPhone: 'Billing Phone',
  billingTitle: 'Billing Title',
  billingAddress1: 'Billing Address Line 1',
  billingAddress2: 'Billing Address Line 2',
  billingAddress3: 'Billing Address Line 3',
  billingCity: 'Billing Address City',
  billingState: 'Billing Address State',
  billingCountry: 'Billing Address Country',
  billingZip: 'Billing Addresws Zip',
  shippingAddress1: 'Shipping Address Line 1',
  shippingAddress2: 'Shipping Address Line 2',
  shippingAddress3: 'Shipping Address Line 3',
  shippingCity: 'Shipping Address City',
  shippingState: 'Shipping Address State',
  shippingCountry: 'Shipping Address Country',
  shippingZip: 'Shipping Addresws Zip'
}
```

Response:
```javascript
Lead/Customer ID ex: 1234
```

#### File Attachments
/lead/attach

Post Body:
```javascript
{
  customerId: 1234,
  fileName: 'Example : MAP Agreement',
  mapUrl: 'https://example.com/map-agreement.pdf'
}
```

Response:
```javascript
File/Attachment ID ex: 1234
```

### Resources
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/programming-model.html)
- [RESTlets](https://5657911.app.netsuite.com/app/help/helpcenter.nl?fid=chapter_N2970114.html)
- [SuiteScript](https://5657911.app.netsuite.com/app/help/helpcenter.nl?fid=set_1502135122.html)
- [SuiteScript 2.0](https://5657911.app.netsuite.com/app/help/helpcenter.nl?topic=DOC_SS2_API)
- [Supported Records](https://5657911.app.netsuite.com/app/help/helpcenter.nl?fid=preface_3710625923.html)
- [Records Browser](https://5657911.app.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2019_1/script/record/lead.html)