"use client";

import { Button } from "antd";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-y-8 px-20 text-center">
      <h2 className="text-center">Something went wrong!</h2>
      <p className="text-gray-400 text-sm">{error?.message}</p>
      <Button color="primary" size="large" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}
