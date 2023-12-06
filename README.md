[This website](https://main--euphonious-valkyrie-eb9208.netlify.app/) is a [Frontend Mentor challenge](https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l) that I took on in order to get more familiarity with the SSG and SSR rendering modes.

For this project, I'm using the [xata](https://xata.io/) platform for storing all my data.

At first, I coded this website using the Astro's default SSG mode to sort of push the limits and see what exactly can be done with it. It turned out that it ain't much of it, therefore, after finishing this part of coding the website, I refactored the whole code for the SSR mode.

This was actually my very first time working with a rendering mode other than SPA, so coding the existing state of the website took me way too long, I faced many challenges and I still have different issues that need to be addressed (described in detail below) but, at the moment, I'm not sure how to approach those. Nevertheless, I do feel that I've learnt a lot, so, ultimately, I'm actually really happy that I took this challenge on.

## 🕵️‍♀Details of the project
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
* I strongly dislike the current way of filtering jobs:
    - before, I used `Fuse.js`, that handled this task very well but the issue was I had to pass the data to be filtered - and since the data were actually my jobs, this means I had to fetch all of them first, in order to be able to do that 
    - that's why, ultimately, I decided to use the [xata's filtering API](https://xata.io/docs/sdk/filtering) but this solution doesn't really allow me for applying any kind of fuzziness
    - now, as a user you could tr to filter the jobs using for example the "Frontend (developer)" query - and the thing is, some of the jobs' titles spell it as "Frontend" and others as "Front-end"; this is where the fuzziness is really needed but I don't think can use it with this filter API, which means that a user is not able to find results meeting both of those spelling patterns when searching for only one of them
    - so, it seems to me like what I actually need is the [xata's search API](https://xata.io/docs/sdk/search) (in fact, you can actually combine both those APIs) but nowhere in their docs I found the information on how to pass more than one search query
    - which I abviously need, considering the fact that my form consists of 3 inputs and a user may fill in 1/2/3 of them and depending on which one is actually filled, I need to search through different columns as well as in some cases I need the results that contain all of the searching criteria and in other ones I need to get back the results that contain one search query but in any of several (defined) colums
    - and currently, it seems to me that this is impossible to do using any xata's API but it might be also that I just overlooked something, that's why, I'll probably reach out the xata's team on their discord community and ask whether is there a better way (than my current approach) of handling my case

## 💻 Technologies
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind-css](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Xata](https://img.shields.io/badge/Xata-6C53CD?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSIxNjAwIiB2aWV3Qm94PSIwIDAgMTYwMCAxNjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMjUwLjEyIDU3Ni40OThjLS4xMSA4OS45OTctMzYgMTc2LjI2Ny05OS43OSAyMzkuODNsLS4wMS0uMDA3LTIyNi4yODIgMjI1LjQ4OWMtNy44NDEgNy44Mi0yMC41OCA3Ljg0LTI3LjkyNy0uNDQtNTUuMDE1LTYxLjk5NS04NS41ODctMTQyLjE3NS04NS40OS0yMjUuNDc4LjEwNi04OS45OTcgMzYtMTc2LjI2NyA5OS43ODctMjM5LjgzbC4wMDcuMDA3IDIwNi43NDUtMjA2LjAxNGMxOC42My0xOC41NjkgNDkuMTItMTguNzAyIDY0LjkyIDIuMzI0IDQzLjk5IDU4LjUyNSA2OC4xMiAxMzAuMDg5IDY4LjA0IDIwNC4xMTl6TTQ0MC41NTIgODE3LjcwMmMtNjMuNzg3LTYzLjU2My05OS42ODItMTQ5LjgzMy05OS43ODctMjM5LjgzLS4wODctNzQuMDMgMjQuMDQ4LTE0NS41OTQgNjguMDM1LTIwNC4xMTkgMTUuODAzLTIxLjAyNiA0Ni4yOTQtMjAuODkzIDY0LjkyOC0yLjMyNGwyMDYuNzQxIDIwNi4wMTYuMDA2LS4wMDdjNjMuNzg3IDYzLjU2NCA5OS42ODEgMTQ5LjgzMyA5OS43ODcgMjM5LjgzMS4wOTcgODMuMzAyLTMwLjQ3NSAxNjMuNDgzLTg1LjQ5IDIyNS40NzEtNy4zNDcgOC4yOC0yMC4wODYgOC4yNi0yNy45MjcuNDVMNDQwLjU1OCA4MTcuNjk2bC0uMDA2LjAwNnpNMTE0MS44MiAxMjIxLjE5Yy0xNi42MyAyMC4zOS00Ny4wNCAyMC4yMS02NS42MyAxLjU5bC0xMjcuNjk4LTEyNy44NGMtNy44MzYtNy44NS03LjgyMS0yMC41Ni4wMzMtMjguMzlsMjEyLjA5NS0yMTEuMzQ1YzcuODQtNy44MTMgMjAuNjItNy44NTkgMjcuNTQuNzg0IDM2LjgxIDQ1Ljk5NiA1MS4yOSAxMDkuNTY2IDQwLjM0IDE3OS41NTEtMTAuMDEgNjQuMDYtNDAuNjUgMTI5LjE5LTg2LjY4IDE4NS42NXpNNTE0LjY5NiAxMjI0LjE2Yy0xOC41OTQgMTguNjEtNDkuMDAyIDE4Ljc5LTY1LjYyNi0xLjYtNDYuMDM2LTU2LjQ2LTc2LjY3Mi0xMjEuNTgtODYuNjg3LTE4NS42NC0xMC45NDMtNjkuOTkyIDMuNTMxLTEzMy41NjIgNDAuMzQyLTE3OS41NTggNi45MTYtOC42NDIgMTkuNzAzLTguNTk3IDI3LjU0NC0uNzg0bDIxMi4wOTIgMjExLjM1MmM3Ljg1NCA3LjgyIDcuODY4IDIwLjU0LjAzMyAyOC4zOGwtMTI3LjY5OCAxMjcuODV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+&logoColor=white)

## 📁 Sources

| Data          | Correct input    |
| ------------- |:----------------:|
| Icons | [Frontend Mentor](https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l) (if not stated otherwise)|
| Up arrow icon | [Svgrepo](https://www.svgrepo.com/svg/407635/top-arrow)|
| All jobs data    | [Frontend Mentor](https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l)|
| Font | [Google Fonts](https://fonts.google.com/specimen/Kumbh+Sans) |
| Magnifying glass image | Own drawing |