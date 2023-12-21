"use client";

import { FormEventHandler, useState } from "react";

import {
  DynamicWidget,
  useConnectWithEmailOtp,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";

export const EmailLogin = () => {
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const { connectWithEmail, verifyOneTimePassword } = useConnectWithEmailOtp({
    provider: "magicLink",
  });

  const onSubmitEmailHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;

    await connectWithEmail(email);

    setEmailSubmitted(true);
  };

  const onSubmitOtpHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const otp = event.currentTarget.otp.value;

    await verifyOneTimePassword(otp);

    setEmailSubmitted(false);
  };

  if (emailSubmitted) {
    return (
      <form key="otp-form" onSubmit={onSubmitOtpHandler}>
        <input type="text" name="otp" placeholder="OTP" />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <form key="email-form" onSubmit={onSubmitEmailHandler}>
      <input type="email" name="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
};

const LoggedInUser = () => {
  const { user } = useDynamicContext();

  return (
    <>
      <DynamicWidget />
      <p>user</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default function Home() {
  const { user } = useDynamicContext();

  return (
    <>
      {!user && <EmailLogin />}
      {!!user && <LoggedInUser />}
    </>
  );
}
