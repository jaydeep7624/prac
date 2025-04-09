

// const io = require('socket.io')(8000); // Create Socket.IO server on port 8000
// let users = {}; // Object to hold connected users
// let chatHistory = {}; // Object to hold chat history between users

// // Handle new connections

// module.exports=(io)=>{
//     io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

   
//     socket.on('register', (username) => {
//         users[socket.id] = username; 
//         console.log('Users:', users);

//         io.emit('userList', Object.values(users)); 
//         socket.broadcast.emit('userJoined', `${username} has joined the chat!`);
//     });


//     // When a user sends a message
//     socket.on('sendMessage', (targetUsername, message) => {
//         console.log(targetUsername,message);

//         const sender = users[socket.id];
      
//         const chatKey1 = [sender, targetUsername].sort().join('-');   

//         console.log("chatKey1",chatKey1);
//         const chatKey2 = [targetUsername, sender].sort().join('-');
//         console.log("chatKey1",chatKey2);

      
//         if (!chatHistory[chatKey1]) chatHistory[chatKey1] = [];
//         if (!chatHistory[chatKey2]) chatHistory[chatKey2] = [];

      
//         chatHistory[chatKey1].push({ from: sender, message });
//         chatHistory[chatKey2].push({ from: sender, message });

      
//         const targetSocketId = Object.keys(users).find(socketId => users[socketId] === targetUsername);
//         if (targetSocketId) {
//             io.to(targetSocketId).emit('receive-message', { from: sender, message, to: targetUsername });
//         }
//         socket.emit('receive-message', { from: 'You', message });
//     });
     
    
//     socket.on('getChatHistory', (targetUsername) => {
//         const sender = users[socket.id];
//         const chatKey1 = [sender, targetUsername].sort().join('-');
    
//         const history = chatHistory[chatKey1] || [];
//         socket.emit('chatHistory', history); 
//     });

  
//     socket.on('disconnect', () => {
//         delete users[socket.id]; 
//         console.log('User disconnected:', socket.id);
//         io.emit('userList', Object.values(users));
//     });


//     socket.on('typing', (targetUser) => {
//         const recipientSocketId = Object.keys(users).find(key => users[key] === targetUser);
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('typing', users[socket.id]); 
//         }
//     });

//     socket.on('stopTyping', (targetUser) => {
//         const recipientSocketId = Object.keys(users).find(key => users[key] === targetUser);
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('stopTyping', users[socket.id]); 
//         }
//     });
// });
// }

let users = {}; 
let chatHistory = {};

class ChatSocket {
    constructor(io) {
        this.io = io;
        this.users = users;
        this.chatHistory = chatHistory; 
        this.initializeSocket();
    }

    initializeSocket() {
        this.io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('register', (username) => this.handleRegister(socket, username));
            socket.on('sendMessage', (targetUsername, message) => this.handleSendMessage(socket, targetUsername, message));
            socket.on('getChatHistory', (targetUsername) => this.handleGetChatHistory(socket, targetUsername));
            socket.on('disconnect', () => this.handleDisconnect(socket));
            socket.on('typing', (targetUser) => this.handleTyping(socket, targetUser));
            socket.on('stopTyping', (targetUser) => this.handleStopTyping(socket, targetUser));
        });
    }

    handleRegister(socket, username) {
        this.users[socket.id] = username;
        console.log('Users:', this.users);
        this.io.emit('userList', Object.values(this.users));
        socket.broadcast.emit('userJoined', `${username} has joined the chat!`);
    }

    handleSendMessage(socket, targetUsername, message) {
        console.log(targetUsername, message);
        const sender = this.users[socket.id];
        const chatKey = [sender, targetUsername].sort().join('-');

        if (!this.chatHistory[chatKey]) this.chatHistory[chatKey] = [];
        this.chatHistory[chatKey].push({ from: sender, message });

        const targetSocketId = Object.keys(this.users).find(socketId => this.users[socketId] === targetUsername);
        if (targetSocketId) {
            this.io.to(targetSocketId).emit('receive-message', { from: sender, message, to: targetUsername });
        }
        socket.emit('receive-message', { from: 'You', message });
    }

    handleGetChatHistory(socket, targetUsername) {
        const sender = this.users[socket.id];
        const chatKey = [sender, targetUsername].sort().join('-');
        const history = this.chatHistory[chatKey] || [];
        socket.emit('chatHistory', history);
    }

    handleDisconnect(socket) {
        delete this.users[socket.id];
        console.log('User disconnected:', socket.id);
        this.io.emit('userList', Object.values(this.users));
    }

    handleTyping(socket, targetUser) {
        const recipientSocketId = Object.keys(this.users).find(key => this.users[key] === targetUser);
        if (recipientSocketId) {
            this.io.to(recipientSocketId).emit('typing', this.users[socket.id]);
        }
    }

    handleStopTyping(socket, targetUser) {
        const recipientSocketId = Object.keys(this.users).find(key => this.users[key] === targetUser);
        if (recipientSocketId) {
            this.io.to(recipientSocketId).emit('stopTyping', this.users[socket.id]);
        }
    }
}

module.exports = (io) => new ChatSocket(io);
