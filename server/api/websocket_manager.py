from fastapi import WebSocket
from typing import List
import asyncio
from datetime import datetime

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.client_ids: dict = {}  # 存储 websocket 和 client_id 的映射

    async def connect(self, websocket: WebSocket, client_id: str):
        # 检查是否已存在相同的 client_id
        for ws, cid in self.client_ids.items():
            if cid == client_id:
                # 如果找到相同的 client_id，关闭旧连接
                try:
                    await ws.close()
                    self.active_connections.remove(ws)
                    del self.client_ids[ws]
                except:
                    pass
                break

        await websocket.accept()
        self.active_connections.append(websocket)
        self.client_ids[websocket] = client_id

        # Start the broadcast task when the first client connects
        if len(self.active_connections) == 1:
            # asyncio.create_task(self.broadcast_time())
            pass

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.client_ids:
            del self.client_ids[websocket]

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    async def broadcast_time(self):
        while True:
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            await self.broadcast(f"Current time: {current_time}")
            await asyncio.sleep(5)  # Wait for 5 seconds

manager = ConnectionManager()
