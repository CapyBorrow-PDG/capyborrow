import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, ChannelList, Channel, Window, MessageList, MessageInput } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { useAuth0 } from '@auth0/auth0-react';

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

const MessagesTab = (props) => {
    const [connected, setConnected] = useState(false);
    const {user, isAuthenticated} = useAuth0();

    useEffect(() => {
        if (!isAuthenticated || !user) return;
        if (connected) return;

        const connect = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/token`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: props.user.id})
            })
            const token = await res.json();
            //console.log("token : ", token);
            console.log("user to connect :", props.user.id.toString(), props.user.username);
            await client.connectUser({
                id: props.user.id.toString(),
                name: props.user.username ? props.user.username : props.user.email,
                }, token
            );
            setConnected(true);
        }

        connect();
    }, [isAuthenticated, user, connected]);

    return(
        <div>
            {!connected ? (<p> Loading... </p>) : (
                <Chat client={client} theme="messaging light">
                    <ChannelList filters={{ members: { $in: [props.user.id.toString()]}}}/>
                    <Channel>
                        <Window>
                            <MessageList/>
                            <MessageInput/>
                        </Window>
                    </Channel>
                </Chat>
            )}
        </div>
    );

}

export default MessagesTab;