const fetch = require('node-fetch');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

exports.createWholesaleLead = (req, res) => {
  const data = req.body;
  console.log('LEAD DATA ========>');
  console.log(data);

  // clean data
  let leadData = {
    recordtype: 'lead',
    firstname: data.contactFirstName,
    lastname: data.contactLastName,
    comments: data.contactFirstName + ' ' + data.contactLastName + ' , ' + data.contactTitle,
    companyname: data.businessName,
    email: data.contactEmail,
    url: data.businessWebsite,
    category: data.businessType,
    custentity_sp_cstmr_facebook: data.businessSocialFB,
    custentity_sp_cstmr_instagram: data.businessSocialIG,
    custentity_sp_cstmr_yelp: data.businessSocialYelp,
    custentity_sp_map_agreement: data.mapURL,
    custentity_sp_lead_source: '2', // Wholesale Application
    phone: data.businessPhone,
    billingfirstname: data.billingFirstName,
    billinglastname: data.billingLastName,
    billingphone: data.billingPhone,
    billingtitle: data.billingTitle,
    weblead: true,
    addressbook: [
      {
        label: "Billing Address",
        companyname: data.businessName,
        addr1: data.billingAddress1,
        addr2: data.bilingAddress2,
        addr3: data.billingAddress3,
        city: data.billingCity,
        country: data.billingCountry,
        state: data.billingState,
        zip: data.billingZip
      }
    ]
  }

  if (data.shippingOption == 2) {
    leadData.addressbook.push({
      label: "Shipping Address",
      companyname: data.businessName,
      addr1: data.shippingAddress1,
      addr2: data.shippingAddress2,
      addr3: data.shippingAddress3,
      city: data.shippingCity,
      country: data.shippingCountry,
      state: data.shippingState,
      zip: data.shippingZip
    });
  } else {
    leadData.addressbook[0].label = "Billing & Shipping Address";
  }

  console.log('LEAD DATA TO BE INSERTED ========>');
  console.log(leadData);
  console.log('LEAD DATA END ===========>');

  // production
  const accountID = process.env.NETSUITE_ACCT_ID;
  const token = {
    key: process.env.NETSUITE_ACCESS_TOKEN,
    secret: process.env.NETSUITE_TOKEN_SECRET
  }
  const consumer = {
    key: process.env.NETSUITE_CONSUMER_KEY,
    secret: process.env.NETSUITE_CONSUMER_SECRET
  }

  const requestData = {
    url: process.env.NETSUITE_RESTLET_URL,
    method: 'POST'
  }

  const oauth = OAuth({
    consumer: consumer,
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    },
    realm: accountID
  });

  const authorization = oauth.authorize(requestData, token);
  const header = oauth.toHeader(authorization);
  header.Authorization += ', realm="' + accountID + '"';
  header['content-type'] = 'application/json';
  header['user-agent'] = 'SuavecitoApplicationsToNetSuite/1.0 (AWS/Lambda US-West-1)';

  (async () => {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: header,
        body: JSON.stringify(leadData)
      });
      const content = await response.json();
      console.log('=========/ RESPONSE START =========/');
      console.log(content);
      console.log('/========= RESPONSE END /=========')
      res.status(200).json(content);
    } catch (err) {
      console.log(err);
    }
  })();
}