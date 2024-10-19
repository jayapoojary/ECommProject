const express = require("express");
const cors = require("cors");
require("./DB/config");
const Users = require("./DB/Users");
const Products = require("./DB/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = 'e-comm';
const app = express();
// app.get("/", (req, resp) => {
//     resp.send("App is Working ")
// });
//Middlewear: to control the API response.
app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
  let existingUser = await Users.findOne(req.body).select("email");
  //resp.send(req.body);
  console.log("existingUser ", existingUser);
  if (existingUser) {
    resp.send(`User with email ${req.body.email} already registered! :) `);
  } else {
    const user = new Users(req.body);
    let result = await user.save();
    //To hide the password from response
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.send("Seomething Went Wrong, Please try after sometime");
      }
      resp.send({ result, auth: token });
    });
  }
});

app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2m" }, (err, token) => {
        if (err) {
          resp.send("Seomething Went Wrong, Please try after sometime");
        }
        resp.send({ user, auth: token });
      });
      //resp.send(user);
    } else {
      resp.send("USER NOT FOUND");
    }
  } else {
    resp.send("USER NOT FOUND");
  }
});

app.post("/addproduct", validateToken, async (req, resp) => {
  const newProduct = new Products(req.body);
  let result = await newProduct.save();
  result = result.toObject();
  console.log("The Added Product is ", result);
  resp.send(result);
});

app.get("/getProducts", validateToken, async (req, resp) => {
  const products = await Products.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send("No Products Found");
  }
});

app.post("/getUserProduct", validateToken, async (req, resp) => {
  const products = await Products.findOne(req.body.userId);
  const prd = products.toObject();
  if (products) {
    let existStingProduct = await Products.findOne(prd.userId);
    resp.send(existStingProduct);
  } else {
    resp.send("No Products Found");
  }
});

app.delete("/delete/:id", validateToken, async (req, resp) => {
  const productId = req.params.id;
  const result = await Products.deleteOne({ _id: req.params.id });
  resp.send(`Product got deleted with id: ${req.params.id}`);
});
// app.put('/update/:id', async (req,resp) => {
//   const existingProduct = await Products.findById({_id:req.params.id});
//   if(existingProduct){
//     resp.send(existingProduct)
//   }
// })

app.get("/product/:id", validateToken, async (req, resp) => {
  const productId = req.params.id;
  const result = await Products.findOne({ _id: req.params.id });
  resp.send(result);
});

app.put("/update/:id", validateToken, async (req, resp) => {
  const result = await Products.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", validateToken, async (req, resp) => {
  let result = await Products.find({
    $or: [
      { pname: { $regex: req.params.key } },
      { Company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

function validateToken(req, resp, next) {
  let token = req.headers["authorization"];
  //token = token.split(' ')
  if (token) {
    //token = token.split(' ')[0];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: `Please provide valid token ${token}` });
        //console.log("err ", err);
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}
app.listen(5000);
