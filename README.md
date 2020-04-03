# dailydemo

This is a web application that lets people create and share video calls, then view network metrics about these calls.

## Technology Used

This project has a React frontend with a Node.JS & Express backend. 
The [daily.co API](https://docs.daily.co/docs) was used to easily create and embed video calls, as well as obtain metrics about these video calls. 
The [recharts library](http://recharts.org/en-US/) was used to graph the metrics of these video calls.

## How to setup in your local development environment:

These following instructions are for those using the Node Package Manager (npm).  
Please note that these instructions are primarily meant for those who have already installed the technologies mentioned above.

### 1. Clone the repo
Open your terminal and navigate to the directory where you want to store this project.  

Then, run the following command in your terminal:

`git clone https://github.com/andylebo20/dailydemo.git`

### 2. Install dependencies
Open up a second terminal window.  

In the *dailydemo* folder you just installed, there is a *frontend* folder.  
In one terminal window, navigate to this *frontend* folder.  
In the second terminal window, navigate to the root folder, *dailydemo*.  

In **both** terminal windows, run the following command:

`npm install`

By now, the project's *node_modules* folder and package files have been created and/or updated.

### 3. Run the project
In **both** terminal windows, run the following command:

`npm start`

### 4. In your browser, go to [http://localhost:3000](http://localhost:3000) to see the project in action! 🎉

## How to use

![Alt text](dailydemoScreenshots/screenshot1.png)
