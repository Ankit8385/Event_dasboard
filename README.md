# Event_management_dashboard

Q1: How do I download the files?
A: If you're new to GitHub and just want to download the entire code, hit the green button saying "Code", and then choose the "Download ZIP" option.

After downloading, extract the files.

Open the file in VS code or any editor.

Open the terminal (make sure you are in the right directory project_name in this case) and write command npm install or npm i to install all the dependencies.

After downloading the dependencies close all terminal.

Open new terminal and write command npm run server to start the server.

Open another terminal and write command npm run dev to start the localhost.

Open the local saying "http://localhost:5173/" in your browser.

I have provided the default email and password for signin.

If you want to provide authorization to another email and you have to do it in the postman for route "http://127.0.0.1:5000/api/auth/register/" with the post request and body containing data in raw JSON form. example is shown below 
{
    "email": "demo@example.com",
    "password": "test1234"
}

I have already made one more authorize route for the above email and password.
