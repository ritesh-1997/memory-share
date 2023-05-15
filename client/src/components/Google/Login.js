import { GoogleLogin } from "@react-oauth/google";
const clientId =
  "671086080216-lpjet8hhuf3i3eskg8t5pees4fhq3esa.apps.googleusercontent.com";

const Login = () => {
  const onSuccess = (res) => {
    console.log("Login Successfull !! current user : ", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("Login FAILED !! ", res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
