# Team-X-MERN-REPO
JIT-170723-1-MERN

To push your work to this repo you should follow the steps below:

1. Clone the main branch of the repository to your local machine using the following command:
   ```
   git clone <repository_url>
   ```
   Example:
   ```
   git clone https://github.com/ARK-X-Digital/Team-X-MERN-REPO.git
   ```
   
   ------------------------------------------
   
   **Create your branch way 1:**
   
   ------------------------------------------
   
2. In your local machine, navigate to the cloned repository and create a new branch following the given example:
   ```
   git checkout -b [module_name>] / [your-first-name] - [your-last-name] - [day-number] - [challenge-name]
   ```
   Example: (All in lowercase only dashes are accepted)
   ```
   [module_name]/                   = html-css
   [your-first-name-your-last-name] = Baghrous-Abdelmoumene
   [dau-number]                     = d3
   [challenge-name]                 = signup-form
   
   git checkout -b html-css/baghrous-abdelmoumene-d3-signup-form
   ```
   
   ------------------------------------------
   
   **Create your branch way 2 (Recommended):**
   
   ------------------------------------------
   
2. In GitHub click on the "branches" button, then click on the "New branch" button.
   
   2.1 Enter your new branch name following the naming convention:
   Example: (All in lowercase only dashes are accepted)
   ```
   [module_name]/                   = html-css
   [your-first-name-your-last-name] = Baghrous-Abdelmoumene
   [dau-number]                     = d3
   [challenge-name]                 = signup-form
   
   html-css/Baghrous-Abdelmoumene-d3-signup-form
   ```
   2.2 In your terminal you should switch to the main branch called also master, in our case is called main:
   ```
   git checkout main
   ```
   2.3 After switching to the main branch, write this command:
   (this command will bring all the updates in the remote to your local main branch)
   ```
   git pull
   ```
   2.4 Then write this command:
   ```
   git git checkout [module_name>] / [your-first-name] - [your-last-name] - [day-number] - [challenge-name]
   ```
   Example:
   ```
   git checkout html-css/Baghrous-Abdelmoumene-d3-signup-form
   ```
   
3. after finishing the course challenge, add your work to the staging area using the command:
   ```
   git add .
   ```
4. Commit your work with a descriptive message:
   ```
   git commit -m "Your commit message"
   ```
5. Push your changes to the branch you just created:
    ```
    git push origin [branch-name>]
    ```
    Example:
    ```
    git push origin html-css/Baghrous-Abdelmoumene-d3-signup
    ```

Please note that you need to replace <repository_url> with the actual URL of the repository you want to push your changes to, and **[module_name>] / [your-first-name>] - [your-last-name] - [day-number] - [challenge-name]** with the appropriate branch name based on the given example.