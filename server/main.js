const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const path = require("path");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bcrypt = require("bcrypt");
const pp = require("./lib/passport/passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static('/home/ubuntu/user/upload/profile_imgs/'));
app.use(express.static('C:\\bapbaksa\\upload\\profile_imgs\\'));

// CORS START
app.use(cors({
    //  origin: 'http://localhost:3000',
      origin: 'http://54.206.156.100:3000',
      credentials: true,
  }));
  // CORS END  

// session setting START
const maxAge = 1000 * 60 * 30;
const sessionObj = {
    secret: 'BAPBAKSA',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({checkPeriod: maxAge}),
    cookie: {
        maxAge: maxAge,
    }
};
app.use(session(sessionObj));
// session setting END

// passportjs session START
let passport = pp.passport(app);
app.post('user/signin_confirm', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/signin_form?errMsg=INCORRECT USER ID OR PW',
}));
// passportjs session END 

app.get("/", (req, res) => {
    res.send("SERVICE SERVER 3001");
});

// routes
const userRouter = require("./routes/userRouter");
const marketRouter = require("./routes/marketRouter");

app.use("/user", userRouter);
app.use("/market", marketRouter);

app.listen(3001);
