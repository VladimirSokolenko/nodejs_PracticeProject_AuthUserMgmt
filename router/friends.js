const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  // Update the code here
  res.send(JSON.stringify({friends}, null, 4));

  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  // Update the code here

  // NOT USING FILTER METHOD
  // Retrieve the email parameter from the request URL and send the corresponding friend's details
  const email = req.params.email;
  res.send(friends[email]);

  // USING FILTER METHOD 
  // Extract the email parameter from the request URL
  // const email = req.params.email;

  // Filter the users array to find users whose email matches the extracted email parameter
  // let filtered_friend = friends.filter((friend) => friend.email === email);

  // res.send(filtered_friend);

  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// POST request: Add a new friend
router.post("/", function(req, res) {
  // Check if email is provided in the request body
  if (req.body.email) {
      // Create or update friend's details based on provided email
      friends[req.body.email] = {
          "firstName": req.body.firstName,
          // Add similarly for lastName
          "lastName": req.body.lastName,
          // Add similarly for DOB
          "DOB": req.body.DOB,
      };
  }
  // Send response indicating user addition
  res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", function(req, res) {
  // Extract email parameter from request URL
  const email = req.params.email;
  let friend = friends[email];  // Retrieve friend object associated with email
  if (friend) {  // Check if friend exists
      let DOB = req.body.DOB;
      // Add similarly for firstName
      let firstName = req.body.firstName;
      // Add similarly for lastName
      let lastName = req.body.lastName;
      // Update DOB if provided in request body
      if (DOB) {
          friend["DOB"] = DOB;
      }
      // Add similarly for firstName
      if (firstName) {
        friend["firstName"] = firstName;
      }
      // Add similarly for lastName
      if (lastName) {
        friend["lastName"] = lastName;
      }

      friends[email] = friend;  // Update friend details in 'friends' object
      res.send(`Friend with the email ${email} updated.`);
  } else {
      // Respond if friend with specified email is not found
      res.send("Unable to find friend!");
  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  // Update the code here
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  friends = friends.filter((friend) => friend.email != email);
  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`);

  // res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
