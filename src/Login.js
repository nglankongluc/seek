import React, { useState, useEffect } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Auth } from "aws-amplify";

const SignInComponent = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // handle login
    const triggerLogin = async () => {
      
        await Auth.signIn(username, password).then(() => {
            props.accInfoDispatch({
              type: "signin",
              username: username,
              password: password,
              authToken: null
            });
            console.log("WATCHOUT");
        }
        ).catch(
            (err) => console.log(`Error signing in - ${ err }`)
        );

        props.setOpen(false);
    }

    const saveUsername = (username) => {
      setUsername(username);
    };

    const savePassword = (password) => {
      setPassword(password);
    };

    return (
        <div className="content">
            <div className="header">
                <h1 className="ui teal header">Seek</h1>
                <button className="ui icon button" onClick={() => props.setOpen(false)}>
                    <i aria-hidden="true" className="times icon"></i>
                </button>
            </div>
            <div className="loginView">
            <form className="ui large form">
                <div className="ui stacked segment column">
                <UsernameField
                    saveUsername={(fieldUsername) => saveUsername(fieldUsername)}
                />
                <PasswordField
                    savePassword={(fieldPassword) => savePassword(fieldPassword)}
                    text="Password"
                />
                <div
                    className="ui fluid large teal submit button"
                    onClick={() => triggerLogin()}
                >
                    Submit
                </div>
                </div>
            </form>
            </div>
            <div className="ui message switchView">
                <a onClick={() => props.parentSetView()}>Sign Up</a>
            </div>
            <div className="ui message switchView">
                <a onClick={() => props.setOpen(false)}>Continue as guest</a>
            </div>
        </div>
    );
}

const SignUpComponent = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [successful, setSuccessful] = useState(false);
    const [error, setError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const triggerSignUp = async () => {
      if(password && confirmPassword && password === confirmPassword){
        await Auth.signUp({
          username,
          password,
          attributes: {
            email: username,
          }
        }).then(
          () => {
            setSuccessful(true);
          }
        ).catch(
          (err) => {
            console.log(`Error signing in - ${ JSON.stringify(err) }`);
            setError("problem");
          }
        );
      }else{
        setError("mismatch");
      }
    };

    const saveUsername = (username) => {
      setUsername(username);
    };

    const savePassword = (password) => {
      setPassword(password);
    };

    const saveConfirmPassword = (confirmPassword) => {
      setConfirmPassword(confirmPassword);
    }

    if(successful){
      return(
        <ConfirmEmailComponent 
            username={username} 
            password={password} 
            setOpen={props.setOpen}
            accInfoDispatch={props.accInfoDispatch}
        />
      );
    }else{
      return (
        <div className="content">
            <div className="header">
                <h1 className="ui teal header">Seek</h1>
                <button className="ui icon button" onClick={() => props.setOpen(false)}>
                    <i aria-hidden="true" className="times icon"></i>
                </button>
            </div>
            <div className="loginView">
                <form className="ui large form">
                    <div className="ui stacked segment column signup">
                        <UsernameField
                            saveUsername={(fieldUsername) => saveUsername(fieldUsername)}
                        />
                        <PasswordField
                            text="Password"
                            savePassword={(fieldPassword) => savePassword(fieldPassword)}
                        />
                        <PasswordField
                            text="Confirm Password"
                            saveConfirmPassword={(fieldConfirmPassword) =>
                                saveConfirmPassword(fieldConfirmPassword)
                            }
                        />
                        <div
                            className="ui fluid large teal submit button"
                            onClick={() => triggerSignUp()}
                        >
                            Submit
                        </div>
                    </div>
                </form>
            </div>
            <div className="ui message switchView">
                <a onClick={() => props.parentSetView()}>Sign In</a>
            </div>
            <div className="ui message switchView">
                <a onClick={() => props.parentSetView()}>Continue as guest</a>
            </div>
        </div>
      );
    }
}

const ConfirmEmailComponent = (props) => {
  const [code, setCode] = useState(null);

  const handleSubmitCode = () => {
    Auth.confirmSignUp(props.username, code)
    .then(() => Auth.signIn(props.username, props.password))
    .then(() => {
        props.accInfoDispatch({
            type: "signin",
            username: props.username,
            password: props.password,
            authToken: null
        });
        props.setOpen(false);
    })
    .catch((err) => {
      console.log("Error: " + JSON.stringify(err));
    });
  }

  return (
    <div className="content">
      <h1 className="ui teal header">Enter Confirmation Code</h1>
      <div className="loginView">
        <form className="ui large form">
          <div className="ui stacked segment column signup">
            <input onChange={(e) => setCode(e.target.value)} />
            <div
              className="ui fluid large teal submit button"
              onClick={() => handleSubmitCode()}>
                Submit
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
}

const PasswordField = (props) => {

  const handlePasswordChange = (e) => {
    if(props.text === "Password"){
      props.savePassword(e.target.value);
    }else{
      props.saveConfirmPassword(e.target.value);
    }
    
  };

  return (
    <div className="field">
      <div className="ui left icon input">
        <i className="lock icon"></i>
        <input
          onChange={(e) => handlePasswordChange(e)}
          type="password"
          name="password"
          placeholder={props.text}
        />
      </div>
    </div>
  );
}

const UsernameField = (props) => {

  const handleUsernameChange = (e) => {
    props.saveUsername(e.target.value);
  };

  return (
    <div className="field">
      <div className="ui left icon input">
        <i className="user icon"></i>
        <input onChange={e => handleUsernameChange(e)} type="text" name="email" placeholder="E-mail address" />
      </div>
    </div>
  );
}


const Login = (props) => {
    const [currentView, setCurrentView] = useState('signin');
    const [open, setOpen] = useState(false);

    useEffect(() => {
      console.log(`Font size`);
    }, [currentView]);

    const switchViews = () => {
        if(currentView === 'signin'){
            setCurrentView('signup');
        }else{
            setCurrentView("signin");
        }
    }

    return (
        <Modal
            className="ui model content modal"
            trigger={<Button className="ui green button" onClick={() => setOpen(true)}>Login</Button>}
            open={open}
        >
            {currentView === "signin" ? (
            <SignInComponent
                parentSetView={switchViews}
                accInfoDispatch={props.accInfoDispatch}
                setOpen={setOpen}
            />
            ) : (
            <SignUpComponent
                parentSetView={switchViews}
                accInfoDispatch={props.accInfoDispatch}
                setOpen={setOpen}
            />
            )}
        </Modal>
    );
};

export default Login;