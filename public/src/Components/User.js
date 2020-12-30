import React , {useState, useEffect} from 'react';
import url from '../url.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
const User = function(props){

    const [state, setState] = useState({gotResults: false, results: [], fileSelected: false, file: null, toBeDeleted: null});
    
    useEffect(function(){
        if(!state.gotResults){
            var promise = fetch(url('getfilenames'));
            promise.then(response=>{
                response.json().then(data=>{
                    console.log(data);
                    setState({...state, gotResults: true, results : data});
                });
            }).catch(error=>console.log(error));
        }
    });
    var renderFileNames = function(){
        var i = 0;
        return (<table style={{border: "solid 1px white", color: "white"}} className="w-100 mt-5">
                <thead><tr><td style={{border: "solid 1px white", color: "white"}} className="p-3">S.No</td><td style={{border: "solid 1px white", color: "white"}} className="p-3">Files</td></ tr></thead>
                <tbody>{state.results.map(
                    result=>{
                        i+=1;
                        return (<tr className = {state.toBeDeleted == result.id? "bg-danger" : ""}key={result.id}><td id={result.id} onClick = {selectFileToBeDeleted} className="p-4 w-25">{i}</td><td  onClick = {selectFileToBeDeleted} className="p-4 w-25" id={result.id}>{result.originalname}</td></tr>);
                    }
                )}</tbody> 
            </table>);
    }


    const fileSelect = function(event){
        setState({...state, fileSelected: true, file: event.target.files[0]});
    }

    const selectFileToBeDeleted = function(event){
        if(event.target.id == state.toBeDeleted)
            setState({...state, toBeDeleted: null});
        else
            setState({...state, toBeDeleted: event.target.id});
    }

    const fileUpload = function(){
        if(!state.fileSelected){
            alert("Please select a file first");
            return;
        }
        var formdata = new FormData();
        formdata.append("file", state.file);
        Axios.post(url("uploadfile"), formdata,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(()=>{
            setState({...state, gotResults: false});
        }).catch(err=>{
            console.log(err);
        });
    }

    const deleteFile = function(event){
        if(state.toBeDeleted == null){
            alert("Please select a file first");
            return;
        }
        Axios.post(url("deletefile"), {id: state.toBeDeleted}).then(()=>{
            setState({...state, gotResults: false, toBeDeleted: null});
        }).catch(err=>{
            alert("error occured");
            console.log(err);
        });
    }
    
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h2 className = "display-3" style={{color: "white"}}>Files uploaded</h2>
                {!state.gotResults ? <h2 className = "h2" style={{color: "#ffffff"}}> Please wait while files are being fetched...</h2> 
                : state.results.length == 0 ? <h2 className = "h2" style={{color: "#ffffff"}}> No files uploaded yet.</h2>
                : renderFileNames()}

                <div className = "container mt-3 d-flex justify-content-around align-items-center">
                <input type = "file" style={{color:"white"}} onChange={fileSelect}/>
                    
                    <button className="btn btn-outline-success" onClick={fileUpload}>
                            Upload
                    </button>
                    <button className="btn btn-outline-danger" onClick={deleteFile}>
                            Delete file
                    </button>
                </div>
            </div>
        </>
    );

}
export default User;