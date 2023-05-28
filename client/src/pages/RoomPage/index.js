import React, { useEffect, useState } from 'react';
import './index.css';
import { Image, Input, Button } from 'antd';

import InRoomBackground from '../../assets/imgs/InRoomBackground.png';
import Avatar from '../../assets/imgs/Rectangle 278.png';
import JoinGameQR from '../../assets/imgs/JoinGameQR.png';

function RoomPage() {
  const [isHost, setIsHost] = useState(false);
  useEffect(() => {
    const localCurrentUser = localStorage.getItem('currentUser');
    if (localCurrentUser !== null) {
      setIsHost(true);
    }
  });
  return (
    <React.Fragment>
      <div
        className="room-container"
        style={{
          backgroundImage: `url(${InRoomBackground})`,
        }}
      >
        {isHost ? (
          <>
            <div className="host-container">
              <div className="game-pin">
                <h4>Game PIN:</h4>
                <h1>513 9591</h1>
              </div>
              <Image src={JoinGameQR} width={135} />
              <Button
                style={{
                  position: 'absolute',
                  right: 50,
                  top: 280,
                  width: 110,
                  fontSize: 25,
                  fontWeight: 700,
                  height: 60,
                  padding: 8,
                }}
              >
                Start
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="player-component">
              <div className="waiting-text">
                <i>Waiting for the host to start</i>
              </div>
              <Button
                style={{
                  width: 110,
                  fontSize: 25,
                  fontWeight: 700,
                  height: 60,
                  padding: 8,
                  position: 'absolute',
                  right: '50px',
                  top: -100,
                }}
              >
                Exit
              </Button>
            </div>
          </>
        )}
        <div className="userInfor-container">
          <Image
            style={{
              borderRadius: 10,
              marginBottom: '20px',
            }}
            width={160}
            src={Avatar}
            preview={false}
          />
          <div className="user-name">Name</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RoomPage;
