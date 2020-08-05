# Village Circle

## Description

This application was my COVID-19 brainchild and was inspired by my youngest daughter.  She has struggled to maintain social interaction virtually.  She had not developed the strong network of friends prior to be thrown into isolation this year.  The idea behind this app is to provide a fun, social learning environment for children.

Within the application a user has 3 modules to choose from: "Circles", "Guilds", and "Gathering Halls".  These 3 modules function very similarly with the first two in the list almost identical.  The difference is simply the focus on their content.  Circles are focused on standard educational topics while Guilds are focused on trade and skill-based content.  Gathering Halls are the simpler of the modules and are intended to be a virtual hangout divided to different tastes and interests.

The app is designed for 3 different types of users.  Children are able to view the 3 modules, contribute to the discussion, view their profile, and set goals for themselves.  Adults who wish to start a circle, guild or hall can do so whether they are a parent or not.  All they need is a desire to teach others.  Parents are able to join up and be linked with their children so they can monitor their child's interactions within the application.  Through their profile they can view all their children that are using the application, review their profile which displays their activity, and set point goals to achieve.  Parents are also able to contribute and lead a circle, guild or gathering hall.  The idea is that we can learn something from everyone that is willing to share their expertise.

## Technologies Used

- Single page web application using **React** on the client side
- **React routing** was used to navigate throughout the applicaiton
- Combination of **Semantic-UI-React** and **Sass** used for styling, modal functionality, toasts, and Grid system
- **Moment.js** is used for visualization of datetime structures
- **C#/ASP.NET Core** used to develop web API
- **SQL Server** Used for data storage

#### Versions:
- React: 16.13.1
- Semantic UI React: 0.88.2
- Axios: 0.19.2
- Firebase: 7.16.0
- Moment: 2.27.0
- Sass: 4.14.1

## Screenshots

#### Login View
Users will login with a simple email and password set up with a generic modal

![Login View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/LoginView.PNG)

#### Home Page View
Users can navigate using the guideposts or the links in the navbar

![Home View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/Home-View.PNG)

#### All Circles View
View of the entire collection of circles

![All Circles View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/AllCirclesView.PNG)

#### Single Circle - Non-member View
View of the single circle.  Non-members cannot see any of the message board content but they can still see details about the circle, announcements and links posted from the leader.

![Single Circle NonMember View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/SingleCircle-NonMemberView.PNG)

#### Single Circle - Member View
View of the single circle when the user is logged in and a member of the circle.  Members can view all the message board and same content as the non-member.  They can post to the message board, edit their content and delete their own posts only.

![Single Circle Member View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/SingleCircle-MemberView.PNG)

#### Single Circle - Leader View
The leader view is the same as the other two views except they will have additional functionality options.  The leader can add additional announcements and links.  They can also view the members for their circle and give out points for responses and submission of any "assignments"

![Single Circle Leader View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/SingleCircle-LeaderView.PNG)

#### All Guilds View
View of the entire collection of guilds.  Guilds are the skill based module within the application

![All Guilds View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/AllGuildsView.PNG)

#### Single Guild View
The single guild view is almost identical to the overall functionality and user variety as is above in the circle module.

![Single Guild Member View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/SingleGuildMemberView.PNG)

![Single Guild Leader View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/SingleGuild-LeaderView.PNG)

#### All Gathering Halls View
View of the entire collection of gathering halls.  Gathering halls are the social module for children to get together based on topics that they are interested in.

![All Gathering Hall View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/AllGatheringHallsView.PNG)

#### Single Gathering Hall View
The view within the single gathering hall is a simple message board view.  No frill, just chat.

![Single Gathering Hall](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/SingleGatheringHall-MemberView.PNG)

#### Child Profile View
Within the child's profile view they will be able to see the information from their profile along with their activity/point log.  They can also see their various goals that are set and see which goals of those they have achieved.

![Child Profile View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/ProfileView-Child.PNG)

#### Parent Profile View
If no children you would not see the "My Children" section.  In the parent view you will be able to view your children if you have them. Parents can take a look at their children's profiles and assign point goals for them to work towards. You can also view any circles, guilds or halls that you lead or start one up.

![Parent Profile View](https://raw.githubusercontent.com/broach44/Village-Circle/master/Screenshots/ProfileView-Adult-Parent.PNG)

<!-- ## Live Demo

TBD -->

## How to Run
- Clone down the project
- In the terminal run npm install
- Create a firebase project [here](https://console.firebase.google.com/)
- Create a couple sample users and update the SQL script User data to reflect the new users information.
- Run the SQL Script to create a sample db `**ADD LINK HERE**`
- In Visual Studio you may need to install a few dependencies: Dapper, Microsoft.AspNetCore.AuthenticationJwtBearer, and System.Data.SqlClient.
- Once API is setup run IIS Express from Visual Studio
- Create `src/helpers/apiKeys.json` file and add in your firebase keys that were created in the new firebase project.  Feel free to reference the `apiKeys.example.json` file in the project for the correct structure
- Once set up to run enter the following in the terminal `npm start`


## Future Features
- Embedded Content
- Direct Messaging
- Customizing Profile Images/Avatars
- Customizing Individual Circles/Guilds/Gathering Halls
- Search and Filter Functions
- Favorite Groups

## Contributors

[Crystal Broach](https://github.com/broach44)