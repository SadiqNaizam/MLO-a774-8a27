import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ThemedContentCard from '@/components/ThemedContentCard';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell } from 'lucide-react'; // Doraemon's bell icon

// Placeholder data for ThemedContentCard
const newReleases = [
  { id: 'album1', title: "Doraemon's Future Funk", description: 'An upbeat journey', imageUrl: 'https://picsum.photos/seed/doraemon_album1/300/300', type: 'album' as 'album', navigateTo: '/content/album/album1' },
  { id: 'playlist1', title: 'Nobita Naps Mix', description: 'Chill beats for lazy afternoons', imageUrl: 'https://picsum.photos/seed/nobita_playlist1/300/300', type: 'playlist' as 'playlist', navigateTo: '/content/playlist/playlist1' },
  { id: 'artist1', title: 'Gian Grooves', description: 'Powerful Vocals', imageUrl: 'https://picsum.photos/seed/gian_artist1/300/300', type: 'artist' as 'artist', navigateTo: '/content/artist/artist1' },
  { id: 'album2', title: 'Shizuka Sings Strings', description: 'Violin Virtuoso', imageUrl: 'https://picsum.photos/seed/shizuka_album2/300/300', type: 'album' as 'album', navigateTo: '/content/album/album2' },
];

const recentlyPlayed = [
  { id: 'album3', title: 'Anywhere Door Anthems', description: 'Travel Tunes', imageUrl: 'https://picsum.photos/seed/anywhere_door/300/300', type: 'album' as 'album', navigateTo: '/content/album/album3' },
  { id: 'playlist2', title: 'Time Machine Melodies', description: 'Blast from the Past', imageUrl: 'https://picsum.photos/seed/timemachine_playlist/300/300', type: 'playlist' as 'playlist', navigateTo: '/content/playlist/playlist2' },
];

// Placeholder for MediaPlaybackBar
const initialTrack = null;
/*
// Example track for MediaPlaybackBar
const initialTrack = {
  id: 'track0',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  albumArtUrl: 'https://picsum.photos/seed/doraemon_uta/100/100',
  durationSeconds: 180,
};
*/

const Homepage = () => {
  console.log('Homepage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTrack, setCurrentTrack] = useState<any>(initialTrack); // Using 'any' for placeholder simplicity
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handlePlayCard = (id: string | number) => {
    console.log(`Play card ${id} on Homepage`);
    // Dummy track based on card (replace with actual track lookup)
    const card = [...newReleases, ...recentlyPlayed].find(item => item.id === id);
    if (card) {
      setCurrentTrack({
        id: card.id,
        title: card.title,
        artist: card.description || 'Various Artists',
        albumArtUrl: card.imageUrl,
        durationSeconds: Math.floor(Math.random() * 180) + 120 // Random duration 2-5 mins
      });
      setIsPlaying(true);
    }
  };


  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b flex items-center justify-between bg-card">
          <div className="w-1/3">
            <Input
              type="search"
              placeholder="Search for Gadgets, Songs, Artists..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Welcome, User!</span>
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/user_avatar/40/40" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
          </div>
        </header>

        <ScrollArea className="flex-1 p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Bell className="h-6 w-6 mr-2 text-blue-500" /> {/* Doraemon's Bell */}
              New Releases
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {newReleases.map(item => (
                <ThemedContentCard
                  key={item.id}
                  {...item}
                  onPlayClick={handlePlayCard}
                  navigateTo={item.navigateTo}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recentlyPlayed.map(item => (
                <ThemedContentCard
                  key={item.id}
                  {...item}
                  onPlayClick={handlePlayCard}
                  navigateTo={item.navigateTo}
                />
              ))}
            </div>
          </section>
          
          {/* Placeholder for other sections like 'Your Top Playlists', 'Featured Artists' */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Doraemon's Picks for You</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {/* Add more ThemedContentCard here */}
                 <ThemedContentCard id="dp1" title="Gadget Grooves" description="Future Sounds" imageUrl="https://picsum.photos/seed/gadget_grooves/300/300" type="playlist" onPlayClick={handlePlayCard} navigateTo="/content/playlist/dp1" />
                 <ThemedContentCard id="dp2" title="Pocket Power Ballads" description="Emotional Beats" imageUrl="https://picsum.photos/seed/pocket_ballads/300/300" type="album" onPlayClick={handlePlayCard} navigateTo="/content/album/dp2" />
            </div>
          </section>

        </ScrollArea>
        <MediaPlaybackBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipNext={() => console.log('Skip Next')}
          onSkipPrevious={() => console.log('Skip Previous')}
          onSeek={(time) => console.log('Seek to', time)}
          onVolumeChange={(vol) => console.log('Volume to', vol)}
        />
      </div>
    </div>
  );
};

export default Homepage;