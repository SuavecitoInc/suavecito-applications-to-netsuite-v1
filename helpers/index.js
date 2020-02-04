import dotenv from 'dotenv';
import fetch from 'node-fetch';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
dotenv.config();

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

exports.getRecord = async (recordType, recordId) => {
  const recordData = {
    recordType: recordType,
    id: recordId
  }

  const requestData = {
    url: process.env.NETSUITE_GET_RECORD_RESTLET_URL,
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

  const fetchRecord = async () => {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: header,
        body: JSON.stringify(recordData)
      });
      const content = await response.json();
      let data;
      if (content.error) {
        data = { success: false, error: content.error };
      } else {
        data = { success: true, content: JSON.parse(content) };
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const response = await fetchRecord();
  return response;
}

exports.getCustomerByFieldName = async (fieldName, fieldValue) => {
  // clean data
  let searchData = {
    fieldName: fieldName,
    fieldValue: fieldValue
  }

  const requestData = {
    url: process.env.NETSUITE_CUSTOMER_SEARCH_RESTLET_URL,
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

  const fetchRecord = async () => {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: header,
        body: JSON.stringify(searchData)
      });
      const content = await response.json();
      let data;
      if (content.error) {
        data = { success: false, error: content.error };
      } else {
        data = { success: true, id: JSON.parse(content) };
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const response = await fetchRecord();
  return response;
}