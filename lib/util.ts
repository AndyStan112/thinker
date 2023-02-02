
 const getTotalExperieceNeeded=(level)=>(30*Math.floor(level**2.4))
 const getCurrentExperieceNeeded=(level)=>(getTotalExperieceNeeded(level)-getTotalExperieceNeeded(level-1))
 const getCurrentExperiece = (level,totalExperience)=>{totalExperience-getTotalExperieceNeeded(level-1)}
 export getTotalExperieceNeeded
 export getCurrentExperieceNeeded
 export getCurrentExperiece