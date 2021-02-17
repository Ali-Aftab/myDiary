# myDiary

Diary based API that utilizes Artificial Intelligence to detect the sentiment analysis of the user’s diary entry. This project used Node.js, Express, PostgreSQL, and Sequelize.

## Requirements

You need [Node.js/NPM](https://nodejs.org/) and [Git](https://git-scm.com/) installed into your system. Also go to [IBM Cloud](https://cloud.ibm.com/) to register and sign up for the free tier service for their Tone Analyzer. _Remember to get your API Key and API URL!_

## Get Started

To run this application:

1.  In your terminal type `git clone https://github.com/Ali-Aftab/myDiary.git` to clone it to your computer.
2.  Then type `cd myDiary` to access the folder
3.  To install the required modules type `npm i`
4.  Make a new PostgreSQL database by writing `createdb mydiary`
5.  Create a .env file by typing `touch .env` to store your secret keys
6.  In the .env file type
    > `SECRET_JWT_KEY=<ENTER-YOUR-KEY-HERE>` > `IBM_WATSON_API_KEY=<ENTER-YOUR-APIKEY-HERE>` > `IBM_WATSON_API_URL=<ENTER-YOUR-PERSONAL-IBM-URL-HERE>`
7.  Type `npm run start-dev` in your terminal and you can use the API!

## API

First, we recommend installing [Postman](https://www.postman.com/) to easily test out the API. Remember to add `localhost:8000` to the URL before typing in the API path. (`/api/auth/signup`=>`localhost:8000/api/signup`)

### Sign Up/ Login Routes

How to signup and login.

- POST `/api/auth/signup` allows anyone to make an account <br/>
  &nbsp;&nbsp;-Requires an email and password key inside the body <br/>
  &nbsp;&nbsp;-Example {email: test@test.com, password: password1} <br/>
- POST `/api/auth/signin` when logged in, the response will give the user an access token. The access token must be placed in the header (with "x-access-token" as the key and the given accessToken as the value)  
   &nbsp;&nbsp;-Requires an email and password key inside the body. You will receive an x-access-token. For all routes below you must place your token in the header.(<br/>
  &nbsp;&nbsp;-Example {x-access-token: <X-ACCESS-TOKEN-KEY>} <br/>
  &nbsp;&nbsp;-The x-access-token lasts for 24 hours. <br/>

  **NOTE: All Routes below require your x-access-token in the header!**

### Entry Routes (Write Diary Entries/ Find Diary Entry or Sentence)

-POST `/api/entry/newEntry` allows registered user to submit a diary entry <br/>
&nbsp;&nbsp;-Requires a diary entry and assigned to the message key in the body. <br/>
&nbsp;&nbsp;-Example {message: "I love Tacos, it makes me think better during the day!"} <br/>
-GET `/api/entry/listAll` allows a user to view all their previous entries and the overall tone for each one. <br/>
&nbsp;&nbsp;-Example {message: "I love Tacos, it makes me think better during the day!"} <br/>
&nbsp;&nbsp;-Will provide the entryToneId (will be labeled as "id" in the JSON) for each one <br/>
-GET `/api/entry/sentencetone/:entryToneId` allows a user to see the tone for each sentence written in one entry.<br/>
&nbsp;&nbsp;-Replace `:entryToneId` with the id in the URL. <br/>
