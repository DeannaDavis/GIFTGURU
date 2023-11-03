import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./User/Profile.js";
import FamilyMember from "./Family/FamilyMember.js";
import CreateMember from "./Family/CreateMember.js";
import { FamilyMembers } from "./Family/FamilyMembers.js";
import EditMember from "./Family/EditMember.js";
import { MyFamilyList } from "./MyFamilyList/myFamilyList.js";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
    
    <Route path="/">
        <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/create-member" 
          element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <CreateMember />
          </AuthorizedRoute>
          }
     />
     <Route
          path="/edit-member/:id" 
          element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <EditMember />
          </AuthorizedRoute>
          }
     />
        <Route
              path="/user-profile" 
              element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <Profile loggedInUser={loggedInUser}/>
              </AuthorizedRoute>
              }
        />
     <Route
          path="/FamilyMembers" 
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <FamilyMembers loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="/MyFamilyList" 
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyFamilyList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
      </Route>
      
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}