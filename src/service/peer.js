class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.relay.metered.ca:80",
          },
          {
            urls: "turn:a.relay.metered.ca:80",
            username: "d37237a3daa2a34dcf492de8",
            credential: "+9dV4OLzZA1MHQYo",
          },
          {
            urls: "turn:a.relay.metered.ca:80?transport=tcp",
            username: "d37237a3daa2a34dcf492de8",
            credential: "+9dV4OLzZA1MHQYo",
          },
          {
            urls: "turn:a.relay.metered.ca:443",
            username: "d37237a3daa2a34dcf492de8",
            credential: "+9dV4OLzZA1MHQYo",
          },
          {
            urls: "turn:a.relay.metered.ca:443?transport=tcp",
            username: "d37237a3daa2a34dcf492de8",
            credential: "+9dV4OLzZA1MHQYo",
          },
        ],
      });
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();
