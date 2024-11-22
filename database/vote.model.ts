import { model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

const VoteSchema = new Schema<IVote>(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    id: {
      type: Schema.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
