// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;




contract FaceAuth {



    struct User {
        string name;
        string faceData;
        string email;
    }


    mapping(string => User) public users;
     string[] public userList ;
   
    

    function create(string memory name, string memory faceData, string memory email)
        public
        returns (User memory)
    {
        User memory newUser = User({
           name: name,
           faceData:faceData,
           email: email
        });
        users[email] = newUser;
        userList.push(email);
        return newUser;
    }
    
   

    function getToken() public view returns (string[] memory) {
        return  userList;
    }

    function getUser(string memory email) public view returns (User memory) {
        return  users[email];
    }

  
  
}