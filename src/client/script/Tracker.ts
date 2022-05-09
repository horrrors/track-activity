/*
  Due to tsc compiler instead of webpack i have to repeat this interface instead of just import from backend
  i add any export/import statement compiler doing wrong with it
  for save time.
*/

interface ITrack {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts: Date;
}

interface ITracker {
  track(event: string, ...tags: string[]): void;
  store(track: ITrack): void;
  send(tracks: ITrack[]): Promise<Response>;
}

class Tracker implements ITracker {
  track(event: string, ...tags: string[]): void {
    const track: ITrack = {
      event,
      tags: [],
      url: window.location.href,
      title: document.title,
      ts: new Date()
    };
    this.store(track);
  }

  store(track: ITrack): void {
    let tracks: ITrack[] = JSON.parse(sessionStorage.getItem('tracks'));
    if (!tracks) tracks = [];
    tracks.push(track);
    sessionStorage.setItem('tracks', JSON.stringify(tracks));
  }

  send(tracks: ITrack[]): Promise<Response> {
    return fetch('http://localhost:8001/track', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ tracks })
    });
  }
}

const tracker = new Tracker();

window.onunload = async function () {
  const tracks: ITrack[] = JSON.parse(sessionStorage.getItem('tracks'));
  await tracker.send(tracks);
};

setInterval(async () => {
  const semaphore = JSON.parse(sessionStorage.getItem('semaphore') ?? 'false');
  if (semaphore) return;
  sessionStorage.setItem('semaphore', 'true');

  let lastTry;
  const now = new Date();

  if (sessionStorage.getItem('lastTry') === null) {
    lastTry = now;
  } else {
    lastTry = new Date(sessionStorage.getItem('lastTry'));
  }

  const tracks: ITrack[] = JSON.parse(sessionStorage.getItem('tracks'));
  let difference = now.getTime() - lastTry.getTime(); // in ms

  const shouldSend = (tracks && tracks.length >= 3) || difference >= 1000;

  if (shouldSend) {
    try {
      await tracker.send(tracks);
      sessionStorage.setItem('tracks', JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  }

  sessionStorage.setItem('lastTry', now.toString());
  sessionStorage.setItem('semaphore', 'false');
}, 1000);
