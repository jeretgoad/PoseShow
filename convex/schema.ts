import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookmarks: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
  })
    .index("by_post", ["postId"])
    .index("by_user", ["userId"])
    .index("by_user_and_post", ["userId", "postId"]),
  comments: defineTable({
    content: v.string(),
    postId: v.id("posts"),
    userId: v.id("users"),
  }).index("by_post", ["postId"]),
  follows: defineTable({
    followerId: v.id("users"),
    followingId: v.id("users"),
  })
    .index("by_both", ["followerId", "followingId"])
    .index("by_follower", ["followerId"])
    .index("by_following", ["followingId"]),
  likes: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
  })
    .index("by_post", ["postId"])
    .index("by_user_and_post", ["userId", "postId"]),
  notifications: defineTable({
    commentId: v.optional(v.id("comments")),
    postId: v.optional(v.id("posts")),
    receiverId: v.id("users"),
    senderId: v.id("users"),
    type: v.union(
      v.literal("like"),
      v.literal("comment"),
      v.literal("follow")
    ),
  }).index("by_receiver", ["receiverId"]),
  posts: defineTable({
    caption: v.optional(v.string()),
    comments: v.float64(),
    imageUrl: v.string(),
    likes: v.float64(),
    storageId: v.id("_storage"),
    userId: v.id("users"),
  }).index("by_user", ["userId"]),
  users: defineTable({
    bio: v.optional(v.string()),
    clerkId: v.string(),
    email: v.string(),
    followers: v.float64(),
    following: v.float64(),
    fullname: v.string(),
    image: v.string(),
    posts: v.float64(),
    username: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
});
