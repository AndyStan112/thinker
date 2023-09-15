import { useState } from "react";
const TagsInput =({setTags,tags})=>{
    const [tag,setTag]= useState("");
    return (
        <div className="flex pt-1    text-black items-center gap-2 flex-wrap bg-white w-4/5 rounded-lg px-2">
           
          
           {tags.map((t:String)=> <div className=" flex  items-center rounded-3xl py-1 px-2  bg-slate-400">{/* One hardcoded tag for test */}
                <span className="px-1">{t}</span>
                <img src="close.png" onClick={()=>{
                    setTags((tags)=>tags.filter((tag)=>tag!=t))
                }} 
                className="w-5 h-5 bg-slate-500 rounded-full"></img>
            </div>)}
          
            <input 
             value={tag}
            onChange={(e) => {
          setTag(e.target.value.toUpperCase());
        }}
             onKeyDown={(e) => { 
                if(e.key === 'Enter'){
                    console.log(tags)
                    e.preventDefault();
                    if(tag)setTags([...new Set([...tags,tag])]);
                    setTag("")
                }  ;
             }}
            type="text" 
            className="border-none outline-none" 
            placeholder="Type somthing" ></input>
        </div>
    )
}

export default TagsInput