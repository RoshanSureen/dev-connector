var Post = require("../models/Post");
var Profile = require("../models/Profile");
var Promise = require("bluebird");
var validation = require("../validation");

function checkErrors(user, params, callback) {
  const {
    errors,
    isValid
  } = validation.post.validatePostInput(params);
  if (!isValid) {
    callback(errors, null);
    return;
  }
  const newPost = {
    text: params.text,
    name: params.name,
    avatar: params.avatar,
    user: user.id
  };
  callback(null, newPost);
}

function postLikeUnlike(user, post, action, callback) {
  const errors = {};
  if (action == "like") {
    if (
      post.likes.filter(like => like.user.toString() === user.id).length > 0
    ) {
      errors.alreadyLiked = "User has already liked this post";
      callback(errors, null);
      return;
    }
    post.likes.unshift({
      user: user.id
    });
    callback(null, post);
  }
  if (action == "unlike") {
    if (
      post.likes.filter(like => like.user.toString() === user.id).length === 0
    ) {
      errors.notLiked = "You have not yet liked this post";
      callback(errors, null);
      return;
    }
    const removeIndex = post.likes
      .map(item => item.user.toString())
      .indexOf(user.id);
    post.likes.splice(removeIndex, 1);
    callback(null, post);
  }
}

module.exports = {
  post: (user, params) => {
    return new Promise((resolve, reject) => {
      checkErrors(user, params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        Post.create(data, (err, post) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(post);
        });
      });
    });
  },
  get: params => {
    return new Promise((resolve, reject) => {
      Post.find(params)
        .sort({
          timestamp: -1
        })
        .exec((err, posts) => {
          if (err) {
            reject({
              not_found: "No posts found"
            });
            return;
          }
          resolve(posts);
        });
    });
  },
  getById: params => {
    return new Promise((resolve, reject) => {
      Post.findById(params, (err, post) => {
        if (err) {
          reject({
            not_found: "No post found with that ID"
          });
          return;
        }
        resolve(post);
      });
    });
  },
  delete: (user, params) => {
    return new Promise((resolve, reject) => {
      const errors = {};
      Profile.findOne({
        user: user.id
      }, (err, profile) => {
        if (err) {
          reject(err);
          return;
        }
        if (!profile) {
          errors.profile = "There is no profile for this user";
          reject(errors);
          return;
        }
        Post.findById(params, (err, post) => {
          if (err) {
            reject(err);
            return;
          }
          if (post.user.toString() !== user.id) {
            errors.notAuthorized = "User not authorized";
            reject(errors);
            return;
          }
          post.remove((err, post) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(post);
          });
        });
      });
    });
  },
  save: (user, params, action) => {
    return new Promise((resolve, reject) => {
      const errors = {};
      Profile.findOne({
          user: user.id
        },
        (err, profile) => {
          if (err) {
            reject(err);
            return;
          }
          if (!profile) {
            errors.profile = "No profile found for this user";
            reject(errors);
            return;
          }
          Post.findById(params, (err, post) => {
            if (err) {
              reject(err);
              return;
            }
            postLikeUnlike(user, post, action, (err, updatedPost) => {
              if (err) {
                reject(err);
                return;
              }
              updatedPost.save((err, post) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(post);
              });
            });
          });
        }
      );
    });
  },
  addcomment: (user, id, params) => {
    return new Promise((resolve, reject) => {
      checkErrors(user, params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        Post.findById(id, (err, post) => {
          if (err) {
            reject({not_found: "No post found"});
            return;
          }
          post.comments.unshift(data);
          post.save((err, post) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(post);
          });
        });
      });
    });
  },
  deletecomment: (id, commentid) => {
    return new Promise((resolve, reject) => {
      const errors = {};
      Post.findById(id, (err, post) => {
        if (err) {
          reject(err);
          return;
        }
        if (
          post.comments.filter(comment => comment._id.toString() === commentid)
          .length === 0
        ) {
          errors.commentnotfound = "comment not found";
          reject(errors);
          return;
        }
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(commentid);
        post.comments.splice(removeIndex, 1);
        post.save((err, post) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(post);
        });
      });
    });
  }
};