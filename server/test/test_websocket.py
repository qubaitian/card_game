from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List

app = FastAPI()

# Class to manage WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast the message to all connected clients
            await manager.broadcast(f"Client #{client_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")

# Regular HTTP endpoint for serving the HTML page
@app.get("/")
async def get():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>WebSocket Chat</title>
        </head>
        <body>
            <h1>WebSocket Chat</h1>
            <div id="messages"></div>
            <input type="text" id="messageText" placeholder="Type a message">
            <button onclick="sendMessage()">Send</button>
            
            <script>
                var clientId = Math.floor(Math.random() * 1000);
                var ws = new WebSocket(`ws://localhost:8000/ws/${clientId}`);
                
                ws.onmessage = function(event) {
                    var messages = document.getElementById('messages');
                    var message = document.createElement('div');
                    message.textContent = event.data;
                    messages.appendChild(message);
                };
                
                function sendMessage() {
                    var input = document.getElementById('messageText');
                    ws.send(input.value);
                    input.value = '';
                }
            </script>
        </body>
    </html>
    """

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
