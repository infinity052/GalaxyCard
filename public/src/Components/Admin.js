import React , {useState, useEffect, useRef} from 'react';
import url from '../url.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
const Admin = function(){

    const [state, setState] = useState({gotResults: false, results : [], toBeDeleted: null})
    const usernameRef = useRef(null);
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    useEffect(function(){
        if(!state.gotResults)
            fetch(url('admin/getusers'))
            .then(response=>{
                response.json().then(data=>{
                    setState({gotResults: true, results: data});
                });
            })
            .catch(err=>console.log(err));

    });

    const selectUserToBeDeleted = function(event){
        if(event.target.id == state.toBeDeleted)
            setState({...state, toBeDeleted: null});
        else
            setState({...state, toBeDeleted: event.target.id});
    }
    const submitForm = function(){
        var username = usernameRef.current.value;
        var firstname = firstnameRef.current.value;
        var lastname = lastnameRef.current.value;

        if(username.length==0 || firstname.length==0 || lastname.length==0){
            alert("Please fill all the details");
            return;
        }
        Axios.post(url("admin/createuser"), {username,firstname,lastname}).then(()=>{
            setState({...state, gotResults: false});
        }).catch(err=>console.log(err));
    }
    var renderUserNames = function(){
        var i = 0;
        return (<table style={{border: "solid 1px white", color: "white"}} className="w-100 mt-5">
                <thead><tr><td style={{border: "solid 1px white", color: "white"}} className="p-3">S.No</td>
                <td style={{border: "solid 1px white", color: "white"}} className="p-3">Username</td>
                <td style={{border: "solid 1px white", color: "white"}} className="p-3">Firstname</td>
                <td style={{border: "solid 1px white", color: "white"}} className="p-3">Lastname</td>
                </ tr>
                </thead>
                <tbody>{state.results.map(
                    result=>{
                        i+=1;
                        return (<tr className = {state.toBeDeleted == result.id? "bg-danger" : ""}
                        key={result.id}><td id={result.id} onClick = {selectUserToBeDeleted} className="p-4 w-25">{i}</td>
                        <td onClick = {selectUserToBeDeleted} className="p-4 w-25" id={result.id}>{result.username}</td>
                        <td onClick = {selectUserToBeDeleted} className="p-4 w-25" id={result.id}>{result.firstname}</td>
                        <td onClick = {selectUserToBeDeleted} className="p-4 w-25" id={result.id}>{result.lastname}</td>
                        </tr>);
                    }
                )}</tbody> 
            </table>);
    }

    const deleteUser = function(event){
        if(state.toBeDeleted == null){
            alert("Please select a User first");
            return;
        }
        Axios.post(url("admin/deleteuser"), {id: state.toBeDeleted}).then(()=>{
            setState({...state, gotResults: false, toBeDeleted: null});
        }).catch(err=>{
            alert("error occured");
            console.log(err);
        });
    }


    return (
         <>
            <div className="container h-100 justify-content-center align-items-center flex-column">
            <div className="d-flex justify-content-center align-items-center flex-column">
                <input type="text" ref = {usernameRef} className="form-control" placeholder="username"/>
                <input type="text" ref = {firstnameRef} className="form-control" placeholder="firstname"/>
                <input type="text" ref = {lastnameRef} className="form-control" placeholder="lastname"/>
                <button class="btn btn-success" onClick={submitForm}>
                      Submit
                </button>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h2 className = "display-3" style={{color: "white"}}>Users</h2>
                {!state.gotResults ? <h2 className = "h2" style={{color: "#ffffff"}}> Please wait while files are being fetched...</h2> 
                : state.results.length == 0 ? <h2 className = "h2" style={{color: "#ffffff"}}> No users.</h2>
                : renderUserNames()}
            </div>
            <button onClick={deleteUser} className="btn btn-outline-danger">Delete</button>
            </div>
        </>
    );
}
export default Admin;