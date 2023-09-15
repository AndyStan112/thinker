import CreateDeck from "@/Components/decks/createDeck";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import LogInCard from "@/Components/auth/LogInCard";
import { PrismaDeck as Deck } from "@/types/index";
import Loader from "@/Components/loader";
import { removeDuplicates } from "@/lib/util";
import Image from "next/image";
const Decks = (props: any) => {
  const { data: session }: { data: Session } = useSession();
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [decks,setDecks]= useState([])
  const [skip,setSkip]= useState(0)
  const [isEmpty,setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const test= ()=>{ 
    const elem= document.getElementById("test")
    if(!elem)return;
    const {scrollLeft, clientWidth,scrollWidth } =
        elem;
        console.log(scrollLeft+clientWidth +50,scrollWidth)
        if(scrollLeft+clientWidth+50> scrollWidth )
        {
          setIsLoading(true)
          setSkip((skip)=>skip+10)
        }
      }

  const getDecks = async () => {
    setIsLoading(true);
    console.log('schimsnbs')
    
    // await fetch("/api/del/dsa")
    
    await fetch("/api/decks/get?skip="+skip)
      .then((r) =>
        r.json().then((newDecks:Deck[]) => {
          if(newDecks.length===0) setIsEmpty(true)
          setDecks((decks)=>removeDuplicates([...decks,...newDecks]));
          console.log(decks);
        })
      )
      .then(()=>{setIsLoading(false)}).catch((e) => console.log(e));
  }; 

  useEffect( () => {
    getDecks();
    const interval =setInterval(test,1000)
     return ()=>{clearInterval(interval)}
  }, []);
  
  useEffect(()=>{
   
    !isEmpty?getDecks().then(()=>{setIsLoading(false);}):setIsLoading(false)
    
  },[skip])
  if (session===null) return <LogInCard setIsOpen={()=>{}}/>;
  if (session===undefined) return <p>loading</p>;

  return (
    <>
     
      {showCreateDeck && (
        <div className="absolute left-1/2 -translate-x-1/2 w-11/12 sm:w-1/3 md:1/2 mt-8 bg-violet-800 rounded-lg">
          <CreateDeck
            sessionId={session.id}
            setDecks={setDecks}
            setShowCreateDeck={setShowCreateDeck}
          ></CreateDeck>
        </div>
      )}
      <div className="flex flex-col  my-2">
        
          <button
            className=" self-center ml-2 my-2 flex items-center border-2 rounded-lg bg-purple-400 hover:bg-purple-500 border-purple-600 focus:border-fuchsia-800"
            onClick={() => setShowCreateDeck(true)}
          >
            <img className="h-10" src="add_quest.svg"></img>
            <p className="mx-2">Add Deck</p>
          </button>
        
     <div className="flex mx-10 py-3 items-center"> 
     <div id="test" className="flex gap-2 overflow-x-auto overflow-y-hidden mr-1">
          {decks.map((deck:Deck)=>(
          <div key={deck.id} className="
           bg-red-400 aspect-[3/4] min-w-[12rem] max-w-[12rem] rounded-xl shadow-lg 
           flex flex-col items-center overflow-hidden "> 
          <p>{deck.title}</p> 
          <div className="flex gap-4 items-center"> 
            <p>156</p>
            <Image width="1" height="1" src="decks.svg" alt="cards" className="h-5 w-5"/>
          </div>
          <div className="flex flex-row gap-2 flex-wrap mx-2 ">
            {deck.tags.map((tag)=><p className="bg-slate-400 px-1 rounded-md">{tag.name}</p>)}
          </div>
          </div>
)) }  
      </div> {isLoading&&<Loader></Loader>}</div>
      </div>
    </>
  );
};

export default Decks;
