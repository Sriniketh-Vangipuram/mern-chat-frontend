import {useEffect,useState} from "react";
import socket from "../socket/socket";

function HomePage(){
    const[message,setMessage]=useState("");
    const[messages,setMessages]=useState([]);
    const[username,setUsername]=useState("");
    const[typingUser,setTypingUser]=useState("");
    const[room,setRoom]=useState("General");
    const [joined, setJoined] = useState(false);

    useEffect(()=>{

        socket.on("system-message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("receive-message",(msg)=>{
            console.log("Received:", msg);
            setMessages((prev)=>[...prev,msg]);
        });

        socket.on("user-typing",(user)=>{
            setTypingUser(user);
        })

        socket.on("user-stop-typing",()=>{
            setTypingUser("");
        })


        return ()=>{
            socket.off("receive-message");
            socket.off("system-message");
            socket.off("user-typing");
            socket.off("user-stop-typing");
        };
    },[]);


    function sendMessage(){
        if(!message.trim())return;
        if(!username.trim())return;
        

        socket.emit("send-message",{
            username,
            message,
            room,
        });

        socket.emit("stop-typing",room);
        
        setMessage("");
    }

    function handleTyping(e){
        setMessage(e.target.value);
        if(username.trim()){
            socket.emit("typing",{
                username,
                room,
            });
            clearTimeout(window.typingTimeout);

            window.typingTimeout=setTimeout(()=>{
                socket.emit("stop-typing",room);
            },1000);
        }
    }

    function joinChat() {
     if (!username.trim()) return;

     socket.emit("join-room", {
       username,
       room,
     });

     setJoined(true);
    }


    useEffect(() => {
     if (!joined) return;

     socket.emit("join-room", {
       username,
       room,
     });
    }, [room]);

       return (
           <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
               <div className="w-full max-w-2xl bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-800">
                   <h1 className="text-4xl font-bold text-blue-500 text-center mb-6">
                       MERN Chat
                   </h1>
                   <h2 className="text-center text-slate-400 mb-4">
                       Room: {room}
                   </h2>
                   <div className="h-80 overflow-y-auto bg-slate-800 rounded-xl p-4 mb-5">
                       {messages.length === 0 ? (
                         <p className="text-slate-400 text-center mt-24">
                           No messages yet...
                         </p>
                       ) : (
                         messages.map((msg, index) => {
                           if (msg.type === "join") {
                             return (
                               <div
                                 key={index}
                                 className="text-green-400 text-center italic mb-2"
                               >
                                 🟢 {msg.text}
                               </div>
                             );
                           }
                        
                           if (msg.type === "leave") {
                             return (
                               <div
                                 key={index}
                                 className="text-red-400 text-center italic mb-2"
                               >
                                 🔴 {msg.text}
                               </div>
                             );
                           }
                        
                           return (
                             <div
                               key={index}
                               className="bg-blue-600 text-white rounded-lg p-3 mb-3"
                             >
                               <strong>[{msg.username}]</strong>: {msg.message}
                             </div>
                           );
                         })
                       )}
                   </div>

                   <div className="h-6 mb-3">
                   {typingUser && (
                       <p className="text-sm text-slate-400 italic">
                           {typingUser} is typing...
                       </p>    
                   )}
                   </div>

                   <div className="flex gap-3">
                       <input
                       value={username}
                       disabled={joined}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Enter your username"
                       className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 mb-4 outline-none focus:border-blue-500"
                       />
                       <select
                       value={room}
                       onChange={(e) => setRoom(e.target.value)}
                       className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 mb-4"
                       >
                           <option>General</option>
                           <option>Tech Support</option>
                       </select>

                    <button
                      onClick={joinChat}
                      disabled={joined}
                      className="w-full bg-green-600 hover:bg-green-700 rounded-xl p-3 text-white font-semibold"
                    >
                      {joined ? "Joined" : "Join Chat"}
                    </button>
                    <input
                     value={message}
                     onChange={handleTyping}
                     placeholder="Type a message..."
                     className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-xl p-3 outline-none focus:border-blue-500"
                    />

                    <button onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl text-white font-medium"
                    >Send</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;