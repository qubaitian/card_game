from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from typing import List
import asyncio
import datetime

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

# 添加定时广播任务
async def periodic_broadcast():
    while True:
        # 创建包含当前时间的消息
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        await manager.broadcast(f"Server time: {current_time}")
        # 等待1秒
        await asyncio.sleep(1)

# 在应用启动时启动后台任务
@app.on_event("startup")
async def startup_event():
    # 启动定时广播任务
    asyncio.create_task(periodic_broadcast())

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    print("connect============")
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
@app.get("/", response_class=HTMLResponse)
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
                var ws = new WebSocket(`ws://192.168.31.78:8000/ws/${clientId}`);
                
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
