'use client';

import { useState } from 'react';
import Map from './Map';
import RoomSelect from './RoomSelect';
import InfoPanel from './InfoPanel';
import { Room } from './common_types';
import config from './config.json';
import { usePathname } from 'next/navigation'

export default function Home({ params }: { params: { room: string } }) {
  const pathname = usePathname().slice(1);
  const room = config.map.rooms.find(room => room.id === pathname);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(room);
  const [infoPanelExpanded, setInfoPanelExpanded] = useState(false);

  const onRoomSelected = (room?: Room) => {
    if (!room) {
      setSelectedRoom(undefined);
      window.history.replaceState(null, '', '/');
    } else {
      history.replaceState(null, '', `/${room.id}`);
      setSelectedRoom(room);
    }
  };

  return (
    <main>
      <Map className="w-screen h-screen" config={config} selectedRoom={selectedRoom} onRoomSelected={onRoomSelected} />
      <RoomSelect config={config} onRoomSelected={onRoomSelected} />
      { selectedRoom && <InfoPanel room={selectedRoom} expanded={infoPanelExpanded} onInfoPanelExpandChange={setInfoPanelExpanded} /> }
    </main>
  );
}
