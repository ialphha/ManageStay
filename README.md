# ManageStay
ManageStay is a web application that helps users to post and buy their vacant hotel rooms in safe and easy manner from one user to another user in the United States. It is a full-stack web application where the frontend program interacts with the user and then passes the actions performed by the user to the backend program that can store that information safely in data models and can access and manipulate that data as per the requirements. 
It is developed using an Model-View-Controller model and it is a platform that provides the opportunity for users to be both the buyer and seller of the hotel rooms. The application is simple to use, with initial registration in ManageStay and also the app is associated with stripe for payment processing.
Key features:

1.	Register: The User should be able to register successfully once the they fulfill the input valid data in the form. 

2.	Login:  The user’s authentication is ensured using bcrypt and express-jwt and the user has the ability to successfully Login once they register.

3.	 Search :  The user can search for their desire place . “Search Hotel” features that will take the information of the user that posted the room in the application and shortlist the search. Remove the rooms that have passed the current date.
4.	 Map  Location : Include the map for the convenience of the customers using Leaflet and Mapbox API, also has get direction feature.
5.	Order Hotel :  The user has the ability to book a room through Stripe.

6.	Buyer Dashboard:
•	Rooms booked:  the Buyer has the ability to see their bookings.
•	Map: The Buyer will have the ability to see the location of the room they booked. 

7.	Seller Dashboard: 
•	Room Owner has ability  to change the rates, and information about of the rooms.
•	Room Owner has the ability to delete the  room they posted.
