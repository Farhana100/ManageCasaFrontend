# Project Tracker Log

All to-dos, updates and plans are logged in this file

## To-Do List
Will be updated on the go. Basically what we are currently working on or need/planning to do next.

* need to specify default types and values in Tenant.js, Owners.js and Comm...
* more works left on basic pages

## Updates
Append the changes added in the latest commit

Format :-
### No. who - commit message
* update 1
* update 2
* update 3 ...

### 4. Fk - Added basic pages
* added home page, register and login
* fixed class name collission issue in Owners, Tenants and CommitteeMember

### 3. Fk - Content Navbar synched
* content filtering according to page

### 2. Fk - Navbar content added
* navbar content

### 1. Fk - Files rearranged and Navbar fixed. Check PROJECTLOG.md for details
* content
    * src : all js files of components
    * static : for static files of contents
* css files renamed. Format -> camelCase.css (with first letter in lower case)
* class names in content css files changed -> _ (underscores) substituted by - (hyphen)
* in src js files props object substituted by explicit object names
* Navbar issue 
    * cannot use same name for different css classes
    * solve : renamed grid-container to app-grid-container in App.css
* added project log
