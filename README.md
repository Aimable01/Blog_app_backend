# Introduction

This is the backend of a blog_app where one has to first register or login. Once done, one can post a blog, like other blogs and also comment on them.

## Technologies

Language: Typescript**_|_**  
Framework: Nodejs' Express js**_|_**
Database: Postgresql(pg)**_|_**
Authentication: JSONWebTokens**_|_**
API: RESTful api

### API endpoints

```javascript
// home page
   localhost:3000/home

//  register
   localhost:3000/auth/register

//  login
   localhost:3000/auth/login

//  view all posts
   localhost:3000/post/

//  create a post
   localhost:3000/post/new

//  update a post
   localhost:3000/post/:id

//  delete a post
   localhost:3000/post/:id

// comment on a post
   localhost:3000/comment/new

//  delete a comment
   localhost:3000/comment/:id

//  like a post
   localhost:3000/likes/like/:id

//  unlike a post
   localhost:3000/likes/unlike/:id
```

#### Conclusion

This is a good project to exercise your backend development skills.
Feel free to grab the codes for learning or your own projects.
