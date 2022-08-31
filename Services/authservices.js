const { admin } = require("../util/admin");
const { auth } = require("../util/firebase-config");
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require("firebase/auth");

exports.signup = async (req, res) => {
    try{
        // const userResponse = await admin.auth().createUser({
        //     email: req.body.email,
        //     password: req.body.password,
        //     emailVerified: false,
        //     disabled: false
        // });

        const userResponse = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);

        res.status(201).json(userResponse);
    } catch (error) {
        return res.status(500)
        .json({ general: "Something went wrong, please try again", error: error.message});
    }
}

exports.emailVerification = async (req, res) => {
    const email = req.body.email;

    var user = auth.currentUser;

    if (user == null) {
        return res.status(400).json({message: "No user data!"});
    } 

    try {
        if(!user.emailVerified) {
            admin.auth().generateEmailVerificationLink(email)
            .then(async(emailLink) => {
                
                // const uid = await (await admin.auth().getUserByEmail(email)).uid;

                return res.status(200).json({
                    success: "Please check in your email. We sent you a verification email.",
                    emailVerificationLink: emailLink
                });
            });
        } else {
            return res.status(100).json({message: "Email already verified!"});
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            error: error.message,
        });
    }
}

exports.signin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password){
        return res.status(422).json({
            email: 'email is required',
            password: 'password is required'
        });
    }

    try {
        const loginuser = await signInWithEmailAndPassword(auth, email, password);

        return res.status(200).json({loginuser});
    } catch(error) {
        return res.status(500).json({
            message: "Something was wrong!",
            error: error.message,
            errorStack: error.stack,
        });
    }
}

exports.signout = async (req, res) => {
    try {
        signOut(auth);

        return res.status(200).json({success: "Log out successfull"});
    } catch(error) {
        return res.status(500).json({
            message: "Something was wrong!",
            error: error.message,
            errorStack: error.stack,
        });
    }
}