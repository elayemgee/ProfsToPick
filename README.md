# DLSU ProfsToPick
A machine project that brings the DLSU Profs To Pick Facebook page into a fully working application.<br>

## Published Application Link
https://apdev-profstopick.herokuapp.com/<br>

## Running the Application Locally
1. To run the application, you must run the command `node index.js`. Upon running the command, your Command prompt should display the folowing statement:
```
Server is running at:
http://localhost:9090/
Connected to Atlas!
Connected to: mongodb+srv://lei:1PYgZIvqsSpQXl1K@cluster0.15ihh5e.mongodb.net/?retryWrites=true&w=majority
```
2. Go to the link below to access the web application:
```
http://localhost:9090/
```
You should now be seeing the Login page that looks like this:
<img width="960" alt="login" src="https://user-images.githubusercontent.com/80928976/177103805-8e4dad90-8e36-459c-8530-e280d3dcc73d.png"><br>
3. To create an account, simply click the button that says "Don't have an account yet? Register Here"

You should now be seeing a page that looks like this:
<img width="946" alt="register" src="https://user-images.githubusercontent.com/80928976/177104237-7bd19400-a3a3-4289-8065-b21dea3f2fa3.png"><br>
4. You may Log-in using an account that you have created or you could use the following dummy acounts:
```
studenit id: 12012345 
password: password

student id: 11912345
password: password
```
> The encrypted password of the accounts of all students is "password".

After clicking the "Log-in" button, you would be redirected to the Home page of the web application. Here, you would see a simple description of the web application and the Latest Reviews made by the users:
![home](https://user-images.githubusercontent.com/80928976/177105853-6ee50451-9fae-4dea-9bae-7bd813dc7015.png)

5. By clicking the profile on the upper right corner, you will be given two options either to go to one's profile or sign-out. After clicking the profile option you would be redirected to your account profile that should look something like this:
![profile](https://user-images.githubusercontent.com/80928976/177108960-8e45fc17-7523-4f74-871d-da2f6672d971.png)
> Whereas, signing out would redirect you to the log-in page

### Searching for Professors
6. Now let's see all the professors currently in our database by clicking the "View All Profs" button in the navigation bar
![allprofs](https://user-images.githubusercontent.com/80928976/177110320-3db1636e-ada6-45b5-8ce1-a23ae15c615e.png)

7. You may also view the different professors found in each college by clicking the "View By College" button in the navigation bar and clicking the college of your choice
![percollege](https://user-images.githubusercontent.com/80928976/177111242-1752c46b-6a60-459c-a87c-1706aad78b19.png)

After clicking the college of your choice, you will see this:
![ccs](https://user-images.githubusercontent.com/80928976/177111539-c92015e0-0d5d-4799-8a2c-d6f11fb47e30.png)

8. You may also search the professor through the search button in the navigation bar:
![search](https://user-images.githubusercontent.com/80928976/177112622-e18827e6-2bbf-4171-b4ed-a6ece226f4d2.png)

9. Let's now pick a professor and look at their profile!
Here we see a professor's profile page, this is where users can see the professors' details, reviews, ratings and subjects:
![aprof](https://user-images.githubusercontent.com/80928976/177113046-88b20f6f-44ff-46ab-9774-4d6b5a8b1336.png)
