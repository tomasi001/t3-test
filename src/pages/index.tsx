import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { LoadingComponent, LoadingPage } from "~/components/LoadingSpinner";
import { useState } from "react";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      }
    },
  });
  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user?.profileImageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full"
        width="56"
        height="56"
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input! == "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />

      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting === true && <LoadingComponent />}
    </div>
  );
};

type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex  gap-3 border-b border-slate-400 p-8">
      <Image
        src={author.profileImageUrl}
        className="h-6 w-6 rounded-full"
        alt={`@${author.username}'s profile image`}
        width="56"
        height="56"
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <span>{`@${author.username} `}</span>
          <span className="font-thin">{` . ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};
const Feed = () => {
  const { data, isLoading: postsLoading } = api.post.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  // since data is cached unless changed
  // we can trigger the call early to
  // ensure rapid data fetching
  api.post.getAll.useQuery();

  if (!userLoaded) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center border-slate-400">
        <div className="h-full w-full border-x md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {!!isSignedIn && <CreatePostWizard />}
          </div>

          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
