import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SongRow from '@/components/SongRow';
import ThemedContentCard from '@/components/ThemedContentCard';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder data
const songs = [
  { id: 's1', title: "Doraemon's Bell Sound", artist: 'Future Gadget Lab', album: 'Tech Beats', duration: '0:30', albumArtUrl: 'https://picsum.photos/seed/dora_bell_song/60/60' },
  { id: 's2', title: 'Nobita Sleeping Theme', artist: 'Dreamy Vibes', album: 'Lazy Days', duration: '3:15', albumArtUrl: 'https://picsum.photos/seed/nobita_sleep_song/60/60' },
];
const albums = [
  { id: 'a1', title: '22nd Century Hits', description: 'Various Artists', imageUrl: 'https://picsum.photos/seed/22_century_album/150/150', type: 'album' as 'album', navigateTo: '/content/album/a1' },
  { id: 'a2', title: 'Suneo Collection', description: 'Suneo Honekawa', imageUrl: 'https://picsum.photos/seed/suneo_album/150/150', type: 'album' as 'album', navigateTo: '/content/album/a2' },
];
const artists = [
  { id: 'art1', title: 'Dorami Chan', description: 'Pop Idol', imageUrl: 'https://picsum.photos/seed/dorami_artist/150/150', type: 'artist' as 'artist', navigateTo: '/content/artist/art1' },
];
const playlists = [
  { id: 'p1', title: "Gian's Concert Rehearsal", description: 'Loud and Proud', imageUrl: 'https://picsum.photos/seed/gian_playlist/150/150', type: 'playlist' as 'playlist', navigateTo: '/content/playlist/p1' },
];

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPauseSong = (songId: string) => {
    console.log(`Play/Pause song ${songId} from search`);
    const song = songs.find(s => s.id === songId);
    if (song) {
      setCurrentTrack({
        id: song.id,
        title: song.title,
        artist: song.artist,
        albumArtUrl: song.albumArtUrl,
        durationSeconds: 180 // Placeholder
      });
      setIsPlaying(prev => (currentTrack?.id === songId ? !prev : true));
    }
  };
  
  const handlePlayCard = (id: string | number) => {
    console.log(`Play card ${id} on SearchPage`);
    const item = [...albums, ...artists, ...playlists].find(i => i.id === id);
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
        <header className="p-4 border-b bg-card sticky top-0 z-10">
          <Input
            type="search"
            placeholder="What do you want to listen to? (e.g., Doraemon, Gadgets)"
            className="w-full md:w-1/2 lg:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </header>

        <ScrollArea className="flex-1 p-6">
          {searchTerm ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="songs">Songs</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <h3 className="text-xl font-semibold mb-3">Top Results for "{searchTerm}"</h3>
                {/* Combine some results or show most relevant */}
                <section className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Songs</h4>
                  {songs.map(song => <SongRow key={song.id} song={song} onPlayPauseClick={handlePlayPauseSong} isPlaying={currentTrack?.id === song.id && isPlaying} isCurrent={currentTrack?.id === song.id} />)}
                </section>
                <section className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Albums</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {albums.map(album => <ThemedContentCard key={album.id} {...album} onPlayClick={handlePlayCard} navigateTo={album.navigateTo}/>)}
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="songs">
                <h3 className="text-xl font-semibold mb-3">Songs matching "{searchTerm}"</h3>
                {songs.map(song => <SongRow key={song.id} song={song} onPlayPauseClick={handlePlayPauseSong} isPlaying={currentTrack?.id === song.id && isPlaying} isCurrent={currentTrack?.id === song.id} />)}
              </TabsContent>
              <TabsContent value="albums">
                <h3 className="text-xl font-semibold mb-3">Albums matching "{searchTerm}"</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {albums.map(album => <ThemedContentCard key={album.id} {...album} onPlayClick={handlePlayCard} navigateTo={album.navigateTo} />)}
                </div>
              </TabsContent>
              <TabsContent value="artists">
                <h3 className="text-xl font-semibold mb-3">Artists matching "{searchTerm}"</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {artists.map(artist => <ThemedContentCard key={artist.id} {...artist} onPlayClick={handlePlayCard} navigateTo={artist.navigateTo}/>)}
                </div>
              </TabsContent>
              <TabsContent value="playlists">
                <h3 className="text-xl font-semibold mb-3">Playlists matching "{searchTerm}"</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {playlists.map(playlist => <ThemedContentCard key={playlist.id} {...playlist} onPlayClick={handlePlayCard} navigateTo={playlist.navigateTo}/>)}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p className="text-lg">Search for your favorite Doraemon tunes, artists, or gadgets!</p>
              <p className="text-sm">Try "Take-copter Beats" or "Nobita".</p>
            </div>
          )}
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

export default SearchPage;