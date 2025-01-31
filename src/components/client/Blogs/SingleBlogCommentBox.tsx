/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { toast } from "sonner";
import { useCreateCommentMutation } from "@/redux/features/comment/commentApi";
import { TResponse } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SingleBlogCommentBoxProps {
  postId: string;
}

const SingleBlogCommentBox = ({ postId }: SingleBlogCommentBoxProps) => {
  const [description, setDescription] = useState("");
  const [createComment] = useCreateCommentMutation();
  const token = useAppSelector(useCurrentToken);

  // Regular expression to allow only English and Bangla text characters and certain punctuation
  const textPattern = /^[A-Za-z0-9\s.,!?'"-]*$|^[\u0980-\u09FF\s.,!?'"-]*$/;

  // Handler for creating a comment
  const createCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    const trimmedDescription = description.trim();

    // Check if the input is empty
    if (!trimmedDescription) {
      return toast.error("Please fill in the comment box.", {
        id: toastId,
        duration: 1500,
      });
    }

    // Check if the input matches the text pattern
    if (!textPattern.test(trimmedDescription)) {
      return toast.error(
        "Only English and Bangla text comments are allowed, without special characters.",
        {
          id: toastId,
          duration: 1500,
        }
      );
    }

    try {
      const res = (await createComment({
        description: trimmedDescription,
        postId,
      })) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Comment added successfully", {
          id: toastId,
          duration: 1000,
        });
        setDescription(""); // Reset the form after successful submission
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  return (
    <div className="text-gray-300">
      {token ? (
        <div>
          <form onSubmit={createCommentHandler}>
            <div className="grid w-full">
              <Textarea
                className="text-lg hind-siliguri-light border-gray-800"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Type your message here."
              />
            </div>
            <div className="flex items-end justify-end">
              <Button
                type="submit"
                className="h-[45px] rounded text-lg hind-siliguri-light mt-2 bg-BgPrimary hover:bg-BgPrimaryHover"
              >
                Send message
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center my-5">
          <Link to="/login">
            <Button className="bg-BgPrimary hover:bg-BgPrimaryHover text-lg h-[50px] hind-siliguri-light">
              Sign In to Share Your Thoughts
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SingleBlogCommentBox;
