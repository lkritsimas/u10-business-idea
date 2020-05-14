import axios from 'axios';

export const ENDPOINT = 'http://localhost:5000';
// export const getChatRooms = () => axios.get(`${APIURL}/chatroom/chatrooms`);

export const getChatRoomMessages = (matchId: any) => axios.get(`${ENDPOINT}/api/v1/messages/${matchId}`);

// export const joinRoom = room =>
//   axios.post(`${APIURL}/chatroom/chatroom`, { room });
