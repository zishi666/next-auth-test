"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Auth_Testing() {
  const { data: session } = useSession();
  const getSessionData = () => {
    return session;
  };

  useEffect(() => {
    console.log("Session Data is ====> ", getSessionData());
  }, []);

  return (
    <div className="flex justify-center items-center flex-col w-full h-[100vh]">
      <div className="flex flex-col gap-4 items-start justify-center">
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Facebook</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("facebook")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Youtube</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("google")}
          >
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Instagram</div>
          <div>❗</div>
          <div>Link</div>
          <button className="bg-green-600 text-sm p-1 rounded-md">
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Linkdin</div>
          <div>❗</div>
          <div>Link</div>
          <button className="bg-green-600 text-sm p-1 rounded-md">
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Twitter</div>
          <div>❗</div>
          <div>Link</div>
          <button className="bg-green-600 text-sm p-1 rounded-md">
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>Telegram</div>
          <div>❗</div>
          <div>Link</div>
          <button className="bg-green-600 text-sm p-1 rounded-md">
            verify
          </button>
        </div>
        <div className="flex gap-5 bg-slate-900 w-auto pt-3 pb-3 pl-2 pr-2 rounded-lg">
          <div>TickTok</div>
          <div>❗</div>
          <div>Link</div>
          <button
            className="bg-green-600 text-sm p-1 rounded-md"
            onClick={() => signIn("tiktok")}
          >
            verify
          </button>
        </div>
      </div>
    </div>
  );
}
