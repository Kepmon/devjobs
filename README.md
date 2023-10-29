[This website](https://main--euphonious-valkyrie-eb9208.netlify.app/) is a [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l) that I took on in order to get more familiarity with the SSG and SSR rendering modes.

For this project, I'm using the [xata](https://xata.io/) platform for storing all my data.

At first, I coded this website using the Astro's default SSG mode to sort of push the limits and see what exactly can be done with it. It turned out that it ain't much of it, therefore, after finishing this part of coding the website, I refactored the whole code for the SSR mode.

### From the very beginning, I had a couple of goals in mind:
* since I' making use of the SSG/SSR rendering modes, all data should be fetched on a server side
* only the necessary data should be fetched, meaning:
    - since there are only 12 jobs visible when the page first loads, there is no need for fetching more
    - since all "searching criteria" (like page number or filtering params) were added to the website's link as query params, this link can be shared between users
    - therefore, if the page first loads with some initial query parameters being present, then the number of results should be approprietly adjusted, but still, no more jobs should be fetched
* all user interactions, like loading more jobs or filtering them, should take place on the same (main) page, without the page refreshing

### Apart from the functionality proposed by the Frontend Mentor creators, I intend to enhance the functionality of this website by:
* allowing for the users to create accounts, in order to add new job offers
* adding some kind of a WYSIWYG editor to elevate the user experience, when adding new job offers
* allowing for the users to apply for a job (no account will be needed for that). Not sure yet, how to approach this one, but it seems to me that I can:
    - either display some "dummy message" in form of a popup that says something like "You successfully applied for the job. We hope you'll get it" - this one would certainly be the easiest one but... well, here is the thing: it's seems well to easy for me
    - or add the user's application to the database and use it (for example) for listing all applications for the particular job offer on the employer's page
    - I'd also not rather make the users to send any files (CV) through this website, so I think I'd just render some form for the applicant in which they can share links for their Github/LinkedIn profiles and/or their own portfolio websites as well as provide some information about themselves; I'll probably use the WYSIWYG editor for that, as well

### Before that, though, I still need to make many improvements with the current version of this website. Those include:
* full accessibility is meant to be taken care of
* I don't like the user experience when loading more jobs - some loading state should be applied to the button and the website should scroll to the new results
* I haven't fully achieved my "no-more-jobs-than-needed" goal when it comes to the job detail page:
    - currently, this job is fetched everytime, regardless of the user going there through the link or by clicking the job offer on the main page
    - in the latter case, this job was already fetched, so I think I should rather store all fetched jobs in a variable and filter those in order to find and render the one's content on the details page; but I can see at least two problems with this approach
    - one of them being the fact that, on the main page, I don't really fetch all properties of the job object (for exmaple, I don't need the job's description, requirements or the role description on the main page), and, since I need the remaining ones on the job details page, applying the abovementioned approach would make me to fetch all those properties, regardless of the user going to see all those details on the detail page or not
    - the other one being the fact that I don't think I have a way of passing the `jobs` variable, stored on a client side in the `index` component (or even in the `json` endpoint) to the code running on a server side when the job details page is being rendered (I frankly don't know why, but it seems to me like I can't reach the `json` endpoint on a server side)
    - this in turn means that I'd have to render the whole page content on a client side, using the `template` HTML tag, which I have a feeling that's not a good idea (I can't actually say why, though)
    - moreover, I'm wondering about the filtering jobs functionality - what if some of the filtering results were already fetched? Shouldn't I fetch only the remaining ones?
    - so, at the moment, I'm not really sure what should I do with it - I'll probably ask some more experienced developers for advice on a discord community or somewhere else on the internet, and fix this issue when I'm actually committed to one approach
* code refactoring:
    - currently, in all pagination-related functions, the number of items per page is hardcoded to be 12 - that's obviously wrong because if I need to change it anytime in the future, I'll have to change it in all those places separately; instead, I should have a piece of state somewhere and share it between all files that need an access to this variable
    - error handling + try/catch blocks
    - types - working with TypeScript for fetched data is still a bit hard to me, therefore, all types for the job-related responses from the xata database are wrong and they'are meant to be corrected ASAP
* I strongly dislike the current way of filtering jobs:
    - before, I used `Fuse.js`, that handled this task very well but the issue was I had to pass the data to be filtered - and since the data were actually my jobs, this means I had to fetch all of them first, in order to be able to do that 
    - that's why, ultimately, I decided to use the [xata's filtering API](https://xata.io/docs/sdk/filtering) but this solution doesn't really allow me for applying any kind of fuzziness
    - now, as a user you could tr to filter the jobs using for example the "Frontend (developer)" query - and the thing is, some of the jobs' titles spell it as "Frontend" and others as "Front-end"; this is where the fuzziness is really needed but I don't think can use it with this filter API, which means that a user is not able to find results meeting both of those spelling patterns when searching for only one of them