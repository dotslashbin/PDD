


# PDD 
***Personal Data Database***
This is a sample application demonstrating domain knowledge on the MERN stack. This app is not intended to be released in a production environment, but please feel free to criticize.

## TECH STACK

**API Server Application**


 1. NodeJS
 2. npm: Package manager
 3. Express - underlying framework
 4. Cors
 5. Helmet
 6. Typescript + Javascript - language used
 7. Typegoose + mongoose: database obect models and connection
 8. ESlint

**Front-end Web Application**
1. Yarn: Package manager
2. React
3. Material-ui
4. Typescript
5. Axios: for requests
6. ESlint


**Pipeline**

 1. Github: Codebase repository
 2. Github  Actions: CI/CD - up to building storing containers into registry
 3. SonarCloud: Code quality service
 4. Dockerhub: fre container registry

**Deployments**

 1. Docker: Local machine demonstration
 2. docker-compose: environment builder
 3. Minikube: kubernetes simulation

## Steps to running on local machine
1.  Before running anything, please ensure that ports 3000, 3001, and 27017 are not used in your machine. If you absolutely have to, you will have to configure the applications to change ports according to desired.
2.  Clone the repository and go into the destination folder.
3.  Go to the pdd_api folder in the repository.
4.  Build the application by running the command "***npm run buildts***". (This will create files in the "build" directory.
5.  Go back to the parent directory of the cloned project.
6.  There is a makefile provided, where the default will set up a local environment. Simply run "***make***"
7.  Open your favorite browser and go to localhost

### Limitations
1.  For this exercise, the only fields I used are "Full Name" and "Email", since there is an option to upload an entire CV.
2.  The CI/CD ends at deploying images to the free dockerhub registry.
3.  Uploading of CV saves the file into a base64 encoded data, rather than a binary file on the server. I went with this to reduce the complexity of the task.
4. There are no targetted environments for automated deployment created at this point. 

## Examples of for usage
1.  Fill out the email and name fields from the form.
2.  Fill out the expiry in minutes. This is an optional field, leaving it blank will mean that the generated token may only be used once. Having an expiry will mean that the resulting token will be reusable until the time runs out.
3.  Click to upload your PDF cv.
4.  Click submit, and this shall show you the notifications and the results just below the form.
5.  If you have successfully submitted a form without any problems, you will be presented a result with 3 items. The token, the secret, and the sharable link. You data needs to have the proper matching of secret and token to be able to be decrypted and read.
6.  To view your profile, simply click on the sharable link and it will lead you to a page where you can see your details along with the CV you uploaded. The token and secret have already been populated for you.

## Files and folders
Here's a broad description of what the files are for, and the container folders based from the root directory of the repository. 
1.  kubernetes - Contains the *.yaml files for Kubernetes deployment
2.  nginx - docker configurations to set up Nginx as a forwarder to the ReactJs app.
3.  pdd_api - NodeJs Application that provides the backend
4.  pdd_webapp- ReactJs Application that provides the frontend
5.  .github/workflows:
	-   build.yml - configuration used by the code quality service
	-  	images.yml - CI/CD configuration for building artifacts on every update done to the main branch.
6.  docker-compose. yaml - YAML file that will set the application up in your local environment.