# myDiary

Diary based website that utilizes Artificial Intelligence to detect the sentiment analysis of the user’s diary entry. This project used Node.js, Express, PostgreSQL, and Sequelize.

## Get Started

To run this application:

1.  In your terminal type `git clone https://github.com/Ali-Aftab/myDiary.git` to clone it to your computer.
2.  Then type `cd myDiary` to access the folder
3.  To install the required modules type `npm i`
4.  Make a new PostgreSQL database by writing `createdb myDiary`
5.  Create a .env file by typing `touch .env` to store your secret keys
6.  In the .env file type `SECRET_JWT_KEY=ENTERYOURKEYHERE`
7.  Type `npm run start-dev` in your terminal and you can use the API!

## API

First, we recommend installing [Postman](https://www.postman.com/) to easily test out the API. Remember to add `localhost:8000` to the URL before typing in the API path. (`/api/auth/signup`=>`localhost:8000/api/signup`)

### Sign Up/ Login Routes

How to signup and login.

- POST `/api/auth/signup` allows anyone to make an account <br/>
  &nbsp;&nbsp;-Requires an email and password key inside the body <br/>
  &nbsp;&nbsp;-Example {email: test@test.com, password: password1} <br/>
- POST `/api/auth/signin` when logged in, the response will give the user an access token. The access token must be placed in the header (with "x-access-token" as the key and the given accessToken as the value)  
  &nbsp;&nbsp;-Requires an email and password key inside the body. Also the x-access-token inside the header.<br/>
  &nbsp;&nbsp;-The x-access-token lasts for 24 hours. <br/>
