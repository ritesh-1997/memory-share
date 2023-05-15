import { GoogleLogout } from "react-google-login";

const Logout = () => {
  const onSuccess = (res) => {
    console.log("Logout Successfull ");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
