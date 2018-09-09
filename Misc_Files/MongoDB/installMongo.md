#Installing MongoDB on Windows
Go to the MongoDB download page: MongoDB Download Center.

Scroll down, go to the green box with the Community Server Tab highlighted.

Go to the dropdown menu labeled "Version." Select "Windows Server 2008 R2 64-bit and later, with SSL support," then click the "DOWNLOAD (msi)" button.

The next page will thank you for downloading MongoDB then show a newsletter link. You can ignore this. In a few seconds, your browser will notify you that the file is downloading.

Open up Windows Explorer and locate the installation file (it should be in the default directory where your browser stores downloads). Open the file and follow the instructions.

When the installer prompts you to "Choose Setup Type," click the Complete button, then carry on.

A window might pop up mid-installation, asking you whether you’re sure you want to download a particular component of MongoDB. Click yes, otherwise the install will fail.

##2. Configuring MongoDB on Windows
You need to create a data directory for your MongoDB installation or it won't run. Open Git Bash then cd your way to the root directory: cd c:

Run the following command: mkdir -p data/db

This is the default location for MongoDB’s databases. Remember, you need a directory for your databases or else you MongoDB will refuse to run.
You’ll also want to add MongoDB’s path to the PATH environment variables for your computer so that you can run/launch MongoDB easily from the bash command line.

First, locate the directory where you installed MongoDB. This is likely C:\\Program Files\\MongoDB\\Server\\<version_number>\\bin. Copy this directory to your clipboard.

Then, open up the System menu or Control Panel on your machine. These are usually accessible via the Start menu or Search Bar in Windows operating systems.

Go to Advanced Settings.

If you are on Windows 10 and opened the Control Panel, click System and Security; System; and Advanced System Settings.
When a new window opens up, click the Environment Variables button located toward the bottom of the window.

An Environment Variables window should open up. Look at the bottom half of this window, a scrollable table called "System Variables." Look at the Variable column and search for the variable called Path. Click on it, then click the "Edit…" button below.

The next window will look different depending on your version of Windows. You’ll either be able to press the "New" button and paste your MongoDB directory into the input box that shows up, or you’ll have to paste the directory at the end of a long string of other directories. So it goes.

If you would prefer video instructions for this part, watch this: Youtube Link
Test if it worked: Close your current Git Bash window, then reopen it and run this command: mongod

NOTE: There is no "b" at the end, simply mongod
If mongod is still running, great job! You’ve installed MongoDB. Your instructor will take it from here.

If mongod didn’t run and instead your bash threw a "command not found" error, make sure you added MongoDB’s bin directory to your PATH variable (see step 5). Then, close out git bash and try running mongod again.

If mongod starts but closes after a series of prompts, make sure you created the /data/db directory in your root. MongoDB cannot run without this directory (see steps 1 and 2).

If you’re still encountering issues starting mongod, please ask for assistance from one of the TAs or the instructor.

#3. Installing MongoDB on MacOS
The easiest way to install mongodDB on a Mac or on any platform is to use homebrew. At this point you should already have homebrew installed. You can verify your installation by running brew -v in your terminal.

If you get an error instead of a version number, visit the homebrew website to install it.
Once you have homebrew installed, run the following command in your terminal brew install mongodb.

##4. Configuring MongoDB on MacOS
Once mongoDB is downloaded from homebrew, you will need to create a directory at the root of your home folder for mongoDB to use. Run the following commands (you may be prompted for your admin account password):

sudo mkdir -p /data/db

If successful, you should now how a /data/db directory in your home folder. You can verify this by running cd /data/db in your terminal. If you are able to cd into the folder, then move on to the next step.

With the /data/db directory made, you're ready to run MongoDB. To begin, you must first start the mongo daemon. This is a sort of background process that handles data requests, manages data access, and performs background management processes while we're using mongoDB. Enter the following command in your terminal window: mongod

If mongod didn’t exit from your window, great job! You’ve installed MongoDB. Your instructor will take it from here.

If mongod starts but closes after a series of prompts, make sure you created the /data/db directory in your root directory, MongoDB cannot run without this directory (see step 3).
