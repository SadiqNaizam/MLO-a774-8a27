import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ThemedContentCard from '@/components/ThemedContentCard';
import SongRow from '@/components/SongRow';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle } from 'lucide-react';

// Placeholder Data
const userPlaylists = [
  { id: 'pl1', title: "Doraemon's Gadget Grooves", description: 'My custom mix', imageUrl: 'https://picsum.photos/seed/dora_playlist_lib/150/150', type: 'playlist' as 'playlist', navigateTo: '/content/playlist/pl1' },
  { id: 'pl2', title: 'Relax with Nobita', description: 'Calm and sleepy', imageUrl: 'https://picsum.photos/seed/nobita_playlist_lib/150/150', type: 'playlist' as 'playlist', navigateTo: '/content/playlist/pl2' },
];
const likedSongs = [
  { id: 'ls1', title: 'Hopter Anthem', artist: 'DJ Take-copter', album: 'Sky High', duration: '3:45', albumArtUrl: 'https://picsum.photos/seed/copter_song/60/60' },
  { id: 'ls2', title: "Shizuka's Violin Serenade", artist: 'Shizuka Minamoto', album: 'Classical Moments', duration: '4:10', albumArtUrl: 'https://picsum.photos/seed/shizuka_song/60/60' },
];
const followedArtists = [
  { id: 'fa1', title: 'The Doraemons Band', description: 'Legendary Group', imageUrl: 'https://picsum.photos/seed/doraemons_band/150/150', type: 'artist' as 'artist', navigateTo: '/content/artist/fa1' },
];
const savedAlbums = [
  { id: 'sa1', title: 'Songs of the 22nd Century', description: 'Various Future Artists', imageUrl: 'https://picsum.photos/seed/22century_album_lib/150/150', type: 'album' as 'album', navigateTo: '/content/album/sa1' },
];

const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPauseSong = (songId: string) => {
    console.log(`Play/Pause song ${songId} from library`);
    const song = likedSongs.find(s => s.id === songId);
    if (song) {
      setCurrentTrack({
        id: song.id,
        title: song.title,
        artist: song.artist,
        albumArtUrl: song.albumArtUrl,
        durationSeconds: 200 // Placeholder
      });
      setIsPlaying(prev => (currentTrack?.id === songId ? !prev : true));
    }
  };

  const handlePlayCard = (id: string | number) => {
    console.log(`Play card ${id} on LibraryPage`);
     const item = [...userPlaylists, ...followedArtists, ...savedAlbums].find(i => i.id === id);
     if (item) {
      setCurrentTrack({
        id: item.id,
        title: item.title,
        artist: item.description || 'Various Artists',
        albumArtUrl: item.imageUrl,
        durationSeconds: Math.floor(Math.random() * 180) + 120
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b bg-card sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Your Library</h1>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
          </Button>
        </header>

        <ScrollArea className="flex-1">
          <Tabs defaultValue="playlists" className="p-6">
            <TabsList className="mb-4">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="songs">Liked Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {userPlaylists.map(item => <ThemedContentCard key={item.id} {...item} onPlayClick={handlePlayCard} navigateTo={item.navigateTo} />)}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-1">
                {likedSongs.map(song => <SongRow key={song.id} song={song} onPlayPauseClick={handlePlayPauseSong} isPlaying={currentTrack?.id === song.id && isPlaying} isCurrent={currentTrack?.id === song.id} />)}
              </div>
            </TabsContent>
            <TabsContent value="artists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {followedArtists.map(item => <ThemedContentCard key={item.id} {...item} onPlayClick={handlePlayCard} navigateTo={item.navigateTo} />)}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {savedAlbums.map(item => <ThemedContentCard key={item.id} {...item} onPlayClick={handlePlayCard} navigateTo={item.navigateTo} />)}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
        <MediaPlaybackBar
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onSkipNext={() => console.log('Skip Next')}
            onSkipPrevious={() => console.log('Skip Previous')}
            onSeek={(time) => console.log('Seek to', time)}
            onVolumeChange={(vol) => console.log('Volume to', vol)}
        />
      </div>
    </div>
  );
};

export default LibraryPage;