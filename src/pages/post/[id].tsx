import { type NextPage } from "next";
import Head from "next/head";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen justify-center border-slate-400">
        <div>Post View</div>
      </main>
    </>
  );
};

export default SinglePostPage;
