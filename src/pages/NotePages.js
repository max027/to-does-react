import React,{useEffect, useState} from 'react'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react'
//import notes from '../assets/data'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePages = ({match,history}) => {
    let Noteid=match.params.id
 //  let note=notes.find(note=>note.id === Number(Noteid))
    let [note,setNote]=useState(null)
    useEffect(()=>{
        getNote()
    },[Noteid])
    
    let getNote= async()=>{
        if(Noteid==='new') return
        let response=await fetch(`http://localhost:8000/notes/${Noteid}`)
        let data =await response.json()
        setNote(data)
    }

let createNote = async()=>{
        await fetch(`http://localhost:8000/notes/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...note,'updated':new Date()})
        })
    }
    let updateNote = async()=>{
        await fetch(`http://localhost:8000/notes/${Noteid}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...note,'updated':new Date()})
        })
    }

    let deleteNote=async()=>{
         await fetch(`http://localhost:8000/notes/${Noteid}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(note)
        })
        history.push('/')
    }
    let handelSubmit=()=>{
        if(Noteid !== 'new' && !note.body ){
            deleteNote()
        }else if(Noteid!=='new'){
            updateNote()
            
        }else if(Noteid === 'new' && note!==null){
            createNote()
        }
        updateNote()
        history.push('/')
    }
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handelSubmit} />

                    </Link>       
                </h3>
                {Noteid!=='new'?(
                 <button onClick={deleteNote}>Delete</button>

                ):(
                  <button onClick={handelSubmit}>done</button>

                )}

            </div>

            <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePages
