# ikhoka-mentions <img src="https://lh3.googleusercontent.com/_Z75I3eihEB7XrZhPGRFYZGi2TpP0XA5CenG4ZsT-gECj02ZXvk5aUplMBkKA5oJy5w" width="20" /> 

### iKhokha Tech Check - Customer Review Analyzer
---
#### Getting started
Install the depencies with:
```
  npm install
```
If you make changes to the code make sure you compile:
```
  npm run compile
```
If you just want to get the report:
```
  npm start
```
---
### How this works:
When you have succesfully installed the dependecies and run the program, you will get a 
log in the console with all the comments listed from a comment file followed by a report 
that looks like this: 
```javascript
{
  'Total Mover Mentions': 11,
  'Total Shaker Mentions': 8,
  'Total Mentions Shorther than 15 characters': 5,
  'Total Spam Mentions': 3,
  'Total Questions in Mentions': 6
}
```
