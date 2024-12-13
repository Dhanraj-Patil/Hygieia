import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "./icons";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="text-sm font-normal text-default-600 bg-default-100"
      startContent={<HeartFilledIcon className="text-danger" />}
      variant="flat"
    >
      Login
    </Button>
  );
};

export default LoginButton;
