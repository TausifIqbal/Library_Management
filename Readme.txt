First of all create database (mysql)

	copy paste all the commands given in database file
	it will create database with name library_management.
	'library_management' has two tables 1.users 2.books
	Now we have some random username and password stored in 
	users table and one of them is admin (given by is_admin = 1)

As database setup is ready, open Library_management-1 folder in terminal
and type " nodemon app.js ".If every thing is Ok upto this then
This message appears in terminal 
" server is listening port 5000 
  Database is connected "


Now type "http://localhost:5000/" in your browser .
home page is login page
if student enters his name and password which is stored in database
then he will enter into his dashboard which shows all book available and its copies
if admin enters his name and password (correct one )then he will enter into 
a page where he can add books and no_of_copies. 
In case of wrong name and password student / admin remains on same page.
	
	 
